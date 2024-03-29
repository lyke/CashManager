import { Text, TouchableOpacity, View, } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Style from '../styles/style';
import { useConstants } from './Constants';

export default function BillInterface() {

  const styles = Style;
  const route = useRoute();
  const navigation = useNavigation();
  const { selectedProds, setSelectedProds } = useConstants();
  const deleteProduct = (productToDelete) => {
    const indexToRemove = selectedProds.findIndex(product => product.name === productToDelete.name);

    if (indexToRemove !== -1) {
      const updatedSelectedProds = [...selectedProds];
      updatedSelectedProds.splice(indexToRemove, 1);
      setSelectedProds(updatedSelectedProds);
    }
    console.log(selectedProds);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Bill</Text>
      </View>
      {console.log(selectedProds)}
      {selectedProds && selectedProds.length > 0 ? (
        selectedProds.map((product, index) => (
          <View style={styles.categoryContainer} key={index}>
            <Text style={styles.categoryText}>{product.name}</Text>
            <Text style={styles.categoryText}>{product.price} €</Text>
            <TouchableOpacity key={product.index} onPress={() => deleteProduct(product)}>
              <Icon name="times" size={30} color="black"/>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text>Aucun produit selectioné.</Text>
      )}
      {selectedProds && selectedProds.length > 0 && (
        <TouchableOpacity style={styles.button}
                          onPress={() => {
                            navigation.navigate('PaimentInterface');
                          }}>
          <Text style={styles.buttonText}>Procéder au paiement</Text>
          <Text
            style={styles.buttonText}>{selectedProds.reduce((price, product) => price = price + product.price, 0).toFixed(2)} €</Text>
        </TouchableOpacity>
        )}
      <TouchableOpacity style={styles.button}
                        onPress={() => {
                          navigation.navigate('Home');
                        }}>
        <Text style={styles.buttonText}>Précédent</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.endButton}
                        onPress={() => {
                          navigation.navigate('Home');
                          setSelectedProds([]);
                        }}>
        <Text style={styles.buttonText}>Quitter</Text>
      </TouchableOpacity>
    </View>
  );
}
