import { ImageSourcePropType } from 'react-native';
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack';
import { NavigationRouteConfig, NavigationParams, NavigationRoute, NavigationRouteConfigMap } from 'react-navigation';

import HomeIndex from './home/HomeIndex';
import SocialIndex from './social/SocialIndex';
import MineIndex from './mine/MineIndex';

import Setting from './mine/Setting';
import MineTwo from './mine/MineTwo';
import Login from './social/Login';
import Test from './home/Test';

export interface ITabRouteMap {
  [routeKey: string]: NavigationRouteConfig<any, any> & {
    tabName: string;
    activeIcon?: ImageSourcePropType;
    inActiveIcon?: ImageSourcePropType;
  };
}

// tabbar
const tabScreens = {
  home: HomeIndex,
  social: SocialIndex,
  mine: MineIndex,
};

const routers: NavigationRouteConfigMap<NavigationStackOptions,
  NavigationStackProp<NavigationRoute<NavigationParams>, any>, unknown> = {
  login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  test: {
    screen: Test,
    navigationOptions: {
      title: 'Test',
    },
  },
  setting: {
    screen: Setting,
    navigationOptions: {
      title: '设置中心',
    },
  },
  mineTwo: {
    screen: MineTwo,
    navigationOptions: {
      title: 'MineTwo',
    },
  },
};

export {
  routers,
  tabScreens,
};
