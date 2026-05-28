<script setup lang="ts">
import { useTodoStore } from '@/stores/todo.store'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const todoStore = useTodoStore()
const title = ref('')
let stopRealtime: null | (() => void) = null

onMounted(async () => {
  await todoStore.fetchTodos()
  stopRealtime = todoStore.startRealtime()
})

onBeforeUnmount(() => stopRealtime?.())

function onAdd() {
  void todoStore.addTodo(title.value)
  title.value = ''
}
</script>

<template>
  <div class="todo-app">
    <header class="header">
      <h1>Todos</h1>
      <p class="hint">Powered by Hasura + Apollo + Pinia</p>
    </header>

    <form class="add-form" @submit.prevent="onAdd">
      <input
        v-model="title"
        type="text"
        placeholder="What needs doing?"
        autocomplete="off"
        aria-label="New todo title"
      />
      <button type="submit" :disabled="todoStore.loading">Add</button>
    </form>

    <p v-if="todoStore.loading" class="status">Loading…</p>
    <p v-else-if="todoStore.error" class="status error" role="alert">
      {{ todoStore.error }}
    </p>

    <ul v-else class="list">
      <li v-for="todo in todoStore.todos" :key="todo.id" class="item">
        <label class="row">
          <input
            type="checkbox"
            :checked="todo.is_done"
            @change="todoStore.toggleTodo(todo)"
          />
          <span :class="{ done: todo.is_done }">{{ todo.title }}</span>
        </label>
        <button
          type="button"
          class="delete"
          aria-label="Delete todo"
          @click="todoStore.deleteTodo(todo.id)"
        >
          Delete
        </button>
      </li>
    </ul>

    <p v-if="!todoStore.loading && !todoStore.error && todoStore.todos.length === 0" class="empty">
      No todos yet. Add one above (after connecting Hasura).
    </p>
  </div>
</template>

<style scoped>
.todo-app {
  max-width: 32rem;
  margin: 0 auto;
  padding: 1.5rem;
}

.header {
  margin-bottom: 1.25rem;
}

.header h1 {
  margin: 0 0 0.25rem;
  font-size: 1.75rem;
  font-weight: 600;
}

.hint {
  margin: 0;
  font-size: 0.875rem;
  color: var(--muted, #64748b);
}

.add-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.add-form input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 0.375rem;
  font: inherit;
}

.add-form button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  background: var(--accent, #2563eb);
  color: #fff;
  font: inherit;
  cursor: pointer;
}

.add-form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.status {
  margin: 0 0 1rem;
  font-size: 0.9rem;
  color: var(--muted, #64748b);
}

.status.error {
  color: #b91c1c;
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 0.375rem;
  background: var(--surface, #fff);
}

.row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  flex: 1;
  min-width: 0;
}

.row span {
  word-break: break-word;
}

.row span.done {
  text-decoration: line-through;
  color: var(--muted, #64748b);
}

.delete {
  flex-shrink: 0;
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 0.25rem;
  background: transparent;
  font: inherit;
  font-size: 0.8rem;
  cursor: pointer;
}

.delete:hover {
  background: #fef2f2;
  border-color: #fecaca;
  color: #b91c1c;
}

.empty {
  margin: 1rem 0 0;
  font-size: 0.9rem;
  color: var(--muted, #64748b);
}
</style>
