var express = require('express');
var router = express.Router();
var productsServices = require('../services/productsServices');
const Product = require('../model/Product');

router.get('/insert', function(req, res) {
  res.render('insereProduto.ejs');  
});

router.get('/', async function(req, res) {  
  try {
    let products = await productsServices.getAll();
    return res.render('listaProdutos.ejs', { products });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Erro ao buscar produtos.');
  }  
});

router.get('/products', function(req, res) {
  const {nome, preco, marca, modelo, categoria}=req.body

  const product = new Product(nome, preco, marca, modelo, categoria)

  let products = productsServices.getWithFilter(product);

  res.render('Produtos.ejs',{products});
});

router.get('/:codProduct', function(req, res){
  const codProduto = req.body;

  let product = productsServices.getByCod(codProduto);

  res.render('Produtos.ejs',{product});

});

router.put('/:codProduct', function(req, res){
  const {codProduto, nome, preco, marca, modelo, categoria, descricao}=req.body;

  const product = new Product(codProduto, nome, preco, marca, modelo, categoria, descricao)
  
  productsServices.updateProduct(product);
});

router.post('/', function(req, res) {
  const {codProduto, nome, preco, marca, modelo, categoria, descricao}=req.body;

  const product = new Product(codProduto, nome, preco, marca, modelo, categoria, descricao)
  
  productsServices.insertProduct(product);
});

router.delete('/:codProduct', function(req, res){
  const codProduct = req.body;

  productsServices.deleteProduct(codProduct);
})


module.exports = router;
