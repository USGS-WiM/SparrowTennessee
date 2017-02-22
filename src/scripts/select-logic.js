/*
_________________Created by emyers 10/2016_____________
*/


$('.selectpicker').selectpicker();

//Change Displayed Metric select options
function populateMetricOptions(selectedIndex){
    var metricOptions;
    if($(".radio input[type='radio']:checked")[0].id == 'radio1'){
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
    } else if($(".radio input[type='radio']:checked")[0].id == 'radio2'){
        switch (selectedIndex){
            case 0:
                if( $("#st-select")[0].selectedIndex > 0){
                    metricOptions = Group3_st_tn;
                }else{
                    metricOptions = Group3_tn;
                }
                break;
            case 1:
                if( $("#st-select")[0].selectedIndex > 0){
                    metricOptions = Group2_st_tn;
                }else{
                    metricOptions = Group2_tn;
                }
                break;
            case 2: 
                if( $("#st-select")[0].selectedIndex > 0){
                    metricOptions = Group1_st_tn;
                }else{
                    metricOptions = Group1_tn;
                }
                break;
                
            case 3:
                metricOptions = ST_tn;
                break;
        }
    }
    
    $("#displayedMetricSelect").find('option').remove();
    $.each(metricOptions, function(index, value){
        $("#displayedMetricSelect").append(new Option(value.name, value.field));
        $('#displayedMetricSelect').selectpicker('refresh');
    });

} // END populateMetricOptions


//used when clearing the AOI
function returnDefaultLayer(sparrowId){
    switch (sparrowId){
        case 4:
            return 0; 
            break;
        
        case 5:
            return 1;
            break;
        
        case 6:     
            return 2;
            break;
        case 11:
            return 7; 
            break;
        
        case 12:
            return 8
            break;
        
        case 13:     
            return 9; 
            break;
    }
}


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
                if( $("#st-select")[0].selectedIndex > 0){
                    layerArrayValue = 11; //grp3 w/ state splits
                } else{
                    layerArrayValue = 7;
                }
                break;
            case 1:
                if( $("#st-select")[0].selectedIndex > 0){
                    layerArrayValue = 12; //grp2 w/ state splits
                } else{
                    layerArrayValue = 8;
                }
                break;
            case 2: 
                if( $("#st-select")[0].selectedIndex > 0){
                    layerArrayValue = 13; //grp1 w/ state splits
                } else{
                    layerArrayValue = 9;
                }
                break;
            case 3:
                layerArrayValue = 10;
                break;
        }
    }
    var visibleLayerIds = [layerArrayValue];
    var sparrowRanking = app.map.getLayer('SparrowRanking');
    sparrowRanking.setVisibleLayers(visibleLayerIds);


    //generateRenderer();
        
    
} //END setAggregateGroup()

function AOIChange(e){
    
    var selectId = e.currentTarget.id;
    var selectValue = e.currentTarget.value;
    var groupResultsIndex = $("#groupResultsSelect")[0].selectedIndex;
    

    var newObj = {
        selectedId: selectId,
        selectedValue: selectValue
    }
    
    if (selectId == "st-select" && groupResultsIndex != 3) {
        //if not already on a state split layer, set one now.
        //TODO: figure out how you can access the current layers to see if you're on a split layer.  
        //if(app.map.getLayer('SparrowRanking').visibleLayers[0]){
            populateMetricOptions($("#groupResultsSelect")[0].selectedIndex);
            setAggregateGroup( groupResultsIndex, $(".radio input[type='radio']:checked")[0].id );
    }

    app.setLayerDefObj(newObj);

    setLayerDefs();    

    generateRenderer();

    if( $("#chartWindowDiv").css("visibility") == "visible" ) {
        app.map.graphics.clear();
        app.createChartQuery();
    }

} //END AOIChange()


