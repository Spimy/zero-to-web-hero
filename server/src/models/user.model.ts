import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { Document, HydratedDocument, model, Model, Schema, Types } from 'mongoose';
import { Note } from './notes.model';

export interface ISession {
  token: string;
  expiresAt: number;
}

export interface IUser extends Document<Types.ObjectId> {
  email: string;
  password: string;
  sessions: ISession[];
}

export interface IUserMethods {
  toJSON(): Omit<IUser, 'password' | 'sessions'>;

  /**
   * @return {*} Access Token {Promise<string>}
   * @memberof IUserMethods
   */
  generateAccessToken(): Promise<string>;

  /**
   * @return {*} Refresh Token {Promise<string>}
   * @memberof IUserMethods
   */
  generateRefreshToken(): Promise<string>;

  /**
   * @return {*} Refresh Token {Promise<string>}
   * @memberof IUserMethods
   */
  createSession(): Promise<string>;
}

export type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  email: { type: String, trim: true, minlength: 1, required: true, unique: true },
  password: { type: String, minlength: 8, required: true },
  sessions: [
    {
      token: { type: String, trim: true, required: true },
      expiresAt: { type: Number, required: true }
    }
  ]
});

// When user registers, hash and salt their passwords before saving to the database
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;
  next();
});

// Cascade style delete, i.e., delete all notes that is owned by the deleted user
userSchema.post<HydratedDocument<IUser>>('findOneAndDelete', async function (_, next) {
  await Note.deleteMany({ _authorId: this._id });
  next();
});

// Instance method to return user a JSON without password and sessions
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  const { password, sessions, ...userObject } = user;
  return userObject;
};

userSchema.methods.generateAccessToken = async function () {
  const user = this;

  return new Promise<string>((resolve, reject) => {
    jwt.sign({ _id: user._id.toHexString() }, process.env.JWT_SECRET, { expiresIn: '10m' }, (error, token) => {
      if (error) return reject(error);
      return resolve(token);
    });
  });
};

userSchema.methods.generateRefreshToken = function () {
  return new Promise<string>((resolve, reject) => {
    crypto.randomBytes(64, (error, buffer) => {
      if (error) return reject(error);
      return resolve(buffer.toString('hex'));
    });
  });
};

userSchema.methods.createSession = function () {
  const user = this;

  return new Promise((resolve, reject) => {
    user.generateRefreshToken().then((refreshToken) => {
      // Generate expiration time in unix timestamp for the refresh token
      const daysUntilExpire = 30; // 1 month
      const msUntilExpire = daysUntilExpire * 24 * 60 * 60 * 1000;
      const expiresAt = Date.now() + msUntilExpire;

      user.sessions.push({ token: refreshToken, expiresAt });

      // New session is pushed so we need to save the changes
      return user
        .save()
        .then(() => resolve(refreshToken))
        .catch((error) => reject(error));
    });
  });
};

export const User = model<IUser, UserModel>('users', userSchema);
