$(document).ready(function(){
    // thêm scrollspy vào body
    $('body').scrollspy({target: ".navbar", offset: 100});

    //thêm hiệu ứng cuộn mượt vào các link trong main menu
    $(".navbar a").on('click', function(event) {
    // Đảm bảo hash có giá trị trước khi ghi đè hành động cũ
        if (this.hash !== "") {
            // ngăn chuyển trang khi bấm vào thẻ a
            event.preventDefault();
            var hash = this.hash;

            // dùng jQuery animate() để thực hiện cuộn
            let scrollTop = $(hash).offset().top - 95;
            $('html, body').animate({
                scrollTop: scrollTop
            }, 500);
        }
    });

    // khi window reload và thanh cuộn không nằm tại vị trí 0px hiện menu fixed và ẩn menu sticky
    var limit = 50;
    if($(this).scrollTop() >= limit) {
        $('#fixed-menu').removeClass('d-none');
        $('#main-nav').addClass('d-none');
    }

    // khi window cuộn xuống lớn hơn limit hiện menu fixed và ẩn menu sticky
    $(window).scroll(() => {
        if ($(this).scrollTop() >= limit) {
            $('#fixed-menu').removeClass('d-none');
            $('#main-nav').addClass('d-none');
        } else {
            $('#fixed-menu').addClass('d-none');
            $('#main-nav').removeClass('d-none');
        }
    });

    // km slider
    var clickWith = 0;
    var maxSlideWidth = 0;
    var itemSlider = $('.km-slider .km-slider-inner .km-item');
    var sliderWidth = '';
    sliderWidth = $('.km-slider').outerWidth(true);
    var itemWidth = 0;
    maxSlideWidth = itemWidth * itemSlider.length - sliderWidth;
    var translateXval = '';
    var interval = $('.km-slider').attr('data-interval');

    $('.km-left, .km-right').click(function () {
        var condition = $(this).hasClass("km-left");
        if (condition){
            click(0);
        } else {
            click(1);
        }
        
    });

    ResCarouselSize();

    $(window).resize(function () {
        ResCarouselSize();
    });

    function ResCarouselSize() {
        itemSlider.outerWidth(true);
        sliderWidth = $('.km-slider').outerWidth(true);
        itemWidth = itemSlider.outerWidth(true);
        maxSlideWidth = itemWidth * itemSlider.length - sliderWidth;
    }

    var kmSliderInterval = setInterval(function(){ clickAnimate() }, interval);

    function click(event) {
        clearInterval(kmSliderInterval);
        clickAnimate(event);
    }

    function clickAnimate(event) {
        if (event === 0) {
            if (clickWith > 0) {
                console.log(clickWith);
                clickWith = parseInt(clickWith) - parseInt(itemWidth);
                
                translateXval = parseInt(clickWith);
            }
        } else {
            if (clickWith < maxSlideWidth) {
                clickWith += itemWidth;
                translateXval = parseInt(clickWith);
                if (clickWith > maxSlideWidth) {
                    translateXval = maxSlideWidth;
                    clearInterval(kmSliderInterval);
                }
            }
        }

        $('.km-slider .km-slider-inner').css({'transform': `translateX(-${translateXval}px)`});
    }
  });