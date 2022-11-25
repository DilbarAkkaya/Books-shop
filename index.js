const body = document.body;
const fragment = new DocumentFragment();
const header = document.createElement('header');
header.classList.add('header');
fragment.append(header);

const contentWrapper = document.createElement('div');
contentWrapper.classList.add('content-wrapper');
header.appendChild(contentWrapper);

const headerWrapper = document.createElement('div');
headerWrapper.classList.add('header-wrapper');
contentWrapper.appendChild(headerWrapper);
const logoDiv = document.createElement('div');
logoDiv.style.marginRight = '15px';
headerWrapper.appendChild(logoDiv);
const linkLogoDiv = document.createElement('a');
linkLogoDiv.href = "#";
logoDiv.appendChild(linkLogoDiv);
const imgLogo = document.createElement('img');
imgLogo.src='../assets/icons/book.svg';
imgLogo.alt = "logo";
linkLogoDiv.appendChild(imgLogo);
logoDiv.insertAdjacentHTML('afterend', `
<h1>Lovely Books Shop</h1>
`);

const main = document.createElement('main');
main.classList.add('main');
const contentMain = document.createElement('div');
contentMain.classList.add('content-wrapper');

const booksContainer = document.createElement('div');
contentMain.append(booksContainer);
main.appendChild(contentMain);
const list = document.createElement('ul');
list.classList.add('list');
contentMain.append(list);

async function getData() {
  await fetch('./data.json')
  .then(response => {
      return response.json();
  })
  .then(data => {
      data.forEach(book => {
        list.insertAdjacentHTML('beforeend',`<li class="card">
        <img src=${book.imageLink} alt="book image" class="card-img">
    <div class="card-descr">
      <p class="author"><span>${book.author}</span></p>
      <p class="title"><span>${book.title}</span></p>
      <p class="price">Price: <span>$${book.price}</span></p>
      <div class="flex">
      <a href='#' target='_blank' class="show-more">Show more</a>
      <button class="button add-bag">Add to bag</button>
      </div>
    </div>
      </li>`)
      });
  });
}

getData();
fragment.append(main);
body.appendChild(fragment)

