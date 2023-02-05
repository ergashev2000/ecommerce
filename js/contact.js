function cartCounter() {
  let counterCart = document.querySelector(".cart__count");
  let localDataLeng = JSON.parse(localStorage.getItem("cart"));
  if (localDataLeng !== null) {
    console.log(localDataLeng);
    counterCart.textContent = localDataLeng.length;
  }
}
cartCounter();
