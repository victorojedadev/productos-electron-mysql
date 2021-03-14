const { BrowserWindow, Notification } = require('electron');
const { getConnection } = require('./database');

let window;

async function getProducts(product) {
    const conn = await getConnection();
    const results = await conn.query('select * from producto');
    return results;
}

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

module.exports = { createWindow, createProduct, getProducts };
