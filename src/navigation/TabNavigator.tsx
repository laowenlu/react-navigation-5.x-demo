import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { NavigationScreenProp, NavigationState, getActiveChildNavigationOptions } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { ITabRouteMap, tabScreens } from '../containers';
import { BottomTabBarOptions, NavigationCommonTabOptions } from 'react-navigation-tabs/lib/typescript/src/types';
import navigationHelper from './navigationHelper';

import home1 from '../assets/icons/tab_home_1.png';
import home2 from '../assets/icons/tab_home_2.png';
import mine1 from '../assets/icons/tab_mine_1.png';
import mine2 from '../assets/icons/tab_mine_2.png';
import social1 from '../assets/icons/tab_social_1.png';
import social2 from '../assets/icons/tab_social_2.png';

const styles = StyleSheet.create({
  img: {
    width: px2dp(44),
    height: px2dp(44),
  },
});

// 默认选中tab名
const initialRouteName = 'home';

const tabRouters: ITabRouteMap = {
  home: {
    screen: tabScreens.home,
    tabName: '首页',
    activeIcon: home1,
    inActiveIcon: home2,
    navigationOptions: {
      header: null,
      tabBarLabel: '首页',
    },
  },
  social: {
    screen: tabScreens.social,
    tabName: '社区',
    activeIcon: social1,
    inActiveIcon: social2,
    navigationOptions: {
      header: null,
      tabBarLabel: '社区',
    },
  },
  mine: {
    screen: tabScreens.mine,
    tabName: '我的',
    activeIcon: mine1,
    inActiveIcon: mine2,
    navigationOptions: {
      title: '我的',
      tabBarLabel: '我的',
    },
  },
};

const _defaultTapOptions = ({ navigation }): NavigationCommonTabOptions => ({
  tabBarIcon: ({ focused, tintColor, horizontal }) => {
    const _item = tabRouters[navigation.state.routeName];
    const _source = focused ? _item.activeIcon : _item.inActiveIcon;
    return <Image source={_source} style={styles.img} />;
  },
  tabBarOnPress: ({ defaultHandler, navigation }) => {
    const { routeName } = navigation.state;
    if (routeName === 'social') {
      if (true) navigationHelper.push('login');
    } else {
      defaultHandler();
    }
  },
});

const _tabBarOptions: BottomTabBarOptions = {
  activeTintColor: '#3047df',
  inactiveTintColor: '#999999',
};

const TabNavigator = createBottomTabNavigator(tabRouters, {
  initialRouteName: initialRouteName,
  defaultNavigationOptions: _defaultTapOptions,
  tabBarOptions: _tabBarOptions,
});

TabNavigator.navigationOptions = ({ navigation, screenProps }: {
  navigation: NavigationScreenProp<NavigationState>;
  screenProps: { [key: string]: any };
}) => {
  const childOptions = getActiveChildNavigationOptions(navigation, screenProps);
  return childOptions ? { ...childOptions } : {};
};

export {
  TabNavigator,
  tabRouters,
  initialRouteName,
};
