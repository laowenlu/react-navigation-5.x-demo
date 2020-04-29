import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

export interface ITitleButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  /** 是否不可以点击button */
  disabled?: boolean;
  /** 按钮的样式 */
  style?: StyleProp<ViewStyle>;
  /** 标题名字 */
  title?: string;
  titleColor?: string;
  titleStyle?: StyleProp<TextStyle>;
  showArrow?: boolean;
}

const TitleButton = (props: ITitleButtonProps) => {
  const { onPress, style, title, titleColor = '#333333', titleStyle, disabled, showArrow = true } = props;
  return (
    <TouchableOpacity
      onPress={(e) => { onPress(e); }}
      style={[styles.btn, style]}
      hitSlop={{
        top: px2dp(20),
        bottom: px2dp(20),
        left: px2dp(20),
        right: px2dp(20),
      }}
      activeOpacity={0.6}
      disabled={disabled}
    >
      {showArrow && <Text style={{ fontSize: px2dp(40), color: '#fff' }}>く</Text>}
      {title ? <Text style={[{ color: titleColor, fontSize: px2dp(26) }, titleStyle]}
        numberOfLines={1}>{title}</Text >
        : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: px2dp(24),
    paddingVertical: px2dp(10),
  },
});

export default TitleButton;
