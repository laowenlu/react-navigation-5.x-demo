import { CardStyleInterpolators } from '@react-navigation/stack';
import { StackHeaderOptions, TransitionPreset, StackNavigationOptions } from '@react-navigation/stack/lib/typescript/src/types';

import HomeIndex from './home/HomeIndex';
import SocialIndex from './social/SocialIndex';
import MineIndex from './mine/MineIndex';

import Setting from './mine/Setting';
import MineTwo from './mine/MineTwo';
import Login from './social/Login';
import Test from './home/Test';

export interface IRouteMap {
  name: string;
  component: React.ReactNode;
  options?: StackHeaderOptions | TransitionPreset | StackNavigationOptions;
  [key: string]: any;
}

const routersConfig: IRouteMap[] = [
  {
    name: 'login',
    component: Login,
    options: {
      header: () => null,
      // headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    },
  },
  {
    name: 'test',
    component: Test,
    options: {
      headerTitle: 'Test',
      headerTitleStyle: { color: '#f00' },
    },
  },
  {
    name: 'setting',
    component: Setting,
    options: { headerTitle: '设置中心' },
  },
  {
    name: 'mineTwo',
    component: MineTwo,
    options: { headerTitle: 'MineTwo' },
  },
];

// tabbar
const tabScreens = {
  home: HomeIndex,
  social: SocialIndex,
  mine: MineIndex,
};

export {
  routersConfig,
  tabScreens,
};
