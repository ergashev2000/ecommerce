
const header = document.querySelector(".header__scroll");
const headerBox = document.querySelector(".space-behind-box");
const limit = 50;

window.addEventListener("scroll", function () {
  console.log(window.pageYOffset);
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
