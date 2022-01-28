$(document).ready(function(){
	// for fashion section
  $("#fashion").owlCarousel({
  	loop:true,
    margin: 14,
    lazyLoad:true,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayHoverPause: true,
    autoPlayTimeOut: 500,
    responsiveClass:true,
    animationIn: true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        768:{
            items:2,
        },
        992:{
            items:3,
        },
        1200:{
            items:4,
        }
    }
  });

  // for feature section
  $("#feature").owlCarousel({
  	loop:true,
    margin: 14,
    lazyLoad:true,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayHoverPause: true,
    autoPlayTimeOut: 700,
    responsiveClass:true,
    animationIn: true,
    responsive:{
        0:{
            items:1,
        },
        768:{
            items:2,
        },
        992:{
            items:3,
        },
        1200:{
            items:4,
        }
    }
  });

  // for blog section
  $("#blog").owlCarousel({
  	loop:true,
    margin: 14,
    nav: true,
    dots: false,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        768:{
            items:1,
        },
        992:{
            items:2,
        }
    }
  });

  $(".owl-carousel .owl-nav button.owl-prev").html('<span class="btn-txt text-uppercase fe fe-triangle"></span>');
  $(".owl-carousel .owl-nav button.owl-next").html('<span class="btn-txt text-uppercase fe fe-triangle"></span>');
  $(".showcase-carousel .owl-carousel .owl-nav button.owl-prev").html('<span class="btn-txt text-uppercase">prev</span>');
  $(".showcase-carousel .owl-carousel .owl-nav button.owl-next").html('<span class="btn-txt text-uppercase">next</span>');
});