const faqItems = document.querySelectorAll('.faq-item');
// Бургер-меню
const burger = document.getElementById('burgerIcon');
const nav = document.querySelector('.nav');


faqItems.forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});


if (burger && nav) {
  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    burger.classList.toggle('active');
    nav.classList.toggle('active');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      nav.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target)) {
      burger.classList.remove('active');
      nav.classList.remove('active');
    }
  });
}