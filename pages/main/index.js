const body = document.body;
const fragment = new DocumentFragment();

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

const main = document.createElement('main');
main.classList.add('main');

const footer = document.createElement('footer');
footer.classList.add('header');

const modal = document.createElement('div');
modal.classList.add('modal');

fragment.prepend(header);
body.prepend(fragment);

fragment.append(main);
body.append(fragment);

fragment.append(footer);
body.append(fragment);

fragment.append(modal);
body.append(fragment);

const contentWrapper = createNewElement('header', 'div', {class:'content-wrapper'});
const headerWrapper = createNewElement('div.content-wrapper', 'div', {class:'header-wrapper'});
const logoWrapper = createNewElement('.header-wrapper', 'div', {class:'logo-wrapper'});
const linkLogo = createNewElement('.logo-wrapper', 'a', {href: "#", class:'link-logo'});
const imgLogo = createNewElement('.link-logo', 'img', {src:'../../assets/icons/book.svg', alt: 'logo'});
const titleLogo = createNewElement('.header-wrapper', 'h1', {class:'title-main'}, 'Lovely Books store');
const contentMain = createNewElement('main', 'div', {class: 'content-wrapper flex'});
const sectionFirst = createNewElement('.content-wrapper.flex', 'section', {class: 'section'});
const list = createNewElement('.section', 'ul', {class:'list'});
const sectionBag = createNewElement('.content-wrapper.flex','section', {class:'section-bag'});
const bagWrapper = createNewElement('.section-bag', 'div', {class:'bag-wrapper column'});
const sectionTitle = createNewElement('.bag-wrapper', 'h2', {class:'bag-title'}, 'Your shopping bag');
const bagTotalContainer = createNewElement('.bag-wrapper', 'div', {class: 'total-container'});
const totalText = createNewElement('.total-container', 'span', {class: 'total-text'}, 'Bag Total: $');
const totalCost = createNewElement('.total-container', 'span', {class: 'total-cost'}, '0');
const contentWrapperFooter = createNewElement('footer', 'div', {class: 'content-wrapper'});
const footerWrapper = createNewElement('footer>div.content-wrapper', 'div', {class: 'header-wrapper'});
const logoWrapperFooter = createNewElement('footer>.content-wrapper>.header-wrapper', 'div', {class:'logo-wrapper'});
const linkLogoFooter = createNewElement('footer>.content-wrapper>.header-wrapper>.logo-wrapper', 'a', {href: "#", class:'link-logo'});
const imgLogoFooter = createNewElement('footer>.content-wrapper>.header-wrapper>.logo-wrapper>.link-logo', 'img', {src:'../../assets/icons/book.svg', alt: 'logo'});
const modalDialog = createNewElement('.modal', 'div', {class: 'modal-dialog'});
const modalContent = createNewElement('.modal-dialog', 'div', {class:'modal-content'});
const modalDescription = createNewElement('.modal-content', 'p', {class: 'modal-descr'});
const modalClose = createNewElement('.modal-content', 'button', {class: 'button'}, 'Close');

async function getData() {
  await fetch('../../data.json')
  .then(response => {
      return response.json();
  })
  .then(data => {
      data.forEach(book => {
        list.insertAdjacentHTML('beforeend',`<li class="card column">
        <img src=${book.imageLink} alt="book image" class="card-img">
    <div class="card-descr">
      <p class="author">${book.author}</p>
      <p class="title">${book.title}</p>
      <p class="price">$${book.price}</p>
      <div class="flex column">
      <a href='#' target='_blank' class="show-more">Show more</a>
      <button class="button">Add to bag</button>
      </div>
    </div>
      </li>`)
      });
  });
}

getData();