<template>
    <!-- <div v-show="showAddTask">
        <AddTask @add-task="addTask"/>
      </div> -->

    <!--div를 제거하여 사용함  -->
    <AddTask 
        v-show="showAddTask" 
        @add-task="addTask"/>

    <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks"/>
</template>

<script>
import Tasks from '../components/Tasks.vue'
import AddTask from '../components/AddTask.vue'

export default {
    name: 'Home',
    props: {
    showAddTask: Boolean,
    },
    components: {
        Tasks,
        AddTask,
    },

    //양놈아저씨가 실수한 부분
    // data: {
    //     tasks: [],
    // },
    data() {
        return {
            tasks: [],
        }
    },



    

    methods: {
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



}
</script>