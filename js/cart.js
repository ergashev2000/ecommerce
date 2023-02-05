"use strict";

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const tableBody = document.querySelector("tbody");

function renderCart() {
  tableBody.innerHTML = "";
  cart.forEach((item) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="align-middle">
      <img src="${item.img}" alt="Products" style="width: 50px; width="50" height="50"> ${item.name}</td>
      <td class="align-middle">$${item.price}</td>
      <td class="align-middle">
        <div class="input-group quantity mx-auto" style="width: 100px;">
          <div class="input-group-btn">
            <button class="btn btn-sm btn-primary btn-minus">
              <i class="fa fa-minus"></i>
            </button>
          </div>
          <span>${item.quantity}</span>
          <div class="input-group-btn">
            <button class="btn btn-sm btn-primary btn-plus">
              <i class="fa fa-plus"></i>
            </button>
          </div>
        </div>
      </td>
      <td class="align-middle">$${item.price * item.quantity}</td>
      <td class="align-middle">
        <button class="btn btn-sm btn-primary btn-remove">
          <i class="fa fa-times"></i>
        </button>
      </td>
    `;
    tableBody.appendChild(tr);

    tr.querySelector(".btn-minus").addEventListener("click", (e) => {
      item.quantity--;
      if (item.quantity < 1) {
        removeFromCart(item);
      } else {
        updateCart(item);
      }
    });

    tr.querySelector(".btn-plus").addEventListener("click", (e) => {
      item.quantity++;
      updateCart(item);
    });

    tr.querySelector(".btn-remove").addEventListener("click", (e) => {
      removeFromCart(item);
    });
  });
}

function updateCart(item) {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  allProducts();
}

function removeFromCart(item) {
  let index = cart.indexOf(item);
  if (index > -1) {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  allProducts();
  checkoutDisabled();
}

renderCart();

// Get the DOM elements for subtotal, shipping, and total
const subtotal = document.querySelector(".subtotal");
const shipping = document.querySelector(".shipping__price");
const total = document.querySelector(".total__price");

function allProducts() {
  let subtotalValue = 0;
  let shippingValue = 10;
  cart.forEach((item) => {
    subtotalValue += item.price * item.quantity;
  });

  // Update the values in the DOM
  subtotal.textContent = "$" + subtotalValue;
  shipping.textContent = "$" + shippingValue;
  total.textContent =
    "$" + (subtotalValue === 0 ? 0 : subtotalValue + shippingValue);
}
allProducts();
function cartCounter() {
  let counterCart = document.querySelector(".cart__count");
  let localDataLeng = JSON.parse(localStorage.getItem("cart"));
  if (localDataLeng !== null) {
    console.log(localDataLeng);
    counterCart.textContent = localDataLeng.length;
  }
}
cartCounter();

function checkoutDisabled() {
  let totalPrice = cart;
  let checkoutBtn = document.querySelector(".checkout__btn");
  console.log(totalPrice.length);
  if (!totalPrice.length) {
    checkoutBtn.setAttribute("href", "javascript:void(0)");
    checkoutBtn.setAttribute("aria-disabled", "true");
  } else {
    checkoutBtn.setAttribute("href", "checkout.html");
    checkoutBtn.setAttribute("aria-disabled", "false");
  }
}
checkoutDisabled();
