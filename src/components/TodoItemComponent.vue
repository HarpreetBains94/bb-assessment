<template>
  <v-list-item
    dense
    :two-line="true"
    @click="onToggleClick"
  >
    <v-icon
      :class="{ 'completed': item.completed }"
      class="item-icon"
    >
      {{ item.completed ? 'mdi-checkbox-blank-circle' : 'mdi-checkbox-blank-circle-outline' }}
    </v-icon>
    <img
      v-if="item.completed"
      :src="checkSvg"
      class="completed-check"
    />
    <v-list-item-content class="pl-6 py-0">
      <div
        :class="{ 'completed': item.completed }"
        class="item-title"
      >{{ item.text }}</div>
      <div class="item-date">{{ formattedDate }}</div>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { format } from 'date-fns';
import { TodoItem } from '@/models/todo-item';

@Component
export default class TodoItemComponent extends Vue {
  @Prop() item!: TodoItem;

  private onToggleClick(): void {
    this.item.completed = !this.item.completed;
    this.$store.dispatch('updateTodoItem', this.item)
  }

  private get formattedDate(): string {
    const date: Date = new Date(this.item.date);
    return format(date, 'LLLL, do, yyyy')
  }

  private get checkSvg(): any {
    return require('@/assets/check.svg')
  }
}
</script>

<style scoped lang="scss">
$blue-light: #41A0FF;
$grey-dark-2: #121212;
$grey-dark-1: #AAAAAA;

.item-icon {
  position: absolute !important;
  height: 24px;
  top: 15px !important;
  left: 0px !important;

  &.completed {
    color: $blue-light;
  }
}

.item-title {
  font-size: 15px;
  color: $grey-dark-2;

  &.completed {
    text-decoration: line-through;
    color: $grey-dark-1;
  }
}

.item-date {
  font-size: 13px;
  color: $grey-dark-1;
}

.completed-check {
  position: absolute;
  top: 22px;
  left: 6px;
  filter: invert(1);
}
</style>
