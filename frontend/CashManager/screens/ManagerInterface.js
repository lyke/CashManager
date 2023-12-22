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

      {/* {!categories ? (
        categories.map((category, index) => (
          <View key={index} style={styles.categoryContainer}>
            <TouchableOpacity onPress={() => goToCategory(category)}>
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteCategory(category)}>
              <Icon name="times" size={30} color="black" />
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text>No categories available</Text>
      )} */}

      {/* {categories.map((category, index) => {
        return (
          <View key={index} style={styles.categoryContainer}>
            <TouchableOpacity key={index} onPress={goToCategory}>
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity key={category.name} onPress={() => deleteCategory(category)}>
              <Icon name="times" size={30} color="black"/>
            </TouchableOpacity>
          </View>
        );
      })} */}
{/*
      <TouchableOpacity style={styles.button}
                        onPress={addCategoryPopUp}>
        <Text>Ajouter une catégorie</Text>
      </TouchableOpacity> */}

      {/* <Modal style={styles.modal}
             animationType="slide"
             transparent={true}
             visible={modalVisible}
             onRequestClose={() => {
               setModalVisible(!modalVisible);
             }}>
        <SafeAreaView style={styles.modalContent}>
          <TextInput style={styles.categoryContainer}
                     onChangeText={(text) => setNewCategory(text)}
                     value={newCategory}
                     placeholder="Fruits"
          />
          <TouchableHighlight onPress={addCategory} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableHighlight>

        </SafeAreaView>

      </Modal> */}

      <TouchableOpacity style={styles.button}
                        onPress={() => {
                          navigation.navigate('ManagerAddProduct');
                        }}>
        <Text>Ajouter un produit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
                        onPress={() => {
                          navigation.navigate('ManagerProductInterface');
                        }}>
        <Text>Modifier / Suprimer un produit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}
                        onPress={() => {
                          navigation.navigate('Home');
                        }}>
        <Text>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
}
