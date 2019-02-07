<template>
    <div class="notes">
        <div v-if="nickName == ''">
            <div class="card" style="width: 18rem;">
                <div class="card d-flex justify-content-center">
                    <div class="card-body">
                        <h5 class="card-title">Choose a nick</h5>
                        <input class="form-control" type="text" v-on:keyup.enter="enterNickName();" v-model="auxName" pattern="^[a-zA-Z0-9-_\.]{1,20}$"> <br>
                        <button type="button" class="btn btn-success" v-on:click="enterNickName();">Enter</button>
                    </div>
                </div>   
            </div>
        </div>
        <div v-else>
            <!-- TITLE -->
            <section class="container">
                <div class="row">
                    <div class="col" style="text-align:center;">
                        <h1>Tasks Manager</h1>
                    </div>
                </div>
            </section>
            
            <div class="dropdown-divider bg-secondary"></div>
            
            <!-- START UP LAYOUT AND INFO -->
            <section class="container">
                <!-- NEW TASK -->
                <div class="row">
                    <div class="col-md-9 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text bg-secondary text-white" id="inputGroup-sizing-default">New Task</span>
                            </div>
                            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="What do you want to do?" v-on:keyup.enter="newTask" v-model="textNewTask" id="newTaskOrder">
                        </div>
                    </div> 
                    <div class="col-md-2 offset-md-1 col-12">
                        <button type="button" class="btn btn-secondary btn-block" v-on:click="newTask">Create</button>
                        <br>
                    </div>        
                </div>
                
                <!-- TASKS INFO -->
                <div class="row  justify-content-md-start">
                    <div class="col-sm-12 col-md-auto">
                        <small>
                            <span><img src="../assets/tasks.svg" alt="" height="16px" width="auto">{{ taskToDo() }} pending tasks of a total of {{ tasks.length }} | </span>
                            <span class="text-warning" v-on:click="deleteCompletedTasks"><img src="../assets/erase.svg" alt="" height="20px" width="auto"><b>Delete completed tasks</b></span>
                        </small>
                    </div>
                </div>
            </section>

            <div class="dropdown-divider bg-secondary"></div>
            <br>

            <div class="row">
                <div class="col-12" style="text-align:center;">
                    <h2>Tasks</h2>
                </div>
                <div class="col-12">
                    <ul>
                        <transition-group name="custom-classes-transition" 
                            enter-active-class="animated bounceInLeft"
                            leave-active-class="animated bounceOutRight">

                            <li v-for="task in priorityFilter" v-bind:key="task" style="list-style:none;">
                                <div class="row justify-content-between">
                                    <div class="col-auto">
                                        <div class="row">
                                            <div class="col-auto">
                                                <span v-if="task.status"><img src="../assets/completed.svg" alt="" height="50px" width="auto" style="float:left;" class="svg" v-on:click="changeToIncomplete(task)"></span>
                                                <span v-else><img src="../assets/incompleted.svg" alt="" height="50px" width="auto" style="float:left;" v-on:click="changeToComplete(task)"></span>
                                            </div>
                                            <div class="col-auto">
                                                <div class="row">
                                                    <!-- ORDER -->
                                                    <!-- VARIABLE {{ task.order }} -->
                                                    <div>
                                                        <h3 v-if="task.status" class="text-success">{{ task.order }}</h3>
                                                        <h3 v-else>{{ task.order }}</h3>
                                                    </div>               
                                                </div>
                                                <div class="row">
                                                    <small>
                                                        <!-- PRIORITY -->
                                                        <span>Priority: </span>
                                                        
                                                        <!-- VARIABLE {{ task.priority }} -->
                                                        <span>
                                                            <!-- LOW -->
                                                            <button v-if="task.priority == 'Low'" type="button" class="btn btn-primary btn-sm"><img src="../assets/down.svg" alt="" height="11px" width="auto">Low</button>
                                                            <button v-else type="button" class="btn btn-secondary btn-sm" v-on:click="changeToLow(task)"><img src="../assets/down.svg" alt="" height="11px" width="auto">Low</button>
                                                            <span>&nbsp;</span>

                                                            <!-- MEDIUM -->
                                                            <button v-if="task.priority == 'Medium'" type="button" class="btn btn-warning btn-sm">Medium</button>
                                                            <button v-else type="button" class="btn btn-secondary btn-sm" v-on:click="changeToMedium(task)">Medium</button>
                                                            <span>&nbsp;</span>

                                                            <!-- HIGH -->
                                                            <button v-if="task.priority == 'High'" type="button" class="btn btn-danger btn-sm">High<img src="../assets/up.svg" alt="" height="11px" width="auto"></button>
                                                            <button v-else type="button" class="btn btn-secondary btn-sm" v-on:click="changeToHigh(task)">High<img src="../assets/up.svg" alt="" height="11px" width="auto"></button>
                                                            <span>&nbsp;</span>
                                                        </span>
                                                        <span>&nbsp;&nbsp;<img src="../assets/watch.svg" alt="" height="20px" width="auto"> Date: {{ task.date }} </span>
                                                        <span>&nbsp;&nbsp;<img src="../assets/author.svg" alt="" height="20px" width="auto"> Author: {{ task.user }}</span>
                                                    </small>
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                        <div class="row">
                                            <div class="col-auto">
                                                <img src="../assets/delete.svg" alt="" height="50px" width="auto" style="float:left;" class="svg" v-on:click="deleteTask(task)">                                
                                            </div>
                                            <div class="col-1"></div> 
                                        </div>
                                    </div>    
                                </div>                     
                            </li>

                        </transition-group>
                    </ul>
                </div>
            </div>

            <br>
            <div class="dropdown-divider bg-secondary"></div>
            <br>

            <!-- TASK SEEKER -->
            <section class="container">
                <div class="col-12" style="text-align:center;">
                    <h2>Tasks Seeker</h2>
                </div>
                <br>
                <div class="col-12">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-secondary text-white" id="inputGroup-sizing-default">Task to Find</span>
                        </div>
                        <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="What do you want to find?" v-model="textFindTask">
                    </div>
                </div>         
                <div class="col-12">
                    <ul>
                        <transition-group name="custom-classes-transition" 
                            enter-active-class="animated fadeIn"
                            leave-active-class="animated fadeOut">

                            <li v-for="task in filteredTask" v-bind:key="task" style="list-style:none;">
                                <div class="row justify-content-between">
                                    <div class="col-auto">
                                        <div class="row">
                                            <div class="col-auto">
                                                <span v-if="task.status"><img src="../assets/completed.svg" alt="" height="50px" width="auto" style="float:left;" class="svg" v-on:click="changeToIncomplete(task)"></span>
                                                <span v-else><img src="../assets/incompleted.svg" alt="" height="50px" width="auto" style="float:left;" v-on:click="changeToComplete(task)"></span>
                                            </div>
                                            <div class="col-auto">
                                                <div class="row">
                                                    <!-- ORDER -->
                                                    <!-- VARIABLE {{ task.order }} -->
                                                    <div>
                                                        <h3 v-if="task.status" class="text-success">{{ task.order }}</h3>
                                                        <h3 v-else>{{ task.order }}</h3>
                                                    </div>               
                                                </div>
                                                <div class="row">
                                                    <small>
                                                        <!-- PRIORITY -->
                                                        <span>Priority: </span>
                                                        
                                                        <!-- VARIABLE {{ task.priority }} -->
                                                        <span>
                                                            <!-- LOW -->
                                                            <button v-if="task.priority == 'Low'" type="button" class="btn btn-primary btn-sm"><img src="../assets/down.svg" alt="" height="11px" width="auto">Low</button>
                                                            <button v-else type="button" class="btn btn-secondary btn-sm" v-on:click="changeToLow(task)"><img src="../assets/down.svg" alt="" height="11px" width="auto">Low</button>
                                                            <span>&nbsp;</span>

                                                            <!-- MEDIUM -->
                                                            <button v-if="task.priority == 'Medium'" type="button" class="btn btn-warning btn-sm">Medium</button>
                                                            <button v-else type="button" class="btn btn-secondary btn-sm" v-on:click="changeToMedium(task)">Medium</button>
                                                            <span>&nbsp;</span>

                                                            <!-- HIGH -->
                                                            <button v-if="task.priority == 'High'" type="button" class="btn btn-danger btn-sm">High<img src="../assets/up.svg" alt="" height="11px" width="auto"></button>
                                                            <button v-else type="button" class="btn btn-secondary btn-sm" v-on:click="changeToHigh(task)">High<img src="../assets/up.svg" alt="" height="11px" width="auto"></button>
                                                            <span>&nbsp;</span>
                                                        </span>
                                                        <span>&nbsp;&nbsp;<img src="../assets/watch.svg" alt="" height="20px" width="auto"> Date: {{ task.date }} </span>
                                                        <span>&nbsp;&nbsp;<img src="../assets/author.svg" alt="" height="20px" width="auto"> Author: {{ task.user }}</span>
                                                    </small>
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                        <div class="row">
                                            <div class="col-auto">
                                                <img src="../assets/delete.svg" alt="" height="50px" width="auto" style="float:left;" class="svg" v-on:click="deleteTask(task)">                                
                                            </div>
                                            <div class="col-1"></div> 
                                        </div>
                                    </div>    
                                </div> 
                            </li>

                        </transition-group>
                    </ul>        
                </div>
            </section>

            <br>
            <div class="dropdown-divider bg-secondary"></div>
            <br>

            <!-- TASKS DIVIDED BY STATUS -->
            <section class="container">
                <div class="col-12" style="text-align:center;">
                    <h2>Tasks Status</h2>
                </div>
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Completed</a>
                        <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Incompleted</a>
                    </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <ul>
                            <li v-for="task in tasks" v-bind:key="task" style="list-style:none;">
                                <h3 v-if="task.status">{{ task.order }}</h3>
                            </li>
                        </ul>
                    </div>
                    <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                        <ul>
                            <li v-for="task in tasks" v-bind:key="task" style="list-style:none;">
                                <h3 v-if="task.status == false">{{ task.order }}</h3>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>      

            <!-- NOT SHOWING, CHECKBOX GROUP, ORDER BY STATUS -->
            <!-- <div class="row">
                <div class="col-2">
                    <input type="checkbox" id="completed" value="Completed" v-model="checkedStatus">
                    <label for="jack">Completed Tasks</label>
                    <br>
                    <input type="checkbox" id="incompleted" value="Incompleted" v-model="checkedStatus"> 
                    <label for="john">Incompleted Tasks</label>
                </div>
                <div class="col-auto">
                    <ul>
                        <li v-for="auxTask in checkedTask">
                            <h3>{{ auxTask.order }}</h3>
                            <p>Priority: {{ auxTask.priority }}</p>
                            <p>Date: {{ auxTask.date }}</p>
                            <p>Status: 
                                <span v-if="auxTask.status">Completed</span>
                                <span v-else>Not Completed</span>
                            </p>
                        </li>
                    </ul>
                </div>
            </div> -->
            <br>
        </div>      
    </div>
