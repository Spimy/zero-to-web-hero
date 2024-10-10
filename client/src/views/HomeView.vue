<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import TodoItem from '@/components/TodoItem.vue';
import TodoNote from '@/components/TodoNote.vue';

const router = useRouter();

const notes = ref([
  { title: '✏️ Room Renovaton', num: 5 },
  { title: '✏️ Room Renovaton', num: 5 }
]);

const todos = ref([
  { content: 'Buy Galvanized Square Steel', isCompleted: true },
  { content: 'Get Eco-friendly Wood Veneer', isCompleted: false }
]);

const activeNote = ref<number | null>(null);
const showNoteInput = ref(false);
const newNoteTitle = ref('');
const showTodoInput = ref(false);
const newTodoTitle = ref('');

const toggleActive = async (index: number) => {
  activeNote.value = index;
};

const toggleCompleted = (index: number) => {
  todos.value[index].isCompleted = !todos.value[index].isCompleted;
};

const handleCreateNote = async (event: KeyboardEvent) => {
  if (event.key === 'Enter' && newNoteTitle.value.trim()) {
    newNoteTitle.value = '';
    showNoteInput.value = false;
  }
};

const handleCreateTodo = async (event: KeyboardEvent) => {
  if (event.key === 'Enter' && newTodoTitle.value.trim()) {
    newTodoTitle.value = '';
    showTodoInput.value = false;
  }
};

const handleLogout = async () => {
  router.push('/login');
};
</script>

<template>
  <body>
    <section class="card">
      <!-- Mobile -->
      <div class="card__burger">
        <label for="burger">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
          </svg>
        </label>
        <input type="checkbox" name="burger" id="burger" />
      </div>
      <!-- Mobile -->

      <aside class="card__notes">
        <h1>Notes</h1>
        <menu class="card__notes__items">
          <TodoNote
            v-for="(note, index) in notes"
            :key="index"
            :isActive="activeNote === index"
            :todoNum="note.num"
            @click="toggleActive(index)"
          >
            {{ note.title }}
          </TodoNote>
        </menu>

        <button class="card__notes__add" @click="showNoteInput = true" v-if="!showNoteInput">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5l0 14" />
            <path d="M5 12l14 0" />
          </svg>
          New Note
        </button>
        <div v-if="showNoteInput" class="card__notes__add">
          <input
            v-model="newNoteTitle"
            @keydown="handleCreateNote"
            type="text"
            placeholder="Enter note title"
          />
        </div>

        <div class="card__notes__user">
          <p title="Johnathan very long name">Johnathan very long name</p>
          <button @click="handleLogout">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"
              />
              <path d="M9 12h12l-3 -3" />
              <path d="M18 15l3 -3" />
            </svg>
          </button>
        </div>
      </aside>

      <main class="card__todos">
        <h1>Room Renovation</h1>
        <menu class="card__todos__items">
          <TodoItem
            v-for="(todo, index) in todos"
            :key="index"
            @click="toggleCompleted(index)"
            :isCompleted="todo.isCompleted"
          >
            {{ todo.content }}
          </TodoItem>
        </menu>

        <button class="card__todos__items__add" @click="showTodoInput = true" v-if="!showTodoInput">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-plus"
            width="68"
            height="68"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5l0 14" />
            <path d="M5 12l14 0" />
          </svg>
        </button>
        <div v-if="showTodoInput" class="card__todos__items__add--input">
          <input
            autofocus
            v-model="newTodoTitle"
            @keydown="handleCreateTodo"
            type="text"
            placeholder="I need to do..."
          />
        </div>
      </main>
    </section>
  </body>
</template>

<style scoped>
body {
  background-color: var(--primary-colour);
  background: linear-gradient(45deg, var(--secondary-colour) 0%, var(--primary-colour) 100%);
  padding: 1rem;
  min-height: 100dvh;

  /* Centering a div 1 : flex */
  display: flex;
  align-items: center;
  justify-content: center;

  /* Centering a div 2 : grid */
  /* display: grid;
  place-items: center; */

  background-repeat: no-repeat;
  background-attachment: fixed;
}

.card {
  background: var(--background-colour);
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr;
  border-radius: 1rem;
  overflow: hidden;
  height: 40rem;
  width: 60rem;
}

/* notes */
.card__notes {
  background-color: var(--background-colour--2);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 15rem;
  overflow: hidden;
}

.card__notes h1 {
  color: var(--secondary-colour);
  font-weight: 500;
  font-size: 1.5rem;
}

.card__notes svg {
  /* for text size scaling */
  width: 1.5rem;
  height: 1.5rem;
}

.card__notes__items {
  flex: 1;
  overflow: auto;
  margin-bottom: 1rem;
}

.card__notes__add {
  color: var(--text-colour--2);
  background-color: var(--secondary-colour);
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
}

.card__notes__add input {
  background-color: var(--secondary-colour);
  color: var(--text-colour--2);
  border-radius: 8px;
  border: none;
  outline: none;
  padding: 0.5rem;
  margin: -0.5rem;
  width: 100%;
}

.card__notes__user {
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  background-color: var(--background-colour);
  overflow: hidden;
}

.card__notes__user p,
.card__notes__user button {
  padding: 0.5rem;
}

.card__notes__user p {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card__notes__user button {
  background-color: hsl(from var(--primary-colour) h s l / 0.32);
}

/* todo-items */
.card__todos {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.card__todos h1 {
  background-color: var(--secondary-colour);
  background: linear-gradient(90deg, var(--primary-colour) 0%, var(--secondary-colour) 100%);
  border-bottom-left-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
  padding: 1rem;
  color: var(--text-colour--2);
  font-size: 2rem;
  font-weight: 600;
}

.card__todos__items {
  overflow: auto;
  padding: 1rem;
  padding-bottom: 4rem;
}

.card__todos__items__add {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background-color: var(--secondary-colour);
  border-radius: 100%;
  color: var(--text-colour--2);
  height: 3rem;
  width: 3rem;
}

.card__todos__items__add--input {
  background-color: var(--secondary-colour);
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  border-radius: 0.5rem;
  width: 90%;
  padding: 0.5rem 1rem;
}

.card__todos__items__add--input input {
  background-color: var(--secondary-colour);
  color: var(--text-colour--2);
  border: none;
  outline: none;
  margin: -0.5rem;
  width: 100%;
}

/* Mobile */
.card__burger {
  z-index: 2;
  display: none;
}

.card__burger label {
  cursor: pointer;
}

.card__burger label svg {
  width: 1.5rem;
  height: 1.5rem;
  margin-top: 0.3rem;
}

.card__burger input {
  display: none;
}

@media screen and (max-width: 640px) {
  .card {
    grid-template-columns: 0fr 3fr;
    position: relative;
  }

  .card__notes {
    z-index: 1;
    display: none;
    position: absolute;
    height: 100%;
    border-radius: 1rem;
  }

  .card__burger {
    display: block;
    background-color: var(--background-colour--2);
    padding: 1rem;
  }

  .card__burger:has(input:checked) + .card__notes {
    width: unset;
    left: 2.5rem;
    right: 0;
    height: 40rem;
    display: flex;
  }
}
</style>
