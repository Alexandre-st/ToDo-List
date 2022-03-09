// Get the theme toggle
const themeToggle = document.querySelector('.theme-switch input[type="checkbox"]');

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