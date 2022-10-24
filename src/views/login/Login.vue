<template>
  <div class="hello">
    <el-row>
      <img src="@/assets/logo.png" />
    </el-row>
    <h1>{{ msg }}</h1>

    <el-row>
      <el-form :model="loginForm" label-position="right" status-icon :rules="rules" ref="loginForm" label-width="100px">
        <el-row type="flex" justify="center">
          <el-form-item label="账号" prop="account">
            <el-input v-model="loginForm.account">
            </el-input>
          </el-form-item>
        </el-row>

        <el-row type="flex" justify="center">
          <el-form-item label="密码" prop="password">
            <!-- <el-input :type="passwd" v-model="loginForm.password" auto-complete="new-password">
                <i slot="suffix" :class="icon" @click="showPass"></i>
              </el-input> -->
            <el-input v-model="loginForm.password">
              <!-- <i slot="suffix" :class="icon" @click="showPass"></i> -->
            </el-input>
          </el-form-item>
        </el-row>
      </el-form>
    </el-row>

    <el-row>
      <el-button type="info" @click="resetForm">重置</el-button>
      <el-button type="success" @click="loginSubmit">提交</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      msg: 'Welcome to Your SecKill App',
      icon: "el-input__icon el-icon-view",
      passwd: "password",
      loginForm: {
        password: "",
        account: ""
      },
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 制造混淆的密码
          var salt = "ayzbyzp123";
          var inputPass = salt.charAt(0) + this.loginForm.password + salt.charAt(1) + salt.charAt(3);
          // console.log(inputPass);
          var password = this.$md5(inputPass);

          const inParam = {
            data: {
              account: this.loginForm.account,
              password: password
            }
          }
          this.$post(this.secKillApi.common.toLogin, { ...inParam }).then(r => {
            // console.log(r);
            if (r.data.code !== 200) {
              this.$message.error("错误信息：" + r.data.message);
              return;
            }
            this.$message.success("登录成功：" + r.data.message);
            this.$router.push({
              path: "/user/userList"
            })
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    /**
     * 重置表单
     */
    resetForm() {
      this.$refs.loginForm.resetFields();
    },
    /**
     * 展示密码
     */
    showPass() {
      //点击图标是密码隐藏或显示
      if (this.passwd == "text") {
        this.passwd = "password";
        //更换图标
        this.icon = "el-input__icon el-icon-view";
      } else {
        this.passwd = "text";
        this.icon = "el-input__icon el-icon-loading";
      };
    }
  }
}
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
</style>
