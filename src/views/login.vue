<template>
<div class="container mt-5" style="min-height:470px;">
    <div class="row">
        <div class="col-12 col-sm-4 offset-sm-4">
            <div class="card">
                <div class="card-header">
                <h5>Please Login</h5>
                </div>
                <form @submit.prevent="login">
                <div class="card-body text-start">
                    <div v-if="infoLogin" class="mt-2 alert alert-danger">
                        {{ infoLogin }}
                    </div>
                    <div class="mb-3">
                    <label for="loginInputEmail" class="form-label">Email address</label>
                    <input v-model="postLogin.email" type="email" class="form-control" id="loginInputEmail" placeholder="name@example.com">
                    <div v-if="validationLogin.email" class="mt-2 alert alert-danger">
                        {{ validationLogin.email[0] }}
                    </div>
                    </div>
                    
                    <div class="mb-3">
                    <label for="loginInputPassword" class="form-label">Password</label>
                    <input v-model="postLogin.password" type="password" class="form-control" id="loginInputPassword" placeholder="type your Password here..">
                    <div v-if="validationLogin.password" class="mt-2 alert alert-danger">
                        {{ validationLogin.password[0] }}
                    </div>
                    </div>
                </div>
                <div class="card-footer">
                    <button type="submit" class="btn w-100 bps-btn-3">Login</button>
                </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Login',

    data() {
      return {
        postLogin: [],
        validationLogin: [],
        infoLogin: null,
        url_backend: process.env.VUE_APP_BACKEND_ENDPOINT
      }
    },

    methods: {
        getLoggedIn () {
            this.loggedIn = localStorage.getItem("loggedIn")
        },
      login() {
        console.log(this.url_backend)
        let email   = this.postLogin.email
        let password   = this.postLogin.password
        let schcode = this.postLogin.schcode
        axios.post(this.url_backend+'/api/login', {
            email: email,
            password: password,
            schcode: schcode,
        }).then(res => {
            this.validationLogin.value = '';
            localStorage.setItem("loggedIn", "true")
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("role", res.data.user.role)
            localStorage.setItem("useremail", res.data.user.email)
            this.loggedIn = true
            return this.$router.push({ name: 'console' })
        }).catch(error => {
            switch (error.response.status) {
                case 400:
                    this.validationLogin = error.response.data
                    break;
                case 401:
                    this.infoLogin = error.response.data.message[0]
                    console.log(error.response.data.message)
                    break;
                default:
                    this.infoLogin = 'failed'
                    break;
            }
        })
      }
    },

    watch: {
      loggedIn () {
        if(this.loggedIn) {
          return this.$router.push({ name: 'console' })
        }
      },
      $route: {
        immediate: true,
        handler() {
          this.getLoggedIn()
        }
      }
    },
    mounted() {
        if(this.loggedIn) {
          return this.$router.push({ name: 'console' })
        }
    },
}
</script>