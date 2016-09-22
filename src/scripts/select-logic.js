

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