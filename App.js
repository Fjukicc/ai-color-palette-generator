import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
//icons
import { Entypo } from "@expo/vector-icons";

//components
import PrimaryButton from "./components/PrimaryButton";
import ColorsCard from "./components/ColorsCard";

//get your api key from enviroment variables
const apiKey = process.env.EXPO_PUBLIC_OPENAI_KEY;

export default function App() {
  const [waiting, setWaiting] = useState(true);
  const [colors, setColors] = useState([]);

  //here we fetch first three colors when the App.js component is initialzied
  useEffect(() => {
    makeOpenAIRequest();
  }, []);

  //function to request data 
  const makeOpenAIRequest = async () => {
    const requestData = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Create color paletes with 3 colors. ONLY Reply with JSON array of hexadecimal colors, don't store that array in any object parameter`,
        },
        {
          role: "assistant",
          content: "[#4285F4, #34A853, #FBBC05]",
        },
      ],
      temperature: 1,
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    };
    const apiUrl = "https://api.openai.com/v1/chat/completions";
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      //get responsed data
      const responseData = await response.json();

      var colors = responseData.choices[0].message.content
        .toString()
        .slice(1, -1);

      var colorArray = colors.split(",").map(function (item) {
        return item.trim();
      });

      //update our colors and set waiting to false
      setColors(colorArray);
      setWaiting(false);
    } catch (error) {
      console.error("Error making OpenAi API request", error);
    }
  };
  return (
    <View style={styles.container}>
      <ColorsCard waiting={waiting} colors={colors} />
      <View style={styles.buttonsContainer}>
        <PrimaryButton onPress={()=>{makeOpenAIRequest(); setWaiting(true)}} icon={<Entypo name="plus" size={24} color="#fff" />}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 24,
  },
});