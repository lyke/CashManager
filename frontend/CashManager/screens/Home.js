import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
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

  const categories = [
    {
      name: 'Menu'
    },
    {
      name: 'Salades'
    },
    {
      name: 'Boissons'
    },
    {
      name: 'Desserts'
    }
  ];
  const products = [
    {
      id: 1,
      name: 'Coca',
      price: 2.5,
      category: 'Boisson',
      image: 'https://res.cloudinary.com/dwl5s1v4k/image/upload/v1702553532/caricature-hamburger-delicieux-isole_1308-134213.jpg_loqzzm.avif'
    },
    {
      id: 2,
      name: 'Pepsi',
      price: 2.5,
      category: 'Boisson',
      image: 'https://res.cloudinary.com/dwl5s1v4k/image/upload/v1702553532/caricature-hamburger-delicieux-isole_1308-134213.jpg_loqzzm.avif'
    },
    {
      id: 3,
      name: 'Fanta',
      price: 2.5,
      category: 'Boisson',
      image: 'https://res.cloudinary.com/dwl5s1v4k/image/upload/v1702553532/caricature-hamburger-delicieux-isole_1308-134213.jpg_loqzzm.avif'
    },
    {
      id: 4,
      name: 'Sprite',
      price: 2.5,
      category: 'Boisson',
      image: 'https://res.cloudinary.com/dwl5s1v4k/image/upload/v1702553532/caricature-hamburger-delicieux-isole_1308-134213.jpg_loqzzm.avif'
    },
    {
      id: 5,
      name: 'IceTea',
      price: 2.5,
      category: 'Boisson',
      image: 'https://res.cloudinary.com/dwl5s1v4k/image/upload/v1702553532/caricature-hamburger-delicieux-isole_1308-134213.jpg_loqzzm.avif'
    },
    {
      id: 6,
      name: 'Orangina',
      price: 2.5,
      category: 'Boisson',
      image: 'https://res.cloudinary.com/dwl5s1v4k/image/upload/v1702553532/caricature-hamburger-delicieux-isole_1308-134213.jpg_loqzzm.avif'
    },
    {
      id: 7,
      name: 'Coca',
      price: 2.5,
      category: 'Boisson',
      image: 'https://res.cloudinary.com/dwl5s1v4k/image/upload/v1702553532/caricature-hamburger-delicieux-isole_1308-134213.jpg_loqzzm.avif'
    },
    {
      id: 8,
      name: 'Coca',
      price: 2.5,
      category: 'Boisson',
      image: 'https://res.cloudinary.com/dwl5s1v4k/image/upload/v1702553532/caricature-hamburger-delicieux-isole_1308-134213.jpg_loqzzm.avif'
    },
    {
      id: 9,
      name: 'Coca',
      price: 2.5,
      category: 'Boisson',
      image: 'https://res.cloudinary.com/dwl5s1v4k/image/upload/v1702553532/caricature-hamburger-delicieux-isole_1308-134213.jpg_loqzzm.avif'
    },
    {
      id: 10,
      name: 'Coca',
      price: 2.5,
      category: 'Boisson',
      image: 'https://res.cloudinary.com/dwl5s1v4k/image/upload/v1702553532/caricature-hamburger-delicieux-isole_1308-134213.jpg_loqzzm.avif'
    },
    {
      id: 11,
      name: 'Coca',
      price: 2.5,
      category: 'Boisson',
      image: 'https://res.cloudinary.com/dwl5s1v4k/image/upload/v1702553532/caricature-hamburger-delicieux-isole_1308-134213.jpg_loqzzm.avif'
    }
  ];

  return (
    <View style={styles.container}>
      <View style={{ flexGrow: 1 }}>
        <TouchableOpacity
          onPress={handlePress}
          style={{
            // height: windowHeight * 2 / 100,
            // flex: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center',
            opacity: 0,
            position: 'fixed'
          }}>
          <Text>Connection</Text>
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          {categories.map((category, index) => {
            return <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate('ManagerProductInterface');
              }}>
              <Text style={styles.title}>{category.name}</Text>
            </TouchableOpacity>;
          })}
        </View>
      </View>

      <View style={styles.productContainer}>
        <FlatList
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
        />
      </View>

      <View style={styles.selectionList}>
        <Text>Selection List</Text>
      </View>

      <TouchableOpacity
        style={styles.endButton}
        onPress={() => {
          navigation.navigate('BillInterface');
        }}>
        <Text style={styles.buttonText}>Payer</Text>
      </TouchableOpacity>
    </View>
  )
    ;
}
