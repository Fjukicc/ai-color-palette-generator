import {
  StyleSheet,
  ActivityIndicator,
  View,
  Dimensions,
  Text,
  Alert,
  Pressable,
} from "react-native";
import React from "react";
//clipboard
import * as Clipboard from "expo-clipboard";

const ColorsCard = ({ waiting, colors }) => {
  
  //on color press get the hex of the color and copy it to clipboard
  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text.toString());
    Alert.alert(
      "Text has been copied to the clipboard.",
      "",
      [
        {
          text: "OK",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.cardContainer}>
      {waiting ? (
        <ActivityIndicator size="large" />
      ) : (
        colors.map((color, i) => {
          let cleanedColor = color.replaceAll('"', "");
          return (
            <Pressable
              onPress={() => {
                copyToClipboard(cleanedColor);
              }}
              key={i}
            >
              <View
                style={{
                  height: Dimensions.get("screen").height / colors.length,
                  width: Dimensions.get("screen").width,
                  backgroundColor: cleanedColor,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.colorText}>
                  {cleanedColor}
                </Text>
              </View>
            </Pressable>
          );
        })
      )}
    </View>
  );
};

export default ColorsCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#d4d4d4",
    justifyContent: "center",
    alignItems: "center",
  },
  colorText: {
    color: "black",
    fontWeight: "500",
    fontSize: 28,
  },
});