function loadEventHandlers() {

     /*RADIO EVENTS*/
    $('.radio').on('change', function(e){
        var groupBySelectedIndex = $("#groupResultsSelect")[0].selectedIndex;
        var selectedRadio = this.firstElementChild.id;
        
        populateMetricOptions($("#groupResultsSelect")[0].selectedIndex);
        setAggregateGroup(groupBySelectedIndex, selectedRadio);   
        generateRenderer();

        //reflow the chart if it's open
        if( $("#chartWindowDiv").css("visibility") == "visible" ) {
            app.createChartQuery();
        }
        //if table is visible, refresh contents to match radio option chosen
        if ($('#tableResizable').is(":visible")){
            app.createTableQuery();
        }
    });
    /*END RADIO EVENTS*/

    /* EXPORT TABLE EVENT*/

    $('#exportTableButton').on('click', function(){
        $("#resultsTable").tableToCSV();  //https://github.com/cyriac/jquery.tabletoCSV
    });

    //UPDATE: important! make sure the file name is updated_____________________________________________________
    $("#phosphorusDownload").click(function() {
        // hope the server sets Content-Disposition: attachment!
        window.location = 'https://wim.usgs.gov/sparrowtennessee/downloads/tenn_shapefiles_phosphorus.zip';
    });
    //UPDATE: important! make sure the file name is updated_____________________________________________________
    $("#nitrogenDownload").click(function() {
        // hope the server sets Content-Disposition: attachment!
        window.location = 'https://wim.usgs.gov/sparrowtennessee/downloads/tenn_shapefiles_nitrogen.zip';
    });
    
    //moved this out of exectureIdentifyTask()
    $("#popupChartButton").on('click', function(){
        app.createChartQuery();
    });
    /* AOI EVENTS */
    $('.aoiSelect').on('change', AOIChange);

    /* GROUP RESULTS (AGGREGATE LAYER) EVENTS */
    //set initial Displayed Metric options
    $('#groupResultsSelect').on('loaded.bs.select', function(){  
        populateMetricOptions($("#groupResultsSelect")[0].selectedIndex);

        if ( $("#groupResultsSelect")[0].selectedIndex == 0 ) {
            $("#tableButton").show();
        } else{
            $("#tableButton").hide();

        }
        generateRenderer();
    });

   //keep Displayed Metric options in sync 
    $("#groupResultsSelect").on('changed.bs.select', function(e){ 
        app.clearFindGraphics(); 
        if ( $("#groupResultsSelect")[0].selectedIndex == 0 ) {
            $("#tableButton").show();
        } else{
            $("#tableButton").hide();
            //and clear/hide table if there is one showing
            $('#tableResizable').hide();
        }
        populateMetricOptions(e.currentTarget.selectedIndex);
        setAggregateGroup( e.currentTarget.selectedIndex, $(".radio input[type='radio']:checked")[0].id );
        generateRenderer();


        if( $("#chartWindowDiv").css("visibility") == "visible" ) {
            app.map.graphics.clear();
            app.createChartQuery();
        }

        
    });
    /*END GROUP RESULTS (AGGREGATE LAYER) EVENTS */
    
    /*METRIC EVENTS*/
    $("#displayedMetricSelect").on('changed.bs.select', function(e){
        generateRenderer();

        if( $("#chartWindowDiv").css("visibility") == "visible" ) {
            app.createChartQuery();
        }
    });
    /*END METRIC EVENTS*/

    /* CLEAR AOI BUTTON EVENT */
    $("#clearAOIButton").on('click', function(){
        var sparrowId = app.map.getLayer('SparrowRanking').visibleLayers[0];
        
        //revert to default layer from split layer
        if( $.inArray(sparrowId, splitLayers) > -1 ){
            sparrowId = returnDefaultLayer( sparrowId, $(".radio input[type='radio']:checked")[0].id );
            var layerArr = [];
            layerArr.push(sparrowId);
            app.map.getLayer('SparrowRanking').setVisibleLayers(layerArr);
            app.map.getLayer('SparrowRanking').setDefaultLayerDefinitions(true); //don't refresh yet.
            //app.map.getLayer('SparrowRanking').setDefaultLayerDefinitions();

            
        }else{
            app.map.getLayer('SparrowRanking').setDefaultLayerDefinitions(true); //don't refresh yet.
            //app.map.getLayer('SparrowRanking').setDefaultLayerDefinitions();
        }

        //reset the selects
        $('.aoiSelect').selectpicker('val', '');  // 'hack' because selectpicker('deselectAll') method only works when bootstrap-select is open.
        //$('.aoiSelect').selectpicker('refresh'); //don't need refresh apparently
        populateMetricOptions($("#groupResultsSelect")[0].selectedIndex);
        //redraw the symbols

        //return to Default AOI options for ALL AOI selects 
        app.clearLayerDefObj();
        generateRenderer();

        if( $("#chartWindowDiv").css("visibility") == "visible" ) {
            app.createChartQuery();
        }
        if ($('#tableResizable').is(":visible")){
            app.createTableQuery();
        }

    });
    /*END CLEAR AOI BUTTON EVENT */
 

    /* ENABLE/DISABLE SHOW CHART BUTTON PROGRAMATICALLY */
    /*$('.nonAOISelect').on('change', function(){
        if ($('#groupResultsSelect')[0].selectedIndex == 0){
            if ($('#displayedMetricSelect')[0].selectedIndex == 4 || $('#displayedMetricSelect')[0].selectedIndex == 5){
                $("#chartButton").addClass('disabled');
                $('#chartButton').attr('disabled','disabled');
                //TODO:  ALSO MAKE SURE YOU REMOVE ANY CHART FROM THE VIEW (Lobipanel only, modal takes care of self.)
            } else{
                $("#chartButton").removeClass('disabled');
                $("#chartButton").removeAttr('disabled');
            }
        } else {
            $("#chartButton").removeClass('disabled');
            $("#chartButton").removeAttr('disabled');
        }
    });*/

    $('.nonAOISelect').on('change', function(){
        switch($('#groupResultsSelect')[0].selectedIndex) {
            case 0: //HUC10                
                //CHART button logic  commented out @ cooperator's request see github issue #82
/*                if ($('#displayedMetricSelect')[0].selectedIndex == 4 || $('#displayedMetricSelect')[0].selectedIndex == 5){
                    $("#chartButton").addClass('disabled');
                    $('#chartButton').attr('disabled','disabled');
                    //ALSO MAKE SURE YOU REMOVE ANY CHART FROM THE VIEW (Lobipanel only, modal takes care of self.)
                    if( $("#chartWindowDiv").css("visibility") == "visible"){
                        $("#chartWindowDiv").css("display", "none"); 
                    }
                } else{
                    $("#chartButton").removeClass('disabled');
                    $("#chartButton").removeAttr('disabled');
                }*/

                //AOI logic (enable both AOIs)                
                $("#grp1-select").removeClass('disabled'); //Independent watersheds                
                $("#grp1-select").removeAttr('disabled'); 
                $(".grp1-warning").remove();
                $('#grp1-select').selectpicker('refresh');

                $("#grp2-select").removeClass('disabled'); //huc8
                $("#grp2-select").removeAttr('disabled'); 
                $(".grp2-warning").remove();
                $('#grp2-select').selectpicker('refresh');
                break;
            case 1: //HUC8                
                //CHART button logic no longer needed but keep in case cooperator wants to switch back to no ACC load/yield charts
                /*$("#chartButton").removeClass('disabled');
                $("#chartButton").removeAttr('disabled');*/
                
                //AOI logic (enable both AOIs)                
                $("#grp1-select").removeClass('disabled'); //Independent watersheds                
                $("#grp1-select").removeAttr('disabled'); 
                $(".grp1-warning").remove();
                $('#grp1-select').selectpicker('refresh');

                $("#grp2-select").removeClass('disabled'); //huc8
                $("#grp2-select").removeAttr('disabled'); 
                $(".grp2-warning").remove();
                $('#grp2-select').selectpicker('refresh');
                break;
            case 2: //INDEPENDENT WATERSHED
                //CHART button logic no longer needed but keep in case cooperator wants to switch back to no ACC load/yield charts               
                /*$("#chartButton").removeClass('disabled');
                $("#chartButton").removeAttr('disabled');*/
                
                //AOI logic (disable HUC8 & clear value if any)
                if (app.getLayerDefObj().AOI2) {
                    $("#clear_btn").append("<a class='grp2-warning' data-toggle='tooltip' data-placement='top' title='Cannot show HUC8 Area of Interest while grouping by Independent Watershed.'>"+
                        "<span class='glyphicon glyphicon-warning-sign'></span></a>");   
                    //has value, so unselect it, clear the app's LayerDefObj of this property & trigger AOIChange event
                    $('#grp2-select option').attr("selected",false);
                    app.clearOneLayerDefObj("AOI2"); //clear out this one 
                    var newE1 = { currentTarget:{id: 'grp2-select', value: ""} }; //making an 'e' to pass along
                    AOIChange(newE1); //go through the aoichange event to do the rest                    
                }
                //disable the HUC8 dropdown
                $("#grp2-select").attr('disabled', 'disabled');//huc8
                $("#grp2-select").addClass('disabled');
                $('#grp2-select').selectpicker('refresh');
                
                //endable Independent watershed (in case it was previously disabled)
                $("#grp1-select").removeClass('disabled'); //Independent watersheds                
                $("#grp1-select").removeAttr('disabled'); 
                $(".grp2-warning").remove();
                $('#grp1-select').selectpicker('refresh');
                break;
            case 3: //STATE
                //CHART button logic no longer needed but keep in case cooperator wants to switch back to no ACC load/yield charts
                /*$("#chartButton").removeClass('disabled');
                $("#chartButton").removeAttr('disabled');*/

                //AOI logic (disable both IW and HUC8 & clear values if any)
                //independent watershed
                if (app.getLayerDefObj().AOI1) {
                    $("#clear_btn").append("<a class='grp1-warning' data-toggle='tooltip' data-placement='top' title='Cannot show Independent Watershed Area of Interest while grouping by State.'>"+
                        "<span class='glyphicon glyphicon-warning-sign'></span></a>");   
                    //has value, so unselect it, clear the app's LayerDefObj of this property & trigger AOIChange event
                    $('#grp1-select option').attr("selected",false);
                    app.clearOneLayerDefObj("AOI1"); //clear out this one 
                    var newE2 = { currentTarget:{id: 'grp1-select', value: ""} }; //making an 'e' to pass along
                    AOIChange(newE2); //go through the aoichange event to do the rest                    
                }
                $("#grp1-select").attr('disabled', 'disabled'); //independent watersheds     
                $("#grp1-select").addClass('disabled');
                $('#grp1-select').selectpicker('refresh');
                
                //huc8
                if (app.getLayerDefObj().AOI2) {
                    $("#clear_btn").append("<a class='grp2-warning' data-toggle='tooltip' data-placement='top' title='Cannot show HUC8 Area of Interest while grouping by State.'>"+
                        "<span class='glyphicon glyphicon-warning-sign'></span></a>");   
                    //has value, so unselect it, clear the app's LayerDefObj of this property & trigger AOIChange event
                    $('#grp2-select option').attr("selected",false);
                    app.clearOneLayerDefObj("AOI2"); //clear out this one 
                    var newE3 = { currentTarget:{id: 'grp2-select', value: ""} }; //making an 'e' to pass along
                    AOIChange(newE3); //go through the aoichange event to do the rest                    
                }
                $("#grp2-select").attr('disabled', 'disabled'); //huc8       
                $("#grp2-select").addClass('disabled');
                $('#grp2-select').selectpicker('refresh');
                break;
        }//end switch
    });

    /* SHOW CHART BUTTON CLICK */
   $("#chartButton").on("click", function(){
        //set up the Chart chain of events
        app.createChartQuery();  
    });

    //following block forces map size to override problems with default behavior
    $(window).resize(function () {
        if ($("#legendCollapse").hasClass('in')) {
            maxLegendHeight =  ($('#mapDiv').height()) * 0.90;
            $('#legendElement').css('height', maxLegendHeight);
            $('#legendElement').css('max-height', maxLegendHeight);
            maxLegendDivHeight = ($('#legendElement').height()) - parseInt($('#legendHeading').css("height").replace('px',''));
            $('#legendDiv').css('max-height', maxLegendDivHeight);
        }
        else {
            $('#legendElement').css('height', 'initial');
        }
    });


    //displays map scale on map load
    app.map.on('load', function (){

        app.initMapScale();
        app.map.infoWindow.set('highlight', false);
        app.map.infoWindow.set('titleInBody', false);

        app.setupDraggableInfoWindow();
    });

    //displays map scale on scale change (i.e. zoom level)
    app.map.on('zoom-end', function (){
        var scale = app.map.getScale().toFixed(0);
        $('#scale')[0].innerHTML = addCommas(scale);
    });

    //updates lat/lng indicator on mouse move. does not apply on devices w/out mouse. removes "map center" label
    app.map.on('mouse-move', function (cursorPosition) {
        app.updateMousePosition(cursorPosition);
    });

    //updates lat/lng indicator to map center after pan and shows "map center" label.
    app.map.on("pan-end", function () {
        app.updateMapCenter(app.map.extent);
    });

    //end code for adding draggability to infoWindow
    
    //map click w/ identifyParams  -- more params set in executeIdentifyTask();
    app.map.on("click", function(evt) { 
        app.identifyParams = new esri.tasks.IdentifyParameters();
        app.identifyParams.tolerance = 8;
        app.identifyParams.returnGeometry = true;
        app.identifyParams.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE;
        app.identifyParams.width  = app.map.width;
        app.identifyParams.height = app.map.height;
        app.identifyTask = new esri.tasks.IdentifyTask(serviceBaseURL); 
        if (app.map.getLayer("SparrowRanking").layerDefinitions){
            app.identifyParams.layerDefinitions = app.map.getLayer("SparrowRanking").layerDefinitions;
        }
        app.executeIdentifyTask(evt) 
    });

    

    //on clicks to swap basemap.app.map.removeLayer is required for nat'l map b/c it is not technically a basemap, but a tiled layer.
    $("#btnStreets").on('click', function () {
        app.map.setBasemap('streets');
        app.map.removeLayer(nationalMapBasemap);
    });
    $('#btnSatellite').on('click', function () {
        app.map.setBasemap('satellite');
        app.map.removeLayer(nationalMapBasemap);
    });
    $('#btnHybrid').on('click', function () {
        app.map.setBasemap('hybrid');
        app.map.removeLayer(nationalMapBasemap);
    });
    $('#btnTerrain').on('click', function () {
        app.map.setBasemap('terrain');
        app.map.removeLayer(nationalMapBasemap);
    });
    $('#btnGray').on('click', function () {
        app.map.setBasemap('gray');
        app.map.removeLayer(nationalMapBasemap);
    });
    $('#btnNatGeo').on('click', function () {
        app.map.setBasemap('national-geographic');
        app.map.removeLayer(nationalMapBasemap);
    });
    $('#btnOSM').on('click', function () {
        app.map.setBasemap('osm');
        app.map.removeLayer(nationalMapBasemap);
    });
    $('#btnTopo').on('click', function () {
        app.map.setBasemap('topo');
        app.map.removeLayer(nationalMapBasemap);
    });
/*    $('#btnNatlMap').on('click', function () {
        app.map.addLayer(nationalMapBasemap);
    });*/



    // on(geocoder.inputNode, 'keydown', function (e) {
    //     if (e.keyCode == 13) {
    //         setSearchExtent();
    //     }
    // });

    // Geosearch functions
  //  $('#btnGeosearch').on ('click', geosearch);
}