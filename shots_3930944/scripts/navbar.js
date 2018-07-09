
window.navbar_expand = function( el ) {

  var navbar  = document.getElementsByClassName('navbar')[0];
  var idx = navbar.className.indexOf(' navbar--expand');
  
  if( idx < 0 ) {  
    navbar.className += ' navbar--expand';
  }
  else {
    navbar.className = navbar.className.replace(' navbar--expand', '');
  }
  
}


