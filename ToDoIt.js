const todo = {
// Обробник подій дій
  action(e) {
    const target = e.target;
// Перевіряємо, чи є цільовий елемент кнопкою дії
if (target.classList.contains('todo__action')) {
  const action = target.dataset.todoAction;
  const elemItem = target.closest('.todo__item');
  // Перевіряємо тип дії та поточний стан елемента
  if (action === 'deleted' && elemItem.dataset.todoState === 'deleted') {
    // Якщо дію - "видалити" і елемент вже позначений як "видалений", то видаляємо елемент
    elemItem.remove();
  } else {
    // Інакше встановлюємо новий стан елемента
    elemItem.dataset.todoState = action;
    // Створюємо словник, що містить відповідність дії та її текстового опису
        const lexicon = {
          active: 'активні',
          completed: 'завершені',
          deleted: 'видалені',
          all:'всі'
        };
        const elTodoDate = elemItem.querySelector('.todo__date');
        // Генеруємо HTML з описом дії та поточною датою та часом
        const html = `<span>${lexicon[action]}: ${new Date().toLocaleString().slice(0, -3)}</span>`;
        // Вставляємо згенерований HTML елемент із класом "todo__date"
        elTodoDate.insertAdjacentHTML('beforeend', html);
      }
  // Зберігаємо стан списку
  this.save();
} else if (target.classList.contains('todo__add')) {
  // Якщо цільовий елемент є кнопкою "Додати", викликаємо метод додавання задачі
  this.add();
  // Зберігаємо стан списку
  this.save();
}
},

// Додавання завдання
add() {
  const elemText = document.querySelector('.todo__text');
  const elemDueInput = document.querySelector('.todo__due-input');
  // Перевіряємо доступність поля введення та наявність тексту та терміну виконання
  if (elemText.disabled || !elemText.value.length || !elemDueInput.value){
    // Якщо поле введення заблоковане або порожнє, показуємо повідомлення
    alert('Введіть текст завдання!');
    return;
  }
  // Додаємо новий елемент завдання до списку
  document.querySelector('.todo__items').insertAdjacentHTML('beforeend', this.create(elemText.value, elemDueInput.value));
  elemText.value = '';
  elemDueInput.value = '';
},
// Генерація HTML до створення елемента завдання
create(text, dueDate) {
  const date = JSON.stringify({ add: new Date().toLocaleString().slice(0, -3) });
  return `<li class="todo__item" data-todo-state="active">
    <span class="todo__task">
      ${text}
      <span class="todo__date" data-todo-date="${date}">
        <span>додано: ${new Date().toLocaleString().slice(0, -3)}</span </span>
        </span>
        <span class="todo__due">
          <span> термін: ${dueDate}</span>
        </span>
        <span class="todo__action todo__action_restore" data-todo-action="active"></span>
        <span class="todo__action todo__action_complete" data-todo-action="completed"></span>
        <span class="todo__action todo__action_delete" data-todo-action="deleted"></span>
      </li>`;
    },
      // Ініціалізація списку завдань
      init() {
        const fromStorage = localStorage.getItem('todo');
        // Якщо локальному сховищі є збережені дані, відновлюємо список завдань
        if (fromStorage) {
          document.querySelector('.todo__items').innerHTML = fromStorage;
        }
        // Додаємо обробник події зміни вибраного варіанта у списку фільтрів
        document.querySelector('.todo__options').addEventListener('change', this.update);
        // Додаємо обробник події кліка на сторінку
        document.addEventListener('click', this.action.bind(this));
      },
      
    // Оновлення стану списку завдань відповідно до вибраного фільтра
    update() {
      const option = document.querySelector('.todo__options').value;
      // Оновлюємо атрибут "data-todo-option" у списку завдань із вибраним фільтром
      document.querySelector('.todo__items').dataset.todoOption = option;
      // Відключаємо поле введення, якщо вибрано фільтр, відмінний від "активні"
      document.querySelector('.todo__text').disabled = option !== 'active';
    },
// Збереження стану списку завдань у локальному сховищі
      save() {
        localStorage.setItem('todo', document.querySelector('.todo__items').innerHTML);
      }
    };
    // Ініціалізація списку завдань під час завантаження сторінки
    todo.init();
    document.addEventListener('DOMContentLoaded', function() {
      var changeColorButton = document.querySelector('.container button');
      var colorModal = document.querySelector('.container .modal');
      var colorPicker = document.querySelector('.container .modal-content input[type="color"]');
      var applyColorButton = document.querySelector('.container .modal-content button');
    
      changeColorButton.addEventListener('click', function() {
        colorModal.style.display = 'block';
      });
    
      applyColorButton.addEventListener('click', function() {
        var selectedColor = colorPicker.value;
        document.body.style.backgroundColor = selectedColor;
        colorModal.style.display = 'none';
      });
    });
    const helpButton = document.getElementById('helpButton');
    const helper = document.getElementById('helper');
    
    helpButton.addEventListener('mouseenter', showHelper);
    helpButton.addEventListener('mouseleave', hideHelper);
    
    function showHelper() {
      helper.style.display = 'block';
    }
    
    function hideHelper() {
      helper.style.display = 'none';
    }
// Обработчик события нажатия на кнопку "Изменить язык"
document.getElementById('languageButton').addEventListener('click', function() {
  // Показываем модальное окно для выбора языка
  document.getElementById('languageModal').style.display = 'block';
});

// Обработчик события нажатия на кнопку "Применить"
document.getElementById('applyLanguageButton').addEventListener('click', function() {
  // Получаем выбранный язык из выпадающего списка
  var selectedLanguage = document.getElementById('languageSelect').value;
  
  // Выполняем действия для изменения языка на сайте
  changeLanguage(selectedLanguage);
  
  // Скрываем модальное окно
  document.getElementById('languageModal').style.display = 'none';
});

// Функция изменения языка на сайте
function changeLanguage(language) {
  // Здесь вы можете добавить код для изменения текстов на сайте в соответствии с выбранным языком
  if (language === 'en') {
    document.getElementById('changeColorButton').textContent = 'Change Background Color';
    // Изменить другие тексты на английский
  } else if (language === 'fr') {
    document.getElementById('changeColorButton').textContent = 'Changer la couleur de fond';
    // Изменить другие тексты на французский
  } else if (language === 'es') {
    document.getElementById('changeColorButton').textContent = 'Cambiar color de fondo';
    // Изменить другие тексты на испанский
  }
}



