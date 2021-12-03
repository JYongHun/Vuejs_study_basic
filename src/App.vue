<template>
  <div class="container">
    <Header @toggle-add-task="toggleAddTask" title="Task Tracker"
    :showAddTask="showAddTask"/>
    <!--v-show 해당 버튼을 클릭할때만 작성이 보이도록 함 -->
      <div v-show="showAddTask">
        <AddTask @add-task="addTask"/>
      </div>
    <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks"/>
    <!-- <Header /> -->
  </div>
  <!-- <div>
    <img alt="Vue logo" src="./assets/images/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div> -->
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Header from './components/common/Header.vue'
import Tasks from './components/Tasks.vue'
import AddTask from './components/AddTask.vue'

export default {
  name: 'App',
  components: {
    //HelloWorld
    Header,
    Tasks,
    AddTask,
  },
  data() {
    return {
      tasks: [],
      showAddTask: false
    }
  },

  methods: {
    //추가 버튼클릭시 보엿다 안보엿다하기
    toggleAddTask() {
      this.showAddTask = !this.showAddTask
    },

    //자식에서 받아서 함
    // addTask(task) {
    //   this.tasks = [...this.tasks, task]
    // },

    //서버에 통신하여 추가해보기
    async addTask(task) {
      const res = await fetch('api/tasks',{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(task)
      })

      const data = await res.json()

      this.tasks = [...this.tasks, data]
    },


    // deleteTask(id) {
    //   // console.log('task',id)
    //   //같은 아이디에 해당하는 목록 삭제
    //   if(confirm('정말 삭제?')) {
    //     this.tasks = this.tasks.filter((task) => task.id !== id)
    //   }
    // },

    async deleteTask(id) {

      if(confirm('정말 삭제?')) {

      const res = await fetch(`api/tasks/${id}`,{
        method: 'DELETE',
      })
      res.status === 200 ? this.tasks = this.tasks.filter((task) => task.id !== id) :
        alert('Error 삭제실패')

        //this.tasks = this.tasks.filter((task) => task.id !== id)
      }
    },

    // //더블클릭시 아이디를 가져온다
    // toggleReminder(id) {
    //   // console.log(id)
    //   //클릭시 reminder 모양 변화를 시킨다.
    //   this.tasks = this.tasks.map((task) => 
    //     task.id === id ? {...task, reminder: !task.reminder} : task
    //   )
    // },


    async toggleReminder(id) {
      
      const taskToToggle = await this.fetchTask(id)
      const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

      const res = await fetch(`api/tasks/${id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updTask)
      })

      const data = await res.json()

      this.tasks = this.tasks.map((task) => 
        task.id === id ? {...task, reminder: data.reminder} : task
      )
    },

    //api server 데이터 서버에서 받아오기 
    //http://localhost:3000/tasks
    async fetchTasks() {
      const res = await fetch('api/tasks')
      
      const data = await res.json()

      return data
    },

    //api server url param
    async fetchTask(id) {
      const res = await fetch(`api/tasks/${id}`)
      
      const data = await res.json()

      return data
    },
  },

  async created() {
    this.tasks = await this.fetchTasks()
  },
  
  //json-server로 변경
  // created() {
  //   //하드코딩
  //   this.tasks = [
  //     {
  //       id: 1,
  //       text: 'Doctors Appointment',
  //       day: 'March 1st at 2:30pm',
  //       reminder: true,
  //     },
  //     {
  //       id: 2,
  //       text: 'Meeting at School',
  //       day: 'March 3rd at 1:30pm',
  //       reminder: true,
  //     },
  //     {
  //       id: 3,
  //       text: 'Food Shopping',
  //       day: 'March 3rd at 11:00am',
  //       reminder: false,
  //     }
  //   ]
  // }
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
