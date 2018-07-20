
window.navbar_expand = function( el ) {
  
  var cl = 'navbar--expand';
  var navbar = $('.navbar');
  
  if( navbar.hasClass( cl )) {
    navbar.removeClass( cl );
  }
  else {
    navbar.addClass( cl );
  }
}


