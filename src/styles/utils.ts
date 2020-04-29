import { Dimensions, Platform } from 'react-native';

const window = Dimensions.get('window');

/**
 * 判断是否IOS平台
 */
const isIOS = Platform.OS === 'ios';
/**
 * 判断是否Android平台
 */
const isAndroid = Platform.OS === 'android';
/**
 * 判断是否iPhoneX  X和XS  375*812
 */
const isIPhoneX: boolean = isIOS && window.width === 375 && window.height === 812;
/**
 * 判断是否iPhoneXR  XS_Max和XR 414*896
 */
const isIPhoneXR: boolean = isIOS && window.width === 414 && window.height === 896;
/**
 * 判断是否Android5.x平台
 */
const isAndroid5: boolean = isAndroid && Platform.Version > 20 && Platform.Version < 23;
/**
 * 判断是否Android5.0以上平台
 */
const overAndroid5: boolean = isAndroid && Platform.Version > 19;

declare global {
  function px2dp(px: number): number;
}

declare const global: any;
/**
 * 根据750px的设计稿比例转换成dp
 * global.px2dp === global['px2dp']
 */
global.px2dp = (px: number) => (px / 750) * window.width;

export {
  isIOS,
  isAndroid,
  isIPhoneX,
  isIPhoneXR,
  isAndroid5,
  overAndroid5,
};
