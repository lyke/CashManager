import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import Style from '../styles/style';

export default function PaimentInterface() {

  const styles = Style;
  const navigation = useNavigation();
  const [bill, setBill] = React.useState([
    {
      name: 'Burger poulet',
      price: 6,
    },
    {
      name: 'Burger beef',
      price: 6,
    },
    {
      name: 'Frites small',
      price: 6,
    },
    {
      name: 'Coca small',
      price: 6,
    }
  ]);


  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({
    type,
    data
  }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
        />
      </View>
    );
  };


  return (

    <View style={styles.container}>
      <Text style={styles.title}>Paiment</Text>

      <Text
        style={styles.categoryContainer}>{bill.reduce((price, product) => price = price + product.price, 0)} €</Text>




      { hasPermission === null ?
          <View/>
        : hasPermission === false ?
          <View style={styles.container}>
            <Text style={styles.text}>Camera permission not granted</Text>
          </View>
        : <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Barcode Scanner App!</Text>
            <Text style={styles.paragraph}>Scan a barcode to start your job.</Text>
            {renderCamera()}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setScanned(false)}
            disabled={scanned}
          >
            <Text style={styles.buttonText}>Scan QR to Start your job</Text>
          </TouchableOpacity>
        </View>
      }

      <TouchableOpacity style={styles.button}
                        onPress={() => {
                          navigation.navigate('BillInterface');
                        }}>
        <Text>Précédent</Text>
      </TouchableOpacity>
    </View>
  );
};
