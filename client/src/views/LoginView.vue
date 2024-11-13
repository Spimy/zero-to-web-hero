<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';

const email = ref<string>('');
const password = ref<string>('');
const { login } = useAuth();
const router = useRouter();

const handleLogin = async () => {
  if (!email.value || !password.value) {
    alert('Please enter both email and password.');
    return;
  }

  const success = await login(email.value, password.value);
  if (success) {
    router.push('/');
  } else {
    alert('Login failed. Please check your credentials.');
  }
};
</script>

<template>
  <main>
    <section class="loginCard">
      <h2>Login</h2>
      <form class="loginCard__credentials" @submit.prevent="handleLogin">
        <div class="loginCard__field">
          <label for="email">Email</label>
          <input type="text" v-model="email" id="email" placeholder="Email" />
        </div>
        <div class="loginCard__field">
          <label for="password">Password</label>
          <input type="password" v-model="password" id="password" placeholder="Password" />
          <p class="loginCard__forgot">Forgot Password</p>
        </div>
        <button class="loginCard__submit" type="submit">Login</button>
      </form>
      <p class="loginCard__register">
        Don’t have an account?
        <RouterLink to="/register"> Register Here</RouterLink>
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

.loginCard {
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

.loginCard h2 {
  font-weight: 500;
  font-size: 2rem;
  color: var(--primary-colour);
  margin-bottom: 2rem;
}

.loginCard__credentials {
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
}

.loginCard__field {
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
}

.loginCard__field label {
  font-size: 1rem;
  font-weight: 500;
  color: var(--primary-colour);
}

.loginCard__field input {
  margin: 0;
  border-radius: 0.5rem;
  padding: 1rem;
  outline: none;
  border: none;
}

.loginCard__forgot {
  text-align: end;
  color: var(--primary-colour);
  margin-top: 0.5rem;
}

.loginCard__submit {
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

.loginCard__submit:active {
  background-color: var(--secondary-colour);
}

.loginCard__register {
  text-align: center;
}

.loginCard__register a {
  text-decoration: none;
  color: var(--primary-colour);
}
</style>
