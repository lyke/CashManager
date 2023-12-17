import React, { useState } from 'react';

function ManagerProductInterface() {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    };

    const handleProductPriceChange = (event) => {
        setProductPrice(event.target.value);
    };

    const handleProductDescriptionChange = (event) => {
        setProductDescription(event.target.value);
    };

    const handleModifyClick = () => {
        // Logique pour modifier le produit
    };

    const handleDeleteClick = () => {
        // Logique pour supprimer le produit
    };

    return (
        <div>
            <h1>Manager Product Interface</h1>
            <input type="text" value={productName} onChange={handleProductNameChange} placeholder="Product Name" />
            <br />
            <input type="text" value={productPrice} onChange={handleProductPriceChange} placeholder="Product Price" />
            <br />
            <input type="text" value={productDescription} onChange={handleProductDescriptionChange} placeholder="Product Description" />
            <br />
            <button onClick={handleModifyClick}>Modify</button>
            <button onClick={handleDeleteClick}>Delete</button>
        </div>
    );
}

export default ManagerProductInterface;
