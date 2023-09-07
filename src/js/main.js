import './_vendor';
import vars from './_vars';

import SmoothScroll from 'smooth-scroll';
const scroll = new SmoothScroll('a[href*="#"]');

import { disableScroll } from './functions/disable-scroll';
import { enableScroll } from './functions/enable-scroll';

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
})
