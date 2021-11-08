let date = new Date();
const body = document.body;

window.addEventListener('load', () => {
  if (date.getHours() >= 19 || date.getHours() < 7) {
    if (body.classList.contains('light')) {
      body.classList.remove('light');
    }
    body.classList.add('dark');
  } else {
    if (body.classList.contains('dark')) {
      body.classList.remove('dark');
    }
    body.classList.add('light');
  }
})

export default window;