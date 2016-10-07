    var columns = ['Manitoba', 'North Dakota', 'Minnesota', 'South Dakota', 'Saskatchewan'];
    
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
            data: [5, 3, 4, 7, 2]
        }, {
            name: categories[1],
            data: [2, 2, 3, 2, 1]
        }, {
            name: categories[3],
            data: [3, 4, 4, 2, 5]
        }]
    });
});

