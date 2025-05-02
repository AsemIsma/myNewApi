let count = 1;
const inputValue = document.querySelector(".input");
let data1 = "";
let ids = [];

fetch("https://foodster-idg1.onrender.com/api/dishes")
.then(res => res.json())
.then(data => {
    console.log(data);

    data1 = data;
})
.catch(console.error);

//search
document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); // ⛔ Prevents the form from reloading the page
    document.querySelector(".container").innerHTML = '';
    console.log("Form submitted without reloading!");
        data1.map(el => {
            if (el.dishName.toLowerCase().includes(inputValue.value.toLowerCase())) {
                console.log(el);
                document.querySelector(".container").innerHTML += `
                <div class="search-cont" id="a${el.id}">
                <h1 class="search-name">${el.dishName}</h1>
                <img class="search-img" src="${el.dishImgSrc}">
                </div>
                `;
                count++; //only 3 option per page 
                ids.push(el.id);
            }
            
            console.log(ids)
        })
        openOnePage ()
        inputValue.value = "";
  });

  //random
document.querySelector(".random-btn").addEventListener("click", () => {
    document.querySelector(".container").innerHTML = "";
    let ranDish = Math.round(Math.random() * (data1.length - 1));
    console.log(ranDish)
    document.querySelector(".container").innerHTML += `
    <div class="search-cont-ran">
    <h1 class="ran search-name">${data1[ranDish].dishName}</h1>
    <img class="ran search-img" src="${data1[ranDish].dishImgSrc}">
    <p class="title">Ingredients:</p>
    <p>${data1[ranDish].dishIngredients.map(el => el.join(' ')).join('<br>')}</p>
    <p class="title">Preparation steps:</p>
    <p>-${data1[ranDish].dishPrepSteps.join('<br><br>-')}</p>
    <a class="src" href="${data1[ranDish].source}">Source</a>
    <p>author: ${data1[ranDish].author}</p>
    </div>
    `;
}); //add flex

//category
document.querySelector("#selector").addEventListener("change", function () {
    if(this.value === "main dish" || this.value === "dessert" || this.value === "snack") {
        document.querySelector(".container").innerHTML = '';
        data1.map((el) => {
            if(el.category === this.value) {
                document.querySelector(".container").innerHTML += `
                <div class="search-cont-pag" id="a${el.id}">
                <h1 class="search-name">${el.dishName}</h1>
                <img class="search-img" src="${el.dishImgSrc}">
                </div>
                `;  
                ids.push(el.id);
            }
            
        });

    openOnePage ()

    } else {
        document.querySelector(".container").innerHTML = '';
        document.querySelector(".container").innerHTML += `
        <h1 class="search-name">Please choose category.</h1>
        `;
        console.log(this.value)
    }
})

//onepage for category and search
function openOnePage () {
    ids.map((elId) => {
        document.querySelector(`#a${elId}`).addEventListener("click", () => {
            data1.map((el) => {
              if (el.id === elId) {
                document.querySelector(".container").innerHTML = "";
                document.querySelector(".container").innerHTML += `
                <div class="search-cont">
                <h1 class="ran search-name">${el.dishName}</h1>
                <img class="ran search-img" src="${el.dishImgSrc}">
                <p class="title">Ingredients:</p>
                <p>${el.dishIngredients.map(el => el.join(' ')).join('<br>')}</p>
                <p class="title">Preparation steps:</p>
                <p>-${el.dishPrepSteps.join('<br><br>-')}</p>
                <a class="src" href="${el.source}">Source</a>
                <p>author: ${el.author}</p>
                </div>
                `;
                document.querySelector(".search-cont").style.width = "100%";
            }  
            })
            
        })
    })
    ids = [];
}