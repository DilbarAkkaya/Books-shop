const fragment = new DocumentFragment();
const body = document.body;

function createNewElement(parentSelector, el, attrs, text) {
  const parent = document.querySelector(parentSelector)
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
    newElement.appendChild(document.createTextNode(text));
  }
  parent.appendChild(newElement);
}

const header = createNewElement('body', 'header', {class:'header'});
const contentWrapper = createNewElement('header', 'div', {class:'content-wrapper'});
const headerWrapper = createNewElement('div.content-wrapper', 'div', {class:'header-wrapper'});
const logoWrapper = createNewElement('.header-wrapper', 'div', {class:'logo-wrapper'});
const linkLogo = createNewElement('.logo-wrapper', 'a', {href: "#", class:'link-logo'});
const imgLogo = createNewElement('.link-logo', 'img', {src:'../../assets/icons/book.svg', alt: 'logo'});
const titleLogo = createNewElement('.header-wrapper', 'h1', {class:'title-main'}, 'Lovely Books store')

const main = createNewElement('body', 'main', {class: 'main'});
const contentMain = createNewElement('main', 'div', {class: 'content-wrapper'});
const sectionWrapper = createNewElement('main>.content-wrapper', 'div', {class:'flex'});
const sectionFirst = createNewElement('.content-wrapper>.flex', 'section');
const sectionBag = createNewElement('.content-wrapper>.flex','section', {class:'section-bag'});
const bagWrapper = createNewElement('.section-bag', 'div', {class:'bag-wrapper column'});
const sectionTitle = createNewElement('.bag-wrapper', 'h2', {class:'bag-title'}, 'Your shopping bag');



fragment.prependChild(header);
fragment.appendChild(main);

body.prependChild(fragment)