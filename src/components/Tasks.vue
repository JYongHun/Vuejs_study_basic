<template>
  <div :key="task.id" v-for="task in tasks">
    <!-- <h3>{{ task.text}}</h3> -->
    <Task :task="task" />
  </div>
</template>

<script>
import Task from './Task.vue'

export default {
  name: 'Tasks',
  props: {
    tasks: Array
  },
  components: {
    Task
  }
}
</script>