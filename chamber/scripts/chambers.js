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





//Bottons
const cardssection = document.querySelector('#displayedcards');
const gridButton = document.querySelector('#grid-list');
const listButton = document.querySelector('#simple-list');


// Variable para guardar los datos y el modo actual
let companiesData = [];
let currentView = 'grid'; // Por defecto será grid


//Event Listeners

gridButton.addEventListener('click', () => {
    currentView = 'grid';
    displayCards(companiesData);
});

listButton.addEventListener('click', () => {
    currentView = 'list';
    displayCards(companiesData);
});

//Create cards of the companies

async function getCompaniesInformation(file) {
    const response = await fetch(file);
    const data = await response.json();

    companiesData = data.companies;
    displayCards(data.companies);
}

const displayCards = (companies) => {
    cardssection.innerHTML = ``;
    
    if (currentView === 'list') {
        // Vista de tabla (sin imágenes)
        const table = document.createElement('table');
        table.innerHTML = `
                ${companies.map(company => `
                    <tr>
                        <td>${company.name}</td>
                        <td>${company.address}</td>
                        <td>${company.phone}</td>
                        <td><a href="${company.website}" target="_blank">Visit Site</a></td>
                    </tr>
                `).join('')}
            </tbody>
        `;
        cardssection.appendChild(table);
    } else {
        // Vista de grid 
        companies.forEach((company) => {
            const card = document.createElement('div');
            card.classList.add('company-card');

            card.innerHTML = `
                <img src="${company.image_url}" alt="${company.name}" loading="lazy">
                <p><strong>Address:</strong> ${company.address}</p>
                <p><strong>Phone:</strong> ${company.phone}</p>
                <p><a href="${company.website}" target="_blank">Visit Site</a></p>
            `;

            cardssection.appendChild(card);
        });
    }
}


getCompaniesInformation('data/members.json');

