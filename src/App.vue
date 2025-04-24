<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Task } from './types/common.ts'

const tasks = ref<Task[]>([])
const error = ref<string | null>(null)

// Загрузка начальных задач
const loadInitialTasks = async (): Promise<void> => {
  try {
    const response = await fetch('/tasks.json')
    if (!response.ok) throw new Error('Не удалось загрузить задачи')
    tasks.value = await response.json()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Неизвестная ошибка'
    console.error('Ошибка загрузки задач:', err)
  }
}

// Переключение статуса задачи
const toggleTaskStatus = (task: Task): void => {
  task.completed = !task.completed
  saveTasks()
}

// Сохранение задач в localStorage
const saveTasks = (): void => {
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
}

// Загрузка при монтировании компонента
onMounted(() => {
  const savedTasks = localStorage.getItem('tasks')
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks)
  } else {
    loadInitialTasks()
  }
})
</script>

<template>
  <div class="container">
    <h1>Todo List</h1>

    <ul class="task-list">
      <li v-for="task in tasks" :key="task.id">
        <input
          type="checkbox"
          :id="'task' + task.id"
          v-model="task.completed"
          @change="saveTasks"
        />
        <label
          :for="'task' + task.id"
          :class="{ completed: task.completed }"
          @click="toggleTaskStatus(task)"
        >
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

.task-list label {
  cursor: pointer;
}

.completed {
  text-decoration: line-through;
  color: #888;
  opacity: 0.6;
}
</style>
