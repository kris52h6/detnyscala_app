"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
  postFunction();
}

// henter ordren fra local storage, og tilføjer click på accept knappen, som kalder postBeer
function postFunction() {
  const form = document.querySelector("form");
  let currentOrder = localStorage.getItem("order");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    postBeer();
  });
}

// poster data fra localStorage (som er kundens køb)
function postBeer() {
  document.querySelector("#form_wrap").style.display = "none";
  document.querySelector(".purchaseModal").style.display = "flex";

  setInterval(() => {
    window.location.replace("index.html");
    localStorage.clear();
  }, 3000);
}
