function showChart(response){
    //console.log(response);
    var columnLabels = [];
    var labely;
    var labelx;
    var chartTitle;
    var categories = [];
    var data = [];
    var series = [];
    
   $.each(response.features, function(index, feature){

        
        var fieldNamesArr = $.map(feature.attributes, function(value, key){
            return [key];
        });
        var valuesArr = $.map(feature.attributes, function(value, key){
            return [value];
        });

        fieldNamesArr.shift();
        columnLabels.push( valuesArr.shift() );
        categories = fieldNamesArr;
        data.push(valuesArr);
    });

   console.log("data", data);
   console.log("categories", categories);
   console.log("columnLabels", columnLabels);

  $.each(categories, function(index, value){
    series.push( {name: value});
  });  
  /* $.each(data, function(index, value){
        console.log(index, value);
        series.push( {name: categories[index], data: data[index]} );
   });*/

    //for (i=0; i < data.length; i++){
        /*$.each(data[i], function(index, value){
            console.log("inner function", index, value);
            series.push()
        });*/
        //series.push ( new addSeries(categories[i], data[i]) );
    //}

    console.log(series);

    //columnLabels = ['Manitoba', 'North Dakota', 'Minnesota', 'South Dakota'];

    labely = "Delivered Aggregated Load(kg)"

    labelx = "Ranked By Province/State"

    chartTitle = ( $('#modelResultsRadio input:radio:checked').val() == 'option1' ? "Phosphorus" : "Nitrogen")
    
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

        
        $('#chartModal').on('show.bs.modal', function(){
            $('#chartContainer').css('visibility', 'hidden');
        })

        $("chartModal").on('shown.bs.modal', function(event){
            $("#chartContainer").css('visibility', 'initial');
            chart.reflow();
        });
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