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
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function LoginScreen({ navigation }) {

  const [loginFailed, setLoginFailed] = useState(false);

  let [logged, setLogged] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    const user = Users.filter(x => {return x.email === email && x.password === password});
    navigation.navigate('Commands')
     if(user.length === 1){
     setLogged(false);
      navigation.navigate('Commands')
     }
    else
    setLogged(true)
  };
  
  return (
    <Background>
      
      <Text style={styles.title}>Sign in</Text>
      {logged && <Text style={{color:theme.colors.primary, marginLeft: 25}}>Credential invalid</Text>}
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
          <SubmitButton style={styles.button} title="Connexion" />
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
