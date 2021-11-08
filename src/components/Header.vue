<template>
    <header>
        <h1>{{ title }}</h1>
        <Button
         @btn-click="$emit('toggle-show-add')"
         :text="showAddTask ? 'Close' : 'Add Task' "
         :color="showAddTask ? 'red' : 'green' " />
    </header>
</template>

<script>
    import Button from './Button';
    
    export default {
        name: 'Header',
        // props: ['title'],
        props: {
            title: String,
            showAddTask: Boolean,
            // default: 'Hello World' // default 有寫的話 <Header title='這裡就不用寫'/>
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