
$(document).ready(function() {
  
  function drawChart( elementId, chartOptions, clickOnItemCallback ) {
    
      var canvas = document.getElementById( elementId )
      var ctx = canvas.getContext( "2d" );
      var chart = new Chart(ctx, chartOptions ); // TODO: DUBLICATES CHART ON CALL drawChart() ANOTHER ONE TIME
  }
  
  function createChartOptions( data, color, min, max, type ) {
            
      // var gradient = ctx.createLinearGradient(0, 0, 200, 0);
      // gradient.addColorStop(0, 'green');
      // gradient.addColorStop(1, 'white');
      
      return {
          type: type || 'line',
          data: {
              datasets: [ {
                  data: data,
                  fill: 'end',
                  borderColor: 'rgba(255, 93, 0, 1)',
                  backgroundColor: 'rgba(255, 93, 0, 0.1)',
                  lineTension: 0,
                  borderWidth: 1.5,
                  pointRadius: 0
              }]
          },
          options: {
              plugins: {
                  filler: {
                      propagate: true
                  }
              },
              maintainAspectRatio: false,
              legend : { display : false },
              scales: {
                xAxes: [ { 
                  display: true,
                  type: 'time',
                  distribution: 'series',
                  bounds: 'ticks',
                  time: {
                    unit: 'month'
                  },
                  gridLines: { display: false },
                  ticks: { maxRotation: 0, padding: 25 } 
                } ],
                yAxes: [ { 
                  display: true,
                  gridLines: { display: false },
                  ticks: { padding: 50 },
                  position: 'right'
                } ]
              }
          }
      };
  }
  
  var dataAdapter = window.DataAdapter();
  dataAdapter.getCurrencyRate('btc/usd', ( err, data ) => {
  
    if( !err ) {
      drawChart( 'js-mainChart', createChartOptions( data ,null, 7300, 7700));
    }
    else {
      console.log('Error', err );
    }
  });
    
});

/*
var app = new Vue({
		el : '#app',
		data : {
			message : 'Привет, Vue!'
		}
 });
*/