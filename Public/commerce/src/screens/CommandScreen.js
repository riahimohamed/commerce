import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import * as Yup from "yup";
import { Stack, Text, Button } from "@react-native-material/core";

import Background from '../components/Background';
import { Form, 
  FormField,
  ErrorMessage,
  SubmitButton } from "../components/forms";
import { theme } from '../core/theme';
import BackButton from '../components/BackButton';

const validationSchema = Yup.object().shape({
  // nameClient: Yup.string().required().label("Nom Client"),
  // addressClient: Yup.string().required().label("Adresse Client"),
  // email: Yup.string().required().email().label("Email"), 
  // tel: Yup.number().required().label("Tel"),
  // nameComercial: Yup.string().required().label("Nom Commercial"),
});

export default function CommandScreen({ navigation }) {

  const [loginFailed, setLoginFailed] = useState(false);
  const [ data, setData ] = useState([]);

  const handleSubmit = async (values) => {
    navigation.navigate('ScanProducts', values)
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      
      <Text style={styles.title}>Passer une Commande</Text>
      <Form
        initialValues={{ nameClient: "", 
                         addressClient: "", 
                         email: "", 
                         tel: "", 
                         nameComercial: "" }}
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
            name="nameClient"
            label="Nom Client"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            name="addressClient"
            label="Adress Client"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            name="email"
            label="Email Client"
            textContentType="emailAddress"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            name="tel"
            label="Téléphone"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            name="nameComercial"
            label="Nom & Prénom Commercial"
          />
          <SubmitButton style={styles.button} title="Commander" />
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