const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairsBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')

let data = [];

// Generates random user data from API
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0]
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser);
}

// Adds new data to data array
function addData(obj) {
    data.push(obj)

    updateDOM();
};

function updateDOM(providedData = data) {
    // CLear the main div
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`;
        main.appendChild(element);
    })
}

function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 }
    })

    updateDOM();
}

function sortByRichest() {
    data.sort((a, b) => b.money - a.money)

    updateDOM();
}

function onlyMillionairs() {
    data = data.filter(user => user.money > 1000000)

    updateDOM();
}


// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairsBtn.addEventListener('click', onlyMillionairs);

