/**
 * Created by emyers 10/2016
 */


function showChart(response){

    var columnLabels = [];
    var chartTitle;
    var categories = [];
    var chartArr = [];
    var series = [];



    //EXPERIMENTAL SORT response by total
    var featureSort = [];

    $.each(response.features, function(index, feature){
        featureSort.push(feature.attributes);
    });

    var sum = 0;
    $.each(featureSort, function(index, obj){
        $.each(obj, function(i, attribute){
            if(jQuery.type(attribute) !== "string"){
                sum += attribute;
            }
        });
        obj.total = sum;
        sum = 0;
    });
    featureSort.sort(function(a, b){
        /*var atotal = a.total;
        var btotal = b.total;
        if (atotal < btotal){
            return 1;
        }
        if (atotal > btotal){
            return -1;
        }
        return 0*/
        return parseFloat(b.total) - parseFloat(a.total);
    });
    console.log(featureSort);


    //trying to sort feature.attributes by sum
    /*$.each(response.features, function(index, feature){
        console.log(index, feature.attributes);
        
        var sum = 0;
        $.each(feature.attributes, function( i, attribute){
            if (jQuery.type(attribute) !== "string" ){
                sum += attribute;
            }
        });

        console.log(sum);
    });*/

    //create array of field names
    $.each(response.features[0].attributes, function(key, value){
        categories.push(key);
    });

    categories.pop();


    //EXPERIMENTAL
    $.each(categories, function(index, value){  
        var data2 = [];
        $.each(featureSort, function(innerIndex, feature){
            data2.push( feature[value] );
        });
        chartArr.push(data2);
    });

    //create mulitidimensional array from query response
    /*$.each(categories, function(index, value){
        var data = [];
        $.each(response.features, function(innnerIndex, feature){
            data.push( feature.attributes[value] );
        });
        chartArr.push( data );
    });*/

    //remove 1st field ('group by') from charting arrays
    categories.shift();
        columnLabels = chartArr.shift(); //removes AND returns column labels ( chartArr[0] )
    //chartArr.pop();


   //get chartOutfields from config --i.e {attribute: "VALUE", label: "value"}
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


    //chartArr is a multi-dimensional array.  Each item in chartArr is an array of series data.
    $.each(chartArr, function(index, value){
        series[index].data = chartArr[index];
    });


     ///SAMPLE DATA FORMAT
    /*var series = [{
        name: 'dl1_ST_sc1',
        data: [5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3]
    },
    {
        name: 'dl1_ST_sc2',
        data: [5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3]
    },
    {
        name: 'dl1_ST_sc3',
        data: [5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3]
    },
    {
        name: 'dl1_ST_sc4',
        data: [5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3]
    },
    {
        name: 'dl1_ST_sc5',
        data: [5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3]
    },
    {
        name: 'dl1_ST_sc6',
        data: [5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3, 5, 3, 4, 7, 2, 5, 3]
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
        return label + chartUnits;
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
                resetZoomButton: {
                    theme: {
                        display: 'none'
                    }
                },
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
                        $("#resetButton").prop("disabled", false);
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

    /*  _________________________________________CHART EVENTS________________________________________________________________ */

    //initial showing
    $("#chartModal").on('show.bs.modal', function(){
        $("#chartModalTitle").empty();
        $("#chartModalTitle").text("Phosphorus " + labelySelect() );
    });

    //after initial showing
    $("#chartModal").on('shown.bs.modal', function(){
        $("#chartModalTitle").empty();
        $("#chartModalTitle").text("Phosphorus " + labelySelect() );
    });

    //Custom Reset button
    $('#resetButton').click(function() {
        var chart = $('#chartContainer').highcharts();
        chart.xAxis[0].setExtremes(null,null);
        $("#resetButton").prop("disabled", true);
        //chart.resetZoomButton.hide();
    });

    $("#downloadXLS").click(function(){
        var chart = $('#chartContainer').highcharts();
        alert(chart.getCSV());
        //window.open('data:application/vnd.ms-excel,' + chart.getTable() );
    });
    
   /* $('#chartModal').on('show.bs.modal', function(){
        $('#chartContainer').css('visibility', 'hidden');
    })

    $("chartModal").on('shown.bs.modal', function(event){
        $("#chartContainer").css('visibility', 'initial');
        chart.reflow();
    });*/
}

