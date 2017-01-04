/*
_________________Created by emyers 10/2016_____________
*/


$('.selectpicker').selectpicker();

//Change Displayed Metric select options
function populateMetricOptions(selectedIndex){
    var metricOptions;
    switch (selectedIndex){
        case 0:
            if( $("#st-select")[0].selectedIndex > 0){
                metricOptions = Group3_st;
            }else{
                metricOptions = Group3;
            }
            break;
        case 1:
            if( $("#st-select")[0].selectedIndex > 0){
                metricOptions = Group2_st;
            }else{
                metricOptions = Group2;
            }
            break;
        case 2: 
            if( $("#st-select")[0].selectedIndex > 0){
                metricOptions = Group1_st;
            }else{
                metricOptions = Group1;
            }
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
function setAggregateGroup(groupBySelectedIndex, selectedRadio){

    if (selectedRadio == 'radio1'){
        var layerArrayValue;
        switch (groupBySelectedIndex){
            case 0:
                if( $("#st-select")[0].selectedIndex > 0){
                    layerArrayValue = 4; //grp3 w/ state splits
                } else{
                    layerArrayValue = 0;
                }
                break;
            case 1:
                if( $("#st-select")[0].selectedIndex > 0){
                    layerArrayValue = 5; //grp2 w/ state splits
                } else{
                    layerArrayValue = 1;
                }
                
                break;
            case 2: 
                 if( $("#st-select")[0].selectedIndex > 0){
                    layerArrayValue = 6;    //grp1 w/state splits
                } else{
                    layerArrayValue = 2;
                }
                break;
            case 3:
                layerArrayValue = 3;
                break;
        }
    } else if (selectedRadio == 'radio2'){
        var layerArrayValue;
        switch (groupBySelectedIndex){
            case 0:
                layerArrayValue = 7;
                break;
            case 1:
                layerArrayValue = 8;
                break;
            case 2: 
                layerArrayValue = 9;
                break;
            case 3:
                layerArrayValue = 10;
                break;
        }
    }
    var visibleLayerIds = [layerArrayValue];
    var sparrowRanking = map.getLayer('SparrowRanking');
    sparrowRanking.setVisibleLayers(visibleLayerIds);


    //TODO: Call to check AOI, then generate renderer
        //NOTE: clear LayerDefs first?
    
} //END setAggregateGroup()


function checkAOI(){
    console.log('in check AOI function');

} //END checkAOI()

function AOIChange(e){
    var selectId = e.currentTarget.id;
    var groupResultsIndex = $("#groupResultsSelect")[0].selectedIndex;
    var selectedItem = e.currentTarget.value;
    var sparrowRankingId = map.getLayer('SparrowRanking').visibleLayers[0];
    var definitionString = null;
    var layerDefs = [];

    if (selectId == "st-select" && groupResultsIndex != 3){
        //if not already on a state split layer, set one now.
        if(map.getLayer('SparrowRanking').visibleLayers[0] < 4){
            populateMetricOptions($("#groupResultsSelect")[0].selectedIndex);
            setAggregateGroup( groupResultsIndex, $(".radio input[type='radio']:checked")[0].id );
        }
        setLayerDefs(selectId, definitionString, layerDefs, selectedItem);
    
    }else{
        setLayerDefs(selectId, definitionString, layerDefs, selectedItem); 
    }

}

function setLayerDefs(selectId, definitionString, layerDefs, selectedItem){

        if(selectId == "grp1-select"){
            definitionString = "GRP_1_NAM IN(" + "'" + selectedItem + "')";
        } 
        if(selectId == "grp2-select"){
            definitionString = "GRP_2_NAM IN(" + "'" + selectedItem + "')";
        }
        if(selectId == "st-select"){
            definitionString = "ST IN(" + "'" + selectedItem + "')";
        }

        //LayerDefs on ALL Phosphorus Layers
        if($("#radio1")[0].checked == true){
            layerDefs[0] = definitionString;
            layerDefs[1] = definitionString;
            layerDefs[2] = definitionString;
            layerDefs[3] = definitionString;
            layerDefs[4] = definitionString;
            layerDefs[5] = definitionString;
            layerDefs[6] = definitionString;
        }
        

        console.log("Selected Item: " + selectedItem);
        console.log("Select Id: " + selectId);
        


        map.getLayer("SparrowRanking").setLayerDefinitions(layerDefs, false);
        //map.getLayer("SparrowRanking").refresh();*/
}


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
        case 4:
            //grp3 w/ state divisions
            $.each(Group3_st, function(index, item){
                if( $("#displayedMetricSelect").val() == item.field ) {
                    $.each(item.chartOutfields, function(i, fields) {
                        chartFieldsArr.push( fields );

                    });
                }
            });
            return chartFieldsArr;
            break;
        case 5:
            //grp 2 w/ state divisions
            $.each(Group2_st, function(index, item){
                if( $("#displayedMetricSelect").val() == item.field ) {
                    $.each(item.chartOutfields, function(i, fields) {
                        chartFieldsArr.push( fields );

                    });
                }
            });
            return chartFieldsArr;
            break;
        case 6:
            //grp1 w/ state divisions
            $.each(Group1_st, function(index, item){
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


function filterAOIOptions(){
    console.log("in filterAOIOptions()");
}
