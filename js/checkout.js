let order = JSON.parse(localStorage.getItem("cart"));

let productCheckoutBox = document.querySelector(".product__checkout--box");
let subtotalCheckout = document.querySelector(".subtotal__checkout");
let checkoutTotalPrice = document.querySelector(".checkout__total--price");

function checkoutRender() {
  order.forEach((element) => {
    let div = document.createElement("div");
    div.innerHTML = `
        <div class="d-flex justify-content-between product__checkout">
            <p>${element.name} x(${element.quantity})</p>
            <p>$${element.price * element.quantity}</p>
        </div>
    `;
    productCheckoutBox.appendChild(div);
  });
  let sum = 0;
  for (let i = 0; i < order.length; i++) {
    sum += order[i].price * order[i].quantity
  }
  subtotalCheckout.textContent = sum;
  checkoutTotalPrice.textContent = sum + 10;
}

checkoutRender();