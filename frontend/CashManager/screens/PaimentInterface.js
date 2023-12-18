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

export default function PaimentInterface() {

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


  // return (
  //
  //   <View style={styles.container}>
  //     <Text style={styles.title}>Paiment</Text>
  //
  //     <Text
  //       style={styles.categoryContainer}>{bill.reduce((price, product) => price = price + product.price, 0)} €</Text>
  //
  //
  //     <TouchableOpacity style={styles.button}
  //                       onPress={() => {
  //                         navigation.navigate('BillInterface');
  //                       }}>
  //       <Text>Précédent</Text>
  //     </TouchableOpacity>
  //   </View>
  // );

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

  if (hasPermission === null) {
    return <View/>;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission not granted</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
  );


}

const styles = StyleSheet.create({
    paragraph: {
      fontSize: 16,
      marginBottom: 40,
    },
    cameraContainer: {
      width: '80%',
      aspectRatio: 1,
      overflow: 'hidden',
      borderRadius: 10,
      marginBottom: 40,
    },
    camera: {
      flex: 1,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,

    },
    title: {
      fontSize: 24,
      borderRadius: 10,
      width: '100%',
      textAlign: 'center',
      marginBottom: 20,
      backgroundColor: '#c0dcb5',
    },
    categoryContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
      backgroundColor: '#eff5c6',
      borderRadius: 10,
      width: '80%',
      height: '5%'
    },
    categoryText: {
      fontSize: 18,
    },
    button: {
      borderRadius: 20,
      padding:
        10,
      elevation:
        2,
      width: '100%',
      textAlign: 'center',
      marginBottom: 20,
      backgroundColor: '#729365',
    }
  })
;
