import { producto } from "../Entities/Product.js";


async function getAllProducts() {
    try {
        const response = await fetch('http://localhost:3001/product', { method: 'GET' });
        const data = await response.json();
        let listaDeProductos = [];
        data.forEach((e) => {
            listaDeProductos.push(new producto.product(e.name, e.price, e.description, e.category, e.image, e.id));
        });
        
        return listaDeProductos;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

async function createProduct(product) {
    try {
        const response = await fetch('http://localhost:3001/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
        if (!response.ok) {
            return null;
        }
        return response.ok;
    } catch (error) {
        throw new Error("Ha ocurrido un error al crear")
    }
    
}
async function deleteProduct(id) {
    try {
        const response = await fetch(`http://localhost:3001/product/${id}`, {
            method: 'DELETE'
        })
        if (!response.ok) {
            return null;
        }
        return response.ok;
    }
    catch (error) {
        throw new Error("Ha ocurrido un error al eliminar")
    }
}
async function updateProduct(product) {
   try {
        const response = await fetch(`http://localhost:3001/product/${product.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
        if (!response.ok) {
            return null;
        }
        return response.ok;

    } catch (error) {
        throw new Error("Ha ocurrido un error al actualizar")
    }
}
async function getProductById(id) {
    try {
        const response = await fetch(`http://localhost:3001/product/${id}`, { method: 'GET' });
        if(!response.ok){
            return null;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}



export const apiConnection = {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    getProductById
};

