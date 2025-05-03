let count = 1;
const inputValue = document.querySelector(".input");
let data1 = [];
let ids = [];
let searchResults = [];

fetch("https://foodster-idg1.onrender.com/api/dishes")
    .then(res => res.json())
    .then(data => {
        data1 = data;
    })
    .catch(console.error);

// ===== SEARCH =====
document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    const value = inputValue.value.toLowerCase();
    searchResults = data1.filter(el => el.dishName.toLowerCase().includes(value));
    renderSearchPage(1); // Show first page
    createSearchPagination();
    inputValue.value = "";
});

// ===== RENDER SEARCH PAGE =====
function renderSearchPage(pageNumber) {
    document.querySelector(".container").innerHTML = '';
    const itemsPerPage = 3;
    const start = (pageNumber - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const pageItems = searchResults.slice(start, end);
    ids = []; // reset ids
    pageItems.forEach(el => {
        ids.push(el.id);
        const div = document.createElement("div");
        div.className = "search-cont-pag";
        div.id = `a${el.id}`;
        div.innerHTML = `
            <h1 class="search-name">${el.dishName}</h1>
            <img class="search-img" src="${el.dishImgSrc}">
        `;
        document.querySelector(".container").appendChild(div);
    });

    openOnePage();
}

// ===== CREATE PAGINATION FOR SEARCH =====
function renderSearchPage(pageNumber) {
    const container = document.querySelector(".container");
    container.innerHTML = '';
    const itemsPerPage = 3;
    const start = (pageNumber - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const pageItems = searchResults.slice(start, end);
    ids = []; // reset ids
    pageItems.forEach(el => {
        ids.push(el.id);
        const div = document.createElement("div");
        div.className = "search-cont-pag";
        div.id = `a${el.id}`;
        div.innerHTML = `
            <h1 class="search-name">${el.dishName}</h1>
            <img class="search-img" src="${el.dishImgSrc}">
        `;
        container.appendChild(div);
    });

    openOnePage();
}

function createSearchPagination() {
    const pagDiv = document.querySelector(".pagination");
    pagDiv.innerHTML = ''; // clear previous buttons

    const itemsPerPage = 3;
    const pageCount = Math.ceil(searchResults.length / itemsPerPage);

    for (let i = 1; i <= pageCount; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.addEventListener("click", () => {
            renderSearchPage(i);
        });
        pagDiv.appendChild(btn);
    }
}

// ===== RANDOM =====
document.querySelector(".random-btn").addEventListener("click", () => {
    document.querySelector(".container").innerHTML = "";
    let ranDish = Math.floor(Math.random() * data1.length);
    const d = data1[ranDish];
    document.querySelector(".container").innerHTML += `
        <div class="search-cont">
            <h1 class="ran search-name">${d.dishName}</h1>
            <img class="ran search-img" src="${d.dishImgSrc}">
            <p class="title">Ingredients:</p>
            <p>${d.dishIngredients.map(el => el.join(' ')).join('<br>')}</p>
            <p class="title">Preparation steps:</p>
            <p>-${d.dishPrepSteps.join('<br><br>-')}</p>
            <a class="src" href="${d.source}">Source</a>
            <p>author: ${d.author}</p>
        </div>
    `;
    document.querySelector(".search-cont").style.width = "100%";
});

// ===== CATEGORY FILTER =====
document.querySelector("#selector").addEventListener("change", function () {
    const cat = this.value;
    if (["main dish", "dessert", "snack"].includes(cat)) {
        searchResults = data1.filter(el => el.category === cat);
        renderSearchPage(1);
        createSearchPagination();
    } else {
        document.querySelector(".container").innerHTML = `
            <h1 class="search-name">Please choose a category.</h1>
        `;
    }
});

// ===== OPEN ONE FULL RECIPE PAGE =====
function openOnePage() {
    ids.forEach(elId => {
        const card = document.querySelector(`#a${elId}`);
        if (card) {
            card.addEventListener("click", () => {
                const dish = data1.find(d => d.id === elId);
                if (dish) {
                    document.querySelector(".container").innerHTML = `
                        <div class="search-cont">
                            <h1 class="ran search-name">${dish.dishName}</h1>
                            <img class="ran search-img" src="${dish.dishImgSrc}">
                            <p class="title">Ingredients:</p>
                            <p>${dish.dishIngredients.map(el => el.join(' ')).join('<br>')}</p>
                            <p class="title">Preparation steps:</p>
                            <p>-${dish.dishPrepSteps.join('<br><br>-')}</p>
                            <a class="src" href="${dish.source}">Source</a>
                            <p>author: ${dish.author}</p>
                        </div>
                    `;
                }
                document.querySelector(".search-cont").style.width = "100%";
            });
        }
    });
    
}