</template>

<script>
    export default {
        name: 'Notes',
        props: [],
        data: function() {
            return{
                tasks: [
                    // EXAMPLE DATA
                    // {
                    //     order: "Take the dog out",
                    //     priority: "High",
                    //     date: new Date().toLocaleString(),
                    //     status: true
                    // },
                    // {
                    //     order: "Clean the dishes",
                    //     priority: "Low",
                    //     date: new Date().toLocaleString(),
                    //     status: false
                    // }
                ],
                auxName: "",
                nickName: "",
                textNewTask: "",
                textFindTask: "",
                // checkedStatus: [], // USED FOR THE CHECKBOX, NOT USED AT THE MOMENT
                auxTasks: [],
                priorityTasks: [],
                show: true
            }
        },
        sockets: {
            connect: function () {
                console.log('Socket connected');
            },
            allTasks: function (data) {
                this.tasks = JSON.parse(data);
            },
            newUser: function (data) {
                this.$notify({
                    group: 'foo',
                    title: data + ' has logged in',
                    text: 'Say hello!'
                });
            },
            userLogOff: function (data) {
                this.$notify({
                    group: 'foo',
                    title: data + ' has logged off',
                    text: 'See you soon!'
                });
            },
            userMadeNewTask: function (data) {
                this.$notify({
                    group: 'foo',
                    title: 'New task created by ' + data.user,
                    text: data.order,
                    type: 'success'
                });
            },
            userDeleteTask: function (data) {
                this.$notify({
                    group: 'foo',
                    title: 'Task deleted by ' + data.user,
                    text: data.order,
                    type: 'warn'
                });
            }
        },
        methods: {
            // CHOSE A NAME
            enterNickName: function(){
                this.nickName = this.auxName;
                this.$socket.emit("enterNickName", this.nickName);
            },
            // MAKE A NEW TASK
            newTask: function(){
                if(this.textNewTask != ""){
                    var order = this.textNewTask;
                    var date = new Date().toLocaleString(); // .toLocaleString()
                    var priority = "Medium";
                    var status = false;
                    var user = this.nickName;
                    this.tasks.push({order, date, priority, status, user});
                }
                this.textNewTask = "";
                // ALL TASKS ARRAY
                this.$socket.emit("allTasks", JSON.stringify(this.tasks));
                // NEW TASK ADVICE
                var taskCreated = {
                    user: user,
                    order: order
                }
                this.$socket.emit('userMadeNewTask', taskCreated);
                this.$notify({
                    group: 'foo',
                    title: 'Task created',
                    type: 'success'
                });
            },

            // FIND ALL TASKS THAT CONTAIN THE ENTERED TEXT, BETTER USE THE COMPUTED OPTION
            // findTask: function(event){
            //     if(this.textFindTask != ""){
            //         var findOrder = this.textFindTask;
            //         return this.tasks.filter((findOrder)=>{
            //             return this.tasks.order.indexOf(findOrder) > -1;
            //         });
            //     }
            // },

            // RETURN ALL THE INCOMPLETED TASKS
            taskToDo: function(){
                var count = 0;
                for(let i=0; i<this.tasks.length; i++){
                    if(this.tasks[i].status == false){  
                        count++;
                    }
                }
                return count;
                this.$socket.emit("allTasks", JSON.stringify(this.tasks));
            },

            // DELETE THE SELECTED TASKS
            deleteTask: function(task){
                for(let i=0; i<this.tasks.length; i++){
                    if(this.tasks[i] == task){
                        // DELETED TASK ADVICE
                        this.$socket.emit('userDeleteTask', task);
                        this.$notify({
                            group: 'foo',
                            title: 'Task deleted',
                            type: 'warn'
                        });

                        this.tasks.splice(i, 1);
                    }
                }
                this.$socket.emit("allTasks", JSON.stringify(this.tasks));
            },

            // CHANGE THE PRIORITY OF THE SELECTED TASKS TO LOW
            changeToLow: function(task){
                task.priority = "Low";
                this.$socket.emit("allTasks", JSON.stringify(this.tasks));
            },

            // CHANGE THE PRIORITY OF THE SELECTED TASKS TO MEDIUM
            changeToMedium: function(task){
                task.priority = "Medium";
                this.$socket.emit("allTasks", JSON.stringify(this.tasks));
            },

            // CHANGE THE PRIORITY OF THE SELECTED TASKS TO HIGH
            changeToHigh: function(task){
                task.priority = "High";
                this.$socket.emit("allTasks", JSON.stringify(this.tasks));
            },

            // CHANGE THE STATUS OF THE SELECTED TASKS TO COMPLETE
            changeToComplete: function(task){
                task.status = true;
                this.$socket.emit("allTasks", JSON.stringify(this.tasks));
            },

            // CHANGE THE STATUS OF THE SELECTED TASKS TO INCOMPLETE
            changeToIncomplete: function(task){
                task.status = false;
                this.$socket.emit("allTasks", JSON.stringify(this.tasks));
            },

            // DELETE ALL COMPLETED TASKS
            deleteCompletedTasks: function(){
                for(let i=this.tasks.length-1; i=>0; i--){
                    if(this.tasks[i].status == true){
                        this.tasks.splice(i, 1);
                    }
                }
                this.$socket.emit("allTasks", JSON.stringify(this.tasks));
            }
        },
        computed: {
            // USED FOR CHOOSE COMPLETED OR INCOMPLETED TASKS, DEPENDS ON THE CHECKBOXX
            // NOT USED AT THE MOMENT
            // checkedTask: function(){
            //     this.auxTasks = [];
            //     for(let j=0; j<this.checkedStatus.length; j++){
            //         if(this.checkedStatus[j] == "Completed"){
            //             for(let i=0; i<this.tasks.length; i++){
            //                 if(this.tasks[i].status == true){
            //                     this.auxTasks.push(this.tasks[i]);
            //                 }
            //             }
            //         }
            //         if(this.checkedStatus[j] == "Incompleted"){
            //             for(let i=0; i<this.tasks.length; i++){
            //                 if(this.tasks[i].status == false){
            //                     this.auxTasks.push(this.tasks[i]);
            //                 }
            //             }
            //         }
            //     }
            //     return this.auxTasks;
            // },

            // FIND ALL TASKS THAT CONTAIN THE ENTERED TEXT
            filteredTask: function() {
                if(this.textFindTask == "" || this.textFindTask == " "){
                    return "";
                }else{
                    return this.tasks.filter(task => {
                        return task.order.toLowerCase().indexOf(this.textFindTask.toLowerCase()) > -1;
                    }); 
                }              
            },

            // ORDER YOUR TASKS BY THE PRIORITY OF THEM (HIGH - MEDIUM - LOW)
            priorityFilter: function(){
                this.priorityTasks = [];
                for(let i=0; i<this.tasks.length; i++){
                    if(this.tasks[i].priority == "High"){
                        this.priorityTasks.push(this.tasks[i]);
                    }
                }
                for(let i=0; i<this.tasks.length; i++){
                    if(this.tasks[i].priority == "Medium"){
                        this.priorityTasks.push(this.tasks[i]);
                    }
                }
                for(let i=0; i<this.tasks.length; i++){
                    if(this.tasks[i].priority == "Low"){
                        this.priorityTasks.push(this.tasks[i]);
                    }
                }
                return this.priorityTasks;
            }
        },

        // START MOUNTING YOUR LOCALSTORAGE, IF THE LOCALSTORAGE IS NOT NULL, USING SERVER SO NOT WORKING ATM
        mounted: function(){
            // this.tasks = JSON.parse(localStorage.getItem("tasks"));
            // if (localStorage.getItem("tasks") != null) {
			// 	this.tasks = JSON.parse(localStorage.getItem("tasks"));
			// }
        },

        // UPDATE YOUR LOCAL STORAGE AFTER EVERY SINGLE CHANGE
        updated: function(){
            // localStorage.setItem("tasks",JSON.stringify(this.tasks));
        }  
    }
</script>

<style>
    #presentation{
        text-align: center;
    }
    
    li{
        margin: 20px 0;
    }

    span button{
        width: auto;
        font-size: 10px !important;
    }

    li h3::first-letter {
        text-transform: uppercase;
    }
</style>