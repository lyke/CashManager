import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, ScrollView, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../components/ProductCard';
const { height: windowHeight } = Dimensions.get('window');
const { width: windowWidth } = Dimensions.get('window');

export default function Home() {

  const navigation = useNavigation();
  const [lastPressTime, setLastPressTime] = useState(0);
  const [pressCount, setPressCount] = useState(0);
  const timeThreshold = 500; // 500 ms entre chaque pression
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
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
        navigation.navigate('ManagerConnection');
        setPressCount(0);
      }
    } else {
      setPressCount(1);
    }
    setLastPressTime(currentTime);
  };

  const styles = StyleSheet.create({
    categoriesNavbar: {
      backgroundColor: '#C7DDC5',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingTop: '12%',
      paddingBottom: '3%',
      paddingRight: '7%',
      paddingLeft: '7%',
      borderRadius: 10,
      height: windowHeight*10/100,
      // position: 'sticky',
      // top: 0,
      // zIndex: 100
    },
    productContainer: {
      marginHorizontal: 'auto',
      // flex: 2,
      // display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      // alignItems: 'center',
      flexWrap: 'wrap',
      // width: windowWidth,
      height: windowHeight/100*68,



    },
    selectionList: {
      backgroundColor: '#E2EBCF',
      width: '100%',
      height: windowHeight*15/100,
      padding: '3%',
      borderTopStartRadius: 10,
      borderTopEndRadius: 10,
      zIndex: 100
    },
    totalContainer: {
      // backgroundColor: '#C7DDC5',
      // width: '90%',
      height: windowHeight*5/100,
      // marginTop: windowHeight*1/100,
      padding: '3%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      justifyItems: 'space-between',

      // alignItems: 'center',
      borderRadius: 10,
      // borderBottomStartRadius: 10,
      // borderBottomEndRadius: 10,
      zIndex: 100
    },
    total: {
      backgroundColor: '#C7DDC5',
      width: '50%',
      height: windowHeight*5/100,
      justifyContent: 'center',
      alignItems: 'center'
    },
    payButton: {
      backgroundColor: '#B3DAA5',
      width: '50%',
      height: windowHeight*5/100,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
    },
    flatList: {
      width: '100%',
      height: '100%',
    }
  });


  const [selectedCategory, setSelectedCategory] = useState('Menus');

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  const selectedProducts = (category) => products.filter(product => product.category === category);
  const [productList, setProductList] = useState([]);
  const addProductToProductList = (product) => {
    setProductList(prevList => [...prevList, product]);
  };

  return (
    <View style={{alignItems: 'center'}}>
      <View style= {styles.categoriesNavbar}>
        {categories.map((category, index) => {
          return <TouchableOpacity key={index} onPress={() => handleCategoryPress(category.name)}>
            {/* <View> */}
              <Text>{category.name}</Text>
            {/* </View> */}
          </TouchableOpacity>
        })} */}
      </View>

      <TouchableOpacity onPress={handlePress} style={{height: windowHeight*2/100, flexDirection: 'row', justifyContent: 'center', opacity: 0}}>
        <Text >Connection</Text>
      </TouchableOpacity>
      <View style={styles.productContainer}>
        {/* <FlatList
          style={styles.flatList}
          data={selectedProducts(selectedCategory)}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
              <TouchableOpacity
              onPress={()=>{addProductToProductList(item)}}>
                <ProductCard
                  key={item.id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                />
              </TouchableOpacity>
          )}
        /> */}
        {selectedProducts(selectedCategory).map((item) => (
          <View>
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                addProductToProductList(item);
              }}>
              <ProductCard
                key={item.id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <ScrollView style= {styles.selectionList}>
        <Text>Ma commande :</Text>
        {productList.map((product, index) => {
          return <Text key={index}>- {product.name}</Text>
        }
        )}
      </ScrollView>
      <View style={styles.totalContainer}>
        <View style={styles.total}>
          <Text>Total</Text>
          <Text>
            {productList.reduce((total, product) => total + product.price, 0)} €
          </Text>
        </View>

        <TouchableOpacity
        style={styles.payButton}
        onPress={()=>{navigation.navigate('BillInterface')}}>
          <Text>Payer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
