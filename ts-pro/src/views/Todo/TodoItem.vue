<template>
  <li class="todo-item" :class="{done: todo.done}">
    <a-radio :checked="todo.done"/>
    <a-input
      v-show="isEditting"
      v-model="todo.label"
      @keyup.enter="editTodo(todo)"
    />
    <span v-show="!isEditting" style="padding: 0 10px; flex: 1; text-align: left">{{ todo.label }}</span>
    <a-icon v-show="!isEditting" type="edit" @click="isEditting = true" />
    <a-icon v-show="isEditting" type="close" @click="isEditting = false" />
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
  @Prop({ default: { label: '马什么梅啊？', done: false } }) private todo!: Todo;
  // @Prop({ default: false }) private isEditting!: boolean;
  private isEditting = false

  private editedLabel = ''

  private editTodo () {
    this.$emit('edit', this.todo)
    this.isEditting = false
  }
}
</script>

<style lang="less">
  .todo-item {
    display: flex;
    align-items: center;
    height: 30px;
    line-height: 30px;
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
