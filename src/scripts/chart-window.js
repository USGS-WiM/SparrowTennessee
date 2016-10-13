function showChart(response){
    //console.log(response);
    var columnLabels = [];
    var labely;
    var labelx;
    var chartTitle;
    var categories = [];
    var chartArr = [];
    var series = [];

    /*for (i=0; i < response.features[0].attributes.length; i++){
        console.log('STOP');
    }*/

    $.each(response.features[0].attributes, function(key, value){
        console.log(key, value);
        categories.push(key);
    });

    $.each(categories, function(index, value){
        var data = [];
        $.each(response.features, function(innnerIndex, feature){
            console.log(value, feature.attributes);
            data.push( feature.attributes[value] );
        });
        chartArr.push( data );
    });

    //remove feature Identifiers for use as column labels
    columnLabels = chartArr.shift();

    //removes 'group by' from categories
    categories.shift();


   console.log("chartArr", chartArr);
   console.log("categories", categories);
   console.log("columnLabels", columnLabels);

  $.each(categories, function(index, value){
    series.push( {name: value});
  });  

  $.each(chartArr, function(index, value){
    series[index].data = chartArr[index];
  });


    console.log(series);

    

    labely = "Delivered Aggregated Load(kg)"

    labelx = "Ranked By Province/State"

    chartTitle = ( $('#modelResultsRadio input:radio:checked').val() == 'option1' ? "Phosphorus" : "Nitrogen");

    //columnLabels = ['Manitoba', 'North Dakota', 'Minnesota', 'South Dakota'];
    
    //categories = ['Fertilizer', 'Manure', 'Forest/Wetland', 'Sewerage Point Sources'];

    /*var series = [{
        name: 'dl1_ST_sc1',
        data: [5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3,5, 3, 4, 7, 2, 5, 3]
    },
    {
        name: 'dl1_ST_sc2',
        data: [5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3,5, 3, 4, 7, 2, 5, 3]
    },
    {
        name: 'dl1_ST_sc3',
        data: [5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3,5, 3, 4, 7, 2, 5, 3]
    },
    {
        name: 'dl1_ST_sc4',
        data: [5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3,5, 3, 4, 7, 2, 5, 3]
    },
    {
        name: 'dl1_ST_sc5',
        data: [5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3,5, 3, 4, 7, 2, 5, 3]
    },
    {
        name: 'dl1_ST_sc6',
        data: [5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3,5, 3, 4, 7, 2, 5, 3]
    }
    ]*/
    
    $('#chartModal').modal('show');
    var chart = $('#chartContainer').highcharts();


    $(function () {
        
        $('#chartContainer').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: chartTitle
            },
            xAxis: {
                categories: columnLabels,
                title: {
                    text: labelx
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: labely
                },
                stackLabels: {
                    enabled: false,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },
            credits: {
                enabled: false
            },
            series: series
        });
    });

        
       /* $('#chartModal').on('show.bs.modal', function(){
            $('#chartContainer').css('visibility', 'hidden');
        })

        $("chartModal").on('shown.bs.modal', function(event){
            $("#chartContainer").css('visibility', 'initial');
            chart.reflow();
        });*/
}




























































/*
   var columns = ['Manitoba', 'North Dakota', 'Minnesota', 'South Dakota', 'Saskatchewan', 'Manitoba', 'North Dakota', 'Minnesota', 'South Dakota', 'Saskatchewan'];
    
    var labely = "Delivered Aggregated Load(kg)"
    
    var labelx = "Ranked By Province/State"

    var ChartTitle = ( $('#modelResultsRadio input:radio:checked').val() == 'option1' ? "Phosphorus" : "Nitrogen")
        
    var categories = ['Fertilizer', 'Manure', 'Forest/Wetland', 'Sewerage Point Sources'];


$(function () {
    
    
    $('#chartContainer').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: ChartTitle
        },
        xAxis: {
            categories: columns,
            title: {
                text: labelx
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: labely
            },
            stackLabels: {
                enabled: false,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: categories[0],
            data: [5, 3, 4, 7, 2, 5, 3, 4, 7, 2]
        }, {
            name: categories[1],
            data: [2, 2, 3, 2, 1, 2, 2, 3, 2, 1]
        }, {
            name: categories[3],
            data: [3, 4, 4, 2, 5, 3, 4, 4, 2, 5]
        }]
    });
});

*/