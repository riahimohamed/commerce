import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import * as Yup from "yup";
import { Stack, Text } from "@react-native-material/core";
import Users from '../assets/json/users.json';

import Background from '../components/Background';
import { Form, 
  FormField,
  ErrorMessage,
  SubmitButton } from "../components/forms";

import { theme } from '../core/theme';

const validationSchema = Yup.object().shape({
  // email: Yup.string().required().email().label("Email"),
  // password: Yup.string().required().min(4).label("Password"),
});

export default function LoginScreen({ navigation }) {

  const [loginFailed, setLoginFailed] = useState(false);

  let checkAuth = false;

  const handleSubmit = async ({ email, password }) => {
    const user = Users.filter(x => {return x.email === email && x.password === password});

    if(user.length === 1){
      navigation.navigate('Commands')
    }
    else
      checkAuth = false;
      
    console.log(user.length);
  };

  return (
    <Background>
      
      <Text style={styles.title}>Signin !</Text>
      {checkAuth && <Text>Username</Text>}
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        >
        <Stack spacing={10} style={{ margin: 16 }}>
          <ErrorMessage
            error="Invalid email and/or password."
            visible={loginFailed}
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            name="email"
            label="Email"
            textContentType="emailAddress"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            name="password"
            label="Mot de passe"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton style={styles.button} title="Se connecter" />
        </Stack>
      </Form>
    </Background>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 8,
    textAlign: 'center'
  }
})
