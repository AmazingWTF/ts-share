<template>
  <li class="todo-item" :class="{done: todo.done}">
    <a-checkbox :checked="todo.done" @change="toggleTodo"/>
    <a-input
      v-show="isEditting"
      v-model="todo.label"
      @keyup.enter="save(todo)"
    />
    <span v-show="!isEditting" style="padding: 0 10px; flex: 1; text-align: left">{{ todo.label }}</span>
    <a-icon v-show="!isEditting" type="edit" @click="editTodo" />
    <a-icon v-show="isEditting" type="close" @click="cancel" />
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

export interface Todo {
  label: string;
  done: boolean;
}

@Component({
  name: 'TodoItem'
})
export default class extends Vue {
  // 这里要使用 !: 赋值，表明，否则报错(因为没赋值，)
  @Prop({ default: { label: '马什么梅啊？', done: false } }) private todo!: Todo;
  @Prop({ default: -1 }) private isEditting!: boolean;

  private editedLabel = ''

  private editTodo () {
    if (this.todo.done) return
    this.$emit('edit', this.todo)
  }

  private cancel () {
    this.$emit('cancel')
  }

  private save () {
    this.$emit('save')
  }

  private toggleTodo () {
    this.todo.done = !this.todo.done
  }
}
</script>

<style lang="less">
  .todo-item {
    display: flex;
    align-items: center;
    height: 30px;
    line-height: 30px;
    box-sizing: content-box;
    padding: 5px;
    margin: 10px;
    box-shadow: 0px 3px 5px 0 rgba(0, 0, 0, 0.2);
    &.done {
      filter: grayscale(100%) opacity(.4);
    }
    input {
      width: 1px;
      flex: 1;
    }
    i {
      width: 40px;
    }
  }
</style>
