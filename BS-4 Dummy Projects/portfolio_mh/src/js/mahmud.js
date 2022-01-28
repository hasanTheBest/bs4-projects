// This is js file here

var closeBtn = document.getElementById( 'close-btn' );
var navBody = document.getElementById( 'nav-body' );
var mainBody = document.getElementById( 'main-body' );
var navbarToggle = document.getElementById( 'navbar-toggler' );

navbarToggle.addEventListener("click", openNavigation);

function openNavigation() {
    navBody.style.width = "300px";
} 

closeBtn.addEventListener("click", closeNavigation);

function closeNavigation() {
    navBody.style.width = "0px";
} 

 // type effect 
var oneElement = document.querySelector('#banner-subtitle') ;
  
ityped.init(oneElement, { 
	showCursor: true, 
	strings: ['Frontend Developer', 'Wordpress Theme Developer' ]
});

/* radial indicator */

var circle_1 = document.querySelector('#skill-circle-1') ;
var circle_2 = document.querySelector('#skill-circle-2') ;
var circle_3 = document.querySelector('#skill-circle-3') ;
		
//Intialiazation 
var radialObj_1 = radialIndicator( circle_1, {
   barColor: {
    0: '#FF0000',
    33: '#FFFF00',
    66: '#0066FF',
    100: '#33CC33'
  },
  initValue: 10,
  radius: 80,
  barWidth: 8,
  roundCorner: true,
  percentage: true
});
var radialObj_2 = radialIndicator( circle_2, {
   barColor: {
    0: '#FF0000',
    33: '#FFFF00',
    66: '#0066FF',
    100: '#33CC33'
  },
  initValue: 10,
  radius: 80,
  barWidth: 8,
  roundCorner: true,
  percentage: true
});
var radialObj_3 = radialIndicator( circle_3, {
   barColor: {
    0: '#FF0000',
    33: '#FFFF00',
    66: '#0066FF',
    100: '#33CC33'
  },
  initValue: 10,
  radius: 80,
  barWidth: 8,
  percentage: true,
  roundCorner: true
});
 
//Using Instance
radialObj_1.animate(90); 
radialObj_2.animate(60); 
radialObj_3.animate(50); 

// progress bar
  initProg( 'progress-bar', 1000);

  function initProg(element, speed){
    var width = 0;
    var element = element;
    var progElem = document.getElementById(element);
    var finalWidth = progElem.dataset.value;
    var speed = speed/finalWidth;

    // window.onload function
    window.onload = function(e){
      /*progElem.addEventListener("scroll", myProgress);*/

      /*function myProgress(){*/
        setInterval( mkProgress, speed);
        document.getElementById(element).style.width = finalWidth + '%';
        document.getElementById(element).style.transition = 'width 1s';

        // mkProgress function
        function mkProgress(){
          width = width >= finalWidth ? 0 : width+1;  
          /*document.getElementById('label').innerHTML = width + '%';*/
        }
        if( width == finalWidth ){setTimeout(mkProgress)}
      /*}*/

    } /* window.load() */
  } /* /constructProg() */


// ofset testing;
/*window.addEventListener('scroll', function(){
  var scrollPosition = window.scrollY;
  var offTop = document.querySelector(".skills-section").offsetTop;

  if( scrollPosition > offTop ){
    document.querySelector(".main-timeline").style.opacity = "0";
    document.querySelector(".skills-section").style.transition = "opacity .5s";
  }else{
    document.querySelector(".main-timeline").style.opacity = "1";
    document.querySelector(".skills-section").style.background = "gray";

  }
})*/;