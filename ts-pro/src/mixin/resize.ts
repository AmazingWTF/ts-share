import { Component, Vue, Watch } from 'vue-property-decorator'
import { AppModule, DeviceType } from '@/store/modules/app'

const WIDTH = 992 // 屏幕断点

@Component({
  name: 'ResizeMixin'
})
export default class extends Vue {
  get device () {
    return AppModule.device
  }

  get language () {
    return AppModule.language
  }

  @Watch('$route')
  private onRouteChange () {
    if (this.device === DeviceType.Mobile) {
      this.$message.success('开启手机模式~')
    } else {
      this.$message.success('Welcome to Windows ~ ')
    }
  }

  beforeMount () {
    window.addEventListener('resize', this.resizeHandler)
  }

  beforeDestroy () {
    window.removeEventListener('resize', this.resizeHandler)
  }

  private isMobile () {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  resizeHandler () {
    const isMobile = this.isMobile()
    AppModule.ToggleDevice(isMobile ? DeviceType.Mobile : DeviceType.Desktop)
  }
}
