import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function ManagerProductInterface() {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');

    const handleProductNameChange = (text) => {
        setProductName(text);
    };

    const handleProductPriceChange = (text) => {
        setProductPrice(text);
    };

    const handleProductDescriptionChange = (text) => {
        setProductDescription(text);
    };

    const handleModifyClick = () => {
        // Logique pour modifier le produit
    };

    const handleDeleteClick = () => {
        // Logique pour supprimer le produit
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modifier un produit</Text>
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
            <TouchableOpacity style={styles.button} onPress={handleModifyClick}>
                <Text style={styles.buttonText}>Modifier</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleDeleteClick}>
                <Text style={styles.buttonText}>Supprimer</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E2EBCF',
        padding: 20,
        borderRadius: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        backgroundColor: '#C7DDC5',
        padding: 10,
        borderRadius: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: '80%',
    },
    button: {
        backgroundColor: '#9ECDA8',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