function setLayerDefs(){
        var definitionString = "";
        var layerDefObj = app.getLayerDefObj();
        
        if (layerDefObj.AOIST){
            if(definitionString != ""){
                definitionString += " AND ST = "+ "'" + layerDefObj.AOIST + "'";
            } else{
               definitionString += "ST = "+ "'" + layerDefObj.AOIST + "'"; 
            }
        }
        if (layerDefObj.AOI1){
            if(definitionString != ""){
                definitionString += " AND GRP_1_NAM = "+ "'" + layerDefObj.AOI1 + "'";
            }else{
                definitionString += "GRP_1_NAM = "+ "'" + layerDefObj.AOI1 + "'";
            }
            
        }
        if (layerDefObj.AOI2){
            if(definitionString != ""){
               definitionString += " AND GRP_2_NAM = "+ "'" + layerDefObj.AOI2 + "'";
            }else{
                definitionString += "GRP_2_NAM = "+ "'" + layerDefObj.AOI2 + "'";
            }
        }
        
        var layerDefs = [];

        //LayerDefs on ALL Layers
        layerDefs[0] = definitionString;
        layerDefs[1] = definitionString;
        layerDefs[2] = definitionString;
        layerDefs[3] = definitionString;
        layerDefs[4] = definitionString;
        layerDefs[5] = definitionString;
        layerDefs[6] = definitionString;
        layerDefs[7] = definitionString;
        layerDefs[8] = definitionString;
        layerDefs[9] = definitionString;
        layerDefs[10] = definitionString;
        layerDefs[11] = definitionString;
        layerDefs[12] = definitionString;
        layerDefs[13] = definitionString;
        
        app.map.getLayer("SparrowRanking").setLayerDefinitions(layerDefs);
        generateRenderer();

        //updateAOI(layerDefs[0], selectId);
        //updateAOI(layerDefs[0], app.layerDefsObj.selectId);
        

} // END setLayerDefs()


function updateAOI(layerDefs, selectId){
    require([
        'esri/tasks/FindTask',
        'esri/tasks/FindParameters',
        'dojo/dom',
        'dojo/dom-class',
        'dojo/on',
        'dojo/domReady!'
    ], function (
        FindTask,
        FindParameters,
        dom,
        domClass,
        on
    ) {
        //var layerDefs = "GRP_1_NAM in ('Cumberland River')"
        console.log('in updateAOI()');
        console.log('layerDefs = ' + layerDefs);
        console.log('selectId = ' + selectId);

        switch (selectId){
            case "st-select":
                setupFindTask(serviceBaseURL, [5,6], $("#st-select")[0].value, layerDefs );
                break;
            
            case "grp2-select":
                setupFindTask(serviceBaseURL, [1,2], $("#grp2-select")[0].value, layerDefs );
                break;
            
            case "grp1-select":     
                setupFindTask(serviceBaseURL, [1,6], $("#grp1-select")[0].value, layerDefs );
                break;
        }

        function setupFindTask(url, layerIds, searchText, layerDefs){
            var findTask = new esri.tasks.FindTask(url);

            var params = new FindParameters();
            params.layerIds = layerIds;
            params.layerDefinitions = [layerDefs];
            params.searchText = searchText;
            //Note: possible to add params.searchFields = ["fieldname1", "fieldname2"]  to speed search  https://developers.arcgis.com/javascript/3/jsapi/findparameters-amd.html#searchfields

            findTask.execute(params, filterAOI);

        } // END setupFindTask

        function filterAOI(response){

            $.each(response, function(index, feature){
                //console.log(feature);
                /*if (feature.layerId == 1){
                    console.log("Huc8 = " + feature.feature.attributes.GRP_2_NAM);
                } 
                if(feature.layerId == 6){
                    console.log("State = " + feature.feature.attributes.ST)
                }*/
                switch(feature.layerId){
                    case 1:
                        var item = feature.feature.attributes.GRP_2_NAM;
                        console.log("huc8 " + item);
                        $("#grp2-select").append('<option value="item">'+ item + '</option>').val(item);
                        break;
                    case 2:
                        var item = feature.feature.attributes.GRP_1_NAM;
                        console.log("independent watershed "+ item);
                        break;
                    case 5:
                        var item = feature.feature.attributes.GRP_1_NAM;
                         console.log("IND watershed " + item);
                        break;
                    case 6:
                        var item = feature.feature.attributes.GRP_2_NAM;
                        console.log("Huc8 " + item);
                        break;
                }

            });
        }//END filterAOI
    }); //END dojo require
} //END updateAOI()

