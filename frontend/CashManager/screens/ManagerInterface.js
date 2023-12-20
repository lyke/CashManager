import {
  Modal,
  Pressable,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput, SafeAreaView, TouchableHighlight
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ManagerInterface() {
  const route = useRoute();
  const { produit } = route.params;
  const navigation = useNavigation();
  const [categories, setCategories] = React.useState(produit.map((product) => product.category))

  const [newCategory, setNewCategory] = React.useState('');
  const addCategoryPopUp = () => {
    setModalVisible(true);
  };
  const goToCategory = (category) => {
    
      navigation.navigate('ManagerCategoryInterface');
  };
  const addCategory = () => {
    setCategories([...categories, { name: newCategory }]);
    setNewCategory('');
  };

  const deleteCategory = (categoryToDelete) => {
    const updatedCategories = categories.filter((category) => category.name != categoryToDelete.name);
    setCategories(updatedCategories);
  };

  const [modalVisible, setModalVisible] = useState(false);
  return (

    <View style={styles.container}>
      <Text style={styles.title}>Espace manager</Text>

      {categories.map((category, index) => {
        return (
          <View key={index} style={styles.categoryContainer}>
            <TouchableOpacity key={index} onPress={goToCategory}>
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity key={category.name} onPress={() => deleteCategory(category)}>
              <Icon name="times" size={30} color="black" />
            </TouchableOpacity>
          </View>
        );
      })}

      <TouchableOpacity style={styles.button}
        onPress={addCategoryPopUp}>
        <Text>Ajouter une catégorie</Text>
      </TouchableOpacity>

      <Modal style={styles.modal}
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

      </Modal>

      <TouchableOpacity style={styles.button}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    minWidth: 300,
    maxWidth: 400,
    minHeight: 200,
    maxHeight: 300,
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
