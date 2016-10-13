function showChart(response){

    var columnLabels = [];
    //var labely;
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

   //push name object into series array
    $.each(categories, function(index, value){
        series.push( {name: value});
    });  

    //add data property to each series category and populate it with the corresponding chartArr of data --  EACH value in the array will be 1 column.
    $.each(chartArr, function(index, value){
        series[index].data = chartArr[index];
    });

    console.log("Data Series", series);

    //leave as hardcoded?
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
        return label + " (kg)";
    }
    

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
                height: 700
            },
            xAxis: {
                categories: columnLabels,
                title: {
                    text: "Ranked by " + labelxSelect()
                },
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
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 0,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>'+ labelxSelect() + ': {point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y:,.2f}<br/>Total: {point.stackTotal:,.2f}'
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

