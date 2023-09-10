//Primary Button Component
import { StyleSheet, View, Pressable } from "react-native";
import React from "react";

const PrimaryButton = ({ icon, onPress }) => {
  return (
      <Pressable onPress={onPress}>
        <View style={styles.button}>{icon}</View>
      </Pressable>
  )
}

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 24,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 2,
  },
});