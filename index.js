function checkout(){
    window.location = "checkout.html";
}
function mainpage(){
    window.location = "index.html";
}

class Product {
    constructor(Name, Price, Image, Quantity){
        this.Name = Name;
        this.Price = Price;
        this.Image = Image;
        this.Quantity = Quantity;
    };
};

const existingProducts = localStorage.getItem('cartProducts');
const products = existingProducts ? JSON.parse(existingProducts) : {};

let cartitems = document.getElementById('cartitems');

const existingCount = localStorage.getItem('checkprods');
let checkprods = existingCount ? JSON.parse(existingCount) : 0;

function createProduct(pn) {
    products[`product${pn}`] = new Product(
        document.getElementById(`p${pn}name`).textContent,
        document.getElementById(`p${pn}price`).textContent,
        document.getElementById(`p${pn}image`).src,
        document.getElementById(`p${pn}quantity`).value
    );
    
    localStorage.setItem('cartProducts', JSON.stringify(products));
    console.log(products[`product${pn}`]);

    checkprods += 1;
    localStorage.setItem('checkprods', JSON.stringify(checkprods));

    return products[`product${pn}`];
}




