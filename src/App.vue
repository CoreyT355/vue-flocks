<template>
  <div id="app">
    <v-sketch v-on="{setup}"></v-sketch>
  </div>
</template>

<script>
import Sketch from "./components/Sketch.vue";

export default {
  name: "app",
  components: {
    "v-sketch": Sketch
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
</style>
