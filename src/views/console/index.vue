<template>
    <h2 class="mt-5 fw-bold1 mb-5">CONSOLE</h2>
    <div class="container pb-5">
        <div class="card shadow">
            <div class="card-body p-0">
                <div class="row text-start">
                    <div class="col-3 p-0" style="background-color:#4592d4;">
                        <div class="d-flex flex-column">
                            <div v-if="userrole === 'adm'" @click="changemenu(1)" class="side-menu">Invite a Teacher</div>
                            <div v-if="userrole === 'adm'" @click="changemenu(2)" class="side-menu">Invite a Student</div>
                            <div v-if="userrole === 'adm'" @click="changemenu(3)" class="side-menu">Manage User List</div>
                            <div v-if="userrole === 'tch' || userrole === 'std'" @click="changemenu(4)" class="side-menu">View All Users</div>
                            <div v-if="userrole === 'tch' || userrole === 'std'" @click="changemenu(5)" class="side-menu">Chatting</div>
                        </div>
                    </div>
                    <div class="col-9 px-5 py-5">
                        <div  v-if="menu === 1"  class="row py-3">
                            <div class="col-12">
                                <form @submit.prevent="inviteteacher">
                                <h4 class="text-center">Invite a teacher</h4>
                                <div class="text-center">Please enter email to be invited</div>
                                <div class="my-4" style="width:100%; background-color:#dedede; height:2px; border-radius:5px;"></div>
                                <div v-if="invTeacherInfo" class="mt-2 alert alert-info">
                                    {{ invTeacherInfo }}
                                </div>
                                <div class="mb-3">
                                    <label for="inviteInputEmail" class="form-label">Teacher email address</label>
                                    <input v-model="invTeacherEmail" type="email" class="form-control" id="inviteInputEmail" placeholder="name@example.com">
                                </div>
                                <button type="submit" class="btn w-100 bps-btn-3">Invite Teacher</button>
                                </form>
                            </div>
                        </div>
                        <div  v-if="menu === 2"  class="row py-3">
                            <div class="col-12">
                                <form @submit.prevent="invitestudent">
                                <h4 class="text-center">Invite a student</h4>
                                <div class="text-center">Please enter email to be invited</div>
                                <div class="my-4" style="width:100%; background-color:#dedede; height:2px; border-radius:5px;"></div>
                                <div v-if="invStudentInfo" class="mt-2 alert alert-info">
                                    {{ invStudentInfo }}
                                </div>
                                <div class="mb-3">
                                    <label for="inviteInputEmail" class="form-label">Student email address</label>
                                    <input v-model="invStudentEmail" type="email" class="form-control" id="inviteInputEmail" placeholder="name@example.com">
                                </div>
                                <button type="submit" class="btn w-100 bps-btn-3">Invite Student</button>
                                </form>
                            </div>
                        </div>
                        <div  v-if="menu === 3"  class="row py-3">
                            <div class="col-12">
                                <h4 class="text-center">User List of your school</h4>
                                <div class="my-4" style="width:100%; background-color:#dedede; height:2px; border-radius:5px;"></div>
                                <div class="row">
                                    <div class="col-sm-6 col-12">
                                        <div class="fw-bold1">Teachers</div>
                                        <ul class="list-group mt-2">
                                            <li v-for="th in teacherList" :key="th.email" class="list-group-item">
                                                {{ th.email }} - <span @click="deleteTeacher(th.id)" class="text-danger float-right delete-button">delete</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="col-sm-6 col-12">
                                        <div class="fw-bold1">Students</div>
                                        <ul class="list-group mt-2">
                                            <li v-for="th in studentList" :key="th.email" class="list-group-item">
                                                {{ th.email }} - <span @click="deleteStudent(th.id)" class="text-danger float-right delete-button">delete</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div  v-if="menu === 4"  class="row py-3">
                            <div class="col-12">
                                <h4 class="text-center">User List of your school</h4>
                                <div class="my-4" style="width:100%; background-color:#dedede; height:2px; border-radius:5px;"></div>
                                <div class="row">
                                    <div class="col-sm-6 col-12">
                                        <div class="fw-bold1">Teachers</div>
                                        <ul class="list-group mt-2">
                                            <li v-for="th in teacherList" :key="th.email" class="list-group-item">
                                                {{ th.email }}
                                            </li>
                                        </ul>
                                    </div>
                                    <div v-if="userrole === 'tch'" class="col-sm-6 col-12">
                                        <div class="fw-bold1">Students</div>
                                        <ul class="list-group mt-2">
                                            <li v-for="th in studentList" :key="th.email" class="list-group-item">
                                                {{ th.email }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div  v-if="menu === 5"  class="row py-3">
                            <div class="col-12">
                                <h4 class="text-center">Chatting App</h4>
                                <div class="my-4" style="width:100%; background-color:#dedede; height:2px; border-radius:5px;"></div>
                                <div class="row">
                                    <div class="col-sm-5">
                                        <div class="fw-bold1">User</div>
                                        <ul class="list-group mt-2">
                                            <li @click="gochat(th.email)" v-for="th in userChatList" :key="th.email" class="list-group-item userchat">
                                                {{ th.email }} <span :ref="th.email" :id="th.email" class="badge bg-success"></span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="col-sm-7">
                                        <div class="fw-bold1">Chat</div>
                                        <div class="card mt-2">
                                            <div class="card-header">
                                                {{ chatuseractive }}
                                            </div>
                                            <div class="card-body p-3 kotak-chat">
                                                <div v-for="chat in chatactive" :key="chat.who" class="">
                                                    <div  v-if="chat.who === 'm'" class="text-end mb-2">
                                                        <div class="chat-bub-m">
                                                            {{ chat.msg }}
                                                        </div>
                                                    </div>
                                                    <div  v-if="chat.who === 't'" class="text-start mb-2">
                                                        <div class="chat-bub-t">
                                                            {{ chat.msg }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-footer d-flex">
                                                <input v-model="chatmsg" type="text" class="form-control me-2" placeholder="text here ..">
                                                <button @click="sendchat" class="btn bps-btn-3 px-4">send</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import SocketioService from '../../services/socketio.service.js';
export default {
    name: 'Console',

    created() {
        SocketioService.setupSocketConnection();
        SocketioService.socket.on(localStorage.getItem("useremail"), (data, sender) => {
            this.getchat(data, sender);
        });
    },
    
    beforeUnmount() {
        SocketioService.disconnect();
    },

    data() {
      return {
        url_backend: process.env.VUE_APP_BACKEND_ENDPOINT,
        loggedIn: localStorage.getItem("loggedIn"),
        menu: 0,
        userrole: localStorage.getItem("role"),
        invTeacherEmail: null,
        invStudentEmail: null,
        invTeacherInfo: null,
        invStudentInfo: null,
        token: localStorage.getItem('token'),
        teacherList: [],
        studentList: [],
        userChatList: [],
        chatuseractive: '-',
        chatmsg: '',
        chatactive: []
      }
    },

    watch: {
        teacherList(){
            this.userChatList = this.teacherList.concat(this.studentList)
        },
        studentList(){
            this.userChatList = this.teacherList.concat(this.studentList)
        }
    },

    methods: {
        changemenu (a) {
            this.menu = a;
            switch (a) {
                case 3:
                    this.getTeacherList()
                    this.getStudentList()
                    break;
                case 4:
                    this.getTeacherList()
                    this.getStudentList()
                    break;
                case 5:
                    this.getTeacherList()
                    this.getStudentList()
                    this.userChatList = this.teacherList.concat(this.studentList)
                    break;
                default:
                    break;
            }
        },
        inviteteacher() {
            let email   = this.invTeacherEmail
            axios.post(this.url_backend+'/api/invite-teacher', {
                email: email,
            },{
                headers: {'Authorization': 'Bearer '+this.token},
            }).then(res => {
                this.invTeacherInfo = email+' successfully invited'
                this.invTeacherEmail = null
                console.log(res);
            }).catch(error => {
                this.invTeacherInfo = error.response.data;
                console.log(error.response.data);
            })
        },
        invitestudent() {
            let email   = this.invStudentEmail
            axios.post(this.url_backend+'/api/invite-student', {
                email: email,
            },{
                headers: {'Authorization': 'Bearer '+this.token},
            }).then(res => {
                this.invStudentInfo = email+' successfully invited'
                this.invStudentEmail = null
                console.log(res);
            }).catch(error => {
                this.invStudentInfo = error.response.data;
                console.log(error.response.data);
            })
        },
        getTeacherList() {
            axios.get(this.url_backend+'/api/teacher-list', {
                headers: {'Authorization': 'Bearer '+this.token},
            }).then(res => {
                this.teacherList = res.data
            }).catch(error => {
                console.log(error.response.data);
            })
        },
        getStudentList() {
            axios.get(this.url_backend+'/api/student-list', {
                headers: {'Authorization': 'Bearer '+this.token},
            }).then(res => {
                this.studentList = res.data
            }).catch(error => {
                console.log(error.response.data)
            })
        },
        gochat(a) {
            this.chatuseractive = a
            this.chatmsg = ''
            if(localStorage.getItem("chat_"+this.chatuseractive)!=null){
                this.chatactive = localStorage.getItem("chat_"+this.chatuseractive)
                this.chatactive = JSON.parse(this.chatactive)
            } else { 
                this.chatactive = []
            }
            this.$refs[a].innerText = '';
        },
        sendchat() {
            if (this.chatmsg != '') {
                SocketioService.sendchat(this.chatuseractive, this.chatmsg, localStorage.getItem('useremail'))
                this.chatactive.push({who:'m', msg:this.chatmsg})
                let store = JSON.stringify(this.chatactive)
                localStorage.setItem("chat_"+this.chatuseractive, store)
                this.chatmsg = ''
            }
        },
        getchat(data, sender) {
            let cr = JSON.parse(localStorage.getItem("chat_"+sender))
            if (cr == null){
                cr = []
            }
            cr.push({who:'t', msg:data})
            cr = JSON.stringify(cr)
            localStorage.setItem("chat_"+sender, cr)
            if (this.chatuseractive === sender) {
                this.chatactive = JSON.parse(localStorage.getItem("chat_"+sender))
            }
            this.$refs[sender].innerText = 'New Chat';
            // this.chatactive.push({who:'t', msg:data})
            // console.log(data+' '+sender);
        },
        deleteTeacher(a) {
            axios.post(this.url_backend+'/api/delete-teacher', {
                id: a,
            },{
                headers: {'Authorization': 'Bearer '+this.token},
            }).then(res => {
                this.getTeacherList()
                console.log(res);
            }).catch(error => {
                console.log(error.response.data);
            })
        },
        deleteStudent(a) {
            axios.post(this.url_backend+'/api/delete-student', {
                id: a,
            },{
                headers: {'Authorization': 'Bearer '+this.token},
            }).then(res => {
                this.getStudentList()
                console.log(res);
            }).catch(error => {
                console.log(error.response.data);
            })
        }
    },

    mounted() {
        if(!this.loggedIn) {
          return this.$router.push({ name: 'login' })
        }
    },
}
</script>

<style>
    .side-menu {
        color: rgb(255, 255, 255);
        font-weight: 600;
        font-size: 1.1rem;
        padding: 1.5rem;
    }
    .side-menu:hover {
        background-color: #3c67ae;
    }
    .userchat:hover {
        background-color: aquamarine;
        cursor: pointer;
    }
    .chat-bub-m {
        background-color: #4594d6;
        display: inline-block;
        padding: 5px;
        color: azure;
        font-weight: 600;
        border-radius: .5rem;
    }
    .chat-bub-t {
        background-color: #302574;
        display: inline-block;
        padding: 5px;
        color: azure;
        font-weight: 600;
        border-radius: .5rem;
    }
    .kotak-chat {
        height: auto;
        max-height: 500px;
        min-height: 200px;
        overflow-y: scroll;
        overscroll-behavior-y: contain;
        scroll-snap-type: y proximity;
    }
    .kotak-chat > div:last-child {
        scroll-snap-align: end;
    }
    .delete-button {
        cursor: pointer;
    }
</style>