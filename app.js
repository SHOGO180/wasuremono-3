'use strict';

const savedItems = JSON.parse(localStorage.getItem('items')) || [];

function displayItems() {
  const itemList = document.querySelector('#itemList');
  itemList.innerHTML = '';

  savedItems.forEach((item, index) => {
    const li = document.createElement('li');

    if(item.strikethrough) {
      li.style.textDecoration = 'line-through';
    } else {
      li.style.textDecoration = 'none';
    }

    li.innerHTML = `
    <input type="checkbox" id="strike${index}" ${item.strikethrough ? 'checked' : ''}>
    ${item.text} 
    <button onclick="removeItem(${index})">削除</button>
    `;

    itemList.appendChild(li);

    const checkbox = li.querySelector(`#strike${index}`);

    checkbox.addEventListener('change', () => {
      item.strikethrough = checkbox.checked;
      saveItems();

      li.style.textDecoration = item.strikethrough ? 'line-through' : 'none';
    });
  });
}

function addItem() {
  const itemInput = document.querySelector('#item');
  const itemText = itemInput.value.trim();
  //.trim(): これは文字列のメソッドで、文字列の両端から空白文字（スペース、タブ、改行など）を取り除きます。

  if (itemText !== '') {
    savedItems.push({
      text: itemText,
      strikethrough: false,
    });
    saveItems();
    itemInput.value = '';
    displayItems();
  }
}

function removeItem(index) {
  if(confirm('このリストを削除して大丈夫?')) {
    savedItems.splice(index, 1);

    saveItems();
    displayItems();
  }
}

function saveItems() {
  localStorage.setItem('items', JSON.stringify(savedItems));
}

function removeStrikethrough() {
  savedItems.forEach(item => {
    item.strikethrough = false;
  });
  saveItems();
  displayItems();
}

displayItems();