(function () {
  const pageNavLink = document.querySelectorAll('.page-nav__link');
  pageNavLink.forEach((el) => {
    el.addEventListener('click', (e) => {
      const id = el.getAttribute('href').replace('#', '');
      const scrollTo = document.getElementById(id);
      scrollTo.style.scrollMarginTop = '30px';
      scrollTo.scrollIntoView({ behavior: 'smooth' });
      e.preventDefault();
    });
  });
})();
