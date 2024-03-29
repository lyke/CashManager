import { Text, TouchableOpacity, View, StyleSheet, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const { width: windowWidth } = Dimensions.get('window');
const { height: windowHeight } = Dimensions.get('window');

export default function ProductCard({name, price, image}) {

  const navigation = useNavigation();

  const styles = StyleSheet.create({
    productTitleContainer: {
      backgroundColor: '#D9D9D9',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 10,
      width: windowWidth / 2.5,
      padding: '2%',
      // marginTop: '3%',
      // marginBottom: '10%',
      // margin: 10,
    },
    productImageContainer: {
      width: windowWidth / 2.5,
      height: windowWidth / 2.5,
      alignItems: 'center',
      borderRadius: 10,
      margin: 10,
    },
    productImage: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      borderRadius: 10,
    },
    productCard: {
      margin: '2%',
    },
  });

  return (
    <View style={styles.productCard}>
      {/* <View style={styles.productImageContainer}>
        <Image source={{uri: image}} style={styles.productImage}/>
      </View> */}
      <View style={styles.productTitleContainer}>
        <Text>{name}</Text>
        <Text style={{fontWeight: '600'}}>{price}€</Text>
      </View>
    </View>
  );
}
