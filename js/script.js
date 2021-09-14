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
  

  // if(window.innerWidth <= 600){
    let autoSizeSec = () => {  //  Чтоб первая секция окружало свое содержимое
      let glavImg = $('.home-about__img'),
          secHome = $('.home-about'),
          secCont = $('.comment'),
          contImg = $('.comment__img');

      secCont.css('height', contImg.height());
      secHome.css('height', glavImg.height());
    };
    autoSizeSec();

    $(window).on('resize', autoSizeSec);  //  Для просмотра в разных размерах
  // }

  
  
  //  Header 

  $(window).on('scroll', function(){  //  Анимация шапки
    let header = $('.header'),
        top = $(this).scrollTop();

    if(top < 105){
      if($('.select-color--da').hasClass('scHead')){
        header.css({
          'background': 'rgba(35, 35, 35, '+top/100+')',
          'box-shadow': '0 1px 5px rgba(255, 38, 37, '+top/100+')',
          'transform': 'translateY(-'+top/10+'px)'
        })
      }else{
        header.css({
          'background': 'rgba(255, 250, 251, '+top/100+')',
          'box-shadow': '0 1px 5px rgba(255, 38, 37, '+top/100+')',
          'transform': 'translateY(-'+top/10+'px)'
        })
      }
  
    }
  });

  //  Services slide

  let serviceItem = $('.services__item'),
      itemBlock   = $('.services__item-block'),
      serviceList = $('.services__list'),
      serviceNext = $('.services__slide--next'),
      servicePrev = $('.services__slide--prev'),
      slide       = 0;


  itemBlock.on('click', function(){  //  active для слайдера, для мониторов
    if($(this).hasClass('itemHeight')){
      $(this).removeClass('itemHeight');
      $(itemBlock).removeClass('itemHeight');
    }else{
      $(itemBlock).removeClass('itemHeight');
      $(this).toggleClass('itemHeight');
    }
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

  // Swiper js

  function mentorSwipe(){
    let swiper = new Swiper('.mySwiper', {
      grabCursor: true,
      effect: "creative",
      creativeEffect: {
        prev: {
          translate: [0, 0, -400],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      }
    });
  }

  if(window.innerWidth <= 768){
    mentorSwipe();
  }

  // $(window).on('resize', ()=>{
  //   if(window.innerWidth <= 768){
  //     mentorSwipe();
  //   }
  // })


  // Select style

  let darkBtn  = $('.select-color--da'),
      lightBtn = $('.select-color--li');

  darkBtn.on('click', ()=>{
    darkBtn.toggleClass('scHead');
    darkBtn.css('background', '#504747');
    $('body').css('background', '#232323');
    $('footer').css('background', '#262626');
    $('a, p, strong').css('color', '#ccc');
    $('.services__item-block, .comment__comment-block').css('background', '#303030');
    $('h1, h2').css('color', '#FF2625');
    $('h3').css('color', 'aqua');
    $('.home-about__exer').css('color', '#353535');
    $('.header__med-nav').css('background', '#262626');
    lightBtn.css('background', 'none');
    if(window.innerWidth <= 768){
      $('.mentor__item').css('background', '#262626');
    }
  })

  lightBtn.on('click', ()=>{
    lightBtn.css({'background': '#FF2625', 'color':'white'});
    $('body, footer, a, p, strong, .comment__comment-block, h1,h2,h3,.home-about__exer').attr('style', ' ');
    darkBtn.css('background', 'none').removeClass('scHead');
    $('.services__item-block, .header__med-nav').css('background', 'white');
  })



  //  Стоило использовать css переменные:) (-_-)

  //  Navbar

  let liHome     = $('.link-home'),
      liTraining = $('.link-training'),
      liContact  = $('.link-contact');

  function autoScrool(sTop){
    //$(window).scrollTop(top);

    $('html, body').animate({
      scrollTop: $(sTop).offset().top + 70
    });
    $('.redline').removeClass('redline')
  }


  liHome.on('click', function(event){
    event.preventDefault();
    autoScrool($('.home-about'));
    $(this).addClass('redline');
  })

  liTraining.on('click', function(event){
    event.preventDefault();
    autoScrool($('.services'));
    $(this).addClass('redline');
  })

  liContact.on('click', function(event){
    event.preventDefault();
    autoScrool($('.contact'));
    $(this).addClass('redline');
  })

  $(window).on('scroll', function(event){
    let scorll     = $(window).scrollTop();
    let sericesTop = $('.services').offset().top;
    let mentorTop  = $('.mentor').offset().top;
    let contactTop = $('.contact').offset().top;

    if(scorll >= 0 && scorll < sericesTop){
      $('.redline').removeClass('redline')
      liHome.addClass('redline');
    };
    if(scorll >= sericesTop && scorll < mentorTop){
      $('.redline').removeClass('redline')
      liTraining.addClass('redline');
    };

    if(scorll > contactTop){
      $('.redline').removeClass('redline')
      liContact.addClass('redline');
    }

    console.log(scorll);

  })



});