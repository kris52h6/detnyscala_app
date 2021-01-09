"use strict";

window.addEventListener("load", init);

let myJson = [];
let filterDrinks;
let cartArray = [];

const modtagerKloner = document.querySelector(".drink-list");
const skabelon = document.querySelector("template");
const jsonURL = "https://spreadsheets.google.com/feeds/list/1nRqF5lFLfFwqBjdwU2A4iBeRXdWZWzWTZoqy-GASEX4/od6/public/values?alt=json";
function init() {
  getJson();

  document.querySelectorAll(".filter").forEach((button) => {
    button.addEventListener("click", handleFilter);
  });
}

async function getJson() {
  let jsonData = await fetch(jsonURL);
  myJson = await jsonData.json();

  displayDrinks();
}

function displayDrinks() {
  let counter = 0;
  modtagerKloner.innerHTML = "";
  myJson.feed.entry.forEach((drink) => {
    if (filterDrinks == "alle" || filterDrinks == drink.gsx$kategori.$t) {
      const klon = skabelon.cloneNode(true).content;

      klon.querySelector("h2").textContent = `${drink.gsx$navn.$t}`;
      klon.querySelector("p").textContent = `${drink.gsx$pris.$t}` + ",-";
      klon.querySelector("img").src = "img/" + `${drink.gsx$billedebeskrivelse.$t}` + ".png";

      klon.querySelector(".add").id = counter;
      klon.querySelector(".plus").id = counter;
      klon.querySelector(".minus").id = counter;
      klon.querySelector(".quantity").id = counter;

      klon.querySelector(".minus").addEventListener("click", (event) => {
        drinkMinus(event);
      });

      klon.querySelector(".plus").addEventListener("click", (event) => {
        drinkPlus(event);
      });
      klon.querySelector(".add").addEventListener("click", (event) => {
        countDrinks(drink, event);
      }); // klon.querySelector("img").src = `${drink.gsx$billedelink}`;

      modtagerKloner.appendChild(klon);
      counter++;
    }
  });
}

function countDrinks(drink, event) {
  let drinkAmount = document.querySelectorAll(".quantity")[event.target.id].value;
  let drinkObject = {
    name: drink.gsx$navn.$t,
    amount: drinkAmount,
    price: drink.gsx$pris.$t,
  };
  cartArray.push(drinkObject);
  localStorage.setItem("order", JSON.stringify(cartArray));
}

function drinkMinus(event) {
  if (document.querySelectorAll(".quantity")[event.target.id].value > 1) {
    document.querySelectorAll(".quantity")[event.target.id].value--;
  }
}

function drinkPlus(event) {
  if (document.querySelectorAll(".quantity")[event.target.id].value < 9) {
    document.querySelectorAll(".quantity")[event.target.id].value++;
  }
}

function handleFilter() {
  document.querySelectorAll(".valgt").forEach((element) => {
    element.classList.remove("valgt");
  });

  filterDrinks = this.dataset.kategori;
  this.classList.add("valgt");
  document.querySelector("h1").textContent = filterDrinks;
  displayDrinks();
}

// Open and close barlist
function openNav() {
  document.getElementById("drinks").style.width = "100vw";
  document.getElementById("drinks").style.padding = "0 20px 0 20px";
}

function closeNav() {
  document.getElementById("drinks").style.width = "0";
<<<<<<< HEAD
  document.getElementById("drinks").style.padding = "0 0 0 0";
}
=======
  // document.getElementById("drinks").style.padding = "60px 0 0 0";
}
>>>>>>> 0a6aabb6ea41994329909cb69eae6c245ff83051
