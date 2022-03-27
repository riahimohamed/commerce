import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { HStack } from "@react-native-material/core";

import TextInput from '../components/TextInput';
import Button from '../components/Button';

export default function ScanScreen({route, navigation}) {
  
  const values = route.params;

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = useState();

  const [type, setType] = useState();
  const [data, setData] = useState();

  const [ barcode, setBarcode ] = useState([]);
  const [ quantity, setQuantity ] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setModalVisible(true);

    setData(data);
    setType(type);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleData = (quntity) => {
    quantity.push(text);
    setQuantity(quantity);

    barcode.push(data);
    setBarcode(barcode);

    onChangeText('');
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && 
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Bar code with type ${type}</Text>
              <Text style={styles.modalText}>data ${data} has been scanned!</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                name="amount"
                label="Quantity"
                keyboardType="numeric"
                onChangeText={onChangeText}
                value={text}
              />
              <HStack m={4} spacing={6}>
                <View>
                  <Button title={'Tap to Scan Again'} onPress={() => {
                    handleData(text);
                    setScanned(false)}
                  } />
                </View>
              </HStack>
            </View>
          </View>
        </Modal>}
        <View style={{bottom: 20}}>
          <Button title={'Details'} onPress={() => {navigation.navigate("Details", {barcode, quantity, values} )}} />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 2,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})