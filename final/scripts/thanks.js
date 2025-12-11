//Esto es para 
const getdata = window.location.search;
const datafromuser = new URLSearchParams(getdata);
const container = document.querySelector('#submited');

// Obtener el producto actual de la URL
const currentProduct = datafromuser.get('product');
// Obtener el último 
const lastProduct = localStorage.getItem('lastOrderedProduct');


const info = document.createElement('p');
info.textContent = `Your "${currentProduct}" is being prepared, we will contact you to give you your order`;
container.appendChild(info);

// Si hay un producto anterior, mostrarlo
if (lastProduct) {
    const lastInfo = document.createElement('p');
    lastInfo.textContent = `Your last product ordered has been ${lastProduct}`;
    container.appendChild(lastInfo);
}

// Guardar el producto 
localStorage.setItem('lastOrderedProduct', currentProduct);