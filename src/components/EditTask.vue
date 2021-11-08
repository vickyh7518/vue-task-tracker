<template>
    <form @submit.prevent="onSubmit(); toggleShowEdit();" class="edit-form">
        <i @click="toggleShowEdit(); resetInput()" class="fas fa-times"></i>
        <div class="form-control">
            <label>Task Name</label>
            <input type="text"
                   v-model="text"
            />
        </div>
        <div class="form-control">
            <label>Day &amp; Time</label>
            <input 
                type="datetime-local"
                v-model="day"
                name="day"
            />
        </div>
        <div class="form-control form-control-check">
            <label>Set Reminder</label>
            <input type="checkbox" v-model="reminder" name="reminder" />
        </div>

        <input type="submit" value="Save Task" class="btn btn-block" />
    </form>
</template>
<script>
export default {
    name: 'EditTask',
    props: {
        taskDetail: {
            type: Object,
        },
    },
    data() {
        return {
            id: this.$props.taskDetail.id,
            text: this.$props.taskDetail.text,
            day: new Date( 1000 * (this.$props.taskDetail.day + 8*3600) ).toISOString().split(':00.')[0],
            reminder: this.$props.taskDetail.reminder,
        }
    },
    methods: {
        toggleShowEdit() {
            this.$emit('toggle-show-edit');
        },
        resetInput() {
            this.id = this.$props.taskDetail.id;
            this.text = this.$props.taskDetail.text;
            this.day = new Date( 1000 * (this.$props.taskDetail.day + 8*3600) ).toISOString().split(':00.')[0];
            this.reminder = this.$props.taskDetail.reminder;
        },
        onSubmit() {
            this.text = (this.text === this.$props.taskDetail.text) ? null : this.text;
            this.day = (this.day === new Date( 1000 * (this.$props.taskDetail.day + 8*3600) ).toISOString().split(':00.')[0]) ? null : this.day;
            this.reminder = (this.reminder === this.$props.taskDetail.reminder) ? null : this.reminder;
            const editTask = {
                id: this.id,
                text: this.text,
                day: this.day,
                reminder: this.reminder,
            }
            this.$emit('edit-task', editTask);
        },
    },
}
</script>
<style scoped>
    .edit-form {
        background-color: #fefefe;
        margin: 10% auto;
        padding: 3% 10%;
        border: 1px solid #888;
        width: 60%;
        -webkit-animation-name: fadeIn;
        animation-name: fadeIn;
    }
    .form-control {
        margin: 20px 0;
    }
    .form-control label {
        display: block;
    }
    .form-control input {
        width: 100%;
        height: 40px;
        margin: 5px;
        padding: 3px 7px;
        font-size: 17px;
    }
    .form-control-check {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .form-control-check label {
        flex: 1;
    }
    .form-control-check input {
        flex: 2;
        height: 20px;
    }
    .edit-form i {
        cursor: pointer;
        float: right;
    }
</style>