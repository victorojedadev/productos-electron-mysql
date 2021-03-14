const { remote } = require("electron");
const main = remote.require("./main");

const productForm = document.getElementById("productForm");
const productName = document.getElementById("name");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const productsList = document.getElementById("products");
let products = [];


const getProducts = async () => {
    products = await main.getProducts();
    renderProducts(products);
}

function renderProducts(p) {
    productsList.innerHTML = '';
    p.forEach(product => {
        productsList.innerHTML += `
        <div class="card card-body my-2">
            <h4>${product.nombre}</h4>
            <p>${product.descripcion}</p>
            <h3>${product.precio}$</h3>
            <p>
            <button class="btn btn-secondary btn-sm" onclick="editProduct('${product.id}')">
              Modificar
            </button>
            <button class="btn btn-danger btn-sm" onclick="deleteProduct('${product.id}')">
              Eliminar
            </button>
            </p>

        </div>
        `;
    });
}

async function init() {
    await getProducts();
}

productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newProduct = {
        name: productName.value,
        price: productPrice.value,
        description: productDescription.value
    };

    const result = await main.createProduct(newProduct);

});

init();