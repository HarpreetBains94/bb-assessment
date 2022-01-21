<template>
  <div class="list-container">
    <div
      :class="{'pl-4': $vuetify.breakpoint.xs}"
      class="header-text"
    >To Do List</div>
    <v-divider class="pb-2 mt-2"/>
    <div
      :class="{'pl-4': $vuetify.breakpoint.xs}"
      class="completed-toggle"
      @click="onCompletedToggleClick"
    >
      <v-icon class="toggle-icon">{{ open ? 'mdi-menu-down' : 'mdi-menu-right'}}</v-icon>
      <div class="toggle-text">{{ completedItems.length + ' Done' }}</div>
    </div>
    <div
      v-if="open"
      :class="{'pl-4': $vuetify.breakpoint.xs}"
    >
      <TodoItemComponent
        v-for="item in completedItems"
        :key="item.id"
        :item="item"
      />
    </div>
    <v-divider class="pb-2 mt-2"/>
    <div :class="{'pl-4': $vuetify.breakpoint.xs}">
      <TodoItemComponent
        v-for="item in uncompletedItems"
        :key="item.id"
        :item="item"
      />
    </div>
    <div
      :class="{'px-4': $vuetify.breakpoint.xs}"
      class="add-item-container"
    >
      <v-text-field
        v-model="newItemTitle"
        label="A new To Do Item..."
        outlined
        dense
        class="pr-4"
      ></v-text-field>
      <v-btn
        color="#0080FF"
        :class="{'button-disabled' : !newItemTitle}"
        class="add-item-button white--text"
        @click="onAddItemClick"
      >
        Add Item
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { v4 as generateUuid } from 'uuid';
import { TodoItem } from '@/models/todo-item';
import TodoItemComponent from './TodoItemComponent.vue';

@Component({
  components: {
    TodoItemComponent,
  },
})
export default class TodoListComponent extends Vue {
  private open: boolean = false;
  private newItemTitle: string = '';

  private get completedItems(): TodoItem[] {
    return this.$store.getters['completedItems'];
  }

  private get uncompletedItems(): TodoItem[] {
    return this.$store.getters['uncompletedItems'];
  }

  private onCompletedToggleClick(): void {
    this.open = !this.open;
  }

  private onAddItemClick(): void {
    if (!this.newItemTitle) {
      return;
    }
    this.$store.dispatch('addNewTodoItem', {
      id: generateUuid(),
      text: this.newItemTitle,
      completed: false,
      date: new Date(Date.now()).toISOString(),
    });
    this.newItemTitle = '';
  }
}
</script>

<style scoped lang="scss">
$grey-dark-2: #121212;
$grey-light-1: #CCCCCC;

.list-container {
  max-width: 820px;
  margin: auto;
  padding: 30px 0px;
  height: 100%;
  position: relative;
}

.header-text {
  font-size: 28px;
  font-weight: bold;
  color: $grey-dark-2;
}

.completed-toggle {
  color: $grey-light-1 !important;
  height: 20px;
  display: inline-block;

  .toggle-icon {
    font-size: 18px;
    display: inline;
  }

  .toggle-text {
    font-size: 15px;
    line-height: 18px;
    display: inline;
  }
}

.add-item-container {
  position: absolute;
  bottom: 30px;
  left: 0px;
  right: 0px;
  display: flex;

  .add-item-button {
    &.button-disabled {
      background-color: $grey-light-1 !important;
      cursor: default !important;
    }
  }
}
</style>