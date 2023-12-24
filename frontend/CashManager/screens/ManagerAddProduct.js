import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Switch, Picker } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Style from '../styles/style';
import axios from 'axios';


export default function ManagerAddProduct() {

  const styles = Style;
  const navigation = useNavigation();
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [products, setProducts] = useState([]);

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

  const createProduct = async (newProduct) => {
    try {
      const newProduct = {
        name: productName,
        price: productPrice,
        description: productDescription,
        category: productCategory,
      };
      const response = await axios.post('http://localhost:5001/api/products', newProduct);
      console.log('Product created successfully', response.data);
      navigation.navigate('Home', { newProduct: response.data });
    } catch (error) {
      console.error('Error creating product', error);
    }
  };


  const handleProductNameChange = (text) => {
    setProductName(text);
  };

  const handleProductPriceChange = (text) => {
    setProductPrice(text);
  };

  const handleProductDescriptionChange = (text) => {
    setProductDescription(text);
  };
  const handleProductCategoryChange = (text) => {
    setProductCategory(text);
  }
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un produit</Text>
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
        {categories.map(category => (
          <Picker.Item key={category} label={category} value={category} />
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
      <TouchableOpacity style={styles.button} onPress={createProduct}>
        <Text style={styles.buttonText}>Ajouter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
                        onPress={() => {
                          navigation.navigate('Home');
                        }}>
        <Text style={styles.buttonText}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
}
