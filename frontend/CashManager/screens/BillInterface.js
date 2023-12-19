import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function BillInterface() {

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

  const deleteProduct = (productToDelete) => {
    const updatedBill = bill.filter((product) => product.name !== productToDelete.name);
    setBill(updatedBill);
  };

  return (

    <View style={styles.container}>
      <Text style={styles.title}>Bill</Text>

      {bill.map((product, index) => {
        return (
          <View style={styles.categoryContainer}>
            <Text key={product.name} style={styles.categoryText}>{product.name}</Text>
            <Text key={product.price} style={styles.categoryText}>{product.price} €</Text>
            <TouchableOpacity key={product.index} onPress={() => deleteProduct(product)}>
              <Icon name="times" size={30} color="black"/>
            </TouchableOpacity>
          </View>
        );
      })}

      <TouchableOpacity style={styles.button}
                        onPress={() => {
                          navigation.navigate('PaimentInterface');
                        }}>
        <Text>Procéder au paiement</Text>
        <Text>{bill.reduce((price,product) =>  price = price + product.price , 0 )} €</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
                        onPress={() => {
                          navigation.navigate('Home');
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
