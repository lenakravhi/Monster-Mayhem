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
    //Ця подія очікує на повне завантаження DOM, перш ніж виконувати код всередині обробника. 
    //Це гарантує, що весь HTML-код буде доступним для маніпуляцій.
    document.addEventListener('DOMContentLoaded', function() {
      //Цей рядок вибирає першу кнопку, яка знаходиться всередині елемента з класом "container".
      var changeColorButton = document.querySelector('.container button');
      //Цей рядок вибирає модальне вікно, що знаходиться всередині елемента з класом "container".
      var colorModal = document.querySelector('.container .modal');
      //Цей рядок вибирає елемент <input> з атрибутом type="color", 
      //який знаходиться всередині елемента з класом "modal-content", який, у свою чергу, знаходиться всередині елемента з класом "container". 
      //Це надає обраний елемент змінної colorPicker.
      var colorPicker = document.querySelector('.container .modal-content input[type="color"]');
      //Цей рядок вибирає кнопку, яка знаходиться всередині елемента з класом "modal-content",
      // який, у свою чергу, знаходиться всередині елемента з класом "container". Це надає обрану кнопку змінної applyColorButton.
      var applyColorButton = document.querySelector('.container .modal-content button');
    //Цей код додає обробник події "click" на кнопку changeColorButton. Коли користувач натискає кнопку, виконується функція всередині обробника.
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
    //Цей рядок повідомляє змінну helperTimeout, яка буде використовуватися для зберігання ідентифікатора таймера.
    let helperTimeout;
    
    helpButton.addEventListener('click', toggleHelper);
    
    function toggleHelper() {
      if (helper.style.display === 'block') {
        hideHelper();
      } else {
        showHelper();
      }
    }
    
    function showHelper() {
      helper.style.display = 'block';
      clearTimeout(helperTimeout); // Очищаємо попередній таймер, якщо є
      helperTimeout = setTimeout(hideHelper, 5000); // Приховуємо блок помічника за 5 секунд
    }
    
    function hideHelper() {
      helper.style.display = 'none';
      clearTimeout(helperTimeout); // Очищаємо таймер, щоб блок не ховався автоматично
    }
     
