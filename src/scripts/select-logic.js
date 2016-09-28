

$('.selectpicker').selectpicker();

    //Change Displayed Metric select options
function addMetricOptions(selectedIndex){
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
}


//uses the #groupResultsSelect selected value and Selected radio to define the SparrowRanking display layer.
function checkSelectedAggregateGroup(groupBySelectedIndex, selectedRadio){
    var LayerArrayValue;
    //if phosphorus
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
    

}