function getTableFields(key, sparrowLayerId){
    var label = "";
    var flatArr = tableOutFields;
    
    var configArr = [];
    if(sparrowLayerId == 0){
        configArr = Group3;
    } else{
        configArr = Group3_tn;
    }
    
    $.each(configArr, function(index, item){
        flatArr.push({field: item.field, name: item.name});
        $.each(item.chartOutfields, function(i, fields){
            flatArr.push({field: fields.attribute, name: fields.label});
        });  
    });

    $.each(flatArr, function(index, obj){
        console.log(obj.name);
        if(key == obj.field){
            label = obj.name;
            return false; //escape the each loop?
        }
    });
    return label;
}


function getChartOutfields(sparrowLayerId){
    var chartFieldsArr = [];
    console.log("in GetChartOutfields()")
    //var chartLabelsArr = [];
    //chartFieldsArr.push( $("#displayedMetricSelect").val() );
    switch(sparrowLayerId){
        /////BEGIN PHOSPHORUS LAYERS___________________________________________________________
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
        /////END PHOSPHORUS LAYERS___________________________________________________________
        /////BEGIN NITROGEN LAYERS___________________________________________________________
        case 7: 
            //HUC10
            $.each(Group3_tn, function(index, item){
                if( $("#displayedMetricSelect").val() == item.field ) {
                     $.each(item.chartOutfields, function(i, fields) {
                        chartFieldsArr.push( fields );

                    });
                }
            });
            return chartFieldsArr;
            break;
        case 8:
            //HUC8
            $.each(Group2_tn, function(index, item){
                if( $("#displayedMetricSelect").val() == item.field ) {
                     $.each(item.chartOutfields, function(i, fields) {
                        chartFieldsArr.push( fields );

                    });
                }
            });
            return chartFieldsArr;
            break;
        case 9: 
            //Independent Watershed
             $.each(Group1_tn, function(index, item){
                if( $("#displayedMetricSelect").val() == item.field ) {
                     $.each(item.chartOutfields, function(i, fields) {
                        chartFieldsArr.push( fields );

                    });
                }
            });
            return chartFieldsArr;
            break;
        case 10:
            //State
            $.each(ST_tn, function(index, item){
                if( $("#displayedMetricSelect").val() == item.field ) {
                    $.each(item.chartOutfields, function(i, fields) {
                        chartFieldsArr.push( fields );

                    });
                }
            });
            return chartFieldsArr;
            break;
        case 11:
            //grp3 w/ state divisions
            $.each(Group3_st_tn, function(index, item){
                if( $("#displayedMetricSelect").val() == item.field ) {
                    $.each(item.chartOutfields, function(i, fields) {
                        chartFieldsArr.push( fields );

                    });
                }
            });
            return chartFieldsArr;
            break;
        case 12:
            //grp 2 w/ state divisions
            $.each(Group2_st_tn, function(index, item){
                if( $("#displayedMetricSelect").val() == item.field ) {
                    $.each(item.chartOutfields, function(i, fields) {
                        chartFieldsArr.push( fields );

                    });
                }
            });
            return chartFieldsArr;
            break;
        case 13:
            //grp1 w/ state divisions
            $.each(Group1_st_tn, function(index, item){
                if( $("#displayedMetricSelect").val() == item.field ) {
                    $.each(item.chartOutfields, function(i, fields) {
                        chartFieldsArr.push( fields );

                    });
                }
            });
            return chartFieldsArr;
            break;
        /////END NITROGEN LAYERS___________________________________________________________
    }

} //END getChartOutfields()


