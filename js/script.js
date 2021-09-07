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
      'background': 'rgba(255, 250, 251, '+top/105+')',
      'box-shadow': '0 1px 3px rgba(255, 38, 37, '+top/100+')',
      'transform': 'translateY(-'+top/10+'px)'
      })
    }
  });

  //  Services slide

  let serviceItem = $('.services__item'),
      itemBlock   = $('.services__item-block'),
      serviceList = $('.services__list'),
      serviceNext = $('.services__slide--next'),
      servicePrev = $('.services__slide--prev'),
      slide       = 0,
      slideP      = 0;


  itemBlock.on('click', function(){  //  active для слайдера, для мониторов
    $(itemBlock).removeClass('itemHeight');
    $(this).toggleClass('itemHeight');
  });

  function nullStyleSlide(){  //  сброс сдвига слайда при изминения ширины окна
    $(window).on('resize',()=>{
      if(window.innerWidth > 768){
        serviceList.css('transform', `translateX(0)`);
        slide = 0;
      }
    })
  }

  serviceNext.on('click', () => {  //  слайдер адаптив
    if(window.innerWidth > 768){  //  active для кнопок слайдера, для мониторов
      let actItem = $('.serviceItem'),
          itemI = actItem.index();

      actItem.removeClass('serviceItem');
      itemBlock.removeClass('itemHeight');
      if(itemI >= serviceItem.length - 1){itemI = 0}
        else{itemI += 1}
      $(serviceItem[itemI]).addClass('serviceItem');
      $('.serviceItem').children().addClass('itemHeight');  //  переход
    }
    else if(window.innerWidth <= 768){  //  слайдер для мобил
      let slideSize = serviceItem.css('width');  //  размер шага
      slide += parseInt(slideSize);
      serviceList.css('transform', `translateX(-${slide}px)`);  //  слайд
      let parseEn = parseInt(slideSize)
      if(slide > parseEn * serviceItem.length - 2){  //  вазврат на контр. точку
        slide = 0
        serviceList.css('transform', `translateX(-${slide}px)`);
      }

      nullStyleSlide();
      console.log(slide);
    }
  })

  servicePrev.on('click', () => {
    if(window.innerWidth > 768){  //  active для кнопок слайдера, для мониторов
      let actItem = $('.serviceItem'),
      itemI = actItem.index();

      actItem.removeClass('serviceItem');
      itemBlock.removeClass('itemHeight');
      if(itemI <= 0){itemI = serviceItem.length - 1}
        else{itemI -= 1}
      $(serviceItem[itemI]).addClass('serviceItem');
      $('.serviceItem').children().addClass('itemHeight');  //  переход
    }
    else if(window.innerWidth <= 768){  //  слайдер для мобил
      let slideSize = serviceItem.css('width'), slidePrev = 0;
      let parseEn = parseInt(slideSize);
          slidePrev += parseEn;

      slide -= slidePrev;    //  размер шага
      if(slide < 0){
        slide = parseEn * (serviceItem.length - 1);
        serviceList.css('transform', `translateX(-${slide}px)`);  //  вазврат на контр. точку
      }
      serviceList.css('transform', `translateX(-${slide}px)`);  //  слайд

      nullStyleSlide();
    }
  
  })

});