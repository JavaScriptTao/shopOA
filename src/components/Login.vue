<template>
    <div class="login-ctn">
        <div class="center">
            <div class="title-login">
                千灯里商家OA系统111
            </div>
            <div class="phone-box">
                <p class="label"> 用户名</p>
                <el-input style='width:80%; margin-left:20px; border: 0px solid; background-color:rgba(255, 255, 255, .5);' v-model="loginMsg.number" placeholder="请输入用户名"></el-input>
            </div>
            <div class="phone-box">
                <p class="label"> 密码</p>
                <el-input style='width:80%; margin-left:20px; border: 0px solid; background-color:rgba(255, 255, 255, .5);' type="password" v-model="loginMsg.pswd" placeholder="请输入密码"></el-input>
            </div>
            <div class="login-btn-wrap">
                <el-button style="width:75%;" @click="loginClick" class="login-btn" type="danger" :loading="isLoading">{{loginTitle}}</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isLoading: {
            type: Boolean
        },
        loginTitle: {
            type: String
        }
    },
    data() {
        return {
            title: 'login',
            loginMsg: {}
        }
    },
    methods: {
        loginClick() {
            this.$emit('postLogin', this.loginMsg)
        }
    }
}
</script>

<style>
.login-ctn {
    width: 100%;
    height: 100%;
    background-image: url('../images/bg.jpg');
    background-repeat: no-repeat;
    background-position-y: 50%;
    background-position-x: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.center {
    width: 36%;
    height: 36%;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
    padding: 35px 35px 15px 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.title {
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    font-size: 44px;
    color: #fff;
}

.input-box {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(99, 99, 99);
    font-size: 14px;
}

.input-box .el-input {
    width: 48%;
}

.title-login {
    font-size: 18px;
    color: #ff5660;
    margin: 0px auto 40px;
    font-weight: 800;
}

.phone-box {
    width: 100%;
    color: #595961;
    display: flex;
    height: 53px;
    align-items: center;
}

.label {
    width: 60px;
    display: flex;
    /* justify-content: flex-end; */
    font-size: 14px;
}

.login-btn-wrap {
    height: 100px;
    display: flex;
    align-items: center;
    margin-top: 40px;
    justify-content: flex-end;
    width: 100%;
}
</style>

