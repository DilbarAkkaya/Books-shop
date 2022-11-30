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


const input = document.querySelector('input');
input.addEventListener('blur', validateAfterBlur)

  function validateAfterBlur(event){
    if(event.target.hasAttribute('required')) {
      event.target.nextElementSibling.classList.remove('hide')
    }
  }
