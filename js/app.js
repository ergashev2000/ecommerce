const header = document.querySelector(".header__scroll");
const headerBox = document.querySelector(".space-behind-box");
const limit = 50;

window.addEventListener("scroll", function () {
  if (window.pageYOffset >= limit) {
    header.classList.add("fixed-header");
    headerBox.classList.add("space-behind");
  } else {
    header.classList.remove("fixed-header");
    headerBox.classList.remove("space-behind");
  }
});

document
  .querySelector(".head__form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const searchText = document.querySelector("input").value;
    window.location.href = `/shop.html?search=${searchText}`;
  });

function cartCounter() {
  let counterCart = document.querySelector(".cart__count");
  let localDataLeng = JSON.parse(localStorage.getItem("cart"));
  if (localDataLeng !== null) {
    counterCart.textContent = localDataLeng.length;
  }
}
cartCounter();
