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

  //  Auto size sec

  let autoSizeSec = () => {  //  Чтоб первая секция окружало свое содержимое
    let glavImg = $('.home-about__img'),
        secHome = $('.home-about');

    secHome.css('height', glavImg.height());
  };
  autoSizeSec();

  $(window).on('resize', autoSizeSec);  //  Для просмотра в разных размерах

  //  Header 

  $(window).on('scroll', function(){  //  Анимация шапки
    let header = $('.header'),
        top = $(this).scrollTop();

    if(top < 105){
      header.css({
      'background': 'rgba(255, 250, 251, '+top/100+')',
      'box-shadow': '0 1px 3px rgba(255, 38, 37, '+top/100+')',
      'transform': 'translateY(-'+top+'px)'
      });
    }

  });

  //  Services slide

  let serviceItem = $('.services__item'),
      serviceNext = $('.services__slide--next'),
      servicePrev = $('.services__slide--prev');


  serviceItem.on('click', function(){
    $(serviceItem).removeClass('itemHeight');
    $(this).toggleClass('itemHeight');
  });

  serviceNext.on('click', () => {
    let actItem = $('.itemHeight'),
        itemI = actItem.index();

    actItem.removeClass('itemHeight');
    let nextI = itemI += 1;
    if(nextI > serviceItem.length - 1){nextI = 0}
    $(serviceItem[nextI]).addClass('itemHeight');
    console.log(nextI)
  })

  servicePrev.on('click', () => {
    let actItem = $('.itemHeight'),
        itemI = actItem.index();
    
    actItem.removeClass('itemHeight');
    let nextI = itemI -= 1;
    if(nextI < 0){nextI = serviceItem.length - 1}
    $(serviceItem[nextI]).addClass('itemHeight');
    console.log(nextI)
  })

});