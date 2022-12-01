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
 return parent.append(newElement);
}


const header = document.createElement('header');
header.className = 'header';
fragment.prepend(header);
body.prepend(fragment);

//const header = createNewElement('body', 'header', {class:'header'});
const contentWrapper = createNewElement('header', 'div', {class:'content-wrapper'});
const headerWrapper = createNewElement('div.content-wrapper', 'div', {class:'header-wrapper'});
const logoWrapper = createNewElement('.header-wrapper', 'div', {class:'logo-wrapper'});
const linkLogo = createNewElement('.logo-wrapper', 'a', {href: "#", class:'link-logo'});
const imgLogo = createNewElement('.link-logo', 'img', {src:'../../assets/icons/book.svg', alt: 'logo'});
const titleLogo = createNewElement('.header-wrapper', 'h1', {class:'title-main'}, 'Lovely Books store')
/* 
const main = document.createElement('main');
main.className = 'main';
fragment.append(main);
body.append(fragment) */
/* const contentMain = createNewElement('main', 'div', {class: 'content-wrapper'});
const sectionWrapper = createNewElement('main>.content-wrapper', 'div', {class:'flex'});
const sectionFirst = createNewElement('.content-wrapper>.flex', 'section') */;
const sectionBag = createNewElement('.content-wrapper.flex','section', {class:'section-bag'});
const bagWrapper = createNewElement('.section-bag', 'div', {class:'bag-wrapper column'});
const sectionTitle = createNewElement('.bag-wrapper', 'h2', {class:'bag-title'}, 'Your shopping bag');
const bagTotalContainer = createNewElement('.bag-wrapper', 'div', {class: 'total-container'});
const totalText = createNewElement('.total-container', 'span', {class: 'total-text'}, 'Bag Total: $');
const totalCost = createNewElement('.total-container', 'span', {class: 'total-cost'}, '0');




//Form validation
const form = document.getElementById('form');
const firstName = document.getElementById('name');
const surname = document.getElementById('surname');
const date = document.getElementById('date');
const street = document.getElementById('street');
const house =document.getElementById('house');
const flat = document.getElementById('flat');
const cash = document.getElementById('cash');
const card = document.getElementById('card');
const submit =document.querySelector('.submit');

const inputsAll = document.querySelectorAll('input');
inputsAll.forEach(item => {
  if(item.type != 'submit') {
 item.addEventListener('blur', checkInputs);
 item.addEventListener('input', checkInputs)
  }
})

  function checkInputs(event) {
    if(event.target.hasAttribute('required')) {
      event.target.nextElementSibling.classList.remove('hide');
      event.target.style.border = "1px solid var(--red)"
    } 
    const firstNameValue = firstName.value.trim();
    if((firstNameValue === '') || (firstNameValue.length < 4) || (!(/^[a-zA-Z]+$/i).test(firstNameValue))){
      firstName.nextElementSibling.classList.remove('hide')
      firstName.style.border = '1px solid var(--red)'
    } else {
      firstName.nextElementSibling.classList.add('hide');
      firstName.style.border = '1px solid var(--aqwa)';
    }
    const surnameValue = surname.value.trim();
    if((surnameValue === '') || (surnameValue.length < 5) || (!(/^[a-zA-Z]+$/i).test(surnameValue))){
      surname.nextElementSibling.classList.remove('hide')
      surname.style.border = '1px solid var(--red)'
    } else {
      surname.nextElementSibling.classList.add('hide');
      surname.style.border = '1px solid var(--aqwa)';
    }
    const streetValue = street.value.trim();
    if((streetValue === '') || (streetValue.length < 5) || (!(/^[a-zA-Z0-9\s]+$/i).test(streetValue))){
      street.nextElementSibling.classList.remove('hide')
      street.style.border = '1px solid var(--red)'
    } else {
      street.nextElementSibling.classList.add('hide');
      street.style.border = '1px solid var(--aqwa)';
    }
    const houseValue = house.value.trim();
    if((houseValue === '') || (houseValue < 0) || (!(/^[0-9\s]+$/).test(houseValue))){
      house.nextElementSibling.classList.remove('hide')
      house.style.border = '1px solid var(--red)'
    } else {
      house.nextElementSibling.classList.add('hide');
      house.style.border = '1px solid var(--aqwa)';
    }
    const flatValue = flat.value.trim();
    if((flatValue === '') || (flatValue < 0) || (!(/^[1-9][0-9-]*$/).test(flatValue))){
      flat.nextElementSibling.classList.remove('hide')
      flat.style.border = '1px solid var(--red)'
    } else {
      flat.nextElementSibling.classList.add('hide');
      flat.style.border = '1px solid var(--aqwa)';
    }
    let dateValue = date.value;
    let today = new Date();
    let todayYear = today.getFullYear();
    let todayMonth = today.getMonth()+1;
    let todayDate = today.getDate();
    let tomorrow = todayDate +1;
    if ((tomorrow) < 10) {
      tomorrow = "0" + tomorrow;
      console.log(tomorrow)
    }
   // dateValue = today.getFullYear() + "/" + today.getMonth() + "/" + today.getDate()
    dateValue = todayYear + "-" + todayMonth + "-" + (tomorrow);
    console.log(dateValue);
    console.log(date.value)
   // date.setAttribute("min", `${dateValue}`)
if(date.value < dateValue) {
  console.log('ok')
  date.nextElementSibling.classList.remove('hide')
  date.style.border = '1px solid var(--red)'
} else {
  date.nextElementSibling.classList.add('hide');
  date.style.border = '1px solid var(--aqwa)';
}
}