function generateRenderer(){
        require([
        'esri/map',
        'esri/Color',
        "esri/dijit/Legend",
        "esri/layers/LayerDrawingOptions",
        'esri/symbols/SimpleLineSymbol',
        'esri/symbols/SimpleFillSymbol',
        'esri/tasks/ClassBreaksDefinition',
        'esri/tasks/AlgorithmicColorRamp',
        'esri/tasks/GenerateRendererParameters',
        'esri/tasks/GenerateRendererTask',
        'dojo/dom',
        'dojo/dom-class',
        'dojo/on',
        'dojo/domReady!'
    ], function (
        Map,
        Color,
        Legend,
        LayerDrawingOptions,
        SimpleLineSymbol,
        SimpleFillSymbol,
        ClassBreaksDefinition,
        AlgorithmicColorRamp,
        GenerateRendererParameters,
        GenerateRendererTask,
        dom,
        domClass,
        on
    ) {
        console.log('in generateRenderer()');

        var sparrowId = app.map.getLayer('SparrowRanking').visibleLayers[0];
        //apply layer defs to renderer if they exist
        if(app.map.getLayer('SparrowRanking').layerDefinitions){
            var dynamicLayerDefs = app.map.getLayer('SparrowRanking').layerDefinitions[sparrowId];
            app.layerDef = dynamicLayerDefs;
        }
        else{
            app.map.getLayer('SparrowRanking').setDefaultLayerDefinitions(); //is this necessary?
            app.layerDef = null;
        }
        
        app.Url = "https://gis.wim.usgs.gov/arcgis/rest/services/SparrowTennessee/SparrowTennesseeDev/MapServer/" + sparrowId;
        
        var selectedMetric = $('#displayedMetricSelect')[0].value;
        app.outFields = [selectedMetric];
        app.currentAttribute = selectedMetric; 


        var classDef = new ClassBreaksDefinition();
        classDef.classificationField = app.currentAttribute;
        classDef.classificationMethod = "quantile";
        classDef.breakCount = 5;
        classDef.baseSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color([192,192,192]), 0.1)
            );
        
          

        var colorRamp = new AlgorithmicColorRamp();
        //different ramps for phos/nitro
        if( $(".radio input[type='radio']:checked")[0].id == "radio1" ){
            colorRamp.fromColor = Color.fromHex("#ffffcc");
            colorRamp.toColor = Color.fromHex("#006837");
        } else{
            colorRamp.fromColor = Color.fromHex("#ffd084");
            colorRamp.toColor = Color.fromHex("#845305");
        }
          
        colorRamp.algorithm = "hsv"; // options are:  "cie-lab", "hsv", "lab-lch"
        classDef.colorRamp = colorRamp;

        var params = new GenerateRendererParameters();
        params.classificationDefinition = classDef;
        // limit the renderer to data being shown by the current layer
        params.where = app.layerDef; 
        var generateRenderer = new GenerateRendererTask(app.Url);
        console.log('execute Renderer w/ params:  ' + params);
        generateRenderer.execute(params, applyRenderer, errorHandler);


        function applyRenderer(renderer){
            var sparrowId = app.map.getLayer('SparrowRanking').visibleLayers[0];
            console.log('sparrowId: ', sparrowId);
            
            var layer = app.map.getLayer('SparrowRanking');
            console.log('in applyRenderer() ', layer);

            // dynamic layer stuff
              var optionsArray = [];
              var drawingOptions = new LayerDrawingOptions();
              drawingOptions.renderer = renderer;
              // set the drawing options for the relevant layer
              // optionsArray index corresponds to layer index in the map service
              optionsArray[sparrowId] = drawingOptions;
              console.log(optionsArray);

              layer.setLayerDrawingOptions(optionsArray);

              //ONLY USED IF refreshing layer here instead of at layerDef Settings
              //setTimeout(app.map.getLayer("SparrowRanking").refresh(), 1000);
              //app.map.getLayer("SparrowRanking").refresh();

              if (! app.hasOwnProperty("legend")){
                createLegend();
              }


        }

        function errorHandler(err){
            console.log('generateRenderer Err ', err);
        }

        function createLegend(){
            app.legend = new Legend({
                map : app.map, 
                layerInfos : [{
                    layer: app.map.getLayer("SparrowRanking"),
                    title: "Sparrow Nutrient Model"
                }]
            }, dom.byId("legendDiv"));
            app.legend.startup();
            
        }

    }); // END Dojo

} //END generateRenderer()