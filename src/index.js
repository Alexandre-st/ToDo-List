// Get the theme toggle
const themeToggle = document.querySelector('.theme-switch input[type="checkbox"]');
const form = document.querySelector('form');
const list = document.querySelector('ul');
const input = document.querySelector('form input');
let allTask = [];

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
  const todo = {
    text,
    id : Date.now(),
  }
  // When the task is created, call the function to show the list
  showList(todo);
};

const showList = (todo) => {
  // Create the li (item)
  const item = document.createElement('li');
  item.classList.add('list-item');
  item.setAttribute('data-key', todo.id);

  // Create the checkbox with label to hide the checkbox
  const label = document.createElement('label');
  label.classList.add('list-check');
  item.appendChild(label);
  
  // Create the input with checkbox type
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.addEventListener('click', taskDone);
  label.appendChild(checkbox);
  
  // Create the circle who is replacing the checkbox
  const circle = document.createElement('div');
  circle.classList.add('circle');
  label.appendChild(circle);
  
  // Add the text
  const text = document.createElement('p');
  text.innerText = todo.text;
  item.appendChild(text);
  
  // Push to the allTask array.
  list.appendChild(item);
  allTask.push(item);
};

// To mark a task as complete
const taskDone = (evt) => {
  evt.target.parentNode.parentNode.classList.toggle('taskDone');
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