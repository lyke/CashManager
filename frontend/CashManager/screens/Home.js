import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../components/ProductCard';
import Style from '../styles/style';
import { useConstants } from './Constants';

const { height: windowHeight } = Dimensions.get('window');

export default function Home() {

  const styles = Style;
  const navigation = useNavigation();
  const [lastPressTime, setLastPressTime] = useState(0);
  const [pressCount, setPressCount] = useState(0);
  const timeThreshold = 500; // 500 ms entre chaque pression (5 taps pour accéder à l'interface manager)
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);


  // Met à jour la liste des produits à chaque fois que l'écran est affiché
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProducts();
    });
    return unsubscribe;
  }, [navigation]);

  // Récupère la liste des produits depuis l'API
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://cash-manager-back.vercel.app/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };
  // logique du bouton secret d'accès à l'interface manager
  const handlePress = () => {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - lastPressTime;
    if (elapsedTime <= timeThreshold) {
      setPressCount(pressCount + 1);
      if (pressCount === 4) {
        navigation.navigate('ManagerConnection', { products: products });
        setPressCount(0);
      }
    } else {
      setPressCount(1);
    }
    setLastPressTime(currentTime);
  };

  // retourne la liste des catégories uniques
  const getCategories = () => {
    const uniqueCategories = Array.from(new Set(products.map(product => product.category)));
    return uniqueCategories;
  };
  const categories = getCategories();

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  const selectedProducts = (category) => products.filter(product => product.category === category);
  // const [productList, setProductList] = useState([]);
  // const addProductToProductList = (product) => {
  //   setProductList(prevList => [...prevList, product]);
  // };
  const { selectedProds, setSelectedProds } = useConstants();
  const addProductToProductList = (product) => {
    setSelectedProds(prevList => [...prevList, product]);
  };

  return (
    <View style={styles.container}>
      <View style={{height: windowHeight * 2 / 100,}}>
      </View>
      {/* parcours des produits pour afficher les catégories disponibles */}
      <View style={styles.titleContainer}>
        {categories.map((category, index) => {
          return <TouchableOpacity key={index} onPress={() => handleCategoryPress(category)}>
            <Text style={styles.title}>{category}</Text>
          </TouchableOpacity>;
        })}
      </View>
      {/* affichage des produits appartenant à la catégorie sélectionnée */}
      <View style={styles.productContainer}>
        {selectedProducts(selectedCategory)
          .map((item, index) => (
            <View key={index} style={styles.homeProductsContainer}>
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  addProductToProductList(item);
                }}>
                <ProductCard
                  key={item.id}
                  name={item.name}
                  price={item.price}
                />
              </TouchableOpacity>
            </View>
          ))}
      </View>
      {/* fenêtre d'affichages des produits sélectionnés */}
      <View style={styles.selectionList}>
        <ScrollView>
          <TouchableOpacity onPress={handlePress}>
            <Text>Ma commande :</Text>
          </TouchableOpacity>
          {/* {productList.map((product, index) => { */}
          {selectedProds.map((product, index) => {
              return <Text key={index}>- {product.name}</Text>;
            }
          )}
        </ScrollView>
      </View>
      {/* bouton pour payer */}
        <TouchableOpacity
          style={styles.endButton}
          onPress={() => {
            // navigation.navigate('BillInterface', { commande: selectedProds });
            navigation.navigate('BillInterface');
            // navigation.navigate('BillInterface', { commande: productList });
          }}>
          <Text style={styles.buttonText}>Payer {selectedProds.reduce((total, product) => total + product.price, 0)} €</Text>
          {/* <Text style={styles.buttonText}>Payer {productList.reduce((total, product) => total + product.price, 0)} €</Text> */}
        </TouchableOpacity>
    </View>
  );
}
