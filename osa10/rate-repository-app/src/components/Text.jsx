import { Text as NativeText, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorWhite: {
    color: theme.colors.textWhite,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === "textSecondary" ? styles.colorTextSecondary : null,
    color === "primary" ? styles.colorPrimary : null,
    color === "textWhite" ? styles.colorWhite : null,
    fontSize === "subheading" ? styles.fontSizeSubheading : null,
    fontWeight === "bold" ? styles.fontWeightBold : null,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;