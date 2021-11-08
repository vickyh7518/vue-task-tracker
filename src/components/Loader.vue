<template>
    <div class="loader"></div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .loader {
        border: 10px solid #f3f3f3;
        border-top: 10px solid #555;
        border-radius: 50%;
        width: 80px;
        height: 80px;
        animation: spin 1s linear infinite;
        margin: 50px auto;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>