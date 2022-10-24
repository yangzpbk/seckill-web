<template>
    <div class="childComponent">
        {{info}}
    </div>
</template>

<script>
export default {
    props: {
        info: { type: Object }
    }
}
</script>
<style>
.childComponent{
    width: 200px;
    height: 200px;
    background-color: brown;
}
</style>