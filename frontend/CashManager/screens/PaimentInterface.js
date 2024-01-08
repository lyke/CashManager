import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Style from '../styles/style';
import axios from 'axios';
import { useConstants } from './Constants';

export default function PaimentInterface() {
  const route = useRoute();
  // const { commande } = route.params;

  const styles = Style;
  const navigation = useNavigation();
  // const [bill] = React.useState(commande);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { selectedProds, setSelectedProds } = useConstants();


  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({
    type,
      data
    }) => {
    try {
      setScanned(true);
      const newTransaction = {
        mailToDebit: data,
        mailToCredit: "timothee.baudequin@epitech.eu",
        amount: selectedProds.reduce((price, product) => price = price + product.price, 0)
      };

      const response = await axios.post(
        'https://cash-manager-banque.vercel.app/api/transactions',
        newTransaction);
      console.log('Transaction successfull', response.data);

      window.alert(`Transaction successfull!`);
      setSelectedProds([]);
      navigation.navigate('Home');
    } catch (error) {
      let message = "";
      if (error.message.includes("404")) {
        message = "Insufficient funds or unknown account"
      }
      setScanned(false);
      console.error('Error during transaction', error);
      window.alert('Error during transaction: ' + message);
    }
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
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Paiment</Text>
      </View><View style={styles.categoryContainer}>
      <Text style={styles.categoryText}>
        {selectedProds.reduce((price, product) => price = price + product.price, 0).toFixed(2)} €
      </Text>
    </View>
      {hasPermission === null ?
        <View/>
        : hasPermission === false ?
          <View style={styles.container}>
            <Text style={styles.categoryText}>Camera permission not granted</Text>
          </View>
          : <View>
            <Text style={styles.categoryText}>Paiement par QRCode : </Text>
            <Text style={styles.categoryText}>Veuillez scannez votre carte de paiement.</Text>
            {renderCamera()}
            {/* <TouchableOpacity */}
            {/*   style={styles.button} */}
            {/*   onPress={() => setScanned(false)} */}
            {/*   disabled={scanned} */}
            {/* > */}
            {/* </TouchableOpacity> */}
          </View>
      }
      <TouchableOpacity style={styles.button}
                        onPress={() => {
                          setSelectedProds([]);
                          navigation.navigate('Home');
                          window.alert(`Order sent successfully!`);
                        }}>
        <Text style={styles.buttonText}>Payer en espèce</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
                        onPress={() => {
                          navigation.navigate('BillInterface');
                        }}>
        <Text style={styles.buttonText}>Précédent</Text>
      </TouchableOpacity>
    </View>
  );
};
