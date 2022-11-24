const body = document.body;
const fragment = new DocumentFragment();
const header = document.createElement('header');
header.classList.add('header');
header.innerText='jfdklsjgkfdhgk';
fragment.append(header);

const contentWrapper = document.createElement('div');
contentWrapper.classList.add('content-wrapper');
header.appendChild(contentWrapper);
const headerWrapper = document.createElement('div');
headerWrapper.classList.add('header-wrapper');


body.appendChild(fragment)