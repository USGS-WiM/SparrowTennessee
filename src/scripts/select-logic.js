/*
_________________Created by emyers 10/2016_____________
*/


$('.selectpicker').selectpicker();

//Change Displayed Metric select options
function populateMetricOptions(selectedIndex){
    var metricOptions;
    switch (selectedIndex){
        case 0:
            metricOptions = Group3;
            break;
        case 1:
            metricOptions = Group2;
            break;
        case 2: 
            metricOptions = Group1;
            break;
        case 3:
            metricOptions = ST;
            break;
    }
    $("#displayedMetricSelect").find('option').remove();
    $.each(metricOptions, function(index, value){
        $("#displayedMetricSelect").append(new Option(value.name, value.field));
        $('#displayedMetricSelect').selectpicker('refresh');
    });

} // END populateMetricOptions


//uses the #groupResultsSelect selected value and Selected radio to define the SparrowRanking display layer.
function checkSelectedAggregateGroup(groupBySelectedIndex, selectedRadio){

    if (selectedRadio == 'radio1'){
        var layerArrayValue;
        switch (groupBySelectedIndex){
            case 0:
                layerArrayValue = 0;
                break;
            case 1:
                layerArrayValue = 1;
                break;
            case 2: 
                layerArrayValue = 2;
                break;
            case 3:
                layerArrayValue = 3;
                break;
        }
    } else if (selectedRadio == 'radio2'){
        var layerArrayValue;
        switch (groupBySelectedIndex){
            case 0:
                layerArrayValue = 4;
                break;
            case 1:
                layerArrayValue = 5;
                break;
            case 2: 
                layerArrayValue = 6;
                break;
            case 3:
                layerArrayValue = 6;
                break;
        }
    }
    var visibleLayerIds = [layerArrayValue];
    var sparrowRanking = map.getLayer('SparrowRanking');
    sparrowRanking.setVisibleLayers(visibleLayerIds);


    //TODO: Call to check AOI, then generate renderer
        //NOTE: clear LayerDefs first?
    
} //END checkSelectedAggregateGroup()


function checkAOI(){
    console.log('in check AOI function');

} //END checkAOI()


function getChartOutfields(sparrowLayerId){
    var chartFieldsArr = [];
    console.log("in GetChartOutfields()")
    //var chartLabelsArr = [];
    //chartFieldsArr.push( $("#displayedMetricSelect").val() );
    switch(sparrowLayerId){
        case 0:
            //HUC10
            $.each(Group3, function(index, item){
                if( $("#displayedMetricSelect").val() == item.field ) {
                     $.each(item.chartOutfields, function(i, fields) {
                        chartFieldsArr.push( fields );

                    });
                }
            });
            return chartFieldsArr;
            break;
        case 1:
            //HUC8
            $.each(Group2, function(index, item){
                if( $("#displayedMetricSelect").val() == item.field ) {
                     $.each(item.chartOutfields, function(i, fields) {
                        chartFieldsArr.push( fields );

                    });
                }
            });
            return chartFieldsArr;
            break;
        case 2:
            //Independent Watershed
             $.each(Group1, function(index, item){
                if( $("#displayedMetricSelect").val() == item.field ) {
                     $.each(item.chartOutfields, function(i, fields) {
                        chartFieldsArr.push( fields );

                    });
                }
            });
            return chartFieldsArr;
            break;
        case 3:
            //State
            $.each(ST, function(index, item){
                if( $("#displayedMetricSelect").val() == item.field ) {
                    $.each(item.chartOutfields, function(i, fields) {
                        chartFieldsArr.push( fields );

                    });
                }
            });
            return chartFieldsArr;
            break;
    }

} //END getChartOutfields()

