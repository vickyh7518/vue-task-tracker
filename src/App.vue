<template>
  <div class="container">
    <Header
     @toggle-show-add="toggleShowAdd"
      title="Task Tracker"
      :showAddTask="showAddTask" />
    <div v-show="showAddTask">
      <AddTask @add-task="addTask" />
    </div>
    <Loader v-show="pending"/>
    <Tasks @toggle-task="toggleTask"
           @delete-task="deleteTask" 
           @edit-task="editTask"
           :tasks="tasks" />
  </div>

</template>

<script>
import AddTask from './components/AddTask';
import Header from './components/Header';
import Loader from './components/Loader';
import Tasks from './components/Tasks';
import TaskService from "./firebase/tasks";
import { Timestamp } from 'firebase/firestore';

export default {
  name: 'App',
  components: {
    Header,
    AddTask,
    Tasks,
    Loader,
  },
  data() {
    return {
      pending: true,
      tasks: [],
      showAddTask: false,
    }
  },
  methods: {
    toggleShowAdd() {
      this.showAddTask = !this.showAddTask;
    },
    addTask(newTask) {
      console.log('newTask', newTask);
      this.tasks = [
        ...this.tasks, 
        {
          text: newTask.text,
          day: Date.parse(newTask.day)/1000,
          reminder: newTask.reminder,
        }
      ];
      TaskService.create(newTask)
      .then( () => {
      })
    },
    toggleTask(id, reminder) {
      this.tasks = this.tasks.map(task => (task.id === id) ? { ...task, reminder: !task.reminder } : task)
      TaskService.update(id, { reminder: !reminder})
      .then( () => {
      })
    },
    deleteTask(id) {
      if (confirm('確定要刪除嗎？')) {
        this.tasks = this.tasks.filter(task => task.id !== id)
        TaskService.delete(id)
        .then( () => {
        })
      }
    },
    editTask(editTask) {
      const updateArr = {};
      this.tasks = this.tasks.map(task => {
        if (task.id === editTask.id) {
          for (let item in editTask) {
            if (item === 'text' || item === 'reminder') {
              if (editTask[item]) {
                // 更改 task 資訊
                task[`${item}`] = editTask[item];

                // 新增後續更新 firestore 物件 key value
                updateArr[`${item}`] = editTask[item];
              }
            } else if ( item === 'day') {
              if (editTask[item]) {
                console.log(Date.parse(editTask[item]) / 1000);
                const newDay = Date.parse(editTask[item]) / 1000;
                // 更改 task 資訊
                task[`${item}`] = newDay;

                // 新增後續更新 firestore 物件 key value
                updateArr[`${item}`] = Timestamp.fromDate(new Date(editTask[item]));
              }
            }
          }
          return task;
        } else {
          return task;
        }
      });
      console.log(updateArr);
      TaskService.update(editTask.id, updateArr)
      .then( () => {
      })
    }
  },
  created() {
    TaskService.getAll()
     .then( collectionSnapshot => {
       const docSnapshotArr = [];
       collectionSnapshot.docs.map( docSnapshot => {
          docSnapshotArr.push(
            {
              id: docSnapshot.id, 
              text: docSnapshot.data().text,
              day: docSnapshot.data().day.seconds,
              reminder: docSnapshot.data().reminder,
            }
          );
       })
       return docSnapshotArr;
     })
     .then( data => {
       this.tasks = data;
       this.pending = false;
     })
  },
  updated() {
    console.log('updated');
  },
  
}
    
</script>

<style>
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