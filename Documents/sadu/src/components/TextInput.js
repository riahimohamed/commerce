import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "@react-native-material/core";

import { theme } from '../core/theme'

function AppTextInput({ error = null, width = "100%", ...props }) {
  return (
    <View style={{ width }}>
      <TextInput
        color="#2d2d2d"
        variant="outlined"
        style={{ marginBottom: 16 }}
        errorMessage={ error }
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

export default AppTextInput;