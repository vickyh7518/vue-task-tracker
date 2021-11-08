<template>
    <div :key="task.id" v-for="task in tasks">
        <!-- task 跟 :task 差別 -->
        <!-- task : 未綁定v-bind的情況下，內部元件props依然可以接受資料，任何值傳入到內部元件props都會是string的型別。 -->
        <!-- :task : 有綁定v-bind就會依據外部元件data的num型別，內部也會顯示該型別。 -->
        <Task
         v-on:toggle-task="$emit('toggle-task', task.id, task.reminder)"
         v-on:delete-task="$emit('delete-task', task.id)"
         v-on:edit-task-in-tasks="editTaskInTasks"
         :task="task" />
    </div>
</template>

<script>
import Task from './Task.vue';

export default {
    name: 'Tasks',
    props: {
        tasks: Array,
    },
    components: {
        Task,
    },
    methods: {
        editTaskInTasks(editTask) {
          this.$emit('edit-task', editTask);
        }
    },
    emits: ['toggle-task', 'delete-task', 'edit-task']
}
</script>

<style scope>
.fa-edit, .fa-trash {
  color: gray
}
.fa-edit:hover {
  color: black;
}
.fa-times:hover, .fa-trash:hover {
  color: red;
}
.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}
.task.reminder {
  border-left: 5px solid green;
}
.task .controls {
  display: flex;
  flex-direction: column;
  justify-content:  space-evenly;
}
</style>