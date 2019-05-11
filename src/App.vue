<template>
  <div id="app">
    <Header/>
      <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import draggable from "vuedraggable";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    draggable
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.form-table {
  margin: 40px auto;
}

</style>
