const currentyear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

const today = new Date();

currentyear.innerHTML = `${today.getFullYear()}`;
let oLastModif = new Date(document.lastModified);
lastModified.innerHTML = `Last Modification: ${oLastModif.toLocaleString()}`;





const hamButton = document.querySelector('#menu');
const header = document.querySelector('header');
const navigation = document.querySelector('nav');

if (hamButton && header && navigation) {
  hamButton.addEventListener('click', () => {
    header.classList.toggle('open');
    hamButton.classList.toggle('open');
    navigation.classList.toggle('open');
  });
}



// Variable global para almacenar los productos
let allProducts = [];

// Función para obtener los productos desde el archivo externo
async function fetchProducts() {
    try {
        const response = await fetch('./scripts/cakes.json');
        allProducts = await response.json();
        initializePage();
    } catch (error) {
        console.error('Error loading products:', error);
    }
}




/**seccion  para mostrar los pasteles*/

const cakesAlbum = document.querySelector("#cakes-section")

function createCakeCards(filtered, place) {
    if (!place) {
        console.warn('createCakeCards: contenedor no encontrado.');
        return;
    }
    place.innerHTML = "";
    filtered.forEach(product => {
        let card = document.createElement("section"); 
        let img = document.createElement("img");
        let name = document.createElement("h3");
        let price = document.createElement("p");
        let aboutit = document.createElement("button")
        let modal = document.createElement('dialog')

        img.src = product.imgPath || '';
        img.alt = product.productName || '';
        img.width = 200;
        img.height = 100;
        img.loading = "lazy";

        // Modal setup - Fixed
        aboutit.classList.add('button', 'open-button');
        aboutit.setAttribute('popovertarget', `${product.id}`);
        aboutit.textContent = 'About it';

        modal.classList.add('modal');
        modal.id = `${product.id}`;
        modal.setAttribute('popover', '');

        let closebutton = document.createElement('button');
        closebutton.classList.add('close-button');
        closebutton.setAttribute('popovertarget', `${product.id}`);
        closebutton.setAttribute('popovertargetaction', 'hide');
        closebutton.textContent = 'X';

        let description = document.createElement('p');
        description.textContent = product.description;

        modal.appendChild(closebutton);
        modal.appendChild(description);

        name.textContent = product.productName || 'Untitled';
        price.innerHTML = `<span class="label">Price:</span> $${product.price}`;

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(price);
        card.appendChild(aboutit);
        card.appendChild(modal); 

        place.appendChild(card);
    });
}


//Funcion para inicializar la pagina después de cargarla

function initializePage() {


/**Seccion para mostrar los productos según la pagina que se use */
const cakesLink = document.querySelector("#cakes");
const othersLink = document.querySelector("#cookies");
const cakesSection = document.querySelector("#cakes-section");
const othersPlace = document.querySelector("#others-section");


if (cakesSection) {
    const initial = allProducts.filter(p => p.kind === "cake");
    createCakeCards(initial, cakesSection);
}

if (othersPlace) {
    const initialOthers = allProducts.filter(p => p.kind === "other");
    createCakeCards(initialOthers, othersPlace);
}

if (cakesLink) {
    cakesLink.addEventListener("click", (e) => {
        const filtered = allProducts.filter(product => product.kind === "cake");

        createCakeCards(filtered, cakesSection);

    });
}
if (othersLink) {
    othersLink.addEventListener("click", (e) => {
        const filtered = allProducts.filter(product => product.kind === "other");
        createCakeCards(filtered, othersPlace);
    });
}


/**Seccion para mostrar los productos en el formulario */
const productSelect = document.querySelector('#product');
if (productSelect) {
  
    allProducts.forEach(p => {
        const option = document.createElement('option');
        option.value = p.id;
        option.textContent = p.productName;
        productSelect.appendChild(option);
    });
}
}



document.addEventListener('DOMContentLoaded', fetchProducts);