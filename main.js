"use strict";

const menuOpen = document.querySelector(".menu-open");
const closeMenu = document.querySelector(".menu-close");
const menu = document.querySelector(".menu");
const backdrop = document.querySelector(".backdrop");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const productImage = document.querySelectorAll(".product-image");
const increaseProduct = document.querySelector(".increase-product");
const decreaseProduct = document.querySelector(".decrease-product");
const totalProduct = document.querySelector(".total-product");
const addToCart = document.querySelector(".add-to-cart");
const cart = document.querySelector(".cart");
const productQuantityInCart = document.querySelector(
  ".product-quantity-in-cart"
);
const openCart = document.querySelector(".open-cart");
const closeCart = document.querySelector(".close-cart");
const emptyCartMsg = document.querySelector(".empty-cart-msg");
const cartContent = document.querySelector(".cart-content");
const productQuantityInCartContent = document.querySelector(
  ".product-quantity-in-cart-content"
);
const totalPrice = document.querySelector(".total-price");
const deleteProductFromCart = document.querySelector(
  ".delete-product-from-cart"
);

const thumbnail = document.querySelectorAll(".thumbnail");
const thumbnailDiv = document.querySelectorAll(".thumbnail-div");

const lightBox = document.querySelector(".lightbox");
const lightBoxProductImage = document.querySelector(".lightbox-product-image");
const lightBoxPrev = document.querySelector(".lightbox-prev");
const lightBoxNext = document.querySelector(".lightbox-next");
const lightBoxClose = document.querySelector(".lightbox-close");

const lightBoxThumbnail = document.querySelectorAll(".lightbox-thumbnail");
const lightBoxThumbnailBackdrop = document.querySelectorAll(
  ".lightbox-thumbnail-backdrop"
);

menuOpen.addEventListener("click", () => {
  menu.classList.remove("hidden");
  menu.classList.add("flex");
  backdrop.classList.remove("hidden");
});

closeMenu.addEventListener("click", () => {
  menu.classList.remove("flex");
  menu.classList.add("hidden");
  backdrop.classList.add("hidden");
});

let currentProductImage = 0;
const maxProductImage = 3;

next.addEventListener("click", () => {
  if (currentProductImage < maxProductImage) {
    const currentImage = productImage[currentProductImage];
    currentImage.classList.add("hidden");

    currentProductImage++;
    productImage[currentProductImage].classList.remove("hidden");
  }
});

prev.addEventListener("click", () => {
  if (currentProductImage > 0) {
    const currentImage = productImage[currentProductImage];
    currentImage.classList.add("hidden");

    currentProductImage--;
    productImage[currentProductImage].classList.remove("hidden");
  }
});

increaseProduct.addEventListener("click", () => {
  if (Number(totalProduct.textContent) < 50) {
    totalProduct.textContent = Number(totalProduct.textContent) + 1;
  }
});

decreaseProduct.addEventListener("click", () => {
  if (Number(totalProduct.textContent) > 0) {
    totalProduct.textContent = Number(totalProduct.textContent) - 1;
  }
});

openCart.addEventListener("click", () => {
  if (cart.classList.contains("hidden")) {
    cart.classList.remove("hidden");
    closeCart.classList.remove("hidden");
  } else {
    cart.classList.add("hidden");
    closeCart.classList.add("hidden");
  }
});

closeCart.addEventListener("click", () => {
  cart.classList.add("hidden");
  closeCart.classList.add("hidden");
});

function deleteCartItems() {
  cartContent.classList.add("hidden");
  emptyCartMsg.classList.remove("hidden");
  productQuantityInCart.classList.add("hidden");
}

addToCart.addEventListener("click", () => {
  let productQuantity = Number(totalProduct.textContent);

  if (productQuantity > 0) {
    productQuantityInCart.classList.contains("hidden") &&
      productQuantityInCart.classList.remove("hidden");
    productQuantityInCart.textContent = productQuantity;

    emptyCartMsg.classList.add("hidden");
    cartContent.classList.remove("hidden");
    productQuantityInCartContent.textContent = productQuantity;
    totalPrice.textContent = "$" + String(125 * productQuantity) + ".00";
  }

  if (productQuantity === 0) {
    deleteCartItems();
  }
});

deleteProductFromCart.addEventListener("click", () => {
  deleteCartItems();
});

