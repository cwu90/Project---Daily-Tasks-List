const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
let items = JSON.parse(localStorage.getItem('items')) || [];
// const deleteButton = document.querySelectorAll('.fa-trash-can');

/* Main function: getting value from input field, pushing the value to an object "item" and populating it into the "items" array */
function addItem(e) {
  e.preventDefault();
  const text = this.querySelector('[name=item]').value;
  const item = {
    text,
    done: false,
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
        <li data-index="${i}">
        <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
        <label for="items${i}">${plate.text}</label>
        <input type="checkbox" data-index=${i} id="items${i}" ${plate.done} ? 'checked' : ''  />
        </li>
        `;
    })
    .join('');
}

function deleteTrash(e) {
  const item = e.target;
  if (item.classList.contains('fa-trash-can')) {
    const task = item.parentElement.parentElement;
    let index = task.dataset.index;
    task.classList.add('disappear');
    // This code listens for the transitionend event on the task element. When it fires, it checks if the transition that just ended is the one for the 'transform' property. If it is, it removes the event listener, filters the items array and re-populates the list.
    task.addEventListener('transitionend', function remove(e) {
      if (e.propertyName !== 'transform') return;
      task.removeEventListener('transitionend', remove);
      items = items.filter((t, i) => i !== parseInt(index));
      localStorage.setItem('items', JSON.stringify(items));
      populateList(items, itemsList);
    });
  }
}

addItems.addEventListener('submit', addItem);
populateList(items, itemsList);
itemsList.addEventListener('click', deleteTrash);
