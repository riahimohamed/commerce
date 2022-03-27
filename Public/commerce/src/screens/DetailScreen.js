import React from 'react';
import { View, Text, FlatList, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ListItem } from "@react-native-material/core";
import email from 'react-native-email';

import Button from '../components/Button';
import { theme } from '../core/theme';

const Item = ({ title }) => (
  <View style={Styles.item}>
    <Text style={Styles.title}>{title}</Text>
    {/* <ListItem title="oui" /> */}
  </View>
);

export default function DetailScreen({route}) {

  const obj = route.params;
  const body = JSON.stringify(obj.values).replace(/['"]+/g, '').slice(1, -1).replace(/[,]/g, '\n');
  let products = body+'\n'+
                 JSON.stringify(obj.barcode).replace(/['"]+/g, '').slice(1, -1)+'\n'+
                 JSON.stringify(obj.quantity).replace(/['"]+/g, '').slice(1, -1);

  console.log(obj.values);

  const renderItem = ({ item }) => (
      <ListItem title={item} />
  );

  const renderItemData = ({ item, index }) => (
    <ListItem title={item} trailing={<Text style={Styles.badget}>{obj.quantity[index].toString()}</Text>} />
  );

  const handleEmail = () => {
    const to = ['tiaan@email.com'] // string or array of email addresses
    email(to, {
        // Optional additional arguments
        // cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
        // bcc: 'mee@mee.com', // string or array of email addresses
        subject: 'Quotation Products',
        body: products
    }).catch(console.error)
  }
  
  return (
    <SafeAreaView style={Styles.container}>
      <FlatList
        data={Object.values(obj.values)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      <FlatList
        data={Object.values(obj.barcode)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItemData}
      />
      <Button title="Send Mail" onPress={handleEmail} />
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#fff',
    // padding: 4,
    marginVertical: 4,
    marginHorizontal: 16,
  },
  title: {
    padding: 2,
    fontSize: 18,
  },
  badget: {
    padding: 3,
    backgroundColor: theme.colors.primary ,
    borderRadius: 20,
    color: "#fff"
  }
})
