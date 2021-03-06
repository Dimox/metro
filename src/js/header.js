(function () {
  const body = document.body;
  const scrollUp = 'scroll-up';
  const scrollDown = 'scroll-down';
  const mainNav = document.querySelector('.main-nav');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
      body.classList.remove(scrollUp);
      return;
    }
    if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
      // down
      body.classList.remove(scrollUp);
      body.classList.add(scrollDown);
      mainNav.classList.remove('main-nav--active');
    } else if (currentScroll < lastScroll && body.classList.contains(scrollDown)) {
      // up
      body.classList.remove(scrollDown);
      body.classList.add(scrollUp);
    }
    lastScroll = currentScroll;
  });
})();
