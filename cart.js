"use strict";

window.addEventListener("DOMContentLoaded", init);
let currentOrder = localStorage.getItem("order");
const cartlist = document.querySelector("#cartlist");
const skabelon = document.querySelector("template");

function init() {
  document.querySelector(".proceed").addEventListener("click", () => {
    window.location.replace("checkout.html");
  });
  let order = JSON.parse(currentOrder);
  order.forEach((order) => {
    const klon = skabelon.cloneNode(true).content;
    klon.querySelector("h2").textContent = order.name;
    klon.querySelector("h3").textContent = order.amount;

    // klon.querySelector(".remove").addEventListener("click", () => {
    //   removeBeer(orderParse, order);
    // });

    cartlist.appendChild(klon);
  });

  let totalPrice = 0;
  for (let i = 0; i < order.length; i++) {
    totalPrice = +order[i].amount * order[i].price + totalPrice;
  }
  document.querySelector("body > div.total > h3").textContent = totalPrice + " DKK";
}
