<script setup lang="ts">
import { useNotes } from '../composables/useNotes';

const props = defineProps<{
  complete: boolean;
  noteId: string;
  todoId: string;
}>();

const emit = defineEmits(['todoDeleted']);

const { deleteTodo } = useNotes();

const handleDeleteTodo = async (noteId: string, todoId: string) => {
  await deleteTodo(noteId, todoId);
  emit('todoDeleted');
};
</script>

<template>
  <div class="todoItem">
    <div class="todoItem__text" :class="{ 'todoItem__text--active': props.complete }">
      <slot></slot>
    </div>
    <button class="todoItem__delete" @click="handleDeleteTodo(noteId, todoId)">
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
</template>

<style scoped>
.todoItem {
  background-color: var(--background-colour--2);
  padding: 0.75rem;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 0;
}

.todoItem__text {
  flex: 1;
}

.todoItem__text--active {
  text-decoration: line-through;
}

.todoItem__delete {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
