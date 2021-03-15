const { remote } = require("electron");
const main = remote.require("./main");

const productForm = document.getElementById("productForm");
const productName = document.getElementById("name");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const productsList = document.getElementById("products");

let products = [];
let editingStatus = false;
let editProductId;


const getProducts = async () => {
    products = await main.getProducts();
    renderProducts(products);
}

const deleteProduct = async (id) => {
    const response = confirm("Are you sure you want to delete it?");
    if (response) {
        await main.deleteProduct(id);
        await getProducts();
    }
    return;
};

const editProduct = async (id) => {
    const product = await main.getProductById(id);
    productName.value = product.nombre;
    productPrice.value = product.precio;
    productDescription.value = product.descripcion;

    editingStatus = true;
    editProductId = id;
};

function renderProducts(p) {
    productsList.innerHTML = '';
    p.forEach(product => {
        productsList.innerHTML += `
        <div class="card card-body my-2 animated fadeInLeft">
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

    if (!editingStatus) {
        const savedProduct = await main.createProduct(newProduct);
    } else {
        const productUpdated = await main.updateProduct(editProductId, newProduct);

        // Resetea
        editingStatus = false;
        editProductId = "";
    }

    productForm.reset();
    productName.focus();
    getProducts();

});

init();