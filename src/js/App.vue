<template>
  <div id="app" class="app-viewport">
    <main-header></main-header>
    <div class="container">
      <input-pane></input-pane>
      <chord-list-pane></chord-list-pane>
    </div>
  </div>
</template>

<script>
import store from './store';
import MainHeader from './components/MainHeader.vue';
import InputPane from './components/InputPane.vue';
import ChordListPane from './components/ChordListPane.vue';

export default {
  store,
  components: {
    MainHeader,
    InputPane,
    ChordListPane
  }
};
</script>

<style>
/* html,
body,
.app-viewport {
  height: 100%;
  overflow: hidden;
}

.app-viewport {
  display: flex;
  flex-flow: column;
} */
</style>

<style scoped>
.container {
  margin: 20px;
}
</style>

