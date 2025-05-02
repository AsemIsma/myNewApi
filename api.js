const dishNames = [];
const dishImgSrc = [];
let count = 1;
const inputValue = document.querySelector(".input");
let data1 = "";

fetch("https://foodster-idg1.onrender.com/api/dishes")
.then(res => res.json())
.then(data => {
    console.log(data);
    data.map((el) => {
        dishNames.push(el.dishName);
        dishImgSrc.push(el.dishImgSrc);
    })
    console.log(dishNames)

    data1 = data;

    if(inputValue) {
        // dishNames.map(el => el.includes(inputValue))
        // console.log(el)
    }
})
.catch(console.error);

//search
document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); // ⛔ Prevents the form from reloading the page
    document.querySelector(".container").innerHTML = '';
    console.log("Form submitted without reloading!");
        dishNames.map(el => {
             if (el.toLowerCase().includes(inputValue.value.toLowerCase())) {
                console.log(el);
                document.querySelector(".container").innerHTML += `
                <div class="search-cont">
                <h1 class="search-name">${el}</h1>
                <img class="search-img" src="${dishImgSrc[dishNames.indexOf(el)]}">
                </div>
                `;
                count++; //only 3 option per page 
                console.log(dishImgSrc, count)
            }
        })
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
    </div>
    `;
}); //add flex

//category
document.querySelector("#selector").addEventListener("change", function () {
    if(this.value === "main dish" || this.value === "dessert" || this.value === "snack") {
        document.querySelector(".container").innerHTML = '';
        let chDishByCate = [];
        data1.map((el) => {
            if(el.category === this.value) {
                document.querySelector(".container").innerHTML += `
                <div class="search-cont">
                <h1 class="search-name">${el.dishName}</h1>
                <img class="ran search-img" src="${el.dishImgSrc}">
                </div>
                `;  
            }
        });

    } else {
        document.querySelector(".container").innerHTML = '';
        document.querySelector(".container").innerHTML += `
        <h1 class="search-name">Please choose category.</h1>
        `;
        console.log(this.value)
    }
})