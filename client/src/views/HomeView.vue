<script setup lang="ts">
import { ref, computed, type Ref } from 'vue';
import TestComponent from '../components/TestComponent.vue';

const username: string = 'Alex';

//v-if
//import type Ref, or let it auto infer
const userRole: Ref<string> = ref('admin');

//v-for
const fruits: string[] = ['Apple', 'Banana', 'Orange', 'Grapes'];

//v-model and ref reactivity
const inputValue = ref('Starting Value');
// Use a computed property to reactively update the HTML content when inputValue changes
const htmlContent = computed(() => {
  return `<p style="color: red;">${inputValue.value}</p>`;
});

const counter = ref(0);

const incrementCounter = () => {
  counter.value++;
};
</script>

<template>
  <main>
    Hello world!
    {{ username }}
    <TestComponent v-bind:age="22" username="username">
      this is a slot!
      <template v-slot:description>This is a description!</template>
    </TestComponent>
  </main>

  <p v-if="userRole === 'admin'">You are an Admin.</p>
  <p v-else-if="userRole === 'user'">You are a regular User.</p>
  <p v-else>You are a Guest. Please log in.</p>

  <ul>
    <li v-for="(fruit, index) in fruits" :key="index">{{ index + 1 }}. {{ fruit }}</li>
  </ul>

  <input
    v-bind:value="inputValue"
    v-on:input="(event) => (inputValue = (event.target as HTMLInputElement).value)"
  />

  <input v-model="inputValue" />
  <div v-html="htmlContent"></div>

  <h3 @click="incrementCounter">You've clicked the button {{ counter }} times.</h3>
</template>
