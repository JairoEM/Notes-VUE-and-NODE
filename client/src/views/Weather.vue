<template>
    <div id="weather">
        <br>

        <section class="container">
            <div class="row">
                <div class="col-12" style="text-align:center;">
                    <h1>Weather Status</h1>
                </div>
            </div>
            <div class="dropdown-divider bg-secondary"></div>
            <br>
            <div class="row">
                <div class="col-md-9 col-12">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-secondary text-white" id="inputGroup-sizing-default">City</span>
                        </div>
                        <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="Where are you?" v-on:keyup.enter="findCity" v-model="cityName">
                    </div>
                </div> 
                <div class="col-md-2 offset-md-1 col-12">
                    <button type="button" class="btn btn-secondary btn-block" v-on:click="findCity">Find It</button>
                    <br>
                </div>        
            </div>
            <div class="dropdown-divider bg-secondary"></div>
            <br>
            <div class="row">
                <div class="col-12" style="text-align:center;">
                    <h3>City Info</h3>
                </div>
            </div>

            <div class="row">
                <div class="col-2 offset-1">
                    <h5>Name:</h5>
                </div>
                <div class="col-8 offset-1">
                    <h5>{{ posts.name }}</h5>
                </div>
            </div>
            
            <div class="row">
                <div class="col-2 offset-1">
                    <h5>Weather:</h5>
                </div>
                <div class="col-8 offset-1">
                    <h5>{{ posts.weather[0].main }}</h5>
                </div>
            </div>

            <div class="row">
                <div class="col-2 offset-1">
                    <h5>Temperature:</h5>
                </div>
                <div class="col-8 offset-1">
                    <h5>{{ posts.main.temp }} ºKelvin</h5>
                </div>
            </div>

            <div class="row">
                <div class="col-2 offset-1">
                    <h5>Humidity:</h5>
                </div>
                <div class="col-8 offset-1">
                    <h5>{{ posts.main.humidity }}%</h5>
                </div>
            </div>

            <div class="row">
                <div class="col-2 offset-1">
                    <h5>Wind:</h5>
                </div>
                <div class="col-8 offset-1">
                    <h5>{{ posts.wind.speed }}km/h</h5>
                </div>
            </div>
        </section> 
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            posts: [],
            errors: [],
            cityName: ""
        }
    },
    methods: {
        findCity: function(){
            axios.get("http://api.openweathermap.org/data/2.5/weather?q="+ this.cityName +"&?units=metric&APPID=9788b3a9af1cfc6b792c28f70bea4579")
            .then(response => {
                // JSON responses are automatically parsed.
                this.posts = response.data
            })
                .catch(e => {
                this.errors.push(e)
            })
        }
    },

    created() {
        axios.get("http://api.openweathermap.org/data/2.5/weather?q=Granada&?units=metric&APPID=9788b3a9af1cfc6b792c28f70bea4579")
        .then(response => {
            // JSON responses are automatically parsed.
            this.posts = response.data
        })
            .catch(e => {
            this.errors.push(e)
        })
    }
}
</script>