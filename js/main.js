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
  });