const { BrowserWindow, Notification } = require('electron');
const { getConnection } = require('./database');

let window;

const getProducts = async () => {
    const conn = await getConnection();
    const results = await conn.query("SELECT * FROM producto ORDER BY id DESC");
    return results;
};

const deleteProduct = async (id) => {
    const conn = await getConnection();
    const result = await conn.query("DELETE FROM producto WHERE id = ?", id);
    return result;
};

const getProductById = async (id) => {
    const conn = await getConnection();
    const result = await conn.query("SELECT * FROM producto WHERE id = ?", id);
    return result[0];
};

const updateProduct = async (id, product) => {
    const conn = await getConnection();
    const result = await conn.query("UPDATE producto SET nombre = ?, descripcion = ?, precio = ? WHERE id = ?", [
        product.name, product.description, product.price, id]);
};




async function createProduct(product) {
    try {
        const conn = await getConnection();
        product.price = parseFloat(product.price);
        const result = await conn.query('insert into producto (nombre, descripcion, precio) values (?,?,?) ', [product.name, product.description, product.price]);

        new Notification({
            title: 'Electron MySql',
            body: 'Producto Creado Exitosamente'
        }).show();
        product.id = result.insertId;
        return product;
    } catch (error) {
        console.log(error);
    }
}

function createWindow() {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        }
    })
    window.loadFile('src/ui/index.html');
}

module.exports = { createWindow, createProduct, getProducts, getProductById, updateProduct, deleteProduct };
