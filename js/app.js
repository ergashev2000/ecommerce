document
  .querySelector(".head__form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const searchText = document.querySelector("input").value;
    window.location.href = `/shop.html?search=${searchText}`;
  });

