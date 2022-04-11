import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "@react-native-material/core";

function AppButton({ title, variant = "Contained", disable=true, style, onPress, ...otherProps }) {

  return ( 
    <View>
      {
        disable ?
          <Button title={title} style={styles.button} onPress={onPress} color="#df0f1d" {...otherProps} /> :
          <Button title={title} disabled style={styles.button} onPress={onPress} color="#df0f1d" {...otherProps} />
      } 
      
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    color:'#fff'
  }
});

export default AppButton;
