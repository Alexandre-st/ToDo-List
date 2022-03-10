// Get the theme toggle
const themeToggle = document.querySelector('.theme-switch input[type="checkbox"]');
const form = document.querySelector('form');
const list = document.querySelector('ul');
const input = document.querySelector('form input');
let allTask = [];

//
form.addEventListener('submit', evt => {
  evt.preventDefault();

  // Get the text, clean the white spaces an clear the input
  const text = input.value.trim();
  if (text !== '') {
    addTask(text);
    input.value = '';
  }
}); 

// To add a task to the list
const addTask = (text) => {
  const todo = {
    text,
    id : Date.now(),
  }
  // When the task is create, call the function to show the list
  showList(todo);

};

const showList = (todo) => {
  // Create the li (item)
  const item = document.createElement('li');
  item.classList.add('list-item');
  item.setAttribute('data-key', todo.id);

  // Create the checkbox
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.classList.add('list-check');
  input.addEventListener('click', taskDone);
  item.appendChild(checkbox);
  
  // Add the text
  const txt = document.createElement('p');
  txt.innerText = todo.text;
  item.appendChild(txt);
  
  list.appendChild(item);
  allTask.push(item);
};

const taskDone = (evt) => {
  evt.target.parentNode.classList.toggle('taskDone');
};

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