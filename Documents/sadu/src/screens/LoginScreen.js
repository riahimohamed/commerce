import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import * as Yup from "yup";
import { Stack, Text } from "@react-native-material/core";
// import axios from 'axios';
import PapaParse from 'papaparse'
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

  // const baseURL = "https://app.onehive.be";

  const [loginFailed, setLoginFailed] = useState(false);
  let [logged, setLogged] = useState(false);
  const [parsedCsvData, setParsedCsvData] = useState([]);

  const handleSubmit = async ({ email, password }) => {
    const user = Users.filter(x => {return x.email === email && x.password === password});
     if(user.length === 1){
      setLogged(false);

      navigation.navigate('Commands');
     }
    else
    setLogged(true)
  };

  // const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjUzYzg0MTg1YjI2NzQ5MTAwYzU3NzI4ZDA1M2M0M2Y2ODRlZTZhMjY2NzU3NTU0MzNmN2EwODRkMDNkMDhiNWRhZGZiOTBhYWZiYjFkYmJiIn0.eyJhdWQiOiI5OSIsImp0aSI6IjUzYzg0MTg1YjI2NzQ5MTAwYzU3NzI4ZDA1M2M0M2Y2ODRlZTZhMjY2NzU3NTU0MzNmN2EwODRkMDNkMDhiNWRhZGZiOTBhYWZiYjFkYmJiIiwiaWF0IjoxNjU0NzE2NjY1LCJuYmYiOjE2NTQ3MTY2NjUsImV4cCI6MTY4NjI1MjY2NSwic3ViIjoiIiwic2NvcGVzIjpbXX0.YLV5wDBOOC06yQpf6URiU9yS0dZmlRjAxcKrXlxZKctxgDGNSWjgbmRZHj4zTP4YaT77679ufNJDtvunk3DQQ8P1tq-Iye9HM1pboRTwI6PZ2aRaRWiCi9RWbiB5Nnp2tMm_jbrrHQbHjXbaIjuCYpgtYUxWEaIFmgH0uZ0EDk46a9nS8aKB00w-h3vVAFj7_XRgIzyV-5zqLV1fxCNxdehmbwDGYjQyn47Nv4iChgIGokMB4JC4lw3EhIbHOTj-BFwgBoZ4l5LPXdGaWccXZyUf55Ao1W5X-2BToP9sPmOXGzjbBV-g2Un_UrCFler_pCs8d4Em6ERqFqo6o-6hPAENzEAlOxlkcE1wBtaLaZUDtMSyKvl-xJfjcvTuO6zPYHq1gq0I9bNAlK2NhKdWc1lesO8qhJElX8Vahb6kBocAaJpctbEcvd8ox2gSAFUmdSgxJSs3SSodVrRqDCOadTDdlRuS54yNGQBsfZO7wTKsuxeeHmdMtN99IxVOSurdszAd65PatzxUQOc06HEuhfdVwtMVf0r7wGx4ddwmGG5ZcVYmcU5ReUmcvJ-XKJF0DAHlEy8uLGKrnnwCNyyRlm1vcxJHQxkHi0_J5R77FScvcBenpEErSWq41LZgaslZjZrMylurTtYEx7xwu9R7kDuuz3bDCt6FuZnCTV6AgKo";

  // const authAxios = axios.create({
  //   baseURL: baseURL,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin' : '*',
  //     'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  //   },
  //   withCredentials: true
  // });

  // authAxios.interceptors.request.use(
  //   config => {
      
  //     // config.data = {"grant_type":"client_credentials",
  //     // "client_id":"50e0d78bf768b9322d6d534dcc872892",
  //     // "client_secret":"x5fkFxBWp0VWFruJeehUcbKqTJR1KdJB3ub2tzX9",
  //     // "scope": "*" }

  //     if (!config.headers.Authorization) {
  //       config.headers.Authorization = `Bearer ${accessToken}`;
  //     }

  //     return config;
  //   },
  //   error => {
  //     return Promise.reject(error);
  //   },
  // );

  // authAxios({
  //   method: 'get',
  //   url: '/api/data/493533d0-cf81-11eb-9437-cf51ee771a09/',
    // data: {
    //   "grant_type":"client_credentials",
    //   "client_id":"50e0d78bf768b9322d6d534dcc872892",
    //   "client_secret":"x5fkFxBWp0VWFruJeehUcbKqTJR1KdJB3ub2tzX9",
    //   "scope": "*"
    // }
  // });

  // axios.get(`${baseURL}/api/data/493533d0-cf81-11eb-9437-cf51ee771a09/`
  // , { headers: {
  //       "grant_type": "client_credentials",
  //       "Authorization" : `Bearer ${accessToken}`},
  //       'Access-Control-Allow-Origin': '*',
  //       'Content-Type': 'application/json',})
  //   .then(function (response) {
  //       console.log(response.data);
  //   })
  //   .catch(function (error) {
  //       console.log(error.message);
  //   })
  
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
