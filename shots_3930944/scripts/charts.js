(function(){
  
  var colors = {
      pink: { line: 'rgb(215, 50, 93)', fill: 'rgba(215, 50, 93, 0.1)' },
      blue: { line: 'rgb(54, 165, 255)', fill: 'rgba(54, 165, 255, 0.1)' },
      yellow: { line: 'rgb(254, 255, 55)', fill: 'rgba(254, 255, 55, 0.1)'  },
      green: { line: 'rgb(1, 197, 149)', fill: 'rgba(1, 197, 149, 0.1)' }
  };

  function drawChart( elementId, chartOptions, clickOnItemCallback ) {
    
      var canvas = document.getElementById( elementId )
      var ctx = canvas.getContext( "2d" );
      var chart = new Chart(ctx, chartOptions ); // TODO: DUBLICATES CHART ON CALL drawChart() ANOTHER ONE TIME
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
                  borderColor: color.line,
                  backgroundColor: color.fill,
                  lineTension: 0,
                  borderWidth: 1.5,
                  pointRadius: 0
              }]
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

  function getData() {
  
    var result = [];
    for( var i = 0; i< 10;i++){ result.push( Math.random() * 5 + 2 ); }
    return result;
  }
  
  function run() {
    
    drawChart( "issues-chart", createChartOptions( getData(), colors.pink )  );
    drawChart( "applications-chart", createChartOptions( getData(), colors.blue )  );
    drawChart( "checks-chart", createChartOptions( getData(), colors.yellow)  );
    drawChart( "databases-chart", createChartOptions( getData(), colors.green )  );
  }
  
  run();
  
})();
