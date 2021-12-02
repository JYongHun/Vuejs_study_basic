<template>
  <div>
    <!--데이터에 따라서 다이나믹 스타일 적용 -->
    <!-- toggle-reminder onDelete대신 사용하는거 같은데.. 함수로 관리해가지고 -->
    <div @dblclick="$emit('toggle-reminder', task.id)" :class="[task.reminder ? 'reminder' : '', 'task']">
      <h3>{{ task.text }}
        <i @click="$emit('delete-task',task.id)" class="fas fa-times"></i>
        <!-- <i @click="onDelete(task.id)" class="fas fa-times"></i> -->
      </h3>
      
        <p>{{ task.day }}</p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Task',
    props: {
        task: Object,
    },
    methods: {
      onDelete(id) {
        console.log(id)
        //삭제
        this.$emit('delete-task', id)
      },
    },
}
</script>

<style scope>
.fas {
  color: red;
}

.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.task.reminder {
  border-left: 5px solid green;
}
.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>