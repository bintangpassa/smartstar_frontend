<template>
<div class="container my-5">
    <div class="row">
        <div class="col-12 col-sm-4 offset-sm-4">
            <div class="card">
                <div class="card-header">
                <h5>Registration Form</h5>
                </div>
                <form @submit.prevent="register">
                    <div class="card-body text-start">
                        <div class="mb-3">
                            <label for="registerInputEmail" class="form-label">Email address</label>
                            <input v-model="postRegister.email" type="email" class="form-control" id="registerInputEmail" placeholder="name@example.com">
                            <div v-if="validationRegister.email" class="mt-2 alert alert-danger">
                                {{ validationRegister.email[0] }}
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="registerInputPassword" class="form-label">Password</label>
                            <input v-model="postRegister.password" type="password" class="form-control" id="registerInputPassword" placeholder="type your Password here..">
                            <div v-if="validationRegister.password" class="mt-2 alert alert-danger">
                                {{ validationRegister.password[0] }}
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="registerInputPasswordC" class="form-label">Password Confimartion</label>
                            <input v-model="postRegister.password_confirmation" type="password" class="form-control" id="registerInputPasswordC" placeholder="Re-type your Password here..">
                            <div v-if="validationRegister.password_confirmation" class="mt-2 alert alert-danger">
                                {{ validationRegister.password_confirmation[0] }}
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="registerInputSchname" class="form-label">School name</label>
                            <input v-model="postRegister.schname" type="text" class="form-control" id="registerInputSchname" placeholder="type your school name here..">
                            <div v-if="validationRegister.schname" class="mt-2 alert alert-danger">
                                {{ validationRegister.schname[0] }}
                            </div>
                        </div><div class="mb-3">
                            <label for="registerInputCode" class="form-label">Voucher code</label>
                            <input v-model="postRegister.code" type="text" class="form-control" id="registerInputCode" placeholder="type your voucher code here..">
                            <div v-if="validationRegister.code" class="mt-2 alert alert-danger">
                                {{ validationRegister.code[0] }}
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button type="submit" class="btn w-100 bps-btn-3">Submit</button>
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
        url_backend: process.env.VUE_APP_BACKEND_ENDPOINT,
        loggedIn: localStorage.getItem("loggedIn"),
        postRegister: [],
        validationRegister: [],
        useremail: localStorage.getItem("useremail"),
        userrole: localStorage.getItem("role"),
      }
    },

    methods: {
        register() {
            let email   = this.postRegister.email
            let password   = this.postRegister.password
            let password_confirmation   = this.postRegister.password_confirmation
            let schname = this.postRegister.schname
            let code = this.postRegister.code
            axios.post(this.url_backend+'/api/register', {
            email: email,
            password: password,
            schname: schname,
            password_confirmation: password_confirmation,
            code:code
            }).then(res => {
                this.postRegister.schname = '';
                this.validationRegister = '';
                localStorage.setItem("loggedIn", "true")
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("role", res.data.user.role)
                localStorage.setItem("useremail", res.data.user.email)
                this.useremail=res.data.user.email
                this.userrole=res.data.user.role
                this.loggedIn = true
                return this.$router.push({ name: 'console' })
            }).catch(error => {
                this.validationRegister = error.response.data
                console.log(error.response);
            })
        }
    },

    mounted() {
        if(this.loggedIn) {
          return this.$router.push({ name: 'console' })
        }
    },
}
</script>