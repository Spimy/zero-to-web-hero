<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';

const email = ref<string>('');
const password = ref<string>('');
const confirmPassword = ref<string>('');
const { register } = useAuth();
const router = useRouter();

const handleRegister = async () => {
  if (!email.value || !password.value || !confirmPassword.value) {
    alert('Please fill out all fields.');
    return;
  }

  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match!');
    return;
  }

  const success = await register(email.value, password.value);

  if (success) {
    alert('Registration successful!');
    router.push('/login');
  } else {
    alert('Registration failed. Please try again.');
  }
};
</script>

<template>
  <main>
    <section class="registerCard">
      <h2>Register</h2>
      <form class="registerCard__credentials" @submit.prevent="handleRegister">
        <div class="registerCard__field">
          <label for="email">Email</label>
          <input type="text" v-model="email" id="email" placeholder="Email" />
        </div>
        <div class="registerCard__field">
          <label for="password">Password</label>
          <input type="password" v-model="password" id="password" placeholder="Password" />
        </div>
        <div class="registerCard__field">
          <label for="password">Confirm Password</label>
          <input
            type="password"
            v-model="confirmPassword"
            id="confirmpassword"
            placeholder="Confirm Password"
          />
        </div>
        <button class="registerCard__submit" type="submit">Register</button>
      </form>
      <p class="registerCard__register">
        Already have an account?
        <RouterLink to="/login"> Login Here</RouterLink>
      </p>
    </section>
  </main>
</template>

<style scoped>
main {
  background: var(--primary-colour);
  background: linear-gradient(45deg, var(--secondary-colour) 0%, var(--primary-colour) 100%);
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  font-size: 0.75rem;
}

.registerCard {
  background: var(--background-colour);
  margin: auto;
  min-height: 31.25rem;
  min-width: 24rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  overflow: hidden;
}

.registerCard h2 {
  font-weight: 500;
  font-size: 2rem;
  color: var(--primary-colour);
  margin-bottom: 2rem;
}

.registerCard__credentials {
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
}

.registerCard__field {
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
}

.registerCard__field label {
  font-size: 1rem;
  font-weight: 500;
  color: var(--primary-colour);
}

.registerCard__field input {
  margin: 0;
  border-radius: 0.5rem;
  padding: 1rem;
  outline: none;
  border: none;
}

.registerCard__forgot {
  text-align: end;
  color: var(--primary-colour);
  margin-top: 0.5rem;
}

.registerCard__submit {
  margin-top: 2rem;
  background-color: var(--primary-colour);
  outline: none;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  color: var(--text-colour--2);
  font-size: 1rem;
  font-weight: 400;
}

.registerCard__submit:active {
  background-color: var(--secondary-colour);
}

.registerCard__register {
  text-align: center;
}

.registerCard__register a {
  text-decoration: none;
  color: var(--primary-colour);
}
</style>
