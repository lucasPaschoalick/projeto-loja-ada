const Product = require('../model/Product');

const sqlite3 = require('sqlite3').verbose();


function insertProduct(productObj) {
  const db = new sqlite3.Database('./db/techStore.db');

  db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          codProduct INTEGER NOT NULL,
          nome TEXT NOT NULL,
          preco INTEGER NOT NULL,
          marca TEXT NOT NULL,
          modelo TEXT NOT NULL,
          categoria TEXT NOT NULL,
          descricao TEXT NOT NULL
        );
      `);
  }); 

  const sqlInsert = 'INSERT INTO products (codProduct, nome, preco, marca, modelo, categoria, descricao) VALUES (?, ?, ?, ?, ?, ?, ?)';
   
  db.run(sqlInsert, [productObj.getCodProduto(), productObj.getNome(), productObj.getPreco(), productObj.getMarca(), productObj.getModelo(), productObj.getCategoria(), productObj.getDescricao()], function(err) {
    if (err) {
      return console.error(err.message);
    }
      console.log(`Registro inserido com sucesso!!`);
  });

  db.close();
}

function getAll(){
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('./db/techStore.db');
    const sqlListAll = 'SELECT * FROM products';

    let products = [];

    db.all(sqlListAll, function(err, rows) {
      if (err) {
        db.close();
        reject(err);
        return;
      }

      if (rows.length > 0) {
        for (let i = 0; i < rows.length; i++) {
          let product = new Product(
            rows[i].nome, 
            rows[i].preco, 
            rows[i].marca, 
            rows[i].modelo, 
            rows[i].categoria, 
            rows[i].descricao
          );
          products.push(product);
        }
      }

      db.close();
      resolve(products);
    });
  });
}

function getWithFilter(productFilters){
  const db = new sqlite3.Database('./db/techStore.db');

  const sqlGetWithFilter = 'SELECT * FROM products WHERE 1 = 1';
  const listNome = ' AND nome = ?';
  const listPreco = ' AND preco BETWEEN ? AND ?';
  const listMarca = ' AND marca = ?';
  const listModelo = ' AND modelo = ?';
  const listCategoria = ' AND categoria = ?';

  let query = '';
  let newQuery = '';
  
  let products = [];
  let filtersArray = []

  if(!checkNullorBlank(productFilters.getNome())){
    filtersArray.push(productFilters.getNome());
    query = query + listNome;
  }
  if(!checkNullorBlank(productFilters.getPreco())){
    filtersArray.push(productFilters.getPreco());
    query = query + listPreco;
  }
  if(!checkNullorBlank(productFilters.getMarca())){
    filtersArray.push(productFilters.getMarca());
    query = query + listMarca;
  }
  if(!checkNullorBlank(productFilters.getModelo())){
    filtersArray.push(productFilters.getModelo());
    query = query + listModelo;
  }
  if(!checkNullorBlank(productFilters.getCategoria())){
    filtersArray.push(productFilters.getCategoria());
    query = query + listCategoria;
  }

  newQuery = sqlGetWithFilter + query;

  db.all(newQuery, filtersArray, function(err, rows) {
    if (err) {
      return console.error(err.message);
    }
    if(rows.length > 0){
      for(let i = 0; i < rows.length; i++){
        let product = new Product(
          rows[i].nome, 
          rows[i].preco, 
          rows[i].marca, 
          rows[i].modelo, 
          rows[i].categoria, 
          rows[i].descricao
        );
  
        products.push(product);
      }
      db.close();
  
      return products;

    } else {
      db.close();
      return console.error('Sem produtos no banco!');
    }    
  });
  
  db.close();
}

function getByCod(codProduto){
  const db = new sqlite3.Database('./db/techStore.db');

  const sqlGetByCod = 'SELECT * FROM products WHERE codProduto = ?';

  db.get(sqlGetByCod, codProduto, (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    if (row){
      let product = new Product(        
        row.nome,
        row.preco, 
        row.marca, 
        row.modelo, 
        row.categoria, 
        row.descricao
      );        

      db.close();
      
      return product;

    } else{
      db.close();

      return console.log(`Produto não cadastrado!`);
      
    }  
  });
}

function updateProduct(productObj){
  const db = new sqlite3.Database('./db/techStore.db');

  const sqlUpdate = 'UPDATE products SET nome = ?, preco = ?, marca = ?, modelo = ?, categoria = ?, descricao = ? WHERE codProduct = ?`;';
   
  db.run(sqlUpdate, [productObj.getNome(), productObj.getPreco(), productObj.getMarca(), productObj.getModelo(), productObj.getCategoria(), productObj.getDescricao(), productObj.getCodProduct()], function(err) {
    if (err) {
      return console.error(err.message);
    }
      console.log(`Registro atualizado com sucesso!!`);
  });

  db.close();
}

function deleteProduct(codProduto){
  const db = new sqlite3.Database('./db/techStore.db');

  const sqlDelete = 'DELETE FROM products WHERE codProduto = ?';

  db.run(sqlDelete, codProduto, function(err) {
    if (err) {
      return console.error(err.message);
    }
      console.log(`Registro excluido com sucesso!!`);
  });

  db.close();
}

function checkNullorBlank(str){
  return str === null || str.trim() === '';
}

module.exports = {insertProduct, getAll, getWithFilter, getByCod, updateProduct, deleteProduct}