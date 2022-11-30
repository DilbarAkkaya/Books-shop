(async () => {
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

  fragment.prepend(header);
  body.prepend(fragment);

  fragment.append(main);
  body.append(fragment);

  fragment.append(footer);
  body.append(fragment);

  const contentWrapper = createNewElement('header', 'div', { class: 'content-wrapper' });
  const headerWrapper = createNewElement('div.content-wrapper', 'div', { class: 'header-wrapper' });
  const logoWrapper = createNewElement('.header-wrapper', 'div', { class: 'logo-wrapper' });
  const linkLogo = createNewElement('.logo-wrapper', 'a', { href: "#", class: 'link-logo' });
  const imgLogo = createNewElement('.link-logo', 'img', { src: '../../assets/icons/book.svg', alt: 'logo' });
  const titleLogo = createNewElement('.header-wrapper', 'h1', { class: 'title-main' }, 'Lovely Books store');
  const contentMain = createNewElement('main', 'div', { class: 'content-wrapper flex' });
  const sectionFirst = createNewElement('.content-wrapper.flex', 'section', { class: 'section' });
  const list = createNewElement('.section', 'ul', { class: 'list' });
  const sectionBag = createNewElement('.content-wrapper.flex', 'section', { class: 'section-bag' });
  const bagWrapper = createNewElement('.section-bag', 'div', { class: 'bag-wrapper column' });
  const sectionTitle = createNewElement('.bag-wrapper', 'h2', { class: 'bag-title' }, 'Your shopping bag');
  //const bookWrapper = createNewElement('.bag-wrapper', 'div', {class: 'flex column'})
  const bookList = createNewElement('.bag-wrapper', 'ul', { class: 'card-list' });
  // const bookContainerImg = createNewElement('.card-list', 'img', { src: '../../assets/icons/close.svg', alt: 'img', class: 'close-icon hide'} )
  const bagTotalContainer = createNewElement('.bag-wrapper', 'div', { class: 'total-container' });
  const totalText = createNewElement('.total-container', 'span', { class: 'total-text' }, 'Bag Total: $');
  const totalCost = createNewElement('.total-container', 'span', { class: 'total-cost' }, '0');
  const confirmOrder = createNewElement('.bag-wrapper', 'button', { class: 'button add-bag hide' }, 'Confirm order');
  const contentWrapperFooter = createNewElement('footer', 'div', { class: 'content-wrapper' });
  const footerWrapper = createNewElement('footer>div.content-wrapper', 'div', { class: 'header-wrapper' });
  const logoWrapperFooter = createNewElement('footer>.content-wrapper>.header-wrapper', 'div', { class: 'logo-wrapper' });
  const linkLogoFooter = createNewElement('footer>.content-wrapper>.header-wrapper>.logo-wrapper', 'a', { href: "#", class: 'link-logo' });
  const imgLogoFooter = createNewElement('footer>.content-wrapper>.header-wrapper>.logo-wrapper>.link-logo', 'img', { src: '../../assets/icons/book.svg', alt: 'logo' });

  async function getData() {
    const url = '../../data.json';
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  let data = await getData();

  data.forEach((book, i) => {
    const li = `
        <li class="card column" data-id="${i}" draggable="true">
          <img src=${book.imageLink} alt="book image" class="card-img">
          <div class="card-descr">
            <p class="author">${book.author}</p>
            <p class="title">${book.title}</p>
            <p class="price">$<span class="cost"data-cost=${book.price}>${book.price}</span></p>
            <div class="flex column">
              <button class="button show-more">Show more</button>
              <button class="button add-bag">Add to bag</button>
              <div class="modal hide">
                <div class="modal-dialog">
                <div class="modal-content">
                  <p class="title">${book.title}</p>
                  <p class="modal-descr">${book.description}</p>
                  <button class="button close">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>`
    list.insertAdjacentHTML('beforeend', li
    );
  });
  list.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    const modal = card.querySelector('.modal');
    const price = card.querySelector('.cost');
    const author = card.querySelector('.author');
    const title = card.querySelector('.title');

    if (e.target.closest('.show-more')) {
      modal.classList.toggle('hide');
    }
    if (e.target.closest('.close')) {
      modal.classList.add('hide');
    }
    if (e.target.closest('.add-bag')) {
      bookList.insertAdjacentHTML('beforeend', `<li class="card row">
        <img src=${card.children[0].currentSrc} alt="book image" class="card-img">
        <div class="card-descr">
        <p class="author">${author.textContent}</p>
        <img src=../../assets/icons/close.svg class="close-icon" alt="close-icon">
        <p class="title">${title.textContent}</p>
        <p class="price">$<span class="cost"data-cost=${price.textContent}>${price.textContent}</span></p>
</div>

      </li>`);
      if (totalCost.textContent) {
        totalCost.textContent = +totalCost.textContent + +price.dataset.cost;
      }
      confirmOrder.classList.remove('hide');
    }
  })
  bookList.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (e.target.closest('.close-icon')) {
      card.classList.add('hide');
      const price = card.querySelector('.cost');
      totalCost.textContent = totalCost.textContent - price.textContent
    if (totalCost.textContent == 0) {
      confirmOrder.classList.add('hide')
    }
    }
  })

  list.addEventListener('dragstart', dragstart)
  bagWrapper.addEventListener('drop', drop);
  bagWrapper.addEventListener('dragover', dragover)


  function dragstart(event) {
    const card = event.target.closest('.card');
    const url = card.children[0].currentSrc;
    const price = card.querySelector('.cost');
    const author = card.querySelector('.author');
    const title = card.querySelector('.title');
    event.dataTransfer.setData("author", author.textContent);
    event.dataTransfer.setData("title", title.textContent);
    event.dataTransfer.setData("urlForImage", url);
    event.dataTransfer.setData('price', price.textContent);
    console.log(card)
  };

  function drop(event) {
    event.preventDefault();
    const total = document.querySelector('.total-cost');
    const authorText = event.dataTransfer.getData('author');
    const titleText = event.dataTransfer.getData('title');
    const urlForImage = event.dataTransfer.getData('urlForImage');
    const priceText = event.dataTransfer.getData('price');
    const bookList = document.querySelector('.card-list');
    const book = `
      <li class="card row">
        <img src=${urlForImage} alt="book image" class="card-img">
        <div class="card-descr">
          <p class="author">${authorText}</p>
          <img src=../../assets/icons/close.svg class="close-icon" alt="close-icon">
          <p class="title">${titleText}</p>
          <p class="price">$<span class="cost"data-cost=${priceText}>${priceText}</span></p>
        </div>
      </li>
      `;

    bookList.insertAdjacentHTML('beforeend', book);
    confirmOrder.classList.remove('hide');
    if (total.textContent) {
      total.textContent = +total.textContent + +priceText;
    }
  };

  function dragover(event) {
    event.preventDefault();
  };
})();

