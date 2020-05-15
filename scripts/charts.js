google.charts.load('current', {
  'packages': ['corechart']
});
google.charts.setOnLoadCallback(drawChart1);
google.charts.setOnLoadCallback(drawChart2);
google.charts.setOnLoadCallback(drawChart3);

function drawChart1() {
  var data = google.visualization.arrayToDataTable([
    ['Dummy', 'DumDum'],
    [8, 12],
    [4, 5.5],
    [11, 14],
    [4, 5],
    [3, 3.5],
    [6.5, 7]
  ]);

  var options = {
    title: 'DummyDumdum',
    hAxis: {
      title: 'first',
      minValue: 0,
      maxValue: 15
    },
    vAxis: {
      title: 'Second',
      minValue: 0,
      maxValue: 15
    },
    width: '100%',
    height: '300',
    legend: 'none'
  };

  var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));

  chart.draw(data, options);
}

function drawChart2() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Sales', 'Expenses'],
    ['2004', 1000, 400],
    ['2005', 1170, 460],
    ['2006', 660, 1120],
    ['2007', 1030, 540]
  ]);

  var options = {
    title: 'Company Performance',
    curveType: 'function',
    width: '100%',
    height: '300',
    legend: {
      position: 'bottom'
    }
  };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

  chart.draw(data, options);
}

function drawChart3() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Sales', 'Expenses'],
    ['2013', 1000, 400],
    ['2014', 1170, 460],
    ['2015', 660, 1120],
    ['2016', 1030, 540]
  ]);

  var options = {
    title: 'Dummy',
    hAxis: {
      title: 'Year',
      titleTextStyle: {
        color: '#333'
      }
    },
    vAxis: {
      minValue: 0
    }
  };

  var chart = new google.visualization.AreaChart(document.getElementById('chart3_div'));
  chart.draw(data, options);
}



