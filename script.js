"use strict";

window.addEventListener("load", init);

let myJson = [];
let filterDrinks;
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
  modtagerKloner.innerHTML = "";
  console.log(filterDrinks);
  myJson.feed.entry.forEach((drink) => {
    if (filterDrinks == "alle" || filterDrinks == drink.gsx$kategori.$t) {
      const klon = skabelon.cloneNode(true).content;

      klon.querySelector("h1").textContent = `${drink.gsx$kategori.$t}`;
      klon.querySelector("h2").textContent = `${drink.gsx$navn.$t}`;
      klon.querySelector("p").textContent = `${drink.gsx$pris.$t}` + ".-";

      modtagerKloner.appendChild(klon);
    }
  });
}

function handleFilter() {
  /* tilføjer klassen valgt til hvert element eller fjerner valgt */
  document.querySelectorAll(".valgt").forEach((element) => {
    element.classList.remove("valgt");
  });

  /* tilføjer variablen filteralbum til datasetet kategori og tilføjer valgt */
  filterDrinks = this.dataset.kategori;
  this.classList.add("valgt");

  /* kalder funktionen visGS */
  displayDrinks();
}
