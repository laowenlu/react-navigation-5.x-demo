import React, { useEffect } from 'react';
import { StyleSheet, Animated, View, BackHandler, DeviceEventEmitter, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, NavigationStackOptions } from 'react-navigation-stack';
import { StatusBarHeight, NavBarHeight } from '../styles/size';
import { TitleButton } from '../components';
import { routers } from '../containers';
import { TransitionConfig, HeaderTransitionConfig } from 'react-navigation-stack/lib/typescript/types';
import AsyncStorage from '@react-native-community/async-storage';
import { TabNavigator } from './TabNavigator';
import navigationHelper from './navigationHelper';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3047df',
    height: Platform.OS === 'ios' ? NavBarHeight : NavBarHeight + StatusBarHeight, // react-navigation ios端会自动适配高度
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBarHeight,
    shadowOpacity: 0, // remove shadow on iOS
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: px2dp(32),
    alignSelf: 'center',
    textAlign: 'center',
  },
});

const _backButton = <TitleButton onPress={navigationHelper.backAction} />;
const _loadingExperimental = () => <View style={{ flex: 1, backgroundColor: '#fff' }} />;

// 保存路由状态，即使进程被杀掉也可以恢复路由历史堆栈，可以使用 goBack、replace等操作
const _getPersistenceFunctions = () => {
  if (__DEV__) {
    const persistenceKey = 'persistenceKey';
    const persistNavigationState = async (navState: any) => {
      try {
        await AsyncStorage.setItem(persistenceKey, JSON.stringify(navState));
      } catch (err) { }
    };
    const loadNavigationState = async () => {
      const jsonString = await AsyncStorage.getItem(persistenceKey);
      return JSON.parse(jsonString);
    };
    return {
      persistNavigationState: persistNavigationState,
      loadNavigationState: loadNavigationState,
    };
  } else {
    return undefined;
  }
};

// 转场动画
const _screenInterpolator = (sceneProps) => {
  const { layout, position, scene } = sceneProps;
  const { index, route } = scene;
  const { routeName } = route;
  const scenesLastRouteName = sceneProps.scenes.slice(-1)[0].route.routeName;
  if (routeName === 'login' || scenesLastRouteName === 'login') {  // 上下切换
    const height = layout.initHeight;
    // 沿Y轴平移
    const translateY = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [height, 0, 0],
    });
    // 透明度
    const opacity = position.interpolate({
      inputRange: [index - 1, index - 0.99, index],
      outputRange: [0, 1, 1],
    });
    return { opacity, transform: [{ translateY }] };
  } else {  // 左右切换
    const Width = layout.initWidth;
    // 沿X轴平移
    const translateX = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [Width, 0, -(Width - 10)],
    });
    // 透明度
    const opacity = position.interpolate({
      inputRange: [index - 1, index - 0.99, index],
      outputRange: [0, 1, 1],
    });
    return { opacity, transform: [{ translateX }] };
  }
};

const _defaultNavigationOptions: NavigationStackOptions = {
  headerStyle: styles.header,
  headerTitleStyle: styles.headerTitle,
  headerLeft: _backButton,
  headerRight: <View />,
};

const _transitionConfig = (): TransitionConfig & HeaderTransitionConfig => {
  return {
    transitionSpec: {
      timing: Animated.timing,
    },
    screenInterpolator: _screenInterpolator,
  };
};

const AppContainer = createAppContainer(
  createStackNavigator(
    {
      index: {
        screen: TabNavigator,
        navigationOptions: {
          headerLeft: null,
        },
      },
      ...routers,
    },
    {
      defaultNavigationOptions: _defaultNavigationOptions,
      transitionConfig: _transitionConfig,
    },
  ),
);

function AppNavigator() {
  useEffect(() => {
    // 安卓物理返回键处理
    BackHandler.addEventListener('hardwareBackPress', navigationHelper.backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', navigationHelper.backAction);
    };
  }, []);

  const _ref = navigatorRef => { navigationHelper.setNavigator(navigatorRef); };
  const _onNavigationStateChange = (prevState, newState, action) => {
    DeviceEventEmitter.emit('onNavigationStateChange', { prevState, newState, action });
  };

  return (
    <AppContainer
      {..._getPersistenceFunctions()}
      ref={_ref}
      renderLoadingExperimental={_loadingExperimental}
      onNavigationStateChange={_onNavigationStateChange}
    />
  );
}

export default AppNavigator;
