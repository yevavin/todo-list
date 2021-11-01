// Theme switcher
const themeSwitcher = document.querySelector('#themeSwitcher');
const body = document.body;

themeSwitcher.addEventListener('click', () => {
  if (body.classList.contains('dark')) {
    body.classList.remove('dark')
    body.classList.add('light')
  } else if (body.classList.contains('light')) {
    body.classList.remove('light')
    body.classList.add('dark')
  }
});

export default themeSwitcher;