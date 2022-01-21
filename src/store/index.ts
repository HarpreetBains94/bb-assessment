import Vue from 'vue'
import Vuex from 'vuex'
import { ActionContext } from 'vuex'

import { TodoItem } from '@/models/todo-item'

Vue.use(Vuex)


interface TodoListState {
  items: TodoItem[];
}

const state: TodoListState = {
  items: [],
}

const mutations = {
  addTodoItem(state: TodoListState, item: TodoItem): void {
    state.items.push(item);
  },
  updateTodoItem(state: TodoListState, item: TodoItem): void {
    const index = state.items.findIndex((todoItem: TodoItem) => item.id === todoItem.id);
    if (index >= 0) {
      state.items[index] = item;
    }
  }
}

const actions = {
  addNewTodoItem({ commit }: ActionContext<TodoListState, any>, item: TodoItem): void {
    commit('addTodoItem', item);
  },
  updateTodoItem({ commit }: ActionContext<TodoListState, any>, item: TodoItem): void {
    commit('updateTodoItem', item);
  },
}

const getters = {
  uncompletedItems: (state: TodoListState): TodoItem[] => state.items.filter((item: TodoItem) => !item.completed), 
  completedItems: (state: TodoListState): TodoItem[] => state.items.filter((item: TodoItem) => item.completed),
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})