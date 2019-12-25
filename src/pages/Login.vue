<template>
    <Login @postLogin = 'postLogin' :isLoading = 'isLoading' :loginTitle = 'loginTitle'></Login>
</template>

<script>
import Login from '@/components/Login'

import api from '../utils/api'

export default {
    components:{
        Login
    },
    data(){
        return {
            loginTitle:'登陆',
            isLoading: false
        }
    },
    methods:{
        postLogin(e){
          
            if (e && e.number && e.pswd) {
                this.isLoading = !this.isLoading;
                this.loginTitle = '登陆中...';
                let params = {
                    url:'/site/login',
                    form:{
                        username: e.number,
                        password: e.pswd
                    }
                }
                api.postSiteLogin(params).then(( res )=>{
                    if (res.status === 200) {
                        if (res.data.code === 200) {
                            this.loginTitle = '登陆成功';
                            this.isLoading = !this.isLoading;                           
                            window.localStorage.setItem('token', res.data.data.access_token)
                            this.$router.push('/home')  
                        } else {
                            this.loginTitle = '登陆';
                            this.isLoading = !this.isLoading;
                            this.$message(`${res.data.message}`);
                        }
                    } else {

                       this.$message('网络出现问题，请稍后重试！');
                    }
                    
                })

            } else {
                this.$message('请输入用户名和密码！');
            }   
           
        }
    },
    created(){
       
    }
}
</script>

<style>

</style>
