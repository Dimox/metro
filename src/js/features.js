(function () {
  if (document.documentElement.clientWidth >= 740) {
    const fadeOut = (el, ms) => {
      if (ms) {
        el.style.transition = `opacity ${ms} ms`;
      }
      el.style.opacity = '0';
    };

    const fadeIn = (el, ms) => {
      el.style.opacity = 0;
      if (ms) {
        let opacity = 0;
        const timer = setInterval(function () {
          opacity += 50 / ms;
          if (opacity >= 1) {
            clearInterval(timer);
            opacity = 1;
          }
          el.style.opacity = opacity;
        }, 50);
      } else {
        el.style.opacity = 1;
      }
    };

    document.addEventListener('click', (e) => {
      const el = e.target;
      if (el.matches('.features__item')) {
        const features = document.querySelector('.features');
        const text = el.querySelector('.features__text');
        const textHeight = text.scrollHeight;
        if (el.matches('.features__item--active')) {
          features.classList.remove('features--expanded');
          el.classList.remove('features__item--active');
          text.style.height = '0px';
          fadeOut(text, 400);
        } else {
          features.classList.add('features--expanded');
          el.classList.add('features__item--active');
          el.classList.remove('features__item--compact');
          text.style.height = `${textHeight}px`;
          fadeIn(text, 400);
        }
        const siblings = [...el.parentNode.children].filter((child) => child !== el);
        siblings.forEach((el) => {
          if (features.matches('.features--expanded')) {
            el.classList.add('features__item--compact');
          } else {
            el.classList.remove('features__item--compact');
          }
          el.classList.remove('features__item--active');
          const text = el.querySelector('.features__text');
          text.style.height = '0px';
          fadeOut(text, 400);
        });
      }
    });
  } else {
    new Swiper('.features__inner', {
      pagination: {
        el: '.features__dots',
        type: 'bullets',
      },
      speed: 500,
      loop: true,
    });
  }
})();
