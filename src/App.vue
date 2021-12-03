<template>
  <div class="container">
    <Header @toggle-add-task="toggleAddTask" title="Task Tracker"
    :showAddTask="showAddTask"/>
    <!--v-show 해당 버튼을 클릭할때만 작성이 보이도록 함 -->

    <!--아래 코드 view home 으로 이동-->
      <!-- <div v-show="showAddTask">
        <AddTask @add-task="addTask"/>
      </div>
    <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks"/> -->
    
    <!-- :콜론을 적어서 시동기를 걸어준다 -->
    <router-view :showAddTask="showAddTask"></router-view>
    <Footer />
  </div>
  <!-- <div>
    <img alt="Vue logo" src="./assets/images/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div> -->
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Header from './components/common/Header.vue'
import Footer from './components/common/Footer.vue'


export default {
  name: 'App',
  components: {
    //HelloWorld
    Header,
    Footer,
  },
  data() {
    return {
      // tasks: [],
      showAddTask: false
    }
  },

  methods: {
    //추가 버튼클릭시 보엿다 안보엿다하기
    toggleAddTask() {
      this.showAddTask = !this.showAddTask
    },
  }
}
</script>

<style>

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Poppins', sans-serif;
}
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>
