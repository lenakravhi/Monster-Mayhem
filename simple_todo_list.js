const todo = {
  // Обработчик событий действий
  action(e) {
    const target = e.target;
    // Проверяем, является ли целевой элемент кнопкой действия
    if (target.classList.contains('todo__action')) {
      const action = target.dataset.todoAction;
      const elemItem = target.closest('.todo__item');
      // Проверяем тип действия и текущее состояние элемента
      if (action === 'deleted' && elemItem.dataset.todoState === 'deleted') {
        // Если действие - "удалить" и элемент уже помечен как "удаленный", то удаляем элемент
        elemItem.remove();
      } else {
        // Иначе, устанавливаем новое состояние элемента
        elemItem.dataset.todoState = action;
        // Создаем словарь, содержащий соответствие действия и его текстового описания
        const lexicon = {
          active: 'восстановлено',
          completed: 'завершено',
          deleted: 'удалено'
        };
        const elTodoDate = elemItem.querySelector('.todo__date');
        // Генерируем HTML с описанием действия и текущей датой и временем
        const html = `<span>${lexicon[action]}: ${new Date().toLocaleString().slice(0, -3)}</span>`;
        // Вставляем сгенерированный HTML в элемент с классом "todo__date"
        elTodoDate.insertAdjacentHTML('beforeend', html);
      }
      
      // Сохраняем состояние списка
      this.save();
    } else if (target.classList.contains('todo__add')) {
      // Если целевой элемент является кнопкой "Добавить", вызываем метод добавления задачи
      this.add();
      // Сохраняем состояние списка
      this.save();
    }
  },

  // Добавление задачи
  add() {
    const elemText = document.querySelector('.todo__text');
    const elemDueInput = document.querySelector('.todo__due-input');
    // Проверяем доступность поля ввода и наличие текста и срока выполнения
    if (elemText.disabled || !elemText.value.length || !elemDueInput.value){
      // Если поле ввода заблокировано или пустое, показываем сообщение
      alert('Введите текст задачи!');
      return;
    }
    // Добавляем новый элемент задачи в список
    document.querySelector('.todo__items').insertAdjacentHTML('beforeend', this.create(elemText.value, elemDueInput.value));
    elemText.value = '';
    elemDueInput.value = '';
  },

  // Генерация HTML для создания элемента задачи
  create(text, dueDate) {
    const date = JSON.stringify({ add: new Date().toLocaleString().slice(0, -3) });
    return `<li class="todo__item" data-todo-state="active">
      <span class="todo__task">
        ${text}
        <span class="todo__date" data-todo-date="${date}">
          <span>добавлено: ${new Date().toLocaleString().slice(0, -3)}</span        </span>
          </span>
          <span class="todo__due">
            <span>срок: ${dueDate}</span>
          </span>
          <span class="todo__action todo__action_restore" data-todo-action="active"></span>
          <span class="todo__action todo__action_complete" data-todo-action="completed"></span>
          <span class="todo__action todo__action_delete" data-todo-action="deleted"></span>
        </li>`;
      },
      
      // Инициализация списка задач
      init() {
        const fromStorage = localStorage.getItem('todo');
        // Если в локальном хранилище есть сохраненные данные, восстанавливаем список задач
        if (fromStorage) {
          document.querySelector('.todo__items').innerHTML = fromStorage;
        }
        // Добавляем обработчик события изменения выбранного варианта в списке фильтров
        document.querySelector('.todo__options').addEventListener('change', this.update);
        // Добавляем обработчик события клика на страницу
        document.addEventListener('click', this.action.bind(this));
      },
      
      // Обновление состояния списка задач в соответствии с выбранным фильтром
      update() {
        const option = document.querySelector('.todo__options').value;
        // Обновляем атрибут "data-todo-option" у списка задач с выбранным фильтром
        document.querySelector('.todo__items').dataset.todoOption = option;
        // Отключаем поле ввода, если выбран фильтр, отличный от "активные"
        document.querySelector('.todo__text').disabled = option !== 'active';
      },
      
      // Сохранение состояния списка задач в локальном хранилище
      save() {
        localStorage.setItem('todo', document.querySelector('.todo__items').innerHTML);
      }
    };
    
    // Инициализация списка задач при загрузке страницы
    todo.init();
    
