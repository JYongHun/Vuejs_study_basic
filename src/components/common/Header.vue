<template>
  <header>
    <!-- <h1>Task Tracker</h1> -->
    <h1>{{ title }}</h1>
    
    <!--버튼에 상태를 가져와서 효과를 변경할수있음 -->
    <Button 
      @btn-click="$emit('toggle-add-task')" 
      :text="showAddTask ? 'Close' : 'Add Task'" 
      :color="showAddTask ? 'red' : 'green'"/>

    <!-- <Button text="Update Task" color="blue"/>
    <Button text="Delete Task" color="red"/> -->
  </header>
</template>

<script>
import Button from './Button.vue'

  export default {
    name: 'Header',
    // props: ['title'],
    props: {
      // title : {
      //   type: String,
      //   default: 'Hello world',
      // }
      title : String,
      showAddTask: Boolean,
    },
    components: {
      Button,
    },
  }
</script>

<style scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
</style>