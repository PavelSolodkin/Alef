import "./index.css";

const like = document.querySelectorAll(".card__like");
const popup = document.querySelector(".popup");
const arrowUp = document.querySelector(".buttons__up");
const price = document.querySelector(".sort__button_price");
const age = document.querySelector(".sort__button_age");
const cards = document.querySelector(".cards");
const cardButton = document.querySelectorAll(".card__button");
const closeMenu = document.querySelector(".burger__close");
const burgerButton = document.querySelector(".header__burger");
const menu = document.querySelector(".burger");

like.forEach((elem) => {
  elem.addEventListener("click", () => {
    elem.classList.toggle("card__like_active");
    if (elem.classList.contains("card__like_active")) {
      popup.classList.add("popup_active");
      setTimeout(() => {
        popup.classList.remove("popup_active");
      }, 2000);
    }
  });
});

cardButton.forEach((elem) => {
  elem.addEventListener("click", () => {
    elem.innerText = "Продан";
    elem.classList.remove("card__button");
    elem.classList.add("card__button_sell");
  });
});

arrowUp.addEventListener("click", () =>
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
);

burgerButton.addEventListener("click", () => {
  menu.classList.add("burger_visible");
});

closeMenu.addEventListener("click", () => {
  menu.classList.remove("burger_visible");
});

price.addEventListener("click", () => sortBy("data-price"));
age.addEventListener("click", () => sortBy("data-age"));

function sortBy(sortType) {
  for (let i = 0; i < cards.children.length; i++) {
    for (let j = i; j < cards.children.length; j++) {
      if (
        +cards.children[i].getAttribute(sortType) >
        +cards.children[j].getAttribute(sortType)
      ) {
        const replacedNode = cards.replaceChild(
          cards.children[j],
          cards.children[i]
        );
        insertAfter(replacedNode, cards.children[i]);
      }
    }
  }
}

function insertAfter(newNode, referenceNode) {
  return referenceNode.parentNode.insertBefore(
    newNode,
    referenceNode.nextSibling
  );
}

function validateEmail(email) {
  const reg =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return reg.test(String(email).toLowerCase());
}

document
  .querySelector(".footer__sub")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const email = document.querySelector(".footer__input").value;
    const error = document.querySelector(".footer__error");
    if (email !== "") {
      if (validateEmail(email)) {
        error.innerText = "Верно!";
        error.classList.add("footer__ok");
      } else {
        error.innerText = "Неверный формат записи!";
        error.classList.remove("footer__ok");
      }
    } else {
      error.innerText = "Пусто. Введите Email!";
      error.classList.remove("footer__ok");
    }
  });
