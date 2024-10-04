<script setup lang="ts">
import { onMounted } from 'vue';

const props = defineProps<{ username: string; age: number }>();
const ages = props.age + 1;

onMounted(() => {
  console.log('Component has been mounted.');
  console.log(ages);
});
</script>

<template>
  <h1>this is a test component</h1>
  User : {{ props.username }}
  <br />
  Age: {{ props.age }}
  <br />
  <slot></slot>
  <p><slot name="description"></slot></p>
</template>
<style scoped>
h1 {
  color: yellow;
}

p {
  color: brown;
}
</style>
