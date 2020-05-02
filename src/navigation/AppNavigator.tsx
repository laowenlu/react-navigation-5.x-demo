import React, { useEffect, useState } from 'react';
import { StyleSheet, Animated, View, BackHandler, DeviceEventEmitter, Platform, AsyncStorage } from 'react-native';
import { StatusBarHeight, NavBarHeight } from '../styles/size';
import { TitleButton } from '../components';
import { routersConfig } from '../containers';
import { TabRouters, tabConfigs } from './TabNavigator';
import navigationHelper from './navigationHelper';
import { NavigationContainer, useFocusEffect, NavigationContainerRef } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3047df',
    height: NavBarHeight + StatusBarHeight,
    // paddingTop: Platform.OS === 'ios' ? 0 : StatusBarHeight,
    shadowOpacity: 0, // remove shadow on iOS
  },
  headerTitle: {
    color: '#fff',
    fontSize: px2dp(32),
    alignSelf: 'center',
    textAlign: 'center',
  },
  card: {
    flex: 1,
    backgroundColor: '#f5f5f9',
  },
});

const _backButton = () => <TitleButton onPress={navigationHelper.backAction} />;

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'index'}
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: '#fff', // 返回按钮和标题都使用这个属性作为它们的颜色
        headerTitleStyle: styles.headerTitle,
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        cardStyle: styles.card,
        gestureEnabled: true,
        transitionSpec: { timing: Animated.timing },
        headerLeft: _backButton,
        ...TransitionPresets.SlideFromRightIOS,
      }}
      keyboardHandlingEnabled
      mode={'card'}
      headerMode={'screen'}
    >
      <Stack.Screen
        name={'index'}
        component={TabRouters}
        options={{ headerLeft: null, headerShown: false }}
      />
      {Object.keys(routersConfig).map((key, i) => {
        const item = routersConfig[key];
        return (
          <Stack.Screen
            name={item.name}
            component={item.component}
            options={item.options}
            key={`${i}`}
          />
        );
      })}
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  useEffect(() => {
    // 安卓物理返回键处理
    BackHandler.addEventListener('hardwareBackPress', navigationHelper.backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', navigationHelper.backAction);
    };
  }, []);

  const _ref = (ref: NavigationContainerRef) => {
    navigationHelper.setNavigator(ref);
  };

  return (
    <NavigationContainer ref={_ref}
    // onStateChange={(state) => { }}
    >
      <StackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
