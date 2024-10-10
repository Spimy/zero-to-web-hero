<script setup lang="ts">
defineProps({
  isActive: Boolean,
  todoNum: {
    type: Number,
    default: 0
  }
});
</script>

<template>
  <div class="todoNote" :class="{ 'todoNote--active': isActive }">
    <div class="todoNote__left">
      <p class="todoNote__text"><slot></slot></p>
    </div>
    <div class="todoNote__right">
      <p class="todoNote__num">{{ todoNum }}</p>
      <button class="todoNote__delete">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.todoNote {
  opacity: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.todoNote--active {
  opacity: 100%;
  background-color: rgba(12, 188, 146, 0.32);
}

.todoNote__text {
  margin: auto;
  overflow-wrap: anywhere;
}

.todoNote__right {
  display: flex;
}

.todoNote__num {
  margin: auto;
  padding: 0.25rem;
}

.todoNote__delete {
  display: flex;
  justify-content: center;
  align-items: center;
}

.todoNote__delete svg {
  margin: auto;
}
</style>
