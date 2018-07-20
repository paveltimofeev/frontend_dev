

$(document).ready(function() {
  
  var left_side = $(".left-side");
  var right_side = $(".right-side");
  var edit_state = false;
  var right_mode = null;
  
  function on( e ){
    
    if( e ) {
      e.preventDefault();
    }
    edit_state = true;
  }
  
  function off( e ){
    
    if( e ) {
      e.preventDefault();
    }
    edit_state = false;    
  }
  
  function setMode( mode ) {
    
    var ch = $('.charts-group .chart');
    ch.removeClass('chart--'+right_mode);
    ch.addClass('chart--'+mode);
    
    console.log( mode );
    right_mode = mode;
  }
  
  function set( x ){
    
      var left = x;
      var right = window.innerWidth - x;
      
      if( x > window.innerWidth * 0.3 && x < window.innerWidth * 0.8 ) {
        
        left_side.width( left );
        right_side.width( right );        
      
        if( right < 400 && right_mode !== "one" )
        {
          setMode( "one" );
        }
        else if ( right > 400 && right < 600  && right_mode !== "two")
        {
          setMode( "two" );
        }
        else if(  right > 600 && right_mode !== "three")
        {
           setMode( "three" );
        }
      }
  }
  
  $( "body" ).mousemove(function( event ) {
    
    if( edit_state && event.pageX) {
      
      set( event.pageX );
      // event.originalEvent.stopPropagation();
    }    
  });
  
  $(document).mouseup( off );  
  $("#separator").mousedown( on ).mouseup( off );  
});

/*
var app = new Vue({
		el : '#app',
		data : {
			message : 'Привет, Vue!'
		}
 });
*/