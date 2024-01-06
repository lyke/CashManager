import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput, SafeAreaView, TouchableHighlight
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
// import { useState } from 'react';
import React from 'react';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Style from '../styles/style';

export default function ManagerInterface() {

  const styles = Style;
  // const route = useRoute();
  // const { produit } = route.params;
  const navigation = useNavigation();
  // const [categories, setCategories] = React.useState(produit.map((product) => product.category));

  // const [newCategory, setNewCategory] = React.useState('');
  // const addCategoryPopUp = () => {
  //   setModalVisible(true);
  // };
  // const goToCategory = (category) => {

  //   navigation.navigate('ManagerCategoryInterface');
  // };
  // const addCategory = () => {
  //   setCategories([...categories, { name: newCategory }]);
  //   setNewCategory('');
  // };

  // const deleteCategory = (categoryToDelete) => {
  //   const updatedCategories = categories.filter((category) => category.name != categoryToDelete.name);
  //   setCategories(updatedCategories);
  // };

  // const [modalVisible, setModalVisible] = useState(false);
  return (

    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Espace manager</Text>
      </View>
      <View style={{width:'80%', alignItems:'center'}}>
        <TouchableOpacity style={styles.button}
                          onPress={() => {
                            navigation.navigate('ManagerAddProduct');
                          }}>
          <Text style={styles.buttonText}>Ajouter un produit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
                          onPress={() => {
                            navigation.navigate('ManagerProductInterface');
                          }}>
          <Text style={styles.buttonText}>Modifier / Suprimer un produit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
                          onPress={() => {
                            navigation.navigate('Home');
                          }}>
          <Text style={styles.buttonText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
