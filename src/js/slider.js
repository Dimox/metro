(function () {
  const getActiveSlideText = (slide) => {
    let text = slide.querySelector('.slider__item-text');
    if (text !== null) {
      text = text.innerHTML;
      sliderText.innerHTML = text;
    } else {
      sliderText.innerHTML = '';
    }
  };

  const sliderTotal = document.querySelectorAll('.slider__item').length;
  const sliderText = document.querySelector('.slider__text');
  const slider = new Swiper('.slider', {
    init: false,
    navigation: {
      prevEl: '.slider__arrow--prev',
      nextEl: '.slider__arrow--next',
    },
    pagination: {
      el: '.slider__fraction',
      clickable: false,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + ' / ' + sliderTotal + '</span>';
      },
    },
    speed: 500,
    loop: true,
    /* breakpoints: {
  // 480: {
  //   slidesPerView: 1,
  // },
  // 768: {
  //   slidesPerView: 2,
  // },
  // 1024: {
  //   slidesPerView: 3,
  // },
  // 1360: {
  //   slidesPerView: 4,
  // },
  }, */
    grabCursor: true,
    simulateTouch: true,
    a11y: {
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд',
      paginationBulletMessage: 'Перейти к слайду {{index}}',
    },
  });
  slider.on('init slideChange', function () {
    getActiveSlideText(slider.slides[slider.activeIndex]);
  });
  slider.init();
})();
