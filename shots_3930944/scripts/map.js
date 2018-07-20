var id = 'map';

var map = new mapboxgl.Map({
    container: id,
    style: 'mapbox://styles/mapbox/dark-v9',
    zoom: 14,        
    center: [30.3046207, 59.9589558]
});

map.on('load', function () { loadTrackData() });  
  
function loadTrackData() {
  
   var ds = window.dataSources();
   ds.getLatestTrackData( function( err, geojsonData ) {
    
    if( err ){
      console.log('GetTrackDataError', err);
      return;
    }
    
    console.log('TrackData', geojsonData);
    
    map.addLayer({
        "id": "route",
        "type": "line",
        "source": {
            "type": "geojson",
            "data": geojsonData //'https://gist.githubusercontent.com/paveltimofeev/5af14d572341ba16a67362e8ad714d00/raw/d21844a523da96e48356babc5a433efbe1e0adc5/geojsonData.geojson'
        },
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#ffa500",
            "line-width": 3
        }
    });
    
    map.setCenter(geojsonData.features[0].geometry.coordinates[ geojsonData.features[0].geometry.coordinates.length - 1 ]);
    
  });
  
}

