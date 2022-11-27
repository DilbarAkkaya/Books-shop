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
imgLogo.src='../../assets/icons/book.svg';
imgLogo.alt = "logo";
linkLogoDiv.appendChild(imgLogo);
logoDiv.insertAdjacentHTML('afterend', `
<h1>Lovely Books Shop</h1>
`);

const main = document.createElement('main');
main.classList.add('main');
const contentMain = document.createElement('div');
contentMain.classList.add('content-wrapper');
main.appendChild(contentMain);
const sectionWrapper = document.createElement('div');
sectionWrapper.classList.add('flex')
contentMain.appendChild(sectionWrapper);
const sectionFirst = document.createElement('section');
sectionWrapper.appendChild(sectionFirst);
const list = document.createElement('ul');
list.classList.add('list');
sectionFirst.append(list);

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

const sectionBag = document.createElement('section');
const bagWrapper = document.createElement('div');
bagWrapper.classList.add('bag-wrapper', 'column');
sectionBag.prepend(bagWrapper);
const sectionTitle = document.createElement('h2');
sectionTitle.textContent='Your shopping bag';
const bagTotalContainer = document.createElement('div');
bagTotalContainer.classList.add('total-container');
bagTotalContainer.insertAdjacentHTML('beforeend',`
<span class="total-text">Bag Total: $</span>
<span class="total-cost"> 0 </span>`)
bagWrapper.prepend(sectionTitle);
bagWrapper.appendChild(bagTotalContainer);
sectionWrapper.append(sectionBag);


fragment.append(main);
body.appendChild(fragment)

