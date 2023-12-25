import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Picker, Switch, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Style from '../styles/style';
import axios from 'axios';


export default function ManagerProductInterface() {

  const styles = Style;
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productId, setProductId] = useState('');
  const navigation = useNavigation();
  // const route = useRoute();


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  const getCategories = () => {
    const uniqueCategories = Array.from(new Set(products.map(product => product.category)));
    return uniqueCategories;
  };
  const categories = getCategories();

  const updateProduct = async () => {
    try {
      const updatedProduct = {
        name: productName,
        price: productPrice,
        description: productDescription,
        category: productCategory,
      };
      const response = await axios.put(`http://localhost:5001/api/products/${productId}`, updatedProduct);
      console.log('Product updated successfully', response.data);
      navigation.navigate('Home', { newProduct: response.data });
    } catch (error) {
      console.error('Error updating product', error);
    }
  };

  const deleteProduct = async () => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/products/${productId}`);
      console.log('Product deleted successfully', response.data);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  const handleProductNameChange = (text) => {
    setProductName(text);
  };
  const handleProductIdChange = (text) => {
    setProductId(text);
  };

  const handleProductPriceChange = (text) => {
    setProductPrice(text);
  };

  const handleProductDescriptionChange = (text) => {
    setProductDescription(text);
  };
  const handleProductCategoryChange = (text) => {
    setProductCategory(text);
  };

  const handleModifyClick = async () => {
    // Verification de remplissage des champs
    if (!productId || !productName || !productPrice || !productDescription || !productCategory){
      Alert.alert('Attention', 'Veuillez remplir tous les champs.');
      return;
    }
    // Appel de la fonction de mise à jour du produit
    await updateProduct(productId, productName, productPrice, productDescription, productCategory);
  };

  const handleDeleteClick = async () => {
    if (!productId){
      Alert.alert('Attention', 'Veuillez sélectionner un produit.');
      return;
    }
    await deleteProduct(productId);
    // Logique pour supprimer le produit
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Modifier un produit</Text>
    </View>

      <Picker
        style={styles.input}
        selectedValue={productId}
        onValueChange={value => setProductId(value)}
      >
      <Picker.Item label="Produit" value={null} />
        {products.map(product => (
          <Picker.Item key={product.id} label={product.name} value={product.id} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        value={productName}
        onChangeText={handleProductNameChange}
        placeholder="Nom du produit"
      />
      <TextInput
        style={styles.input}
        value={productPrice}
        onChangeText={handleProductPriceChange}
        placeholder="Prix du produit"
      />
      <TextInput
        style={styles.input}
        value={productDescription}
        onChangeText={handleProductDescriptionChange}
        placeholder="Description du produit"
      />

      <Picker
        style={styles.input}
        selectedValue={productCategory}
        onValueChange={value => setProductCategory(value)}
      >
        <Picker.Item label="Catégorie du produit" value={null} />
        {categories.map((category, index) => (
          <Picker.Item key={index} label={category} value={category} />
        ))}
      </Picker>

      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text>Nouvelle Catégorie</Text>
      </View>

      {isEnabled && (
        <TextInput
          style={styles.input}
          value={productCategory}
          onChangeText={handleProductCategoryChange}
          placeholder="Catégorie du produit"
        />
      )}
      <View style={{width:'80%', alignItems:'center'}}>
        <TouchableOpacity style={styles.button} onPress={handleModifyClick}>
          <Text style={styles.buttonText}>Modifier</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDeleteClick}>
          <Text style={styles.buttonText}>Supprimer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
                          onPress={() => {
                            navigation.navigate('Home');
                          }}>
          <Text style={styles.buttonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
