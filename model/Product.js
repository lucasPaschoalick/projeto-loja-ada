class Product{

    constructor(
        codProduto,
        nome,
        preco,
        marca,
        modelo,
        categoria,
        descricao
    ){
        this.codProduto = codProduto,
        this.nome = nome,
        this.preco = preco,
        this.marca = marca,
        this.modelo = modelo,
        this.categoria = categoria,
        this.descricao = descricao
    }

    // constructor(        
    //     nome,
    //     preco,
    //     marca,
    //     modelo,
    //     categoria,
    //     descricao
    // ){        
    //     this.nome = nome,
    //     this.preco = preco,
    //     this.marca = marca,
    //     this.modelo = modelo,
    //     this.categoria = categoria,
    //     this.descricao = descricao
    // }

    getCodProduto(){
        return this.codProduto;
    }

    getNome(){
        return this.nome;
    }

    getPreco(){
        return this.preco;
    }
   
    getMarca(){
        return this.marca;
    }
   
    getModelo(){
        return this.modelo;
    }

    getCategoria(){
        return this.categoria;
    }

    getDescricao(){
        return this.descricao;
    }

}

module.exports = Product