/**
 * Created by emyers 10/2016
 */


function showChart(response){

    var columnLabels = [];
    var chartTitle;
    var categories = [];
    var chartArr = [];
    var series = [];


    $.each(response.features[0].attributes, function(key, value){
        categories.push(key);
    });

    $.each(categories, function(index, value){
        var data = [];
        $.each(response.features, function(innnerIndex, feature){
            data.push( feature.attributes[value] );
        });
        chartArr.push( data );
    });

    //remove feature Identifiers for use as column labels
    columnLabels = chartArr.shift();

    //removes 'group by' from categories
    categories.shift();


   //console.log("chartArr", chartArr);
   //console.log("categories", categories);
   //console.log("columnLabels", columnLabels);

   //get chartOutfields Object --i.e {attribute: "VALUE", label: "value"}
    var sparrowLayerId = map.getLayer('SparrowRanking').visibleLayers[0];
    var chartLabelsObj = getChartOutfields(sparrowLayerId);
    var chartLabelsArr = [];
    $.each(chartLabelsObj, function(index, obj){
        chartLabelsArr.push( obj.label ); //get labels ONLY as arr
    });
    
    //removes 'group by' from labels  (MUST MATCH CATEGORIES)
    chartLabelsArr.shift();

    //push label array into series
    $.each(chartLabelsArr, function(index, value){
        series.push( {name: value});
    });  


    //add data array to each series category and populate it with the corresponding index chartArr 

    $.each(chartArr, function(index, value){
        series[index].data = chartArr[index];
    });

    //EACH value in the data array represents 1 COLUMN.
    //EACH series represents a DIVISION in the column
    console.log("Data Series", series);

     ///SAMPLE DATA FORMAT
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

    //TODO: DYNAMICALLY LABEL BASED ON DROPDOWN VALUES????
    function labelxSelect(){
        var dropdown = $("#groupResultsSelect")[0].selectedIndex;
        switch ( dropdown ){
            case 0:
                return "HUC10";
                break;
            case 1:
                return "HUC8";
                break;
            case 2: 
                return "Independent Watershed";
                break;
            case 3:
                return "State";
                break;
        }
    }

    function labelySelect(){
        var layerId = map.getLayer('SparrowRanking').visibleLayers[0];
        var label;
        switch( layerId ){
            case 0:
               $.each(Group3, function(index, object){
                    if (object.field == $("#displayedMetricSelect").val() ){
                        label = object.name;
                    }
               });
                break;
            case 1:
                $.each(Group2, function(index, object){
                    if (object.field == $("#displayedMetricSelect").val() ){
                        label = object.name;
                    }
               });
                break;
            case 2: 
                $.each(Group1, function(index, object){
                    if (object.field == $("#displayedMetricSelect").val() ){
                        label = object.name;
                    }
               });
                break;
            case 3:
                $.each(ST, function(index, object){
                    if (object.field == $("#displayedMetricSelect").val() ){
                        label = object.name;
                    }
               });
                break;
        }
        return label + " (lb./yr.)";
    }
    
    //Show the Chart Modal
    $('#chartModal').modal('show');
    var chart = $('#chartContainer').highcharts(); 

    $(function () {

        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            }
        });
        
        $('#chartContainer').highcharts({
            chart: {
                type: 'column',
                width: 770,
                height: 700,
                zoomType: "x",
                events: {
                    selection: function (e) {
                        var xAxis = e.xAxis[0],
                        flag = false; // first selected point should deselect old ones
                        
                        if(xAxis) {
                            $.each(this.series, function (i, series) {
                                $.each(series.points, function (j, point) {
                                    console.log(j, point);
                                   /* if ( point.x >= xAxis.min && point.x <= xAxis.max ) {
                                        point.select(true, flag);
                                        if (!flag) {
                                            flag = !flag; // all other points should include previous points
                                        }
                                    }*/
                                });
                            });
                        }
                        return true; // Zoom to selected bars
                        
                    }
                    
                }
            },
            title:{
                text: null
            },
            subtitle:{
                text: null
            },
            xAxis: {
                categories: columnLabels,
                title: {
                    text: "Ranked by " + labelxSelect()
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: labelySelect()
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
                align: 'center',
                x: 10,
                verticalAlign: 'top',
                y: 0,
                floating: false,
                padding: 5,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>'+ labelxSelect() + ': {point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y:,.2f}<br/>Total (lb./yr.): {point.stackTotal:,.2f}'
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

        $("#chartModal").on('show.bs.modal', function(){
            $("#chartModalTitle").empty();
            $("#chartModalTitle").text("Phosphorus " + labelySelect() );
        });

        $("#chartModal").on('shown.bs.modal', function(){
            $("#chartModalTitle").empty();
            $("#chartModalTitle").text("Phosphorus " + labelySelect() );
        });
        
       /* $('#chartModal').on('show.bs.modal', function(){
            $('#chartContainer').css('visibility', 'hidden');
        })

        $("chartModal").on('shown.bs.modal', function(event){
            $("#chartContainer").css('visibility', 'initial');
            chart.reflow();
        });*/
}

