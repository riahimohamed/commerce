import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "@react-native-material/core";

function AppButton({ title, variant = "Contained", style, onPress, ...otherProps }) {

  return (
    

    <Button title={title} disable style={styles.button} onPress={onPress} color="#df0f1d" {...otherProps} />
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    color:'#fff'
  }
});

export default AppButton;
