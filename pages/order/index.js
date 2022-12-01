const fragment = new DocumentFragment();
const body = document.body;

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
}

const header = document.createElement('header');
header.className = 'header';
fragment.prepend(header);
body.prepend(fragment);

//const header = createNewElement('body', 'header', {class:'header'});
const contentWrapper = createNewElement('header', 'div', { class: 'content-wrapper' });
const headerWrapper = createNewElement('div.content-wrapper', 'div', { class: 'header-wrapper' });
const logoWrapper = createNewElement('.header-wrapper', 'div', { class: 'logo-wrapper' });
const linkLogo = createNewElement('.logo-wrapper', 'a', { href: "#", class: 'link-logo' });
const imgLogo = createNewElement('.link-logo', 'img', { src: '../../assets/icons/book.svg', alt: 'logo' });
const titleLogo = createNewElement('.header-wrapper', 'h1', { class: 'title-main' }, 'Lovely Books store')
/* 
const main = document.createElement('main');
main.className = 'main';
fragment.append(main);
body.append(fragment) */
/* const contentMain = createNewElement('main', 'div', {class: 'content-wrapper'});
const sectionWrapper = createNewElement('main>.content-wrapper', 'div', {class:'flex'});
const sectionFirst = createNewElement('.content-wrapper>.flex', 'section') */;
const sectionBag = createNewElement('.content-wrapper.flex', 'section', { class: 'section-bag' });
const bagWrapper = createNewElement('.section-bag', 'div', { class: 'bag-wrapper column' });
const sectionTitle = createNewElement('.bag-wrapper', 'h2', { class: 'bag-title' }, 'Your shopping bag');
const bagTotalContainer = createNewElement('.bag-wrapper', 'div', { class: 'total-container' });
const totalText = createNewElement('.total-container', 'span', { class: 'total-text' }, 'Bag Total: $');
const totalCost = createNewElement('.total-container', 'span', { class: 'total-cost' }, '0');
const modal = createNewElement('.main', 'div', { class: 'modal hide' });
const modalDialog = createNewElement('.modal', 'div', { class: 'modal-dialog' });
const modalContent = createNewElement('.modal-dialog', 'div', { class: 'modal-content' });
const modalTitle = createNewElement('.modal-content', 'h3', { class: 'bag-title' }, 'The order created');
const closeButton = createNewElement('.modal-content', 'button', { class: 'button close' }, 'Close');

//Form validation
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

inputsAll.forEach(item => {
  if (item.type != 'submit') {
    item.addEventListener('blur', checkInputs);
    item.addEventListener('input', checkInputs)
  }
});

form.addEventListener("change", () => {
  submit.disabled = !form.checkValidity()
});

submit.addEventListener('click', showOrderInfo);
closeButton.addEventListener('click', closeModal);
reset.addEventListener('click', resetForm);

function checkInputs(event) {
  const firstNameValue = firstName.value.trim();
  const surnameValue = surname.value.trim();
  const streetValue = street.value.trim();
  const houseValue = house.value.trim();
  const flatValue = flat.value.trim();
  const red = '1px solid var(--red)';
  const aqwa = '1px solid var(--aqwa)';

  if (event.target.hasAttribute('required') && event.target === firstName) {
    if ((firstNameValue === '') || (firstNameValue.length < 4) || (!(/^[a-zA-Z]+$/i).test(firstNameValue))) {
      firstName.nextElementSibling.classList.remove('hide');
      firstName.style.border = red;
    } else {
      firstName.nextElementSibling.classList.add('hide');
      firstName.style.border = aqwa;
    }
  }
  if (event.target.hasAttribute('required') && event.target === surname) {
    if ((surnameValue === '') || (surnameValue.length < 5) || (!(/^[a-zA-Z]+$/i).test(surnameValue))) {
      surname.nextElementSibling.classList.remove('hide');
      surname.style.border = red;
    } else {
      surname.nextElementSibling.classList.add('hide');
      surname.style.border = aqwa;
    }
  }
  if (event.target.hasAttribute('required') && event.target === street) {
    if ((streetValue === '') || (streetValue.length < 5) || (!(/^[a-zA-Z0-9\s]+$/i).test(streetValue))) {
      street.nextElementSibling.classList.remove('hide');
      street.style.border = red;
    } else {
      street.nextElementSibling.classList.add('hide');
      street.style.border = aqwa;
    }
  }
  if (event.target.hasAttribute('required') && event.target === house) {
    if ((houseValue === '') || (houseValue < 0) || (!(/^[0-9\s]+$/).test(houseValue))) {
      house.nextElementSibling.classList.remove('hide');
      house.style.border = red;
    } else {
      house.nextElementSibling.classList.add('hide');
      house.style.border = aqwa;
    }
  }
  if (event.target.hasAttribute('required') && event.target === flat) {

    if ((flatValue === '') || (flatValue < 0) || (!(/^[1-9][0-9-]*$/).test(flatValue))) {
      flat.nextElementSibling.classList.remove('hide');
      flat.style.border = red;
    } else {
      flat.nextElementSibling.classList.add('hide');
      flat.style.border = aqwa;
    }
  }
  if (event.target.hasAttribute('required') && event.target === date) {
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
    if (date.value < dateValue) {
      date.nextElementSibling.classList.remove('hide');
      date.style.border = red;
    } else {
      date.nextElementSibling.classList.add('hide');
      date.style.border = aqwa;
    }
  }
}

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
};

function resetForm() {
  form.reset();
  submit.disabled = true;
};