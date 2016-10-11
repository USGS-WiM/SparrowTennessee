function showChart(response){
    //console.log(response);
    var columns = [];
    var labely;
    var labelx;
    var chartTitle;
    var categories = [];

/*    var displayField = response.displayFieldName;
    $.each(response, function(index, obj){
        console.log(obj);
    });*/
    $.each(response.features, function(index, feature, displayField){
        console.log(index, feature.attributes);
        var array = $.map(feature.attributes, function(index, value){
        return [value];
        });
        console.log(array);
    });

    var array = $.map(response.features.attributes, function(index, value){
        return [value];
    });
    console.log(array);

    columns = ['Manitoba', 'North Dakota', 'Minnesota', 'South Dakota', 'Saskatchewan', 'Manitoba', 'North Dakota', 'Minnesota', 'South Dakota', 'Saskatchewan'];

    labely = "Delivered Aggregated Load(kg)"

    labelx = "Ranked By Province/State"

    chartTitle = ( $('#modelResultsRadio input:radio:checked').val() == 'option1' ? "Phosphorus" : "Nitrogen")
    
    categories = ['Fertilizer', 'Manure', 'Forest/Wetland', 'Sewerage Point Sources'];

    var data = [
        [5, 3, 4, 7, 2, 5, 3, 4, 7, 2],
        [2, 2, 3, 2, 1, 2, 2, 3, 2, 1],
        [3, 4, 4, 2, 5, 3, 4, 4, 2, 5],
    ]
    
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
                data: data[0]
            }, {
                name: categories[1],
                data: data[1]
            }, {
                name: categories[2],
                data: data[2]
            }]
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