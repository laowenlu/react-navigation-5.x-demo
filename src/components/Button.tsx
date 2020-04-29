import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TextStyle,
  ViewStyle,
  StyleProp,
  View,
} from 'react-native';

export interface IButtonProps {
  onPress?: (e?: any) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  borderRadius?: number;
  title?: string;
  disableColor?: string;
  color?: string;
  backgroundColor?: string;
}

const Button = (props: IButtonProps) => {
  const {
    onPress,
    disabled,
    style,
    contentStyle,
    titleStyle,
    borderRadius = px2dp(20),
    title = '按钮',
    disableColor = '#3047df66',
    color = '#fff',
    backgroundColor = '#3047df',
  } = props;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, style]} disabled={disabled} activeOpacity={0.6}>
      <View style={[
        {
          borderRadius: borderRadius, backgroundColor: disabled ? disableColor : backgroundColor,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        contentStyle]}>
        <Text style={[styles.text, { color: color }, titleStyle]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

interface IStyle {
  btn: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<IStyle>({
  btn: {
    height: px2dp(90),
  },
  text: {
    fontSize: px2dp(30),
    backgroundColor: 'transparent',
    paddingHorizontal: px2dp(30),
  },
});

export default Button;
