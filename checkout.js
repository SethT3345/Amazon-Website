function checkout(){
    window.location = "checkout.html";
}
function mainpage(){
    window.location = "index.html"
}



window.addEventListener('load', function addItems(){
    let i = localStorage.getItem('checkprods');
    let cartitems = document.getElementById('cartitems');
    let mtcart = document.getElementById('mtcart');
    i = parseInt(i);

    const cartCount = document.getElementById('cartCount');
    const existingCartCount = localStorage.getItem('cartCountNum');
    let cartCountNum = existingCartCount ? JSON.parse(existingCartCount) : 0;
    

    localStorage.setItem('cartCountNum', JSON.stringify(cartCountNum));
    if (cartCount) {
        cartCount.innerHTML = `(${cartCountNum})`;
    }

    console.log(i)
    if(i > 0){
        mtcart.style.display = "none";
        
        let storedProducts = localStorage.getItem('cartProducts');
        let products = JSON.parse(storedProducts);

        let htmlTotal = document.getElementById("htmlTotal");
        let htmlTax = document.getElementById("htmlTax");
        let htmlTBT = document.getElementById("htmlTBT");
        let htmlSH = document.getElementById("htmlSH");
        let htmlItems = document.getElementById("htmlItems");

        let Total = 0;
        let Tax = 0;
        let TBT = 0;
        let SH = 0;
        let Items = 0;

        
        
        
        for(let productKey in products){
            let product = products[productKey];
            console.log('Product:', product); // Debug: see what product contains
            console.log('Product Number:', product.Number); // Debug: see the Number value
            cartitems.innerHTML += `<div class="w-full h-60 border-gray-500 border-1 flex rounded-lg items-center">
                        <img src="${product.Image}" class="h-50">
                        <div class="flex flex-col items-start ml-5">
                        <div class="flex flex-row">
                        <h1 class="amzfont text-2xl">${product.Name}</h1>
                        <h1 class="amzfont text-2xl">(${product.Quantity})</h1>
                        </div>
                        <h1 onclick="rmitem(${product.Number})" class="amzfont text-xl text-red-500">Remove Item</h1>
                        </div>
                        <h1 class="amzfont text-2xl ml-auto text-red-500 mr-3">${product.Price}</h1><br>
                    </div>`;

            
            let priceWithoutDollar = product.Price.replace('$', '');
            let priceAsNumber = parseFloat(priceWithoutDollar);
            let quantityAsNumber = parseInt(product.Quantity);

            // Just accumulate the subtotal and item count
            Total += (priceAsNumber * quantityAsNumber);
            Items += quantityAsNumber;

        }
        

        SH = Items * 5; 
        TBT = Total + SH; 
        Tax = TBT * 0.10; 
        Total = TBT + Tax;
        
        if (htmlTotal) {
            htmlTotal.innerHTML = `$${Total.toFixed(2)}`;
        }
        if (htmlItems) {
            htmlItems.innerHTML = Items;
        }
        if (htmlSH){
            htmlSH.innerHTML = `$${SH.toFixed(2)}`
        }
        if (htmlTBT){
            htmlTBT.innerHTML = `$${TBT.toFixed(2)}`
        }
        if(htmlTax){
            htmlTax.innerHTML = `$${Tax.toFixed(2)}`
        }
    }
})

function rmall(){
    localStorage.clear();
    location.reload();
}

function rmitem(Number){
    console.log('rmitem called with Number:', Number); // Debug: see what number is passed
    let storedProducts = localStorage.getItem('cartProducts');
    let products = JSON.parse(storedProducts);
    console.log('Products before deletion:', products); // Debug: see products before deletion

    delete products[`product${Number}`]
    console.log('Products after deletion:', products); // Debug: see products after deletion

    localStorage.setItem('cartProducts', JSON.stringify(products));

    let newCount = Object.keys(products).length;
    localStorage.setItem('checkprods', JSON.stringify(newCount));

    // Reset button state in localStorage
    const existingButtonStates = localStorage.getItem('buttonStates');
    const buttonStates = existingButtonStates ? JSON.parse(existingButtonStates) : {};
    buttonStates[`p${Number}button`] = false;
    localStorage.setItem('buttonStates', JSON.stringify(buttonStates));

    // Update cart count display
    const existingCartCount = localStorage.getItem('cartCountNum');
    let cartCountNum = existingCartCount ? JSON.parse(existingCartCount) : 0;
    cartCountNum -= 1;
    if (cartCountNum < 0) cartCountNum = 0;
    localStorage.setItem('cartCountNum', JSON.stringify(cartCountNum));

    location.reload();
}