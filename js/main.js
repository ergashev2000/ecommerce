(function ($) {
  "use strict";

  // Dropdown on mouse hover
  $(document).ready(function () {
    function toggleNavbarMethod() {
      if ($(window).width() > 992) {
        $(".navbar .dropdown")
          .on("mouseover", function () {
            $(".dropdown-toggle", this).trigger("click");
          })
          .on("mouseout", function () {
            $(".dropdown-toggle", this).trigger("click").blur();
          });
      } else {
        $(".navbar .dropdown").off("mouseover").off("mouseout");
      }
    }
    toggleNavbarMethod();
    $(window).resize(toggleNavbarMethod);
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Vendor carousel
  $(".vendor-carousel").owlCarousel({
    loop: true,
    margin: 29,
    nav: false,
    autoplay: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 2,
      },
      576: {
        items: 3,
      },
      768: {
        items: 4,
      },
      992: {
        items: 5,
      },
      1200: {
        items: 6,
      },
    },
  });

  // Related carousel
  $(".related-carousel").owlCarousel({
    loop: true,
    margin: 29,
    nav: false,
    autoplay: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      },
    },
  });

  // Product Quantity
  $(".quantity button").on("click", function () {
    var button = $(this);
    var oldValue = button.parent().parent().find("input").val();
    if (button.hasClass("btn-plus")) {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 0;
      }
    }
    button.parent().parent().find("input").val(newVal);
  });
})(jQuery);

const allCard = document.querySelector(".trend__product");

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
      cartCounter();
    });
  });
}
renderBtn();
