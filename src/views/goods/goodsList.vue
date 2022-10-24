<template>
    <div>
        goodsList
    </div>
</template>
<script>

export default {
    name: "goodsList",
    data() {
        return {

        }
    },
    created(){
        this.checkIfLogin();
    },
    methods:{
        checkIfLogin(){
            console.log(user);
            if(null == user){
                this.$router.push({
                    path:'/'
                });
            }
        }
    }
}
</script>