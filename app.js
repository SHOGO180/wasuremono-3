'use strict';

const savedItems = JSON.parse(localStorage.getItem('items')) || [];

function displayItems() {
  const itemList = document.querySelector('#itemList');
  itemList.innerHTML = '';

  savedItems.forEach((item, index) => {
    const li = document.createElement('li');

    if (item.strikethrough) {
      li.style.textDecoration = 'line-through';
    } else {
      li.style.textDecoration = 'none';
    }

    li.innerHTML = `
      <input type="checkbox" id="strike${index}" ${item.strikethrough ? 'checked' : ''}>
      <span>${item.text}</span>
      <button class="edit-button" onclick="editItem(${index})">編集</button>
      <button onclick="removeItem(${index})">削除</button>
    `;

    itemList.appendChild(li);

    const checkbox = li.querySelector(`#strike${index}`);
    const span = li.querySelector('span');
    const editButton = li.querySelector('.edit-button');

    checkbox.addEventListener('change', () => {
      item.strikethrough = checkbox.checked;
      saveItems();

      if (span) {
        span.style.textDecoration = item.strikethrough ? 'line-through' : 'none';
      }
    });

    // ボタンに斜線を適用しないようにする
   if(editButton) {
    editButton.style.textDecoration = 'none';
   }
  });
}


function addItem() {
  const itemInput = document.querySelector('#item');
  const itemText = itemInput.value.trim();

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

function editItem(index) {
  const newText = prompt('アイテムを編集', savedItems[index].text);

  if (newText !== null) {
    savedItems[index].text = newText.trim();
    saveItems();
    displayItems();
  }
}

function removeItem(index) {
  if (confirm('このリストを削除して大丈夫?')) {
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

// ページ読み込み時に一度だけ表示
displayItems();
