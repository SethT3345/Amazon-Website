class Product {
    constructor(Name, Price, Image, Quantity){
        this.Name = Name;
        this.Price = Price;
        this.Image = Image;
        this.Quantity = Quantity;
    };
};

const products = {};

function createProduct(pn) {
    products[`product${pn}`] = new Product(
        document.getElementById(`p${pn}name`).textContent,
        document.getElementById(`p${pn}price`).textContent,
        document.getElementById(`p${pn}image`).src,
        document.getElementById(`p${pn}quantity`).value
    );
    console.log(products[`product${pn}`]);
    return products[`product${pn}`];
}


