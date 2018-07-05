(function(){
  
  var colors = {
      
      pink:  { line: 'rgb(215, 50, 93)', fill: 'rgba(215, 50, 93, 0.15)' },
      blue:  { line: 'rgb(54, 165, 255)', fill: 'rgba(54, 165, 255, 0.15)' },
      yellow:  { line: 'rgb(254, 255, 55)', fill: 'rgba(254, 255, 55, 0.15)'  },
      green:  { line: 'rgb(1, 197, 149)', fill: 'rgba(1, 197, 149, 0.15)' }
  };

  function drawChart( elementId, chartOptions, clickOnItemCallback ) {
    
      chartOptions.options.onClick = function(e,d,a) {
          //console.log('onClick', e,d,a);
      }
      var canvas = document.getElementById( elementId )
      var ctx = canvas.getContext('2d');
      var chart = new Chart(ctx, chartOptions ); //! DUBLICATES CHART ON CALL drawChart() ANOTHER ONE TIME
      
      canvas.onclick = function(e){
      
          var dataset = chart.getDatasetAtEvent(e);
          var activePoints = chart.getElementsAtEvent(e);
          
          if( dataset.length > 0 && activePoints.length > 0 ){
              
              var datasetIdx = dataset[0]._datasetIndex;
              var pointIdx = activePoints[datasetIdx]._index;
              var value = chartOptions.data.datasets[datasetIdx].data[pointIdx];
              
              console.log('onclick: activePoints['+datasetIdx+']._index = ', pointIdx);
              console.log('value', value );
              if(clickOnItemCallback) clickOnItemCallback( null, value );
          }
      };
  }

  function createChartOptions( data, color, min, max ) {
    
    var labels = [];
    for(var i=0;i<data.length;i++){ labels.push(i); }
    
    return {
        type: 'line',
        data: {
            labels: labels,
            datasets: [ {
              
                data: data,
                lineTension: 0,
                borderColor: color.line,
                backgroundColor: color.fill,
                borderWidth: 2,
                pointRadius: 0
            }
            ]
        },
        options: {
            legend : { display : false },
            scales: {
              xAxes: [ { display: false,ticks: { min: 0, max: data.length-1 } } ],
              yAxes: [ { display: false, ticks: {min: min||0, max: max||10} } ]
            }
        }
    };
}

  function getData(){
  
    var result = [];
    for(var i = 0; i< 10;i++){
      result.push( Math.random() * 5 + 2 );
    }
    return result;
  }
  
  function run() {
    
    drawChart( "issues-chart",             createChartOptions( getData(), colors.pink )  );
    drawChart( "applications-chart",     createChartOptions( getData(), colors.blue )  );
    drawChart( "checks-chart",             createChartOptions( getData(), colors.yellow)  );
    drawChart( "databases-chart",       createChartOptions( getData(), colors.green )  );
  }
  
  
  run();
  
})();