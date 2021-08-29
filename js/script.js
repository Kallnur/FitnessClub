$(function(){

  // Burger + Menu

  let hamburger = $('.hamburger'),
      menuList  = $('.header__med-nav'),
      darkfon   = $('<div>');


  hamburger.on('click', function() {
    hamburger.toggleClass('is-active');  // Анимация бургера
    menuList.toggleClass('open'); //  Появление меню

    $('body').prepend(darkfon);  //  Черный фон
    $('div:first').toggleClass('darkfon');  //  Стили
    
  });



});