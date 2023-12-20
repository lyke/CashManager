import { Modal,Text, StyleSheet, TouchableOpacity,View,TextInput, SafeAreaView, TouchableHighlight} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ManagerCategoryInterface() {
    const route = useRoute();
    const { produit } = route.params;
    const navigation = useNavigation();
    const [products, setProduct] = useState(produit)

    const [newProduct, setNewProduct] = React.useState('');
    const addProductPopUp = () => {
        setModalVisible(true);
    };
    const goToProduct = (product) => {

        navigation.navigate('ManagerProductInterface');
    };
    const addProduct = () => {
        setProduct([...products, { name: newProduct }]);
        setNewProduct('');
        setModalVisible(false);
    };

    const deleteProduct = (productToDelete) => {
        const updatedProduct = products.filter((product) => product.name != productToDelete.name);
        setProduct(updatedProduct);
    };

    const [modalVisible, setModalVisible] = useState(false);
    return (

        <View style={styles.container}>
            <Text style={styles.title}>Category manager</Text>

            {products.map((product, index) => {
                return (
                    <View key={index} style={styles.productContainer}>
                        <TouchableOpacity key={index} onPress={goToProduct}>
                            <Text style={styles.productText}>{product.name}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity key={product.name} onPress={() => deleteProduct(product)}>
                            <Icon name="times" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                );
            })}

            <TouchableOpacity style={styles.button}
                onPress={addProductPopUp}>
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
                    <TextInput style={styles.productContainer}
                        onChangeText={(text) => setNewProduct(text)}
                        value={newProduct}
                        placeholder="Fruits"
                    />
                    <TouchableHighlight onPress={addProduct} style={styles.button}>
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
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        backgroundColor: '#eff5c6',
        borderRadius: 10,
        width: '80%',
        height: '5%'
    },
    productText: {
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
