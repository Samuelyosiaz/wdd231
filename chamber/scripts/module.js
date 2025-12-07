import placesData from '../data/interestareas.mjs'

const navbutton = document.querySelector('#nav-button');
const navbar = document.querySelector('#nav-bar');

navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navbar.classList.toggle('show');
});


/***** Copy Right ******/
const year = new Date().getFullYear();
const copyright = document.querySelector('#currentyear');
copyright.innerHTML = year;


const lastModified = document.querySelector('#lastModified');
lastModified.innerHTML = `Last Modified: ${document.lastModified}`;



/***CARDS */

const showplaces = document.querySelector('#showplaces');

function displayitems(places) {
    places.forEach(place => {
        const thecard = document.createElement('div')

        const photo = document.createElement('img')
        photo.src = `${place.urlimg}`
        photo.alt = `${place.name}`
        photo.loading = `lazy`
        thecard.appendChild(photo);

        const title = document.createElement('h2')
        title.innerText = place.name
        thecard.appendChild(title)

        const address = document.createElement('address')
        address.innerText = place.address
        thecard.appendChild(address)

        const description = document.createElement('p')
        description.innerText = place.description
        thecard.appendChild(description)

        const button = document.createElement('button')
        button.classList = `learn-more-button`
        button.innerText = `Learn More`

        thecard.appendChild(button)

        showplaces.appendChild(thecard)

    })
}


/***VISITAS */

function displayVisitMessage() {
    const now = new Date();
    const lastVisit = localStorage.getItem('lastVisit');
    const visitMessage = document.createElement('div');
    visitMessage.id = 'visit-message';
    
    if (!lastVisit) {
        // Primera visita
        visitMessage.innerHTML = '¡Bienvenido! Si tienes alguna pregunta, contáctanos.';
    } else {
        const lastVisitDate = new Date(lastVisit);
        const timeDifference = now - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        
        if (daysDifference < 1) {
            visitMessage.innerHTML = '¡Volvemos pronto! ¡Genial!';
        } else if (daysDifference === 1) {
            visitMessage.innerHTML = 'Tu última visita fue hace 1 día.';
        } else {
            visitMessage.innerHTML = `Tu última visita fue hace ${daysDifference} días.`;
        }
    }
    
    const main = document.querySelector('main');
    main.insertBefore(visitMessage, main.firstChild);
    

    localStorage.setItem('lastVisit', now.toISOString());
}


document.addEventListener('DOMContentLoaded', () => {
    displayVisitMessage();
    displayitems(placesData.places);
});