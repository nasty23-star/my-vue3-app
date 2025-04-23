<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Task {
  id: number
  text: string
  completed: boolean
}

const loading = ref(true)
const tasks = ref<Task[]>([])
const error = ref<string | null>(null)

async function loadTasks() {
  try {
    const response = await fetch('../src/tasks/tasks.json')
    if (!response.ok) {
      throw new Error('Не удалось загрузить задачи')
    }
    tasks.value = await response.json()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Неизвестная ошибка'
    console.error('Ошибка загрузки задач:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  console.log('Jared Leto')
  loadTasks()
})
</script>
<template>
  <div class="container">
    <h1>Todo List</h1>
    <div v-if="loading">Загрузка задач...</div>
    <ul v-else class="task-list">
      <li v-for="(task, key) in tasks" :key="task.id">
        <input type="checkbox" :id="'task' + task.id" v-model="task.completed" />
        <label :for="'task' + task.id" :class="{ completed: task.completed }">
          {{ task.text }}
        </label>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.todo-app {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.add-task {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-task input {
  flex-grow: 1;
  padding: 8px;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
