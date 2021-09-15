<template>
  <nav class="navbar navbar-static fixed-top bg-white navbar-expand-lg navbar-light shadow">
      <div class="container">
          <a class="navbar-brand" href="#">
              <router-link :to="{name: 'landingpage'}"><img height="50" src="@/assets/smartstar.png" alt=""></router-link>
              
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              </ul>
              <div class="d-flex">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                      <li v-if="loggedIn" class="nav-item px-sm-3">
                        <router-link :to="{name: 'console'}" class="btn bps-clr-2 fw-bold1">Console</router-link>
                      </li>
                      <li v-if="loggedIn" class="nav-item px-sm-3">
                        <div @click="logout()" class="btn bps-clr-2 fw-bold1">Logout <span class="small bps-clr-grey-4">({{useremail}} - {{userrole}})</span></div>
                      </li>
                      <li v-if="!loggedIn" class="nav-item px-sm-3">
                        <router-link :to="{name: 'register'}" class="btn bps-clr-2 fw-bold1">Register</router-link>
                      </li>
                      <li v-if="!loggedIn" class="nav-item px-sm-3">
                        <router-link :to="{name: 'login'}" class="btn bps-clr-2 fw-bold1">Login</router-link>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  </nav>

  <router-view></router-view>

  <div class="container-fluid p-5" style="background: linear-gradient(233.37deg, #302574 23.58%, #4DBEFB 122.91%);">
    <div class="row">
        <div class="col-sm-4 col-12">
            <img height="50" src="@/assets/smartstar1.png" alt="">
            <img height="50" src="@/assets/smartstar.jpg" alt="">
        </div>
        <div class="col-sm-8 col-12 text-white text-start m-auto">© 2021 SmartStar. All rights reserved. Managed by Bintang Passa</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    name: 'App',

    data() {
      return {
        url_backend: process.env.VUE_APP_BACKEND_ENDPOINT,
        loggedIn: localStorage.getItem("loggedIn"),
        useremail: localStorage.getItem("useremail"),
        userrole: localStorage.getItem("role"),
      }
    },

    methods: {
      getLoggedIn () {
        this.loggedIn = localStorage.getItem("loggedIn")
        this.useremail=localStorage.getItem("useremail")
        this.userrole=localStorage.getItem("role")
      },
      logout () {
        let token = localStorage.getItem('token')
        localStorage.removeItem("loggedIn")
        localStorage.removeItem("token")
        this.loggedIn = false
        axios.get(this.url_backend+'/api/logout', {
          headers: {'Authorization': 'Bearer '+token}
        }).catch(error => {
          console.log(error.response.data)
        })
      }
    },

    watch: {
      loggedIn () {
        if(!this.loggedIn) {
          return this.$router.push({ name: 'landingpage' })
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
        this.useremail=localStorage.getItem("useremail")
        this.userrole=localStorage.getItem("role")
    },
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap');
  #app {
    font-family: 'Source Sans Pro', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-size: 14px;
    padding-top: 4.7rem;
  }

  .bps-clr-white {
    color: #fff !important;
  }

  .bps-clr-1 {
    color: #031633 !important;
  }
  .bps-clr-2 {
    color: #052c65 !important;
  }
  .bps-clr-3 {
    color: #084298 !important;
  }
  .bps-clr-4 {
    color: #0a58ca !important;
  }
  .bps-clr-5 {
    color: #0d6efd !important;
  }

  .bps-clr-grey-4 {
    color: #78859b !important;
  }

  .fw-bold1 {
    font-weight: 600;
  }

  .bps-btn-1 {
    background-color: #fff !important;
    color: #0fb0f8 !important;
    font-weight: 600 !important;
    padding: 1rem 2rem 1rem 2rem !important;
  }
  .bps-btn-1:hover {
    background-color: #0fb0f8  !important;
    color: #fff !important;
  }
  .bps-btn-2 {
    /* background-color: #fff !important; */
    /* box-sizing: border-box !important;
    -moz-box-sizing: border-box !important;
    -webkit-box-sizing: border-box !important; */
    outline: 2px #fff solid !important;
    outline-offset: -2px;
    color: #fff !important;
    font-weight: 600 !important;
    padding: 1rem 1rem 1rem 1rem !important;
  }
  .bps-btn-2:hover {
    background-color: #fff  !important;
    color: #0fb0f8 !important;
    padding: 1rem 1rem 1rem 1rem !important;
  }

  .bps-btn-3 {
    background-color: #0fb0f8 !important;
    color: #fff !important;
  }
</style>