for (let i = 0; i < thumbnail.length; i++) {
  thumbnail[i].addEventListener("click", () => {
    let current = document.querySelector(".not-hidden");
    current.classList.add("hidden");
    current.classList.remove("not-hidden");
    productImage[i].classList.remove("hidden");
    productImage[i].classList.add("not-hidden");

    current = document.querySelector(".thumbnail-border");
    current.classList.remove("thumbnail-border");
    thumbnailDiv[i].classList.add("thumbnail-border");

    current = document.querySelector(".thumbnail-selected");
    current.classList.remove("thumbnail-selected");
    thumbnail[i].classList.add("thumbnail-selected");
  });
}

for (let i = 0; i < productImage.length; i++) {
  productImage[i].addEventListener("click", () => {
    const productNum = productImage[i].dataset.imageNum;
    lightBox.classList.remove("hidden");
    lightBoxProductImage.src = `./assests/images/image-product-${productNum}.jpg`;
    lightBoxProductImage.dataset.imageNum = productNum;

    for (let i = 0; i < lightBoxThumbnail.length; i++) {
      if (lightBoxThumbnail[i].dataset.imageNum === productNum) {
        lightBoxThumbnail[i].classList.add("thumbnail-border");
        lightBoxThumbnailBackdrop[i].classList.remove("hidden");
      }

      if (lightBoxThumbnail[i].dataset.imageNum != productNum) {
        lightBoxThumbnail[i].classList.remove("thumbnail-border");
        lightBoxThumbnailBackdrop[i].classList.add("hidden");
      }
    }
  });
}

lightBoxNext.addEventListener("click", () => {
  const maxProductNum = 4;
  let productNum = lightBoxProductImage.dataset.imageNum;

  if (productNum < maxProductNum) {
    productNum++;
    lightBoxProductImage.src = `./assests/images/image-product-${productNum}.jpg`;
    lightBoxProductImage.dataset.imageNum = productNum;

    for (let i = 0; i < lightBoxThumbnail.length; i++) {
      if (+lightBoxThumbnail[i].dataset.imageNum === productNum) {
        console.log(lightBoxThumbnail[i]);
        lightBoxThumbnail[i].classList.add("thumbnail-border");
        lightBoxThumbnailBackdrop[i].classList.remove("hidden");
      }

      if (+lightBoxThumbnail[i].dataset.imageNum != productNum) {
        lightBoxThumbnail[i].classList.remove("thumbnail-border");
        lightBoxThumbnailBackdrop[i].classList.add("hidden");
      }
    }
  }
});

lightBoxPrev.addEventListener("click", () => {
  const minProductNum = 1;
  let productNum = lightBoxProductImage.dataset.imageNum;

  if (productNum > minProductNum) {
    productNum--;
    lightBoxProductImage.src = `./assests/images/image-product-${productNum}.jpg`;
    lightBoxProductImage.dataset.imageNum = productNum;

    for (let i = 0; i < lightBoxThumbnail.length; i++) {
      if (+lightBoxThumbnail[i].dataset.imageNum === productNum) {
        lightBoxThumbnail[i].classList.add("thumbnail-border");
        lightBoxThumbnailBackdrop[i].classList.remove("hidden");
      }

      if (+lightBoxThumbnail[i].dataset.imageNum != productNum) {
        lightBoxThumbnail[i].classList.remove("thumbnail-border");
        lightBoxThumbnailBackdrop[i].classList.add("hidden");
      }
    }
  }
});

for (let i = 0; i < lightBoxThumbnail.length; i++) {
  lightBoxThumbnail[i].addEventListener("click", () => {
    const productNum = lightBoxThumbnail[i].dataset.imageNum;
    lightBoxProductImage.src = `./assests/images/image-product-${productNum}.jpg`;
    lightBoxProductImage.dataset.imageNum = productNum;

    for (let i = 0; i < lightBoxThumbnail.length; i++) {
      if (lightBoxThumbnail[i].dataset.imageNum === productNum) {
        lightBoxThumbnail[i].classList.add("thumbnail-border");
        lightBoxThumbnailBackdrop[i].classList.remove("hidden");
      }

      if (lightBoxThumbnail[i].dataset.imageNum != productNum) {
        lightBoxThumbnail[i].classList.remove("thumbnail-border");
        lightBoxThumbnailBackdrop[i].classList.add("hidden");
      }
    }
  });
}

lightBoxClose.addEventListener("click", () => {
  lightBox.classList.add("hidden");
});
