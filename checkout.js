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


    console.log(i)
    if(i > 0){
        mtcart.style.display = "none";
        
        // Get the actual products from localStorage
        let storedProducts = localStorage.getItem('cartProducts');
        let products = JSON.parse(storedProducts);
        
        // Loop through each product and display it
        for(let productKey in products){
            let product = products[productKey];
            cartitems.innerHTML += `<div class="w-full h-60 border-gray-500 border-1 flex rounded-lg items-center">
                        <img src="${product.Image}" class="h-50">
                        <div class="flex flex-col items-start ml-5">
                        <div class="flex flex-row">
                        <h1 class="amzfont text-2xl">${product.Name}</h1>
                        <h1 class="amzfont text-2xl">(${product.Quantity})</h1>
                        </div>
                        <h1 class="amzfont text-xl text-red-500">Remove Item</h1>
                        </div>
                        <h1 class="amzfont text-2xl ml-auto text-red-500 mr-3">${product.Price}</h1><br>
                    </div>`;
        }
    }
})