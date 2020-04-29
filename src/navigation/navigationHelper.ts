import {
  NavigationActions, StackActions,
  NavigationParams, NavigationNavigateAction,
  NavigationNavigateActionPayload,
  NavigationAction,
  NavigationContainer,
  NavigationDispatch,
} from 'react-navigation';
import { Keyboard, ToastAndroid, BackHandler, Platform } from 'react-native';

class NavigationHelper {
  navigator: NavigationContainer & { dispatch?: NavigationDispatch };
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

  setNavigator(ref: NavigationContainer) {
    this.navigator = ref;
  }

  /**
   * 导航到另一条路由
   * @param options
   */
  navigate = (options: NavigationNavigateActionPayload) => {
    const { dispatch } = this.navigator;
    dispatch(NavigationActions.navigate(options));
  }

  /**
   * 返回指定key的路由或上一个路由
   * @param key
   */
  back = (key?: string | null, immediate?: boolean) => {
    Keyboard.dismiss();
    const { dispatch } = this.navigator;
    dispatch(NavigationActions.back({ key, immediate }));
  }

  /**
   * 给定路由设置参数
   * @param key
   * @param params
   */
  setKeyParams = (key: string, params: NavigationParams) => {
    const { dispatch } = this.navigator;
    dispatch(NavigationActions.setParams({ key, params }));
  }

  /**
   * 给当前路由设置参数
   * @param params 设置参数
   */
  setParams = (params: NavigationParams) => {
    const { state } = this.navigator;
    const { index, routes } = state.nav;
    let key = routes[index].key;
    const subRoutes = routes[index].routes;
    if (subRoutes) {
      const subIndex = routes[index].index;
      key = subRoutes[subIndex].key;
    }
    this.setKeyParams(key, params);
  }

  /**
   * 获取路由里的params
   * @template T
   * @param {*} navigation
   * @returns
   * @memberof Navigation
   */
  getParams = <T = any>() => {
    let params: T = {} as T;
    const { routes } = this.navigator.state.nav;
    if (routes && routes.length > 0) {
      params = routes[routes.length - 1].params as T;
    }
    return params;
  }

  /**
   * 重置路由
   * @param routeName 如果不指定,默认重置回首页, routeName可以是栈中的路由也可以是新的, reset会重新创建该页面
   * @param params 设置参数
   */
  reset = (routeName: string = 'index', params?: NavigationParams) => {
    const options = {
      routeName: routeName,
      params: params,
    };

    const routes = routeName.split('/');
    if (routes.length === 2) {
      options.routeName = routes[0];
      options['action'] = NavigationActions.navigate({
        routeName: routes[1],
      });
    }

    const { dispatch } = this.navigator;
    dispatch(StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate(options)],
    }));
  }

  /**
   * 替换指定路由
   * @param routeName
   * @param params
   * @param action
   */
  replace = (routeName: string, params?: NavigationParams, action?: NavigationAction) => {
    const { dispatch } = this.navigator;
    dispatch(StackActions.replace({ routeName, params, action }));
  }

  /**
   * push进一个新页面
   * @param routeName
   * @param params
   * @param action
   */
  push = (routeName: string, params?: NavigationParams, action?: NavigationNavigateAction) => {
    if (typeof routeName !== 'string') return;

    if (!this._pushing) {
      this._pushing = true;
      const timer = setTimeout(() => {
        this._pushing = false;
        clearTimeout(timer);
      }, 500);
      Keyboard.dismiss();
      const { dispatch } = this.navigator;
      dispatch(StackActions.push({ routeName, params, action }));
    }
  }

  /**
   * pop退回前n个页面
   */
  pop = (n: number = 1, params?: { immediate?: boolean }) => {
    Keyboard.dismiss();
    const { dispatch } = this.navigator;
    dispatch(StackActions.pop({ n, immediate: params && params.immediate }));
  }

  /**
   * 退回路由顶层
   * @param {{ immediate?: boolean }} [params]
   */
  popToTop = (params?: { immediate?: boolean }) => {
    const { dispatch } = this.navigator;
    dispatch(StackActions.popToTop({ immediate: params && params.immediate }));
  }

  /**
   * 路由堆栈:popTo
   * @param {string} [routeName='index']
   * @param {*} [params]
   * @memberof Navigation
   */
  popTo = (routeName: string = 'index', params?: any) => {
    const { state } = this.navigator;
    const { index, routes } = state.nav;
    let popNumber;
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      if (route.routeName === routeName) {
        popNumber = index - i;
        break;
      }
    }
    if (popNumber) {
      this.pop(popNumber, params);
    } else {
      console.warn(`堆栈中没有 ${routeName} 页面`);
    }
  }

  /**
   * 传递自定义返回键处理的方法
   * @param {() => void} action
   */
  backHandle = (action: () => void) => {
    const { index, routes } = this.navigator.state.nav;
    const routeName = routes[index].routeName;
    this._backActionMap[routeName] = action;
  }

  /**
   * 返回键处理
   * @returns {boolean}
   */
  backAction = (): boolean => {
    const { index, routes } = this.navigator.state.nav;
    const routeName = routes[routes.length - 1].routeName;

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
