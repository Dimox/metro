(function () {
  const mainNav = document.querySelector('.main-nav');
  const mainNavToggle = document.querySelector('.main-nav__toggle');
  mainNavToggle.addEventListener('click', () => {
    if (mainNav.matches('.main-nav--active')) {
      mainNav.classList.remove('main-nav--active');
    } else {
      mainNav.classList.add('main-nav--active');
    }
  });

  document.addEventListener('click', () => {
    mainNav.classList.remove('main-nav--active');
  });

  mainNav.addEventListener('click', (e) => {
    e.stopPropagation();
  });
})();
