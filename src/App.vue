<template>
  <div id="app">
    <v-app class="application">
      <div class="list-component-container">
        <TodoListComponent/>
      </div>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TodoListComponent from './components/TodoListComponent.vue';

@Component({
  components: {
    TodoListComponent,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
.application {
  height: 100vh;
  width: 100vw;
}

.list-component-container {
  width: 100%;
}

.v-application--wrap {
  flex-direction: unset !important;
}
</style>
