import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

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

  return (

    <View style={styles.container}>
      <Text style={styles.title}>Paiment</Text>

      <Text style={styles.categoryContainer}>{bill.reduce((price,product) =>  price = price + product.price , 0 )} €</Text>


      <TouchableOpacity style={styles.button}
                        onPress={() => {
                          navigation.navigate('BillInterface');
                        }}>
        <Text>Précédent</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
