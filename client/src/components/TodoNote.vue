<script setup lang="ts">
// TODO;
</script>

<template>
  <div class="todoNote">
    <div class="todoNote__left">
      <p class="todoNote__text"><slot></slot></p>
    </div>
    <div class="todoNote__right">
      <p class="todoNote__num"></p>
      <button class="todoNote__delete">
        <!-- TODO -->
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
