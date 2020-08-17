<template>
  <div class="index">
    <h1>This is an Index page</h1>
    <a-row>
      <a-icon v-show="!device" class="icon" type="mobile" />
      <a-icon v-show="device" class="icon" type="desktop" />
    </a-row>
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
import { Component/* , Vue */ } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import resizeMixin from '@/mixin/resize'
import { mixins } from 'vue-class-component'

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
// export default class extends Vue {
export default class extends mixins(resizeMixin) {
  private dimension = 0;
  private dimensionOption = demensions;
  // eslint-disable-next-line
  private onChange (e: any) {
    const index = e.target.value
    this.dimension = index
    this.$router.push(this.dimensionOption[index].path)
  }

  get device () {
    return AppModule.device
  }
};
</script>

<style lang="less">
  .icon {
    font-size: 30px;
    color: #40a9ff;
  }
</style>
