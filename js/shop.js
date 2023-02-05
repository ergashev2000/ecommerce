
// New codes
const allCard = document.querySelector(".trend__product");
const allProductShop = document.querySelector(".all__product-shop2");

function renderData(data, parentElement) {
  if (parentElement && data) {
    parentElement.innerHTML = " ";

    for (let i = 0; i < data.length; i++) {
      let liBox = document.createElement("div");
      liBox.classList.add(
        "col-lg-4",
        "col-md-6",
        "col-sm-12",
        "pb-1",
        "product__item"
      );
      liBox.innerHTML = `
                      <div class="card product-item border-0 mb-4" data-id=${data[i].id}>
                          <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                              <img class="img-fluid w-100" src="${data[i].img}" alt="">
                          </div>
                          <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                              <h6 class="text-truncate mb-3 product-name">${data[i].name}</h6>
                              <div class="d-flex justify-content-center">
                                  <h6 class="product-price">${data[i].price}</h6>
                                  <h6 class="text-muted ml-2"><del>${data[i].discount}</del></h6>
                              </div>
                          </div>
                          <div class="card-footer d-flex justify-content-center bg-light border">
                              <div class="btn btn-sm text-dark p-0 btn-add-to-cart">
                                  <i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart
                              </div>
                          </div>
                      </div>
          `;
      parentElement.appendChild(liBox);
    }
  }
}
renderData(productData, allCard);
renderData(productData, allProductShop);

const searchInput = document.querySelector("#search__input");

if (searchInput) {
  searchInput.addEventListener("keyup", (e) => {
    searchProducts(searchInput.value);
  });
  
}
function searchProducts(searchTerm) {
  const allProductCards = document.querySelectorAll(".product__item");

  allProductCards.forEach((productCard) => {
    const productName = productCard
      .querySelector(".text-truncate")
      .textContent.toLowerCase();

    if (productName.includes(searchTerm.toLowerCase())) {
      productCard.style.display = "block";
      document.querySelector(".no__product").style.display = "none";
    } else {
      productCard.style.display = "none";
      document.querySelector(".no__product").style.display = "block";
    }
  });
}

function renderBtn() {
  const addToCartBtns = document.querySelectorAll(".btn-add-to-cart");
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const product = e.target.closest(".product-item");
      const productId = product.getAttribute("data-id");

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      let existingProduct = cart.find((item) => item.id === productId);
      if (!existingProduct) {
        cart.push({
          id: productId,
          name: product.querySelector(".product-name").textContent,
          price: product.querySelector(".product-price").textContent,
          img: product.querySelector(".product-img img").getAttribute("src"),
          quantity: 1,
        });
      } else {
        existingProduct.quantity++;
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      cartCounter()
    });
  });
}
renderBtn();
const category = document.querySelector(".filter__category");

let existingCategories = [];
if (productData) {
  for (let i = 0; i < productData.length; i++) {
    let categoryLi = document.createElement("li");

    if (!existingCategories.includes(productData[i].category)) {
      categoryLi.innerHTML = `
          <button type="button" data-id="${productData[i].category}">${productData[i].category}</button>
      `;
      category.appendChild(categoryLi);
      existingCategories.push(productData[i].category);
    }
  }
}

const categoryBtn = document.querySelectorAll(".filter__category button");

for (let i = 0; i < categoryBtn.length; i++) {
  categoryBtn[i].addEventListener("click", function () {
    let filterValue = this.getAttribute("data-id");
    filterData(filterValue, productData);
  });
}

function filterData(filterVal, productData) {
  let filterDataArr = [];
  for (let i = 0; i < productData.length; i++) {
    if (productData[i].category === filterVal) {
      filterDataArr.push(productData[i]);
    }
  }
  renderData(filterDataArr, allProductShop);
  renderBtn();
}

function cartCounter() {
  let counterCart = document.querySelector(".cart__count");
  let localDataLeng = JSON.parse(localStorage.getItem("cart"));
  if (localDataLeng !== null) {
    console.log(localDataLeng)
    counterCart.textContent = localDataLeng.length;
  }
}
cartCounter();


const header = document.querySelector('.header__scroll');
const headerBox = document.querySelector('.space-behind-box');
const limit = 50

window.addEventListener('scroll', function () {
  console.log(window.pageYOffset)
  if (window.pageYOffset >= limit) {
    header.classList.add('fixed-header');
    headerBox.classList.add('space-behind');
  } else {
    header.classList.remove('fixed-header');
    headerBox.classList.remove('space-behind');
  }
});