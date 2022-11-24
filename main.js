( function( $ ) { 
    $('.category ul').hide(); 
    $('.category .menu .subopen').click(function() {
      if($(this).hasClass('active')){
        $(this).parent().next().slideUp('fast');
        $(this).removeClass('active'); 
      }else{
        $('.sidebar').find('.active').parent().next().slideUp('fast'); 
        $('.sidebar').find('.active').removeClass('active');
        $(this).parent().next().slideDown('fast');
        $(this).addClass('active'); 
      } 
    }); 
})( jQuery );

// =========================================================================

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


canvas.width = 800;
canvas.height = 800;

ctx.rect(50, 50, 100, 100);
ctx.fill();

ctx.beginPath();
ctx.rect(150, 150, 100, 100);
ctx.fillStyle = "red"
ctx.fill();

// shortcut function이 아닌 function
ctx.moveTo(250, 250);
ctx.lineTo(350, 250);
ctx.lineTo(350, 350);
ctx.lineTo(250, 350);
ctx.lineTo(250, 250);
ctx.stroke();

ctx.arc(50, 50, 50, 0, 2*Math.PI);
ctx.fill();