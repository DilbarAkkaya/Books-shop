const fragment = new DocumentFragment();
const body = document.body;

function createNewElement(parentSelector, el, attrs) {
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
  parent.appendChild(newElement);
}




