import { Dimensions, StyleSheet, StatusBar } from 'react-native';
import { isIOS, isIPhoneX, isIPhoneXR, overAndroid5 } from './utils';

const window = Dimensions.get('window');
/**
 * 设备大小
 */
const width = window.width;
const height = window.height;
/**
 * tabbar height
 */
const tabbarHeight = px2dp(98);
/**
 * 当前平台最小宽度
 */
const HairlineWidth = StyleSheet.hairlineWidth * 2;
/**
 * StatusBar高度
 */
const StatusBarHeight = isIOS ? ((isIPhoneX || isIPhoneXR) ? 44 : 20) : (overAndroid5 ? StatusBar.currentHeight : 0);
/**
 * 导航栏高度
 */
const NavBarHeight = isIOS ? 44 : px2dp(88);
/**
 * iPhoneX 底部功能条高度
 */
const iPhoneXBottom = (isIPhoneX || isIPhoneXR) ? 34 : 0;
/**
 * 字体宽度
 */
const fontWeightMedium = '500';
const fontWeightThin = '200';
/**
 * TouchableOpacity的hitSlop,扩大点击范围
 */
const hitSlop = {
  top: px2dp(20),
  bottom: px2dp(20),
  left: px2dp(20),
  right: px2dp(20),
};
/**
 * 分割尺寸
 */
const segWidth = px2dp(30);
const segHeight = px2dp(30);
const lineWidth = HairlineWidth;

export {
  width,
  height,
  tabbarHeight,
  HairlineWidth,
  StatusBarHeight,
  NavBarHeight,
  iPhoneXBottom,
  hitSlop,
  fontWeightMedium,
  fontWeightThin,
  segWidth,
  segHeight,
  lineWidth,
};
