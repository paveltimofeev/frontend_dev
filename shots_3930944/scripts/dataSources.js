(function(){
  
  window.dataSources = function(){
    
    var tracks_url = "https://gist.githubusercontent.com/paveltimofeev/5af14d572341ba16a67362e8ad714d00/raw/91a07d70602e10bafb511f9680317b2c9a1fc0cb/";
    var stub = "https://gist.githubusercontent.com/paveltimofeev/5af14d572341ba16a67362e8ad714d00/raw/13bf166d08f804053f54b1c3368bda5f7fd52e63/stub-data.json";
    
    function _call( url, next ){
  
      $.ajax({
        url: url,
        beforeSend: function( xhr ) { /*xhr.overrideMimeType( "text/plain; charset=x-user-defined" );*/ }
      })
      .fail(function(err) {
        
          console.error( JSON.stringify(err) );
          next( err );
      })
      .done(function( data ) {
          
          //console.log( data );
          next( null, JSON.parse(data) );
      });
    }
    
    return {
      
      getStats: function( next ){
        
        _call( stub, function( err, data ){
          
          if( err ) {
            next( err );
            return;
          }
          
          next( null, data.stats );
        });
      },
      
      getEvents: function( next ){
        
        _call( stub, function( err, data ){
          
          if( err ) {
            next( err );
            return;
          }
          
          next( null, data.events_log );
        });
      },
      
      getLatestTrackData: function( next ){
        
          _call( stub, function( err, data ){
          
          if( err ) {
            next( err );
            return;
          }
          
          _call( tracks_url + data.track_latest, function(tr_err, tr_data){

              if( tr_err ) {
                next( tr_err );
                return;
              }
              
              next( null, tr_data );
          });
        });
      }
    }
  }
  
})();