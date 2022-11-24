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
contentMain.append(list);
fetch('./data.json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            data.forEach(element => {
              list.insertAdjacentHTML('beforeend',`<li>${element.imageLink}</li>`)
            });
        });
fragment.append(main);
body.appendChild(fragment)

