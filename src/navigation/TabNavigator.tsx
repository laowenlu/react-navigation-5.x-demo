import React from 'react';
import { Image } from 'react-native';
import { tabScreens } from '../containers';
import navigationHelper from './navigationHelper';
import { createBottomTabNavigator, BottomTabBarOptions } from '@react-navigation/bottom-tabs';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';

import home1 from '../assets/icons/tab_home_1.png';
import home2 from '../assets/icons/tab_home_2.png';
import mine1 from '../assets/icons/tab_mine_1.png';
import mine2 from '../assets/icons/tab_mine_2.png';
import social1 from '../assets/icons/tab_social_1.png';
import social2 from '../assets/icons/tab_social_2.png';

const Tab = createBottomTabNavigator();

const tabConfigs = {
  home: {
    screen: tabScreens.home,
    tabName: '首页',
    activeIcon: home1,
    inActiveIcon: home2,
    options: { tabBarLabel: '首页', headerShown: false },
  },
  social: {
    screen: tabScreens.social,
    tabName: '社区',
    activeIcon: social1,
    inActiveIcon: social2,
    options: { tabBarLabel: '设置' },
  },
  mine: {
    screen: tabScreens.mine,
    tabName: '我的',
    activeIcon: mine1,
    inActiveIcon: mine2,
    options: { tabBarLabel: '我的' },
  },
};

const _tabBarOptions: BottomTabBarOptions = {
  activeTintColor: '#3047df',
  inactiveTintColor: '#999999',
};

const _getHeaderOptions = (route): StackHeaderOptions => {
  if (!route.state) return {};

  const routeName = route.state.routes[route.state.index].name;
  const { routes = [], index = 0 } = route.state;
  if (!routes || routes.length === 0) return {};

  const params = routes[index].params || {};
  if (params.title) {
    params['headerTitle'] = params.title;
  }
  params['headerShown'] = routeName !== 'home';
  return params;
};

const TabRouters = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions(_getHeaderOptions(route));
  }, [navigation, route]);

  return (
    <Tab.Navigator
      initialRouteName={'home'}
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const _source = focused ? tabConfigs[route.name].activeIcon : tabConfigs[route.name].inActiveIcon;
          return <Image source={_source} style={{ width: size, height: size }} />;
        },
      })}
      backBehavior={'none'}
      tabBarOptions={_tabBarOptions}
    >
      {Object.keys(tabConfigs).map((key, i) => {
        const item = tabConfigs[key];
        return (
          <Tab.Screen
            name={key}
            component={item.screen}
            options={item.options}
            key={`${i}`}
            listeners={({ navigation, route }) => ({
              tabPress: e => {
                e.preventDefault();
                if (route.name === 'social') {
                  navigationHelper.push('login');
                } else {
                  navigation.jumpTo(route.name);
                }
              },
            })}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export {
  tabConfigs,
  TabRouters,
};
