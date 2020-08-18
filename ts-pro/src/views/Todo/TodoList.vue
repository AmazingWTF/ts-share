<template>
  <a-card bordered style="width: 400px; margin: 40px auto">
    <a-radio-group v-model="showType">
      <a-radio-button
        v-for="(type, key) in filters"
        :key="key"
        :value="key"
      >{{ key }}</a-radio-button>
    </a-radio-group>
    <ul>
      <todo-item
        v-for="(todo, index) in shownTodos"
        :key="index"
        :todo="todo"
        :isEditting="isEdittingIndex === index"
        @edit="changeTodo(index)"
        @cancel="cancelEdit"
        @save="saveChange"
      />
    </ul>
    <a-button type="primary" @click="addTodo">添加待办</a-button>
  </a-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import TodoItem, { ITodo } from './TodoItem.vue'

const filters: { [key: string]: Function } = {
  all: (todos: ITodo[]) => todos,
  active: (todos: ITodo[]) => todos.filter((todo) => !todo.done),
  completed: (todos: ITodo[]) => todos.filter((todo) => todo.done)
}

const defaultTasks = [{
  label: '大爷，',
  done: false
}, {
  label: '楼上是',
  done: false
}, {
  label: '马冬梅家吗',
  done: true
}]

const slogans = ['小声点', '你吵到我用', 'TNT了！']

@Component({
  name: 'TodoList',
  components: { TodoItem }
})
export default class extends Vue {
  @Watch('showType', { immediate: true })
  private onShowTypeChange (value: string) {
    const index = Object.keys(this.filters).findIndex(k => k === value)
    this.$message.warn(slogans[index])
  }

  private todos = defaultTasks;

  private showType = 'all';

  private isEdittingIndex = -1;

  get filters () {
    return filters
  }

  get allTodos () {
    return filters.all(this.todos)
  }

  get activeTodos () {
    return filters.active(this.todos)
  }

  get completedTodos () {
    return filters.completed(this.todos)
  }

  get shownTodos () {
    return filters[this.showType](this.todos)
  }

  private toggleTodo () {
    // todo.done = !todo.done
  }

  private toggleALl (done: boolean) {
    this.todos.forEach(todo => {
      todo.done = done
    })
  }

  private changeTodo (index: number) {
    this.isEdittingIndex = index
  }

  private saveChange () {
    this.$message.success('编辑成功')
    this.isEdittingIndex = -1
  }

  private cancelEdit () {
    this.isEdittingIndex = -1
  }

  private addTodo () {
    this.todos.push({
      label: '马什么梅啊',
      done: false
    })
  }
}
</script>

<style lang="less">
  ul {
    list-style: none;
    padding: 0;
  }
</style>
