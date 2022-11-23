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