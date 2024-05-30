import { productService } from '/Backend/Service/ProductService.js'; 
import { producto } from '/Backend/Entities/Product.js';


const product = JSON.parse(localStorage.getItem('product')); // trayendo el id del producto
console.log(product);
const formUpdate = document.querySelector('[data-update]');
const divContainer = document.querySelector('[data-ex]');

formUpdate.name.value = product.name;
formUpdate.price.value = product.price;
formUpdate.description.value = product.description;
formUpdate.category.value = product.category;
formUpdate.image.value = product.image;
formUpdate.id.value = product.id;

formUpdate.addEventListener('submit', async (e) => {
    e.preventDefault();
    const productUpdated= new producto.product(formUpdate.name.value, 
        formUpdate.price.value, 
        formUpdate.description.value, 
        formUpdate.category.value, 
        formUpdate.image.value,
        formUpdate.id.value);
    const response = await productService.updateProduct(productUpdated);
    if(response){
        alert('Producto actualizado '+response);
    }
    
});

async function renderProduct() {
   
    const card = document.createElement('div');
    card.className = 'onecard';
    card.innerHTML += `
        <img src="${product.image}" alt="${product.name} ">
        <div class="card-content" >
            <h2 class="card-title">${product.name}</h2>
            <p class="card-category">${product.category}</p>
            <p class="card-description">${product.description}</p>
            <p class="card-price">$${product.price}</p>
        </div> 
        `;
    divContainer.appendChild(card);
}
document.addEventListener('DOMContentLoaded', renderProduct);