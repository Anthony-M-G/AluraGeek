import { apiConnection } from "../API/apiConnection.js";
import { producto } from "../Entities/Product.js";

const getAllProducts = async () => {
    const response = await apiConnection.getAllProducts();
    if(response.length==0){
        return "No hay productos disponibles";
    }
    return response.map(e=>new producto.product(e.name, e.price, e.description, e.category, e.image,e.id));
}

const createProduct = async (name, price, description, category, image,id) => {
    const products = await getAllProducts();
    if(products.find(e=>e.id==id)){
        return "El producto ya existe";
    }
    const response = await apiConnection.createProduct(new producto.product(name, price, description, category, image,id));
    if(!response.ok){
        return "Ha ocurrido un error al crear el producto";
    }
}

const deleteProduct = async (id) => {
    const products = await getAllProducts();
    if(products.find(e=>e.id==id)){
        const response = await apiConnection.deleteProduct(id);
        alert("Producto eliminado")
        return response;
    }
    return "El producto no existe";
}


const updateProduct = async (product) => {
    const products = await getAllProducts();
    if(products.find(e=>e.id==product.id)){
        const response = await apiConnection.updateProduct(product);
        return response;
    }
    return "El producto no existe";
}


const getProductById = async (id) => {
    const products = await getAllProducts();
    if(products.find(e=>e.id==id)){
    const response = await apiConnection.getProductById(id);
    return response;
    }
    return "El producto no existe";
}

export const productService = {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    getProductById

};