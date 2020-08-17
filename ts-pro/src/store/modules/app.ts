import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { getLocale } from '@/utils'

export enum DeviceType {
  Mobile,
  Desktop
};

export interface IAppState {
  device: DeviceType;
  language: string;
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  public device = DeviceType.Desktop
  public language = getLocale()

  @Mutation
  private SET_LANGUAGE (language: string) {
    this.language = language
  }

  @Mutation
  private TOGGLE_DEVICE (device: DeviceType) {
    this.device = device
  }

  @Action
  public ToggleDevice (device: DeviceType) {
    this.TOGGLE_DEVICE(device)
    // do something...
  }

  @Action
  public SetLanguage (language: string) {
    this.SET_LANGUAGE(language)
    // do something...
  }
}

export const AppModule = getModule(App)
