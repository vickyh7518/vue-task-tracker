<template>
    <div>
        <div @dblclick="onToggle(task.id, task.reminder)" :class="[task.reminder ? 'reminder' : '', 'task']">
            <div>
                <h3>{{ task.text }}</h3>
                <p>{{ new Date( 1000 * (task.day + 8*3600) ).toISOString().split('T')[0] }} {{`${new Date(task.day * 1000).getHours()}:${new Date(task.day * 1000).getMinutes().toString().padStart(2,'0')}`}}</p>
            </div>
            <div class="controls">
                <i @click.stop="onDelete(task.id)" class="fas fa-trash"></i>
                <i @click.stop="toggleShowEdit()" class="fas fa-edit"></i>
            </div> 
        </div>
        <div v-show="showEditTask">
            <div class="modal">
                <EditTask :taskDetail="{id: task.id, text: task.text, day: task.day, reminder: task.reminder}"
                          @toggle-show-edit="toggleShowEdit"
                          @edit-task="editTaskInTask"
                 />
            </div>
        </div>
    </div>
</template>

<script>
import EditTask from './EditTask';

export default {
    name: 'Task',
    components: {
        EditTask,
    },
    data() {
        return {
            showEditTask: false,
        }
    },
    props: {
        task: Object,
    },
    methods: {
        onToggle(id, reminder) {
            this.$emit('toggle-task', id, reminder);
        },
        onDelete(id) {
            this.$emit('delete-task', id);
        },
        toggleShowEdit() {
            this.showEditTask = !this.showEditTask;
        },
        editTaskInTask(editTask) {
            this.$emit('edit-task-in-tasks', editTask);
        }
    },
    emits: ['edit-task-in-tasks'],
}
</script>
<style scoped>
    .modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    }
</style>