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
      flexDirection: 'row',
      // flexWrap: 'wrap',
      // justifyContent: 'space-between',
      // alignContent: 'center',
      // width: windowWidth,
      alignItems: 'space-around',
      height: windowHeight/100*68



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
    }
  });

  return (
    <View style={{alignItems: 'center'}}>
      <View style= {styles.categoriesNavbar}>
        {/* {categories.map((category, index) => {
          return <TouchableOpacity key={index} onPress={()=>{navigation.navigate('ManagerProductInterface')}}>
            <View>
              <Text>{category.name}</Text>
            </View>
          </TouchableOpacity>
        })} */}
      </View>

      <TouchableOpacity onPress={handlePress} style={{height: windowHeight*2/100, flexDirection: 'row', justifyContent: 'center', opacity: 0}}>
        <Text >Connection</Text>
      </TouchableOpacity>
      <View key={"jean"} style={styles.productContainer}>
        {products.map((product, index) => {
          {console.log(products);}
          {console.log(product);}
          return (
            <View key={index}>
          <Text>Produit</Text>
          <Text>{product.name}</Text>
          </View>
          )
          
        })}
        {/* <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard
              key={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          )}
        /> */}
      </View>
      <View style= {styles.selectionList}>
        <Text>Selection List</Text>
      </View>
      <View style={styles.totalContainer}>
        <View style={styles.total}>
          <Text>Total</Text>
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
