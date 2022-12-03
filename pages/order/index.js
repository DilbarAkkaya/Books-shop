const fragment = new DocumentFragment();
const body = document.body;
const header = document.createElement('header');
header.className = 'header';
fragment.prepend(header);
body.prepend(fragment);
const contentWrapper = createNewElement('header', 'div', { class: 'content-wrapper' });
const headerWrapper = createNewElement('div.content-wrapper', 'div', { class: 'header-wrapper' });
const logoWrapper = createNewElement('.header-wrapper', 'div', { class: 'logo-wrapper' });
const linkLogo = createNewElement('.logo-wrapper', 'a', { href: "#", class: 'link-logo' });
const imgLogo = createNewElement('.link-logo', 'img', { src: '../../assets/icons/book.svg', alt: 'logo' });
const titleLogo = createNewElement('.header-wrapper', 'h1', { class: 'title-main' }, 'Lovely Books store')
const sectionBag = createNewElement('.content-wrapper.flex', 'section', { class: 'section-bag' });
const bagWrapper = createNewElement('.section-bag', 'div', { class: 'bag-wrapper column' });
const sectionTitle = createNewElement('.bag-wrapper', 'h2', { class: 'bag-title' }, 'Your shopping bag');
const bookList = createNewElement('.bag-wrapper', 'ul', { class: 'card-list' });
const bagTotalContainer = createNewElement('.bag-wrapper', 'div', { class: 'total-container' });
const totalText = createNewElement('.total-container', 'span', { class: 'total-text' }, 'Bag Total: $');
const totalCost = createNewElement('.total-container', 'span', { class: 'total-cost' }, '0');
const modal = createNewElement('.main', 'div', { class: 'modal hide' });
const modalDialog = createNewElement('.modal', 'div', { class: 'modal-dialog' });
const modalContent = createNewElement('.modal-dialog', 'div', { class: 'modal-content' });
const modalTitle = createNewElement('.modal-content', 'h3', { class: 'bag-title' }, 'The order created');
const closeButton = createNewElement('.modal-content', 'button', { class: 'button close' }, 'Close');
const form = document.getElementById('form');
const firstName = document.getElementById('name');
const surname = document.getElementById('surname');
const date = document.getElementById('date');
const street = document.getElementById('street');
const house = document.getElementById('house');
const flat = document.getElementById('flat');
const cash = document.getElementById('cash');
const card = document.getElementById('card');
const submit = document.querySelector('.submit');
const reset = document.querySelector('.reset');
const inputsAll = document.querySelectorAll('input');
const red = '1px solid var(--red)';
const aqwa = '1px solid var(--aqwa)';
let isFirstNameInputValid = false;
let isFirstNameInputBlur = false;
let isSurnameInputValid = false;
let isSurnameInputBlur = false;
let isStreetInputValid = false;
let isStreetInputBlur = false;
let isHouseInputValid = false;
let isHouseInputBlur = false;
let isFlatValid = false;
let isFlatBlur = false;
let isDateValid = false;
let isDateBlur = false;

firstName.addEventListener('input', checkName);
firstName.addEventListener('blur', () => {
  isFirstNameInputBlur = true;
  checkName();
});

surname.addEventListener('input', checkSurname);
surname.addEventListener('blur', () => {
  isSurnameInputBlur = true;
  checkSurname();
});

street.addEventListener('input', checkStreet);
street.addEventListener('blur', () => {
  isStreetInputBlur = true;
  checkStreet();
});

house.addEventListener('input', checkHouse);
house.addEventListener('blur', () => {
  isHouseInputBlur = true;
  checkHouse();
});

flat.addEventListener('input', checkFlat);
flat.addEventListener('blur', () => {
  isFlatBlur = true;
  checkFlat();
});

date.addEventListener('input', checkDate);
date.addEventListener('blur', () => {
  isDateBlur = true;
  checkDate();
});

form.addEventListener("change", (event) => {
  submit.disabled = !form.checkValidity()
});

submit.addEventListener('click', showOrderInfo);

closeButton.addEventListener('click', closeModal);

reset.addEventListener('click', resetForm);

document.addEventListener('click', closeModalClickWindow);

window.addEventListener('load', getBooksFromLocaleStorage);

bookList.addEventListener('click', deleteBook);

function getBooksFromLocaleStorage(){
  const booksInBag = JSON.parse(localStorage.getItem('booksArray') || '[]');
  booksInBag.forEach(book => {
    bookList.insertAdjacentHTML('beforeend', `
      <li class="card row">
        <img src="../../assets/icons/close.svg" class="close-icon" alt="close-icon">
        <img src=${book.imgProp} alt="book image" class="card-img">
        <div class="card-descr">
          <p class="author">${book.authorProp}</p>
          <p class="title">${book.titleProp}</p>
          <p class="price">$<span class="cost"data-cost=${book.priceProp}>${book.priceProp}</span></p>
        </div>
      </li>
    `
  );
});
  totalCost.textContent = localStorage.getItem('total');
};

function deleteBook(e) {
  const bookInBag = e.target.closest('.card');
  if (e.target.closest('.close-icon')) {
    bookInBag.classList.add('hide');
    const price = bookInBag.querySelector('.cost');
    totalCost.textContent = totalCost.textContent - price.textContent;
  }
};

