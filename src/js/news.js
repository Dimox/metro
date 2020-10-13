(function () {
  const dateParsed = (string) => {
    const result = string.match(/(\d{4})-(\d{2})-(\d{2})/);
    return {
      year: result[1],
      month: result[2],
      day: result[3],
    };
  };

  const year = document.getElementById('year');
  const month = document.getElementById('month');
  year.addEventListener('change', (e) => {
    if (year.value === 'all') {
      month.disabled = true;
      month.selectedIndex = 0;
    } else {
      month.disabled = false;
    }
    loadNews(e.target);
  });
  month.addEventListener('change', (e) => {
    loadNews(e.target);
  });

  const newsNotFound = document.querySelector('.news__not-found');
  const more = document.querySelector('.more');
  more.addEventListener('click', (e) => {
    if (!more.matches('.loading')) {
      loadNews(e.target);
    }
  });

  const loadNews = (target) => {
    const newsDataUrl = 'js/news.json';
    const defaultText = more.innerHTML;
    if (target === more) {
      more.classList.add('loading');
      more.textContent = more.dataset.loading;
    }
    fetch(newsDataUrl)
      .then((response) => response.json())
      .then((data) => {
        const container = document.getElementById(more.dataset.id);
        let offset = parseInt(more.dataset.offset);
        if (target === year || target === month) {
          offset = 0;
        }
        const add = parseInt(more.dataset.add);
        let cards = '';
        data.sort((a, b) => {
          const c = dateParsed(a.date);
          const d = dateParsed(b.date);
          if (d.year !== c.year) {
            return d.year - c.year;
          } else if (d.month !== c.month) {
            return d.month - c.month;
          } else {
            return d.day - c.day;
          }
        });
        data = data.filter((el) => {
          const selectedYear = year.value;
          const selectedMonth = month.value;
          const date = dateParsed(el.date);
          const cardYear = date.year;
          const cardMonth = date.month;
          if (selectedYear == 'all' && selectedMonth == 'all') {
            return el;
          } else if (cardYear == selectedYear && selectedMonth == 'all') {
            return el;
          } else if (cardYear == selectedYear && cardMonth == selectedMonth) {
            return el;
          }
        });
        const maximum = data.length;
        data = data.filter((el, i) => {
          if (i >= offset && i < offset + add) {
            return el;
          }
        });
        data.forEach((el, i) => {
          const image1x = el.image1x;
          const image2x = el.image2x;
          const title = el.title;
          const text = el.text;
          const datetime = el.date;
          const date = dateParsed(el.date);
          const card = `
            <article class="card${i == 0 ? ' js-scroll-to' : ''}">
              <header class="card__head">
                <img class="card__image" src="img/${image1x}" srcset="img/${image2x}" width="316" height="220" alt="" />
                <h3 class="card__title">
                  <a class="card__title-link" href="#">${title}</a>
                </h3>
              </header>
              <p class="card__text">${text}</p>
              <time class="card__date" datetime="${datetime}">${date.day}.${date.month}.${date.year}</time>
            </article>
          `;
          cards += card;
        });
        if (target === year || target === month) {
          container.innerHTML = cards;
          more.dataset.offset = add;
          if (offset + add >= maximum) {
            more.style.display = 'none';
          } else {
            more.style.display = 'block';
          }
          if (data.length === 0) {
            newsNotFound.style.display = 'block';
            more.style.display = 'none';
          } else {
            newsNotFound.style.display = 'none';
          }
        }

        if (target === more) {
          setTimeout(() => {
            container.insertAdjacentHTML('beforeend', cards);
            more.dataset.offset = offset + add;
            more.classList.remove('loading');
            more.innerHTML = defaultText;
            let scrollTo = container.querySelectorAll('.js-scroll-to');
            if (scrollTo.length) {
              scrollTo = scrollTo[scrollTo.length - 1];
              scrollTo.scrollIntoView({ behavior: 'smooth' });
            }
            if (more.dataset.offset >= maximum) more.style.display = 'none';
          }, 700);
        }
      });
  };
})();
