<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <RouterView />
</template>

<style>
/* Resetting */
:root {
  --primary-colour: hsl(166, 88%, 39%);
  --secondary-colour: hsl(166, 81%, 25%);
  --background-colour: hsl(0, 0%, 96%);
  --background-colour--2: hsl(0, 0%, 100%);
  --text-colour: hsl(0, 0%, 24%);
  --text-colour--2: hsl(0, 0%, 100%);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

menu {
  margin: 0;
  padding: 0;
  list-style: none;
}

body,
h1,
h2,
h3,
h4,
p,
button {
  font-family: 'Poppins', sans-serif;
  margin: 0;
}

button {
  border: none;
  background: none;

  /* Centering */
  display: flex;
  justify-content: center;
  align-items: center;
}

button:hover {
  cursor: pointer;
  filter: saturate(125%) brightness(125%);
}

button:active {
  transform: translateY(1px);
}

button:focus-visible {
  /* border: 2px solid blue; */
  outline: 2px solid blue;
}

img,
picture {
  max-width: 100%;
  display: block;
}

input,
button,
textarea,
select {
  /* for some reason does not inherit on default */
  font: inherit;
}

input::placeholder {
  color: hsl(from var(--text-colour--2) h (s - 50%) (l - 50%));
}

@media (prefers-reduced-motion: reduce) {
  /* os settings reduce motions */
  /* Animation Effects for win 11 */

  html:focus-within {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
</style>
