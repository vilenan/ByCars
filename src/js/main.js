import './_vendor';
import vars from './_vars';

import SmoothScroll from 'smooth-scroll';
const scroll = new SmoothScroll('a[href*="#"]');

import { disableScroll } from './functions/disable-scroll';
import { enableScroll } from './functions/enable-scroll';

//Swiper

import Swiper, { Pagination } from 'swiper';
Swiper.use([Pagination]);

window.addEventListener('DOMContentLoaded', () => {

  const resizableSwiper = (breakpoint, swiperClass, swiperSettings) => {
    let swiper;

    breakpoint = window.matchMedia(breakpoint);

    const enableSwiper = function(className, settings) {
      swiper = new Swiper(className, settings);
    }

    const checker = function() {
      if (breakpoint.matches) {
        return enableSwiper(swiperClass, swiperSettings);
      } else {
        if (swiper !== undefined) swiper.destroy(true, true);
        return;
      }
    };

    breakpoint.addEventListener('change', checker);
    checker();
  }


  resizableSwiper(
    '(min-width: 1024px)',
    '.swiper-container',
    {
      loop: true,
      spaceBetween: 30,
      slidesPerView: 3,
      updateOnWindowResize: true,
      breakpoints: {
        1320: {
          slidesPerView: 4,
          spaceBetween: 20
        },
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    },
  );

});

//Modal
  import GraphModal from 'graph-modal';
const modal = new GraphModal();

(function(){
  const burger = document?.querySelector('[data-burger]');
  const menu = document?.querySelector('[data-menu]');
  const menuItems = document?.querySelectorAll('[data-menu-item]');

  burger?.addEventListener('click', (e) => {
    burger?.classList.toggle('burger--active');
    menu?.classList.toggle('nav--active');

    if (menu?.classList.contains('nav--active')) {
      burger?.setAttribute('aria-expanded', 'true');
      burger?.setAttribute('aria-label', 'Закрыть меню');
      disableScroll();
    } else {
      burger?.setAttribute('aria-expanded', 'false');
      burger?.setAttribute('aria-label', 'Открыть меню');
      enableScroll();
    }
  });

  menuItems?.forEach(el => {
    el.addEventListener('click', () => {
      burger?.setAttribute('aria-expanded', 'false');
      burger?.setAttribute('aria-label', 'Открыть меню');
      burger.classList.remove('burger--active');
      menu.classList.remove('nav--active');
      enableScroll();
    });
  });
})();

const anchors = document.querySelectorAll('[data-scroll]');

anchors.forEach(anchor => {
  const scrollBlock = document.querySelector('.' + anchor.dataset.scroll);

  anchor.addEventListener('click', (evt) => {
    evt.preventDefault();

    const scrollBlockValue = scrollBlock.getBoundingClientRect().top + pageYOffset- document.querySelector('.header').offsetHeight;

    window.scrollTo({
      top: scrollBlockValue,
      behavior: "smooth",
    });
  })
});

const cards = document.querySelectorAll('.card');
const cardsNumber = cards.length;
const cardsArray = Array.from(cards);

const btnMore = document.querySelector('.catalog__btn-more');
let itemsShown = 3;

btnMore.addEventListener('click', () => {
  itemsShown += 2;
  const newArray = cardsArray.slice(0, itemsShown);
  newArray.forEach( item => item.classList.add('catalog__item--visible'));
  if (newArray.length === cardsNumber) {
    btnMore.style.display = 'none';
  }

})

