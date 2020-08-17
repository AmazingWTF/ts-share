<template>
  <div class="index">
    <h1>This is an Index page</h1>
    <a-radio-group
      :value="dimension"
      @change="onChange"
    >
      <a-radio-button
        v-for="(demension, i) in dimensionOption"
        :value="i"
        :key="demension.path"
      >
        {{ demension.meta.title || demension.path }}
      </a-radio-button>
    </a-radio-group>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

interface IRouter {
  path: string;
  meta: {
    title: string;
  };
}
const demensions: IRouter[] = [{
  path: '/index',
  meta: { title: '首页' }
}, {
  path: '/index/todos',
  meta: { title: 'TodoList' }
}]

@Component({
  name: 'Index'
})
export default class extends Vue {
  private dimension = 0;
  private dimensionOption = demensions;
  // eslint-disable-next-line
  private onChange (e: any) {
    const index = e.target.value
    this.dimension = index
    this.$router.push(this.dimensionOption[index].path)
  }
};
</script>
