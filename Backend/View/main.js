import { productService } from "../Service/ProductService.js";
import { producto } from "../Entities/Product.js";

// Path: main.js

const containerCards= document.querySelector('[data-cards]');
const form = document.querySelector('[data-form]');


function createCard(product){
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML += `
    <div class="card-header" data-cardHeader>
    <img src="${product.image}" alt="${product.name} ">
    </div>
    <div class="card-content">
        <h2 class="card-title">${product.name}</h2>
        <p class="card-category">${product.category}</p>
        <p class="card-description">${product.description}</p>
        <p class="card-price">$${product.price}</p>
        <button class="btn-update" data-update><span class="material-symbols-outlined">
        edit
        </span></button>
        <button class="btn-delete" data-clear><span class="material-symbols-outlined">
        delete
        </span></button>
    </div> 
    `;
    // Agregar eventos a los botones; se crean dentro de la función para que cada card tenga sus propios eventos y no se mezclen
    const btnUpdate = card.querySelector('[data-update]'); // Selecciona el botón de editar de la card actual
    btnUpdate.addEventListener('click', () => {
        window.location.href = 'Front/pages/update.html';
        const obj=JSON.stringify(product);
        localStorage.setItem('product',obj);
        
    });
   
    const btnDelete = card.querySelector('[data-clear]'); // Selecciona el botón de eliminar de la card actual
    btnDelete.addEventListener('click', async () => {    // Agrega un evento al botón de eliminar de la card actual
        const response = await productService.deleteProduct(product.id);
        console.log(response);
        if(response!=undefined){
            renderizar();
        }
    });
    return card;
}

// Esta función se encarga de obtener los productos y renderizarlos en el DOM
async function renderProducts(){
    const products = await productService.getAllProducts();
    products.forEach(product => {
        containerCards.appendChild(createCard(product));
    });
}


document.addEventListener('DOMContentLoaded', renderProducts);

// Este evento se dispara cuando se envía el formulario de creación de productos
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = form.name.value;
    const price = form.price.value;
    const description = form.description.value;
    const category = form.category.value;
    const image = form.image.value;
    const id = form.id.value;
    const response = await productService.createProduct(name, price, description, category, image,id);
    console.log(response);
    if(response!=undefined){
        renderProducts();
    }
});