function createNewElement(parentSelector, el, attrs, text) {
  const parent = document.querySelector(parentSelector);
  const newElement = document.createElement(el);
  if (attrs) {
    for (key in attrs) {
      if (key == 'class') {
        newElement.className = attrs[key];
      } else if (key == 'id') {
        newElement.id = attrs[key];
      } else {
        newElement.setAttribute(key, attrs[key]);
      }
    }
  }
  if (text) {
    newElement.innerHTML = text;
  }
  parent.append(newElement);
  return newElement;
};

function checkSurname() {
  let surnameValue = surname.value.trim();
  if (isSurnameInputBlur && ((surnameValue === '') || (surnameValue.length < 4) || (!(/^[a-zA-Z]+$/i).test(surnameValue)))) {
    surname.nextElementSibling.classList.remove('hide');
    surname.style.border = red;
    isSurnameInputValid = false;
  } else {
    surname.nextElementSibling.classList.add('hide');
    surname.style.border = aqwa;
    isSurnameInputValid = true;
  }
  surname.setAttribute('isValid', isSurnameInputValid);
  checkInputs();
};

function checkStreet() {
  let streetValue = street.value.trim();
  if (isStreetInputBlur && ((streetValue === '') || (streetValue.length < 5) || (!(/^[a-zA-Z0-9\s]+$/i).test(streetValue)))) {
    street.nextElementSibling.classList.remove('hide');
    street.style.border = red;
    isStreetInputValid = false;
  } else {
    street.nextElementSibling.classList.add('hide');
    street.style.border = aqwa;
    isStreetInputValid = true;
  }
  surname.setAttribute('isValid', isStreetInputValid);
  checkInputs();
};

function checkHouse() {
  let houseValue = house.value.trim();
  if (isHouseInputBlur && ((houseValue === '') || (houseValue < 0) || (!(/^[0-9\s]+$/).test(houseValue)))) {
    house.nextElementSibling.classList.remove('hide');
    house.style.border = red;
    isHouseInputValid = false;
  } else {
    house.nextElementSibling.classList.add('hide');
    house.style.border = aqwa;
    isHouseInputValid = true;
  }
  house.setAttribute('isValid', isHouseInputValid);
  checkInputs();
};

function checkFlat() {
  let flatValue = flat.value.trim();
  if (isFlatBlur && ((flatValue === '') || (flatValue < 0) || (!(/^[1-9][0-9-]*$/).test(flatValue)))) {
    flat.nextElementSibling.classList.remove('hide');
    flat.style.border = red;
    isFlatValid = false;
  } else {
    flat.nextElementSibling.classList.add('hide');
    flat.style.border = aqwa;
    isFlatValid = true;
  }
  flat.setAttribute('isValid', isFlatValid);
  checkInputs();
};

function checkDate() {
  let dateValue = date.value;
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDate = today.getDate();
  let tomorrow = todayDate + 1;
  if ((tomorrow) < 10) {
    tomorrow = "0" + tomorrow;
  }
  dateValue = todayYear + "-" + todayMonth + "-" + tomorrow;
  if (isDateBlur && date.value < dateValue) {
    date.nextElementSibling.classList.remove('hide');
    date.style.border = red;
    isDateValid = false;
  } else {
    date.nextElementSibling.classList.add('hide');
    date.style.border = aqwa;
    isDateValid = true;
  }
  date.setAttribute('isValid', isDateValid);
  checkInputs();
};

function checkName() {
  let firstNameValue = firstName.value.trim();
  if (isFirstNameInputBlur && ((firstNameValue === '') || (firstNameValue.length < 4) || (!(/^[a-zA-Z]+$/i).test(firstNameValue)))) {
    firstName.nextElementSibling.classList.remove('hide');
    firstName.style.border = red;
    isFirstNameInputValid = false;
  } else {
    firstName.nextElementSibling.classList.add('hide');
    firstName.style.border = aqwa;
    isFirstNameInputValid = true;
  }
  firstName.setAttribute('isValid', isFirstNameInputValid);
  checkInputs();
};

function checkInputs() {
  if (isFirstNameInputValid && isSurnameInputValid && isStreetInputValid && isHouseInputValid && isFlatValid && isDateValid && isFirstNameInputBlur && isSurnameInputBlur && isStreetInputBlur && isHouseInputBlur && isFlatBlur && isDateBlur) {
    submit.disabled = false;
  } else {
    submit.disabled = true;
  }
};

function showOrderInfo(event) {
  event.preventDefault();
  modal.classList.remove('hide');
  modalTitle.insertAdjacentHTML('beforeend', `
    <p class="modal-descr">Name: ${firstName.value}</p>
    <p class="modal-descr">Surname: ${surname.value}</p>
    <p class="modal-descr">Delivery adress: ${street.value} street house ${house.value} flat ${flat.value}</p>
    <p class="modal-descr">Delivery date: ${date.value}</p>
  `)
};

function closeModal() {
  modal.classList.add('hide');
  modalTitle.innerHTML = '';
};

function resetForm() {
  form.reset();
  submit.disabled = true;
};

function closeModalClickWindow(event) {
  if (event.target === modal) {
    closeModal();
  }
};