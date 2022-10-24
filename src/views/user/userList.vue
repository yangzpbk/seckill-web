<!--
 * @Author: yangzp
 * @Description: 
 * @Date: 2022-10-13 16:28:36
 * @FilePath: \trade-web\src\views\user\userList.vue
-->
<template>
    <div>
        <h1 class="animate__animated animate__swing">用户管理列表</h1>
        <el-row class="animate__animated animate__rubberBand" type="flex" justify="center">
            <el-col :span="20">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="id" label="id" width="180" />
                    <el-table-column prop="nickname" label="姓名" width="180" />
                    <el-table-column prop="password" label="密码" />
                    <el-table-column prop="salt" label="盐" />
                    <el-table-column prop="registerDate" label="注册日期" />
                    <el-table-column prop="lastLoginDate" label="最后登录日期" />
                    <el-table-column prop="loginCount" label="登录次数" />
                </el-table>
            </el-col>
        </el-row>
        <!-- <el-row>
            <route-info :info="fatherInfo"></route-info>
        </el-row> -->
    </div>
</template>
<script>
import routeInfo from "@/common/routeinfo.vue"
import Routeinfo from "../../common/routeinfo.vue";
export default {
    name: "goodsList",
    components: {
        routeInfo,
        Routeinfo
    },
    data() {
        return {
            tableData: [],
            fatherInfo: {
                attrValues: {
                    key: 1,
                    value: 2
                }
            }
        }
    },
    mounted() {
        this.qryUserList();
    },
    methods: {
        qryUserList() {
            const param = {};
            this.$post(this.secKillApi.user.queryUserList, { ...param }).then(r => {
                // console.log(r);
                if (r.data.code != 200) {
                    this.$message.error("错误信息：" + r.data.message);
                    return;
                }
                this.tableData = r.data.outData;
            })
        }
    }
}
</script>