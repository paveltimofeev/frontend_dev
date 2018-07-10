(function(){
  
  var colors = {
      pink: { solid: 'rgb(215, 50, 93)', transparent: 'rgba(215, 50, 93, 0.1)' },
      blue: { solid: 'rgb(54, 165, 255)', transparent: 'rgba(54, 165, 255, 0.1)' },
      yellow: { solid: 'rgb(254, 255, 55)', transparent: 'rgba(254, 255, 55, 0.1)'  },
      green: { solid: 'rgb(1, 197, 149)', transparent: 'rgba(1, 197, 149, 0.1)' },
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
                  borderColor: color.solid,
                  backgroundColor: color.transparent,
                  lineTension: 0,
                  borderWidth: 1.5,
                  pointRadius: 0
              }]
          },
          options: {
              maintainAspectRatio: false,
              legend : { display : false },
              scales: {
                xAxes: [ { display: false,ticks: { min: 0, max: data.length-1 } } ],
                yAxes: [ { display: false, ticks: {min: min||0, max: max||10} } ]
              }
          }
      };
  }

  function createSrvChartOptions( data, color, min, max ) {
      
      var labels = [];
      for(var i=0;i<data[0].length;i++){ labels.push(i); }
      
      var datasets = [];
      data.forEach( function( d , idx){
        
        datasets.push( {
              label: [ 'GPS', 'Accelerometer', 'Speed', 'Compas' ][idx],
              data: d,
              borderColor: color[idx].solid,
              backgroundColor: color[idx].transparent,
              lineTension: 0,
              borderWidth: 1,
              pointRadius: 0
          });
      });
      
      return {
          type: 'line',
          data: {
              datasets: datasets
          },
          options: {
              maintainAspectRatio: false,
              legend : { display : true, position: "top" },
              scales: {
                yAxes: [ { 
                  display: true,
                  gridLines: {
                        display: true,
                        drawBorder: true,
                        color: "#383f47",
                    },
                    
                    color: "#383f47",
                    lineWidth: 1,
                    drawBorder: true,
                    drawTicks: true,
                    drawOnChartArea: true,
                    offsetGridLines: true
                  } 
                ],
                xAxes: [ 
                  { 
                    display: true, 
                    type: "time",
                    
                    gridLines: {
                        display: true,
                        drawBorder: true,
                        color: "#383f47"
                    },
                    
                    ticks: {},
                    
                    time: {
                        unit: 'minute'
                    },
                    
                    color: "#383f47",
                    lineWidth: 1,
                    drawBorder: true,
                    drawTicks: true
                  } 
                ]
              }
          }
      };
  }

  function createDashOptions( data, color, label ) {
      
      return {
          type: 'doughnut',
          data: {
              labels: [label, ''],
              datasets: [ {
                  data: [ data * 100, 100 - data * 100],
                  borderColor_: color.solid,
                  borderColor: [color.solid, '#181c21'],
                  backgroundColor: [color.solid, 'rgba(0, 0, 0, 0)'],
                  lineTension: 0,
                  borderWidth: 1,
                  pointRadius: 0
              }]
          },
          options: {
              maintainAspectRatio: false,
              legend : { display : false },
              cutoutPercentage: 85,
              rotation: Math.PI,
              circumference: 1 * Math.PI
          }
      };
  }

  
  function getData() {
  
    var result = [];
    for( var i = 0; i< 10;i++){ result.push( Math.random() * 5 + 2 ); }
    return result;
  }
  function getServerData() {
  
    function generateData( offset ) {
      
      return parseInt((Math.random() * 5 + offset) * 10);
    }
    
    var result1 = [];
    var result2 = [];
    var max = 64;
    for( var i = 0; i< max;i++){ 
      
      var timestamp = new Date(1530911474 + ( -max + i ) * 60 * 60 * 60);
      result1.push( { y: generateData( 2.5 ), t: timestamp } ); 
      result2.push( { y: generateData( 0.5 ), t: timestamp } ); 
    }
    
    return [result1, result2];
  }
  
  function run() {
    
    drawChart( "issues-chart", createChartOptions( getData(), colors.pink )  );
    drawChart( "applications-chart", createChartOptions( getData(), colors.blue )  );
    drawChart( "checks-chart", createChartOptions( getData(), colors.yellow)  );
    drawChart( "databases-chart", createChartOptions( getData(), colors.green )  );
    
    drawChart( "server-activity-chart", createSrvChartOptions( getServerData(), [colors.green, colors.blue] )  );
    
    drawChart( "server-dash_1", createDashOptions( 0.5, colors.pink, '% CPU' )  );
    drawChart( "server-dash_2", createDashOptions( 0.25, colors.yellow, '% Memory' )  );
    drawChart( "server-dash_3", createDashOptions( 0.75, colors.blue, '% Download')  );
    
  }
  
  run();
  
})();
