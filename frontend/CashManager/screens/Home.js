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

const { height: windowHeight } = Dimensions.get('window');

export default function Home() {

  const styles = Style;
  const navigation = useNavigation();
  const [lastPressTime, setLastPressTime] = useState(0);
  const [pressCount, setPressCount] = useState(0);
  const timeThreshold = 500; // 500 ms entre chaque pression
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);


  // Met à jour la liste des produits à chaque fois que l'écran est affiché
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProducts();
    });

    return unsubscribe;
  }, [navigation]);


  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

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

  // const [selectedCategory, setSelectedCategory] = useState(() => {
  //   return categories.length >= 1 ? categories[0] : null}
  // );

  // const [selectedCategory, setSelectedCategory] = useState(categories.length >= 1 ? `${categories[0]}` : '');


  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  const selectedProducts = (category) => products.filter(product => product.category === category);
  const [productList, setProductList] = useState([]);
  const addProductToProductList = (product) => {
    setProductList(prevList => [...prevList, product]);
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={handlePress} style={{
        height: windowHeight * 2 / 100,
        opacity: 0,
        position: 'fixed',
        right: 10,
        zIndex: 1
      }}>
        <Text>Connection</Text>
      </TouchableOpacity> */}
      <View style={{height: windowHeight * 2 / 100,}}>
      </View>

      <View style={styles.titleContainer}>
        {getCategories()
          .map((category, index) => {
            return <TouchableOpacity key={index} onPress={() => handleCategoryPress(category)}>
              <Text style={styles.title}>{category}</Text>
            </TouchableOpacity>;
          })}
      </View>


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
      <View style={styles.selectionList}>
        <ScrollView>
          <TouchableOpacity onPress={handlePress}>
            <Text>Ma commande :</Text>
          </TouchableOpacity>
          {productList.map((product, index) => {
              return <Text key={index}>- {product.name}</Text>;
            }
          )}
        </ScrollView>
      </View>

        <TouchableOpacity
          style={styles.endButton}
          onPress={() => {
            navigation.navigate('BillInterface', { commande: productList });
          }}>
          <Text style={styles.buttonText}>Payer {productList.reduce((total, product) => total + product.price, 0)} €</Text>
        </TouchableOpacity>
    </View>
  );
}
