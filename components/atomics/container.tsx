import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

export default function Container({
  children,
  style,
}: ViewProps): React.JSX.Element {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});