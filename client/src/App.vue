<template>
  <div id="app">

    <!-- NAVIGATOR -->
    <div id="nav">
      <nav class="navbar navbar-expand-lg navbar-light bg-dark">
        <a class="navbar-brand"><router-link to="/"><img src="./assets/logoNote.png" alt="" id="logoNote"> Home</router-link></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link"><router-link to="/weather">Weather</router-link><span class="sr-only">(current)</span></a>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <br>

    <!-- MAIN CONTENT -->
    <section class="container"><router-view/></section>
    
    <br>

    <!-- FOOTER -->
    <Footer></Footer>
  </div>
</template>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  #logoNote {
    height: 50px;
    width: auto;
  }
  a {
    text-align: left;
    text-decoration: none !important;
  }
</style>

<script>
// @ is an alias to /src
import Footer from './components/Footer.vue'

export default {
    name: 'home',
        components: {
            Footer
        }
    }
</script>