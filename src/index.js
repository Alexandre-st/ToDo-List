// Get the theme toggle
const themeToggle = document.querySelector('.theme-switch input[type="checkbox"]');
// Selectors
const form = document.querySelector('form');
const list = document.querySelector('.list');
const input = document.querySelector('form input');
const completedTask = document.querySelector('.action-button');
const allFilter = document.querySelector('.all');
const activeFilter = document.querySelector('.active');
const completedFilter = document.querySelector('.completed');
const itemsNumber = document.querySelector('.action-p');

let todoList;

if (localStorage.getItem("todoList") === null) {
  localStorage.setItem(
    "todoList",
    JSON.stringify([
      {
        name: "Complete online JavaScript course",
        completed: true,
        id: Date.now(),
      },
      {
        name: "Jog around the park 3x",
        completed: false,
        id: Date.now(),
      },
      {
        name: "10 minutes meditation",
        completed: false,
        id: Date.now(),
      },
      {
        name: "Read for 1 hour",
        completed: false,
        id: Date.now(),
      },
      {
        name: "Pick up groceries",
        completed: false,
        id: Date.now(),
      },
      {
        name: "Complete Todo App on Frontend Mentor",
        completed: false,
        id: Date.now(),
      },
    ])
  );
}

todoList = JSON.parse(localStorage.getItem("todoList"));

console.log(todoList);

// To add a new task in the to do
form.addEventListener('submit', evt => {
  evt.preventDefault();

  // Get the text, clean the white spaces an clear the input after the submit
  const text = input.value.trim();
  if (text !== '') {
    addTask(text);
    input.value = '';
  }
}); 

// To add a task to the list
const addTask = (text) => {
  const todos = {
    name: text,
    completed: false,
    id: Date.now(),
  };
  // When the task is created, call the function to show the list
  todoList = [...todoList, todos];

  localStorage.setItem("todoList", JSON.stringify(todoList));
  // console.log(todos);
  newTask(todos);
  showItems();
};

const newTask = (todos) => {
  console.log(todos);
  // Create the li (item)
  const item = document.createElement('li');
  // To let the item draggable
  item.classList.add('list-item');
  item.setAttribute('data-key', todos.id);
  item.draggable = true;

  // Create the checkbox with label to hide the checkbox
  const label = document.createElement('label');
  label.classList.add('list-check');
  item.append(label);
  
  // Create the input with checkbox type
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.addEventListener('click', taskDone);
  label.append(checkbox);
  
  // Create the circle who is replacing the checkbox
  const circle = document.createElement('div');
  circle.classList.add('circle');
  label.append(circle);
  
  // Add the text
  const text = document.createElement('p');
  text.innerText = todos.name;
  item.append(text);

  // Button to delete the task
  const button = document.createElement('button');
  button.classList.add('list-item-cross');
  button.addEventListener('click', deleteTask);

  // Create the image to execute the function to delete the task
  const image = document.createElement('img');
  image.src = require('./assets/images/icon-cross.svg');
  image.setAttribute('alt', 'Cross');
  button.append(image);
  item.append(button);

  // Push to the allTask array.
  list.append(item);
  showItems();

  let items = document.getElementsByTagName('li'), current = null;
  // 1 - Make item draggable + sortable
  for (let item of items) {
    item.draggable = true;

    // 2 - Drag start - with style dropzone 
    item.ondragstart = (evt) => {
      current = item;
      for (let it of items) {
        if (it != current) { it.classList.add("hint"); }
      }
    };

    // 3 - Drag enter - with style dropzone 
    item.ondragenter = (evt) => {
      if (item != current) { item.classList.add("active"); }
    };

    // 4 - Drag leave - remove style dropzone 
    item.ondragleave = () => {
      item.classList.remove("active");
    };
    
    // 5 - Drag end - remove all highlights
    item.ondragend = () => { 
      for (let it of items ) {
        it.classList.remove("hint");
        it.classList.remove("active");
      }
    };
    
    // 6 - Drag over - prevent the default "drop"
    item.ondragover = (evt) => { evt.preventDefault(); }

    // 7 - On drop - do something
    item.ondrop = (evt) => {
      evt.preventDefault();
      if (item != current) {
        let currentPos = 0, droppedPos = 0;
        for (let it = 0; it < items.length; it++) {
          if (current == items[it]) { currentPos = it; }
          if (it = items[it]) { droppedPos = it; }
        }
        if (currentPos < droppedPos) {
          item.parentNode.insertBefore(current, item.nextSibling);
        } else {
          item.parentNode.insertBefore(current, item);
        }
      }
    };
  };
};

// To mark a task as complete
const taskDone = (evt) => {
  evt.target.parentNode.parentNode.classList.toggle('taskDone');

  showItems();
};

const showList = (todoList) => {
  todoList.map((todos) => {
    return newTask(todos);
  });
};

// To delete a task
const deleteTask = (evt) => {
  allTask.forEach(elt => {
    if (evt.target.parentNode.getAttribute('data-key') === elt.getAttribute('data-key')) {
      elt.remove();
      // console.log("done");
      allTask = allTask.filter(li => li.dataset.key !== elt.dataset.key);
      showItems();
    }
  });
};

// To show how many task
const showItems = () => {
  const items = list.getElementsByTagName('li').length;
  const completedItems = Array.from(list.children).filter((task) => 
    task.classList.contains('taskDone')
  ).length;
  
  const totalItems = items - completedItems;
  if (totalItems <= 1) {
    itemsNumber.innerText = `${totalItems} item left`;
  } else {
    itemsNumber.innerText = `${totalItems} items left`;
  }
};

showItems();

// To filter Active items
const active = () => {
  const checkbox = document.querySelectorAll('.list-check input[type="checkbox"]');
  for (let i = 0; i < checkbox.length; i++) {
    if (checkbox[i].checked) {
      checkbox[i].parentNode.parentNode.style.display = 'none';
    } else {
      checkbox[i].parentNode.parentNode.style.display = 'flex';
    }
  };
  // document.querySelector('.active').classList.remove('active');
  document.querySelector('.active').classList.add('active');
};

// Add the event 
activeFilter.addEventListener('click', active);

// To filter Completed Items
const completed = () => {
  const checkbox = document.querySelectorAll('.list-check input[type="checkbox"]');

  for (let i = 0; i < checkbox.length; i++) {
    if (checkbox[i].checked) {
      checkbox[i].parentNode.parentNode.style.display = 'flex';
    } else {
      checkbox[i].parentNode.parentNode.style.display = 'none';
    }
  };
  document.querySelector('.active').classList.remove('active');
  document.querySelector('.completed').classList.add('active');

  showItems();
};

// Add the event 
completedFilter.addEventListener('click', completed);

// To show all the tasks
const all = () => {
  const checkbox = document.querySelectorAll('.list-check input[type="checkbox"]');

  for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].parentNode.parentNode.style.display = 'flex';
  };

  document.querySelector(".active").classList.remove("active");
  document.querySelector(".all").classList.add("active");
};

allFilter.addEventListener('click', all);

// To delete all the tasks who are marked as completed
completedTask.addEventListener('click', evt => {
  evt.preventDefault();
  allTask.forEach(elt => {
    if (elt === document.querySelector('.taskDone')) {
      elt.remove();
    }
  
    showItems();
  });
});

// To switch theme based on the if the theme toggle is checked or not
const switchTheme = (evt) => {
  if (evt.target.checked) {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
  }
};

// Event listener to the theme toggle
themeToggle.addEventListener("change", switchTheme, false);

// Drag and Drop 
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("sortlist");
});

showList(todoList);