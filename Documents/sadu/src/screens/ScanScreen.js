import React, { useState, useEffect } from 'react';
import { View, Text, Modal, ImageBackground, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { HStack } from "@react-native-material/core";
import { FontAwesome } from '@expo/vector-icons';

import TextInput from '../components/TextInput';
import Button from '../components/Button';

import Products from '../assets/json/Products.json';

export default function ScanScreen({route, navigation}) {
  
  const values = route.params;

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  // const [modalExVisible, setModalExVisible] = useState(true);
  const [text, onChangeText] = useState('');

  const [data, setData] = useState();
  const [excel, setexcel] = useState([]);
  const [product, setProduct] = useState([]);

  const [exist, setExist] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {

    let prod = Products.filter(x => x.Barcode === data);

    if(prod.length !== 0){
      setExist(true);
      setPr
      setScanned(true);
      setModalVisible(true);
      // setModalExVisible(false);
      setData(data);
    }else{
      setExist(true);
      // setModalExVisible(true);
      console.log(exist);
    }

  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleData = () => {

    let prod = Products.filter(x => x.Barcode === data)

    if(prod.length!== 0){
      setExist(false);
      excel.push({ "code": data, "quantity": text });
      setexcel(excel);
    }else{
      setExist(true);
    }

    onChangeText('');
  }

  const details = () => {
    setScanned(false);
    setData(data);
    handleData();
    navigation.navigate("Details", {excel, values} )
  }

  return (
    <View style={styles.container}>
       
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {/* {exist && 
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalExVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Product not found!</Text> 
            </View>
          </View>
          <Button title={'close'} onPress={() => setModalExVisible(false) } />
        </Modal>
      } */}

      {scanned && 
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* <Text style={styles.modalText}>Bar code with type ${type}</Text> */}
              {/* <Text style={styles.modalText}>ID {data}</Text> */}
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                name="amount"
                label="Quantity"
                keyboardType="numeric"
                onChangeText={onChangeText}
                value={text}
                editable={exist}
              />
              <HStack m={4} spacing={6}>
                <View style={styles.row}>
                  <Button 
                      title="Scan" 
                      trailing={props => <FontAwesome name="barcode" size={24} color="white" />} 
                      disable={text !== ''} 
                      onPress={() => {
                    handleData();
                    setScanned(false)}
                    } />
                  <Button title={'Pass command'} disable={text !== ''}  onPress={details} />
                </View>
              </HStack>
            </View>
          </View>
        </Modal>}

        { !scanned && <ImageBackground
          source={require('../assets/barcode.png')}
          resizeMode="contain"
          style={styles.bg}
          >
        </ImageBackground>}
        {/* <View style={{bottom: 20}}>
          <Button title={'Details'} onPress={details} />
        </View> */}
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
  row: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
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
  bg:{
    flex: 1,
    justifyContent: 'center',
    // alignContent: 'center',
    width: 300,
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