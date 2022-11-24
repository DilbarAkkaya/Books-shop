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
headerWrapper.appendChild(logoDiv);
const linkLogoDiv = document.createElement('a');
linkLogoDiv.href = "#";
logoDiv.appendChild(linkLogoDiv);
const imgLogo = document.createElement('img');
imgLogo.src='../assets/icons/book.svg';
imgLogo.alt = "logo";
linkLogoDiv.appendChild(imgLogo)

body.appendChild(fragment)

