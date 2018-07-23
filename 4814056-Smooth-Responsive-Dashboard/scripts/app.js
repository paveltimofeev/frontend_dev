

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
  
  function setMode( mode, hide ) {
    
    var ch = $('.charts-group .chart');
    ch.removeClass('chart--'+right_mode);
    ch.addClass('chart--'+mode);
    
    var ch_h = $('.charts-group .chart__chart');
    ch_h.removeClass('chart__chart--hide');
    if( hide ) {
      ch_h.addClass('chart__chart--hide');
    }
    
    console.log( mode );
    right_mode = mode + (hide === true ? "--hide": "");
  }
  
  function set( x ){
    
      var left = x;
      var right = window.innerWidth - x;
      
      var l_max = window.innerWidth * 0.5;
      var l_min = window.innerWidth * 0.75;
      
      var l_treshold_one = window.innerWidth * 0.6;
      var l_treshold_two = window.innerWidth * 0.7;
      
      if( x > l_max && x < l_min ) {
        
        left_side.width( left );
        right_side.width( right );        
      
        if( left < l_treshold_one && right_mode !== "two" )
        {
          setMode( "two", false );
        }
        else if ( left > l_treshold_one && left < l_treshold_two && right_mode !== "one")
        {
          setMode( "one", false );
        }
        else if(  left > l_treshold_two && right_mode !== "one--hide")
        {
          setMode( "one", true );
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