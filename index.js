function checkout(){
    window.location = "checkout.html";
}
function mainpage(){
    window.location = "index.html";
}

class Product {
    constructor(Name, Price, Image, Quantity, Number){
        this.Name = Name;
        this.Price = Price;
        this.Image = Image;
        this.Quantity = Quantity;
        this.Number = Number;
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
        document.getElementById(`p${pn}quantity`).value,
        pn
    );
    
    localStorage.setItem('cartProducts', JSON.stringify(products));
    console.log(products[`product${pn}`]);

    checkprods += 1;
    localStorage.setItem('checkprods', JSON.stringify(checkprods));

    const cartCount = document.getElementById('cartCount');
    
    const existingCartCount = localStorage.getItem('cartCountNum');
    let cartCountNum = existingCartCount ? JSON.parse(existingCartCount) : 0;
    
    cartCountNum += 1;
    localStorage.setItem('cartCountNum', JSON.stringify(cartCountNum));
    cartCount.innerHTML = `(${cartCountNum})`

    document.getElementById(`p${pn}button`).innerHTML =`<button class="w-40 mt-1 transition-colors h-7 bg-gray-400 rounded-lg amzfont transition-shadow duration-300 hover:shadow-2xl">Added To Cart!</button>`

    const existingButtonStates = localStorage.getItem('buttonStates');
    const buttonStates = existingButtonStates ? JSON.parse(existingButtonStates) : {};
    buttonStates[`p${pn}button`] = true;
    localStorage.setItem('buttonStates', JSON.stringify(buttonStates));

    return products[`product${pn}`];
}

function restoreButtonStates() {
    const savedButtonStates = localStorage.getItem('buttonStates');
    if (savedButtonStates) {
        const buttonStates = JSON.parse(savedButtonStates);
        for (let buttonId in buttonStates) {
            const buttonElement = document.getElementById(buttonId);
            if (buttonElement) {
                if (buttonStates[buttonId] === true) {
                    buttonElement.innerHTML = `<button class="w-40 mt-1 transition-colors h-7 bg-gray-400 rounded-lg amzfont transition-shadow duration-300 hover:shadow-2xl">Added To Cart!</button>`;
                } else if (buttonStates[buttonId] === false) {
                    const productNum = buttonId.replace('p', '').replace('button', '');
                    buttonElement.innerHTML = `<button onclick="createProduct(${productNum})" class="w-40 mt-1 transition-colors h-7 bg-yellow-400 rounded-lg amzfont transition-shadow duration-300 hover:shadow-2xl">Add To Cart</button>`;
                }
            }
        }
    }
}

window.addEventListener('load', restoreButtonStates);

