import {
  CommonActions,
  StackActions,
  NavigationContainerRef,
} from '@react-navigation/native';
import { Keyboard, ToastAndroid, BackHandler, Platform } from 'react-native';

class NavigationHelper {
  navigator: NavigationContainerRef;
  private _pushing: boolean;
  private _backTwice: boolean;
  private _backActionMap: {
    [key: string]: () => void;
  };

  constructor() {
    this._pushing = false;
    this._backTwice = false;
    this._backActionMap = {};
  }

  setNavigator(ref: any) {
    this.navigator = ref;
  }

  /**
   * 导航到另一条路由
   * @param options
   */
  navigate = (name: string, params?: any) => {
    const { dispatch } = this.navigator;
    dispatch(CommonActions.navigate({ name, params }));
  }

  /**
   * 重置路由
   * @param routeName 如果不指定,默认重置回首页, routeName可以是栈中的路由也可以是新的, reset会重新创建该页面
   * @param params 设置参数
   */
  reset = (routeName: string = 'index', params?: any) => {
    this.navigator.reset({
      index: 0,
      routes: [{ name: routeName, params: params }],
    });
  }

  /**
   * 返回上一个路由
   */
  goBack = () => {
    Keyboard.dismiss();
    if (this.navigator.canGoBack) this.navigator.goBack();
  }

  /**
   * 给定路由设置参数
   * @param key
   * @param params
   */
  setParams = (params: any) => {
    this.navigator.setParams(params);
  }

  /**
   * 替换指定路由
   * @param routeName
   * @param params
   * @param action
   */
  replace = (routeName: string, params?: any) => {
    const { dispatch } = this.navigator;
    dispatch(StackActions.replace(routeName, params));
  }

  /**
   * 获取路由里的params
   * @template T
   * @param {*} navigation
   * @returns
   * @memberof Navigation
   */
  getParams = <T = any>() => {
    let params;
    const { routes } = this.navigator.getRootState();
    if (routes && routes.length > 0) {
      params = routes[routes.length - 1].params;
    }
    return params as T;
  }

  /**
   * push进一个新页面
   * @param routeName
   * @param params
   * @param action
   */
  push = (routeName: string, params?: any) => {
    if (typeof routeName !== 'string') return;

    if (!this._pushing) {
      this._pushing = true;
      const timer = setTimeout(() => {
        this._pushing = false;
        clearTimeout(timer);
      }, 500);
      Keyboard.dismiss();
      const { dispatch } = this.navigator;
      dispatch(StackActions.push(routeName, params));
    }
  }

  /**
   * pop退回前n个页面
   */
  pop = (n: number = 1) => {
    Keyboard.dismiss();
    const { dispatch } = this.navigator;
    dispatch(StackActions.pop(n));
  }

  /**
   * 退回路由顶层
   * @param {{ immediate?: boolean }} [params]
   */
  popToTop = () => {
    const { dispatch } = this.navigator;
    dispatch(StackActions.popToTop());
  }

  /**
   * 路由堆栈:popTo
   * @param {string} [routeName='index']
   * @param {*} [params]
   * @memberof Navigation
   */
  popTo = (routeName: string = 'index') => {
    const { index, routes } = this.navigator.getRootState();
    let popNumber;
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      if (route.name === routeName) {
        popNumber = index - i;
        break;
      }
    }
    if (popNumber) {
      this.pop(popNumber);
    } else {
      console.warn(`堆栈中没有 ${routeName} 页面`);
      this.navigate(routeName);
    }
  }

  /**
   * 传递自定义返回键处理的方法
   * @param {() => void} action
   */
  backHandle = (action: () => void) => {
    const { index, routes } = this.navigator.getRootState();
    const routeName = routes[index].name;
    this._backActionMap[routeName] = action;
  }

  /**
   * 返回键处理
   * @returns {boolean}
   */
  backAction = (): boolean => {
    const { index, routes } = this.navigator.getRootState();
    const routeName = routes[routes.length - 1].name;

    if (index !== 0) {  // 非最顶层
      if (this._backActionMap[routeName] instanceof Function) {
        Keyboard.dismiss();
        this._backActionMap[routeName]();
      } else {
        this.pop();
      }
      return true;
    } else if (Platform.OS === 'android') {
      if (!this._backTwice) {
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        this._backTwice = true;
        const timer = setTimeout(() => {
          this._backTwice = false;
          clearTimeout(timer);
        }, 2000);
        return true;
      } else {
        this._backTwice = false;
        BackHandler.exitApp();
        return false;
      }
    } else {
      this.pop();
    }
    return true;
  }
}

const navigation = new NavigationHelper();
export default navigation;
