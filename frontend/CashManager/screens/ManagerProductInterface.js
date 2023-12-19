import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import Style from '../styles/style';

export default function ManagerProductInterface() {

    const styles = Style;
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
