//for jshint
'use strict';
// Generated on 2015-04-13 using generator-wim 0.0.1


var map;
var allLayers;
var maxLegendHeight;
var maxLegendDivHeight;
var dragInfoWindows = true;
var defaultMapCenter = [-86, 36];
var queryParametersLength = Object.getOwnPropertyNames(queryParameters).length;



require([
    'esri/arcgis/utils',
    'esri/map',
    'esri/tasks/QueryTask',
    'esri/tasks/query',
    'esri/Color',
    'esri/dijit/HomeButton',
    'esri/dijit/LocateButton',
    'esri/layers/ArcGISTiledMapServiceLayer',
    'esri/dijit/Geocoder',
    'esri/dijit/PopupTemplate',
    'esri/graphic',
    'esri/geometry/Multipoint',
    'esri/geometry/Point',
    "esri/layers/LayerDrawingOptions",
    'esri/symbols/PictureMarkerSymbol',
    'esri/symbols/SimpleLineSymbol',
    'esri/symbols/SimpleFillSymbol',
    'esri/tasks/ClassBreaksDefinition',
    'esri/tasks/AlgorithmicColorRamp',
    'esri/tasks/GenerateRendererParameters',
    'esri/tasks/GenerateRendererTask',
    'esri/geometry/webMercatorUtils',
    'esri/SpatialReference',
    'dojo/dnd/Moveable',
    'dojo/query',
    'dojo/dom',
    'dojo/dom-class',
    'dojo/on',
    'dojo/domReady!'
], function (
    arcgisUtils,
    Map,
    QueryTask,
    Query,
    Color,
    HomeButton,
    LocateButton,
    ArcGISTiledMapServiceLayer,
    Geocoder,
    PopupTemplate,
    Graphic,
    Multipoint,
    Point,
    LayerDrawingOptions,
    PictureMarkerSymbol,
    SimpleLineSymbol,
    SimpleFillSymbol,
    ClassBreaksDefinition,
    AlgorithmicColorRamp,
    GenerateRendererParameters,
    GenerateRendererTask,
    webMercatorUtils,
    SpatialReference,
    Moveable,
    query,
    dom,
    domClass,
    on
) {

    //bring this line back after experiment////////////////////////////
    //allLayers = mapLayers;


    //set initial Displayed Metric options
    $('#groupResultsSelect').on('loaded.bs.select', function(){  
        populateMetricOptions($("#groupResultsSelect")[0].selectedIndex);
    });

    //keep Displayed Metric options in sync -- can be moved to sidebar events lower in code
    $("#groupResultsSelect").on('changed.bs.select', function(e){  
        populateMetricOptions(e.currentTarget.selectedIndex);
        setAggregateGroup( e.currentTarget.selectedIndex, $(".radio input[type='radio']:checked")[0].id );
       
    });

    map = Map('mapDiv', {
        basemap: 'gray',
        //center: [-95.6, 38.6],
        center: defaultMapCenter,
        zoom: 7
    });


    //TODO: FIGURE OUT HOW TO USE THE QUERY WHERECLAUSE     Call setupQueryTask for every layer inqueryParameters
    for (var key in queryParameters){
        setupQueryTask(serviceBaseURL + queryParameters[key].serviceId, [queryParameters[key].nameField], "1=1");
    }

   /* function updateAOI(layerDefs){
        var layerDefs = "GRP_1_NAM in ('Cumberland River')"
        console.log('in updateAOI()');
        console.log('layerDefs = ' + layerDefs);
        for (var key in queryParameters){
            setupQueryTask(serviceBaseURL + queryParameters[key].serviceId, [queryParameters[key].nameField], layerDefs);
        }
    }*/


    function setupQueryTask(url, outFieldsArr, whereClause){
        var queryTask;
        queryTask = new esri.tasks.QueryTask(url);

        var query = new esri.tasks.Query();
        query.returnGeometry = false;
        query.outFields = outFieldsArr;
        query.where = whereClause;

        queryTask.execute(query, populateAOI)
    }

    //WHEN UPDATING APP: check strings, especially ST
    //Populates AOI Selects; uses queryParameters Object in config
    function populateAOI(response){

        switch(response.displayFieldName){
            case queryParameters["grp3"].nameField:
                console.log("Currently no AOI for Group 3");
                break
            case queryParameters["grp2"].nameField:
                $.each(response.features, function(index, feature){
                    var attributeName = queryParameters["grp2"].nameField;
                    $("#grp2-select").append(new Option(feature.attributes[attributeName], feature.attributes["GRP_2_NUM"]));
                    $('#grp2-select').selectpicker('refresh');
                });
                break;
            case queryParameters["grp1"].nameField:
                 $.each(response.features, function(index, feature){
                    var attributeName = queryParameters["grp1"].nameField;
                    $("#grp1-select").append(new Option(feature.attributes[attributeName], feature.attributes["GRP_1_NUM"]));
                    $('#grp1-select').selectpicker('refresh');
                });
                break;
            case queryParameters["st"].nameField:
                $.each(response.features, function(index, feature){
                    var attributeName = queryParameters["st"].nameField;
                    $("#st-select").append(new Option(feature.attributes[attributeName], feature.attributes["ST"]));
                    $('#st-select').selectpicker('refresh');
                });
                break;
        }
    }

    //button for returning to initial extent
    var home = new HomeButton({
        map: map
    }, "homeButton");
    home.startup();
    //button for finding and zooming to user's location
    var locate = new LocateButton({
        map: map
    }, "locateButton");
    locate.startup();

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
    on(map, "load", function() {
        var scale =  map.getScale().toFixed(0);
        $('#scale')[0].innerHTML = addCommas(scale);
        var initMapCenter = webMercatorUtils.webMercatorToGeographic(map.extent.getCenter());
        $('#latitude').html(initMapCenter.y.toFixed(3));
        $('#longitude').html(initMapCenter.x.toFixed(3));

        //code for adding draggability to infoWindow. http://www.gavinr.com/2015/04/13/arcgis-javascript-draggable-infowindow/
        if (dragInfoWindows == true) {
            var handle = query(".title", map.infoWindow.domNode)[0];
            var dnd = new Moveable(map.infoWindow.domNode, {
                handle: handle
            });

            // when the infoWindow is moved, hide the arrow:
            on(dnd, 'FirstMove', function() {
                // hide pointer and outerpointer (used depending on where the pointer is shown)
                var arrowNode =  query(".outerPointer", map.infoWindow.domNode)[0];
                domClass.add(arrowNode, "hidden");

                var arrowNode =  query(".pointer", map.infoWindow.domNode)[0];
                domClass.add(arrowNode, "hidden");
            }.bind(this));
        }


    });
    //displays map scale on scale change (i.e. zoom level)
    on(map, "zoom-end", function () {
        var scale =  map.getScale().toFixed(0);
        $('#scale')[0].innerHTML = addCommas(scale);
    });

    //updates lat/lng indicator on mouse move. does not apply on devices w/out mouse. removes "map center" label
    on(map, "mouse-move", function (cursorPosition) {
        $('#mapCenterLabel').css("display", "none");
        if (cursorPosition.mapPoint != null) {
            var geographicMapPt = webMercatorUtils.webMercatorToGeographic(cursorPosition.mapPoint);
            $('#latitude').html(geographicMapPt.y.toFixed(3));
            $('#longitude').html(geographicMapPt.x.toFixed(3));
        }
    });
    //updates lat/lng indicator to map center after pan and shows "map center" label.
    on(map, "pan-end", function () {
        //displays latitude and longitude of map center
        $('#mapCenterLabel').css("display", "inline");
        var geographicMapCenter = webMercatorUtils.webMercatorToGeographic(map.extent.getCenter());
        $('#latitude').html(geographicMapCenter.y.toFixed(3));
        $('#longitude').html(geographicMapCenter.x.toFixed(3));
    });

    var nationalMapBasemap = new ArcGISTiledMapServiceLayer('http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer');
    //on clicks to swap basemap. map.removeLayer is required for nat'l map b/c it is not technically a basemap, but a tiled layer.
    on(dom.byId('btnStreets'), 'click', function () {
        map.setBasemap('streets');
        map.removeLayer(nationalMapBasemap);
    });
    on(dom.byId('btnSatellite'), 'click', function () {
        map.setBasemap('satellite');
        map.removeLayer(nationalMapBasemap);
    });
    on(dom.byId('btnHybrid'), 'click', function () {
        map.setBasemap('hybrid');
        map.removeLayer(nationalMapBasemap);
    });
    on(dom.byId('btnTerrain'), 'click', function () {
        map.setBasemap('terrain');
        map.removeLayer(nationalMapBasemap);
    });
    on(dom.byId('btnGray'), 'click', function () {
        map.setBasemap('gray');
        map.removeLayer(nationalMapBasemap);
    });
    on(dom.byId('btnNatGeo'), 'click', function () {
        map.setBasemap('national-geographic');
        map.removeLayer(nationalMapBasemap);
    });
    on(dom.byId('btnOSM'), 'click', function () {
        map.setBasemap('osm');
        map.removeLayer(nationalMapBasemap);
    });
    on(dom.byId('btnTopo'), 'click', function () {
        map.setBasemap('topo');
        map.removeLayer(nationalMapBasemap);
    });

    on(dom.byId('btnNatlMap'), 'click', function () {
        map.addLayer(nationalMapBasemap);
    });

    //end code for adding draggability to infoWindow

    on(map, "click", function(evt) {         

        var graphic = new Graphic();

        var feature = graphic;

        var template = new esri.InfoTemplate("test popup",
            "attributes and stuff go here");

        //ties the above defined InfoTemplate to the feature result returned from a click event

        feature.setInfoTemplate(template);

        map.infoWindow.setFeatures([feature]);
        map.infoWindow.show(evt.mapPoint);

        map.infoWindow.show();
    });



    var geocoder = new Geocoder({
        value: '',
        maxLocations: 25,
        autoComplete: true,
        arcgisGeocoder: true,
        autoNavigate: false,
        map: map
    }, 'geosearch');
    geocoder.startup();
    geocoder.on('select', geocodeSelect);
    geocoder.on('findResults', geocodeResults);
    geocoder.on('clear', clearFindGraphics);
    on(geocoder.inputNode, 'keydown', function (e) {
        if (e.keyCode == 13) {
            setSearchExtent();
        }
    });

    // Symbols
    var sym = createPictureSymbol('../images/purple-pin.png', 0, 12, 13, 24);

    var selectionSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, 
                                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
                                    new Color([255, 0, 0]), 2), new Color([255,255, 0, 0.5])); 

    map.on('load', function (){
        map.infoWindow.set('highlight', false);
        map.infoWindow.set('titleInBody', false);
    });

    // Geosearch functions
    on(dom.byId('btnGeosearch'),'click', geosearch);

    function generateRenderer(){
        console.log('in generateRenderer()');
        var layerDefs = "GRP_1_NAM IN ('Cumberland River')";
        var classDef = new ClassBreaksDefinition();
        classDef.classificationField = "dl1_g3_tot";
        classDef.classificationMethod = "natural-breaks";
        classDef.breakCount = 5;
        classDef.type = 'classBreaksDef';

        var colorRamp = new AlgorithmicColorRamp();
        colorRamp.fromColor = Color.fromHex("#ffffcc");
        colorRamp.toColor = Color.fromHex("#006837");
        colorRamp.algorithm = 'hsv';

        
        classDef.colorRamp = colorRamp;


        var sparrowId = map.getLayer('SparrowRanking').visibleLayers[0];
        var generateRenderer = new esri.tasks.GenerateRendererTask(serviceBaseURL + sparrowId);

        var params = new GenerateRendererParameters();
        params.classificationDefiniton = classDef;
        params.where = "GRP_1_NAM = 'Cumberland River";

        var generateRenderer = new GenerateRendererTask(serviceBaseURL + 0);
        generateRenderer.execute(params, applyRenderer, errorHandler);

         function applyRenderer(renderer){
            console.log('in applyRenderer()');
            var optionsArray = [];
            var drawingOptions = new LayerDrawingOptions();
            drawingOptions.renderer = renderer;
            // set the drawing options for the relevant layer
            // optionsArray index corresponds to layer index in the map service
            optionsArray[2] = drawingOptions;
        }

        function errorHandler(err){
            console.log('generateRenderer Err ', err);
        }
    
    }//END generateRenderer()

   

    // Optionally confine search to map extent
    function setSearchExtent (){
        if (dom.byId('chkExtent').checked === 1) {
            geocoder.activeGeocoder.searchExtent = map.extent;
        } else {
            geocoder.activeGeocoder.searchExtent = null;
        }
    }
    function geosearch() {
        setSearchExtent();
        var def = geocoder.find();
        def.then(function (res){
            geocodeResults(res);
        });
        // Close modal
        $('#geosearchModal').modal('hide');
    }
    function geocodeSelect(item) {
        clearFindGraphics();
        var g = (item.graphic ? item.graphic : item.result.feature);
        g.setSymbol(sym);
        //addPlaceGraphic(item.result,g.symbol);
        // Close modal
        //$('#geosearchModal').modal('hide');
    }
    function geocodeResults(places) {
        places = places.results;
        if (places.length > 0) {
            clearFindGraphics();
            var symbol = sym;
            // Create and add graphics with pop-ups
            for (var i = 0; i < places.length; i++) {
                //addPlaceGraphic(places[i], symbol);
            }
            //zoomToPlaces(places);
            var centerPoint = new Point(places[0].feature.geometry);
            map.centerAndZoom(centerPoint, 17);
            //map.setLevel(15);

        } else {
            //alert('Sorry, address or place not found.');  // TODO
        }
    }
    function stripTitle(title) {
        var i = title.indexOf(',');
        if (i > 0) {
            title = title.substring(0,i);
        }
        return title;
    }
    function addPlaceGraphic(item,symbol)  {
        var place = {};
        var attributes,infoTemplate,pt,graphic;
        pt = item.feature.geometry;
        place.address = item.name;
        place.score = item.feature.attributes.Score;
        // Graphic components
        attributes = { address:stripTitle(place.address), score:place.score, lat:pt.getLatitude().toFixed(2), lon:pt.getLongitude().toFixed(2) };
        infoTemplate = new PopupTemplate({title:'{address}', description: 'Latitude: {lat}<br/>Longitude: {lon}'});
        graphic = new Graphic(pt,symbol,attributes,infoTemplate);
        // Add to map
        map.graphics.add(graphic);
    }

    function zoomToPlaces(places) {
        var multiPoint = new Multipoint(map.spatialReference);
        for (var i = 0; i < places.length; i++) {
            multiPoint.addPoint(places[i].feature.geometry);
        }
        map.setExtent(multiPoint.getExtent().expand(2.0));
    }

    function clearFindGraphics() {
        map.infoWindow.hide();
        map.graphics.clear();
    }

    function createPictureSymbol(url, xOffset, yOffset, xWidth, yHeight) {
        return new PictureMarkerSymbol(
            {
                'angle': 0,
                'xoffset': xOffset, 'yoffset': yOffset, 'type': 'esriPMS',
                'url': url,
                'contentType': 'image/png',
                'width':xWidth, 'height': yHeight
            });
    }

    function createChartQuery(){
        $("#chartContainer").empty();
        console.log('creating chart query');
        var chartQueryTask;
        var sparrowLayerId = map.getLayer('SparrowRanking').visibleLayers[0];
        if (map.getLayer('SparrowRanking').layerDefinitions){
            var whereClause = map.getLayer('SparrowRanking').layerDefinitions[sparrowLayerId];
        } else{
            var whereClause = "1=1";
        }

        //add map layer ID to query URL
        var SparrowRankingUrl = serviceBaseURL + sparrowLayerId;

        //setup QueryTask
        chartQueryTask = new esri.tasks.QueryTask(SparrowRankingUrl);

        //Returns chartOutfields Object form config --i.e. {attribute: "VALUE", label: "VALUE"} 
        var chartFieldsObj = getChartOutfields(sparrowLayerId); 
        
        //grab attributes from chartOutfields object
        var outfieldsArr = [];
        $.each(chartFieldsObj, function(index, obj){
            outfieldsArr.push( obj.attribute ); //get attribute value ONLY
        });

        //setup esri query
        var chartQuery = new esri.tasks.Query();
        chartQuery.returnGeometry = false;
        chartQuery.outFields = outfieldsArr;
        chartQuery.where = whereClause;

        chartQueryTask.execute(chartQuery, showChart);

    }

    function showChart(response){

        var columnLabels = [];
        var chartTitle;
        var categories = [];
        var chartArr = [];
        var series = [];
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
            return parseFloat(b.total) - parseFloat(a.total);
        });
        
        console.log("featureSort", featureSort);

        //create array of field names
        $.each(response.features[0].attributes, function(key, value){
            categories.push(key);
        });

        categories.pop();


        //create multidimensional array from query response
        $.each(categories, function(index, value){  
            var data = [];
            $.each(featureSort, function(innerIndex, feature){
                data.push( feature[value] );
            });
            chartArr.push(data);
        });

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
                case 4:
                    $.each(Group3_st, function(index, object){
                        if (object.field == $("#displayedMetricSelect").val() ){
                            label = object.name;
                        }
                   });
                    break;
                case 5: 
                    $.each(Group2_st, function(index, object){
                        if (object.field == $("#displayedMetricSelect").val() ){
                            label = object.name;
                        }
                   });
                    break;
                case 6:
                    $.each(Group1_st, function(index, object){
                        if (object.field == $("#displayedMetricSelect").val() ){
                            label = object.name;
                        }
                   });
                    break;
                case 7:
                   $.each(Group3_tn, function(index, object){
                        if (object.field == $("#displayedMetricSelect").val() ){
                            label = object.name;
                        }
                   });
                    break;
                case 8:
                    $.each(Group2_tn, function(index, object){
                        if (object.field == $("#displayedMetricSelect").val() ){
                            label = object.name;
                        }
                   });
                    break;
                case 9: 
                    $.each(Group1_tn, function(index, object){
                        if (object.field == $("#displayedMetricSelect").val() ){
                            label = object.name;
                        }
                   });
                    break;
                case 10:
                    $.each(ST_tn, function(index, object){
                        if (object.field == $("#displayedMetricSelect").val() ){
                            label = object.name;
                        }
                   });
                    break;
                case 11:
                    $.each(Group3_st_tn, function(index, object){
                        if (object.field == $("#displayedMetricSelect").val() ){
                            label = object.name;
                        }
                   });
                    break;
                case 12: 
                    $.each(Group2_st_tn, function(index, object){
                        if (object.field == $("#displayedMetricSelect").val() ){
                            label = object.name;
                        }
                   });
                    break;
                case 13:
                    $.each(Group1_st_tn, function(index, object){
                        if (object.field == $("#displayedMetricSelect").val() ){
                            label = object.name;
                        }
                   });
                    break;
            }
            return label + chartUnits;
        }


         function highlightMapFeature(category){
            var layerDefinitions = "GRP_3_NAM = '" + category + "'";



            var selectionSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, 
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
                new Color([255, 0, 0]), 2), new Color([255,255, 0, 0.5]));

            map.getLayer("SparrowGraphics").setDefinitionExpression(layerDefinitions);

            map.getLayer("SparrowGraphics").setSelectionSymbol(selectionSymbol);
        }


        /*function highlightMapFeature(attributeString){
            console.log('in highlightMapFeature()');

            //TODO: need to query for geometry??? using attribute string?

            var highlightGraphic = new Graphic(attributeString)
        }*/

        //START LOBIPANEL-------------------------------------------------------------------------------------------------------
        $("#chartWindowDiv").lobiPanel({
            unpin: false,
            reload: false,
            minimize: false,
            close: false,
            expand: false,
            editTitle: false,
            reload: false,
            editTitle: false,
            minWidth: 800,
            minHeight: 800,
            maxHeight: 1000
            

        });
        $("#chartWindowDiv").css("visibility", "visible");

        //Important! UPDATE if nutrient Models change names.
        if( $(".radio input[type='radio']:checked")[0].id == "radio1"){
            $("#chartWindowPanelTitle").text("Phosphorus " + labelySelect() );
        }   else{
            $("#chartWindowPanelTitle").text("Nitrogen " + labelySelect() );
        }
        

        //only create close / minimize if they don't already exist
        if ($("#chartClose").length == 0){
            $("#chartWindowDiv .dropdown").prepend("<div id='chartClose' title='close'><b>X</b></div>");
            $("#chartWindowDiv .dropdown").prepend("<div id='chartMinimize' title='collapse'><b>_</b></div>");
        }


        var instance = $('#chartWindowDiv').data('lobiPanel');
        instance.unpin();

        //END LOBIPANEL-------------------------------------------------------------------------------------------------------
        
        
        //CHART WINDOW MODAL ____________________________________________________________________________________________________________________________

        //Show the Chart Modal
        //$('#chartModal').modal('show');
        //var chart = $('#chartContainer').highcharts(); //element id must match in highcharts function below

        //END CHART WINDOW MODAL ____________________________________________________________________________________________________________________________

        var chart = $('#chartWindowContainer').highcharts(); 

        $(function () {
            Highcharts.setOptions({
                lang: {
                    thousandsSep: ','
                }
            });
            
            $('#chartWindowContainer').highcharts({
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
                    formatter: function(){
                        var rank = this.point.index + 1; 
                        return '<b>'+ labelxSelect() + ': ' + this.point.category + '</b><br/>' 
                                + this.series.name + ': ' + this.point.y.toFixed(2)  + '<br/> Total (lb./yr.) ' + this.point.stackTotal.toFixed(2) + '<br/> Rank: ' + rank;
                    },
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: false,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                        }
                    },
                    series:{
                        point:{
                             events:{
                                mouseOver: function(){

                                    function switchWhereField(selectedIndex){
                                        switch (selectedIndex){
                                            case 0:
                                                if( $("#st-select")[0].selectedIndex > 0){
                                                    return "ST_GP3_NAM";
                                                }else{
                                                    return "GRP_3_NAM";
                                                }
                                                break;
                                            case 1:
                                                if( $("#st-select")[0].selectedIndex > 0){
                                                    return "ST_GP2_NAM";
                                                }else{
                                                    return "GRP_2_NAM";
                                                }
                                                break;
                                            case 2: 
                                                if( $("#st-select")[0].selectedIndex > 0){
                                                    return "ST_GP1_NAM";
                                                }else{
                                                    return "GRP_1_NAM";
                                                }
                                                break;
                                                
                                            case 3:
                                                return "ST";
                                                break;
                                        }
                                    }

                                    //get everything needed for the query
                                    var category = this.category;  //refers to the selected chart area
                                    var visibleLayers = map.getLayer('SparrowRanking').visibleLayers[0];
                                    var URL = map.getLayer('SparrowRanking').url;
                                    var fieldName = switchWhereField( $("#groupResultsSelect")[0].selectedIndex );

                                    var queryTask;
                                    queryTask = new esri.tasks.QueryTask(URL + visibleLayers.toString() );

                                    var graphicsQuery = new esri.tasks.Query();
                                    graphicsQuery.returnGeometry = true; //important!
                                    graphicsQuery.outSpatialReference = map.spatialReference;  //important!
                                    graphicsQuery.outFields = ["*"];
                                    graphicsQuery.where = fieldName + "= '" + category + "'";

                                                                
                                    queryTask.execute(graphicsQuery, responseHandler);

                                    function responseHandler(response){
                                        map.graphics.clear();
                                        
                                        var feature = response.features[0];
                                        feature.setSymbol(new SimpleFillSymbol()
                                            .setColor(new Color([209,23,23,0.25]))
                                            .setOutline(null)
                                        );
                                        map.graphics.add(feature);
                                    }
                                } 
                            }
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

        //LOBIPANEL______________________________________________

        //not working - set title via jquery above.
        /*$("#chartWindowDiv").on('init.lobiPanel', function(ev, lobiPanel){
            console.log("init event called");
            $("#chartModalPanelTitle").text("Phosphorus " + labelySelect() );
        });*/

        //TODO: exactly the same as close right now, not much functionality here.
         $("#chartMinimize").on('click', function(){
            $("#chartWindowDiv").css("visibility", "hidden");
            $("#chartWindowContainer").empty(); //removes all highcharts including the pesky highcharts legend container
            $("#chartWindowPanelTitle").empty();
            //map.getLayer("fimExtents").setVisibility(false);
            //$("#flood-tools-alert").slideDown(250);
        });

        $("#chartClose").on('click', function(){
            map.graphics.clear();
            $("#chartWindowDiv").css("visibility", "hidden");
            $("#chartWindowContainer").empty();
            $("#chartWindowPanelTitle").empty();
            
        });

        //END LOBIPANEL______________________________________________

        

        //CHART WINDOW MODAL ______________________________________________

        //initial showing
        /*$("#chartModal").on('show.bs.modal', function(){
            $("#chartModalTitle").empty();
            $("#chartModalTitle").text("Phosphorus " + labelySelect() );
        });

        //after initial showing
        $("#chartModal").on('shown.bs.modal', function(){
            $("#chartModalTitle").empty();
            $("#chartModalTitle").text("Phosphorus " + labelySelect() );
        });*/

         //END CHART WINDOW MODAL ____________________________________________


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


        
        /*$('#chartModal').on('show.bs.modal', function(){
            $('#chartContainer').css('visibility', 'hidden');
        })

        $("chartModal").on('shown.bs.modal', function(event){
            $("#chartContainer").css('visibility', 'initial');
            chart.reflow();
        });*/

      
    } //END ShowChart()

    // Show modal dialog; handle legend sizing (both on doc ready)
    $(document).ready(function(){
        function showModal() {
            $('#geosearchModal').modal('show');
        }
        // Geosearch nav menu is selected
        $('#geosearchNav').click(function(){
            showModal();
        });

        function showAboutModal () {
            $('#aboutModal').modal('show');
        }
        $('#aboutNav').click(function(){
            showAboutModal();
        });

        $("#html").niceScroll();
        $("#sidebar").niceScroll();
        $("#sidebar").scroll(function () {
            $("#sidebar").getNiceScroll().resize();
        });

        $("#legendDiv").niceScroll();

        maxLegendHeight =  ($('#mapDiv').height()) * 0.90;
        $('#legendElement').css('max-height', maxLegendHeight);

        $('#legendCollapse').on('shown.bs.collapse', function () {
            maxLegendHeight =  ($('#mapDiv').height()) * 0.90;
            $('#legendElement').css('max-height', maxLegendHeight);
            maxLegendDivHeight = ($('#legendElement').height()) - parseInt($('#legendHeading').css("height").replace('px',''));
            $('#legendDiv').css('max-height', maxLegendDivHeight);
        });

        $('#legendCollapse').on('hide.bs.collapse', function () {
            $('#legendElement').css('height', 'initial');
        });
        

        /* HANDLE SIDEBAR UI EVENTS_____________________________________________________________*/

        /*RADIO EVENTS*/
        $('.radio').on('change', function(e){
            var groupBySelectedIndex = $("#groupResultsSelect")[0].selectedIndex;
            var selectedRadio = this.firstElementChild.id;
            
            populateMetricOptions($("#groupResultsSelect")[0].selectedIndex);
            setAggregateGroup(groupBySelectedIndex, selectedRadio);   
        });




        /* AOI EVENTS */

        $('.aoiSelect').on('change', AOIChange);


        //clear AOI selections
        $("#clearAOIButton").on('click', function(){
            var sparrowId = map.getLayer('SparrowRanking').visibleLayers[0];
            var splitLayers = [4,5,6,11,12,13]; //important! UPDATE layer Ids of all state split layers

            
            //revert to default layer from split layer
            if( $.inArray(sparrowId, splitLayers) > -1 ){
                sparrowId = returnDefaultLayer( sparrowId, $(".radio input[type='radio']:checked")[0].id );
                var layerArr = [];
                layerArr.push(sparrowId);
                map.getLayer('SparrowRanking').setVisibleLayers(layerArr);
                map.getLayer('SparrowRanking').setDefaultLayerDefinitions();
                //TODO: call generateRenderer 
                
            }else{
                map.getLayer('SparrowRanking').setDefaultLayerDefinitions(); 
                //TODO: call generateRenderer 
            }

            //reset the selects
            $('.aoiSelect').selectpicker('val', '');  // 'hack' because selectpicker('deselectAll') method only works when select is open.
            //$('.aoiSelect').selectpicker('refresh'); //don't need refresh apparently
            populateMetricOptions($("#groupResultsSelect")[0].selectedIndex);

        });


        // enable/disable Show Chart button 
        $('.nonAOISelect').on('change', function(){
            if ($('#groupResultsSelect')[0].selectedIndex == 0){
                if ($('#displayedMetricSelect')[0].selectedIndex == 4 || $('#displayedMetricSelect')[0].selectedIndex == 5){
                    $("#chartButton").addClass('disabled');
                    //TODO:  ALSO MAKE SURE YOU REMOVE ANY CHART FROM THE VIEW (Lobipanel only, modal takes care of self.)
                } else{
                    $("#chartButton").removeClass('disabled');
                }
            } else {
                $("#chartButton").removeClass('disabled');
            }
        });

        //Start the Chart Chain of Events
        $("#chartButton").on("click", createChartQuery);

        /* END UI SIDEBAR EVENTS______________________________________________________________*/
        $('#rendererButton').on('click', generateRenderer);

        

    });

    require([
        'esri/dijit/Legend',
        'esri/tasks/locator',
        'esri/tasks/query',
        'esri/tasks/QueryTask',
        'esri/graphicsUtils',
        'esri/geometry/Point',
        'esri/geometry/Extent',
        'esri/layers/ArcGISDynamicMapServiceLayer',
        'esri/layers/FeatureLayer',
        'esri/SpatialReference',
        'esri/layers/WMSLayer',
        'esri/layers/WMSLayerInfo',
        'dijit/form/CheckBox',
        'dijit/form/RadioButton',
        'dojo/query',
        'dojo/dom',
        'dojo/dom-class',
        'dojo/dom-construct',
        'dojo/dom-style',
        'dojo/on'
    ], function(
        Legend,
        Locator,
        Query,
        QueryTask,
        graphicsUtils,
        Point,
        Extent,
        ArcGISDynamicMapServiceLayer,
        FeatureLayer,
        SpatialReference,
        WMSLayer,
        WMSLayerInfo,
        CheckBox,
        RadioButton,
        query,
        dom,
        domClass,
        domConstruct,
        domStyle,
        on
    ) {

        var legendLayers = [];
        var layersObject = [];
        var layerArray = [];
        var staticLegendImage;
        var identifyTask, identifyParams;
        var navToolbar;
        var locator;

        //create global layers lookup
        var mapLayers = [];

        

        $.each(allLayers, function (index,group) {
            console.log('processing: ', group.groupHeading)


            //sub-loop over layers within this groupType
            $.each(group.layers, function (layerName,layerDetails) {



                //check for exclusiveGroup for this layer
                var exclusiveGroupName = '';
                if (layerDetails.wimOptions.exclusiveGroupName) {
                    exclusiveGroupName = layerDetails.wimOptions.exclusiveGroupName;
                }

                if (layerDetails.wimOptions.layerType === 'agisFeature') {
                    var layer = new FeatureLayer(layerDetails.url, layerDetails.options);
                    //check if include in legend is true
                    if (layerDetails.wimOptions && layerDetails.wimOptions.includeLegend == true){
                        legendLayers.push({layer:layer, title: layerName});
                    }
                    addLayer(group.groupHeading, group.showGroupHeading, layer, layerName, exclusiveGroupName, layerDetails.options, layerDetails.wimOptions);
                    //addMapServerLegend(layerName, layerDetails);
                }

                else if (layerDetails.wimOptions.layerType === 'agisWMS') {
                    var layer = new WMSLayer(layerDetails.url, {resourceInfo: layerDetails.options.resourceInfo, visibleLayers: layerDetails.options.visibleLayers }, layerDetails.options);
                    //check if include in legend is true
                    if (layerDetails.wimOptions && layerDetails.wimOptions.includeLegend == true){
                        legendLayers.push({layer:layer, title: layerName});
                    }
                    //map.addLayer(layer);
                    addLayer(group.groupHeading, group.showGroupHeading, layer, layerName, exclusiveGroupName, layerDetails.options, layerDetails.wimOptions);
                    //addMapServerLegend(layerName, layerDetails);
                }

                else if (layerDetails.wimOptions.layerType === 'agisDynamic') {
                    var layer = new ArcGISDynamicMapServiceLayer(layerDetails.url, layerDetails.options);
                    //check if include in legend is true
                    if (layerDetails.wimOptions && layerDetails.wimOptions.includeLegend == true){
                        legendLayers.push({layer:layer, title: layerName});
                    }
                    if (layerDetails.visibleLayers) {
                        layer.setVisibleLayers(layerDetails.visibleLayers);
                    }
                    //map.addLayer(layer);
                    addLayer(group.groupHeading, group.showGroupHeading, layer, layerName, exclusiveGroupName, layerDetails.options, layerDetails.wimOptions);
                    //addMapServerLegend(layerName, layerDetails);
                }
            });
        });

        function addLayer(groupHeading, showGroupHeading, layer, layerName, exclusiveGroupName, options, wimOptions) {

            //add layer to map
            //layer.addTo(map);
            map.addLayer(layer);

            //add layer to layer list
            mapLayers.push([exclusiveGroupName,camelize(layerName),layer]);

            //check if its an exclusiveGroup item
            if (exclusiveGroupName) {

                if (!$('#' + camelize(exclusiveGroupName)).length) {
                    var exGroupRoot = $('<div id="' + camelize(exclusiveGroupName +" Root") + '" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + exclusiveGroupName + '</button> </div>');

                    exGroupRoot.click(function(e) {
                        exGroupRoot.find('i.glyphspan').toggleClass('fa-check-square-o fa-square-o');

                        $.each(mapLayers, function (index, currentLayer) {

                            var tempLayer = map.getLayer(currentLayer[2].id);

                            if (currentLayer[0] == exclusiveGroupName) {
                                if ($("#" + currentLayer[1]).find('i.glyphspan').hasClass('fa-dot-circle-o') && exGroupRoot.find('i.glyphspan').hasClass('fa-check-square-o')) {
                                    console.log('adding layer: ',currentLayer[1]);
                                    map.addLayer(currentLayer[2]);
                                    var tempLayer = map.getLayer(currentLayer[2].id);
                                    tempLayer.setVisibility(true);
                                } else if (exGroupRoot.find('i.glyphspan').hasClass('fa-square-o')) {
                                    console.log('removing layer: ',currentLayer[1]);
                                    map.removeLayer(currentLayer[2]);
                                }
                            }

                        });
                    });

                    var exGroupDiv = $('<div id="' + camelize(exclusiveGroupName) + '" class="btn-group-vertical" data-toggle="buttons"></div');
                    $('#toggle').append(exGroupDiv);
                }

                //create radio button
                //var button = $('<input type="radio" name="' + camelize(exclusiveGroupName) + '" value="' + camelize(layerName) + '"checked>' + layerName + '</input></br>');
                if (layer.visible) {
                    var button = $('<div id="' + camelize(layerName) + '" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="' + camelize(exclusiveGroupName) + '" autocomplete="off"><i class="glyphspan fa fa-dot-circle-o ' + camelize(exclusiveGroupName) + '"></i>&nbsp;&nbsp;' + layerName + '</label> </div>');
                } else {
                    var button = $('<div id="' + camelize(layerName) + '" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="' + camelize(exclusiveGroupName) + '" autocomplete="off"><i class="glyphspan fa fa-circle-o ' + camelize(exclusiveGroupName) + '"></i>&nbsp;&nbsp;' + layerName + '</label> </div>');
                }

                $('#' + camelize(exclusiveGroupName)).append(button);

                //click listener for radio button
                button.click(function(e) {

                    if ($(this).find('i.glyphspan').hasClass('fa-circle-o')) {
                        $(this).find('i.glyphspan').toggleClass('fa-dot-circle-o fa-circle-o');

                        var newLayer = $(this)[0].id;

                        $.each(mapLayers, function (index, currentLayer) {

                            if (currentLayer[0] == exclusiveGroupName) {
                                if (currentLayer[1] == newLayer && $("#" + camelize(exclusiveGroupName + " Root")).find('i.glyphspan').hasClass('fa-check-square-o')) {
                                    console.log('adding layer: ',currentLayer[1]);
                                    map.addLayer(currentLayer[2]);
                                    var tempLayer = map.getLayer(currentLayer[2].id);
                                    tempLayer.setVisibility(true);
                                    //$('#' + camelize(currentLayer[1])).toggle();
                                }
                                else if (currentLayer[1] == newLayer && $("#" + camelize(exclusiveGroupName + " Root")).find('i.glyphspan').hasClass('fa-square-o')) {
                                    console.log('groud heading not checked');
                                }
                                else {
                                    console.log('removing layer: ',currentLayer[1]);
                                    map.removeLayer(currentLayer[2]);
                                    if ($("#" + currentLayer[1]).find('i.glyphspan').hasClass('fa-dot-circle-o')) {
                                        $("#" + currentLayer[1]).find('i.glyphspan').toggleClass('fa-dot-circle-o fa-circle-o');
                                    }
                                    $('#' + camelize(this[1])).toggle();
                                }
                            }
                        });
                    }
                });
            }

            //not an exclusive group item
            else {

                //create layer toggle
                //var button = $('<div align="left" style="cursor: pointer;padding:5px;"><span class="glyphspan glyphicon glyphicon-check"></span>&nbsp;&nbsp;' + layerName + '</div>');
                if (layer.visible && wimOptions.hasOpacitySlider !== undefined && wimOptions.hasOpacitySlider == true && wimOptions.hasZoomto !== undefined && wimOptions.hasZoomto == true) {
                    //opacity icon and zoomto icon; button selected
                    var button = $('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="' + layer.id + '"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="opacity' + camelize(layerName) + '" class="glyphspan glyphicon glyphicon-adjust pull-right opacity"></span><span class="glyphicon glyphicon-search pull-right zoomto"></span></button></div>');
                } else if (!layer.visible && wimOptions.hasOpacitySlider !== undefined && wimOptions.hasOpacitySlider == true && wimOptions.hasZoomto !== undefined && wimOptions.hasZoomto == true){
                    //opacity icon and zoomto icon; button not selected
                    var button = $('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="' + layer.id + '"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="opacity' + camelize(layerName) + '" class="glyphspan glyphicon glyphicon-adjust pull-right opacity"></span><span class="glyphicon glyphicon-search pull-right zoomto"></span></button></div>');
                } else if (layer.visible && wimOptions.hasOpacitySlider !== undefined && wimOptions.hasOpacitySlider == true) {
                    //opacity icon only; button selected
                    var button = $('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="' + layer.id + '"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="opacity' + camelize(layerName) + '" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></div>');
                } else if (!layer.visible && wimOptions.hasOpacitySlider !== undefined && wimOptions.hasOpacitySlider == true) {
                    //opacity icon only; button not selected
                    var button = $('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="' + layer.id + '"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="opacity' + camelize(layerName) + '" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></div>');
                } else if (layer.visible && wimOptions.hasOpacitySlider == false && wimOptions.hasZoomto !== undefined && wimOptions.hasZoomto == true){
                    //zoomto icon only; button selected
                    var button = $('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="' + layer.id + '"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + layerName + '<span class="glyphicon glyphicon-search pull-right zoomto"></span></button></span></div>');
                } else if (!layer.visible && wimOptions.hasOpacitySlider == false && wimOptions.hasZoomto !== undefined && wimOptions.hasZoomto == true) {
                    //zoomto icon only; button not selected
                    var button = $('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="' + layer.id + '"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;' + layerName + '<span class="glyphicon glyphicon-search pull-right zoomto"></span></button></span></div>');
                } else if(layer.visible) {
                    //no icons; button selected
                    var button = $('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="' + layer.id + '"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + layerName + '</button></span></div>');
                } else {
                    //no icons; button not selected
                    var button = $('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="' + layer.id + '"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;' + layerName + '</button> </div>');
                }

                //click listener for regular
                button.click(function(e) {

                    //toggle checkmark
                    $(this).find('i.glyphspan').toggleClass('fa-check-square-o fa-square-o');
                    $(this).find('button').button('toggle');

                    e.preventDefault();
                    e.stopPropagation();

                    $('#' + camelize(layerName)).toggle();

                    //layer toggle
                    if (layer.visible) {
                        layer.setVisibility(false);
                    } else {
                        layer.setVisibility(true);
                    }

                });
            }

            //group heading logic
            if (showGroupHeading) {

                //camelize it for divID
                var groupDivID = camelize(groupHeading);

                //check to see if this group already exists
                if (!$('#' + groupDivID).length) {
                    //if it doesn't add the header
                    var groupDiv = $('<div id="' + groupDivID + '"><div class="alert alert-info" role="alert"><strong>' + groupHeading + '</strong></div></div>');
                    $('#toggle').append(groupDiv);
                }

                //if it does already exist, append to it

                if (exclusiveGroupName) {
                    //if (!exGroupRoot.length)$("#slider"+camelize(layerName))
                    $('#' + groupDivID).append(exGroupRoot);
                    $('#' + groupDivID).append(exGroupDiv);
                } else {
                    $('#' + groupDivID).append(button);
                    //begin opacity slider logic
                    if ($("#opacity"+camelize(layerName)).length > 0) {
                        $("#opacity"+camelize(layerName)).hover(function () {
                            $(".opacitySlider").remove();
                            var currOpacity = map.getLayer(options.id).opacity;
                            var slider = $('<div class="opacitySlider"><label id="opacityValue">Opacity: ' + currOpacity + '</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');
                            $("body").append(slider);[0]

                            $("#slider")[0].value = currOpacity*100;
                            $(".opacitySlider").css('left', event.clientX-180);
                            $(".opacitySlider").css('top', event.clientY-50);

                            $(".opacitySlider").mouseleave(function() {
                                $(".opacitySlider").remove();
                            });

                            $(".opacityClose").click(function() {
                                $(".opacitySlider").remove();
                            });

                            $('#slider').change(function(event) {
                                //get the value of the slider with this call
                                var o = ($('#slider')[0].value)/100;
                                console.log("o: " + o);
                                $("#opacityValue").html("Opacity: " + o)
                                map.getLayer(options.id).setOpacity(o);
                                //here I am just specifying the element to change with a "made up" attribute (but don't worry, this is in the HTML specs and supported by all browsers).
                                //var e = '#' + $(this).attr('data-wjs-element');
                                //$(e).css('opacity', o)
                            });
                        });
                    }
                    //end opacity slider logic

                    //begin zoomto logic (in progress)
                    $(".zoomto").hover(function (e) {

                        $(".zoomDialog").remove();
                        var layerToChange = this.parentNode.id;
                        var zoomDialog = $('<div class="zoomDialog"><label class="zoomClose pull-right">X</label><br><div class="list-group"><a href="#" id="zoomscale" class="list-group-item lgi-zoom zoomscale">Zoom to scale</a> <a id="zoomcenter" href="#" class="list-group-item lgi-zoom zoomcenter">Zoom to center</a><a id="zoomextent" href="#" class="list-group-item lgi-zoom zoomextent">Zoom to extent</a></div></div>');

                        $("body").append(zoomDialog);

                        $(".zoomDialog").css('left', event.clientX-80);
                        $(".zoomDialog").css('top', event.clientY-5);

                        $(".zoomDialog").mouseleave(function() {
                            $(".zoomDialog").remove();
                        });

                        $(".zoomClose").click(function() {
                            $(".zoomDialog").remove();
                        });

                        $('#zoomscale').click(function (e) {
                            //logic to zoom to layer scale
                            var layerMinScale = map.getLayer(layerToChange).minScale;
                            map.setScale(layerMinScale);
                        });

                        $("#zoomcenter").click(function (e){
                            //logic to zoom to layer center
                            //var layerCenter = map.getLayer(layerToChange).fullExtent.getCenter();
                            //map.centerAt(layerCenter);
                            var dataCenter = new Point(defaultMapCenter, new SpatialReference({wkid:4326}));
                            map.centerAt(dataCenter);

                        });

                        $("#zoomextent").click(function (e){
                            //logic to zoom to layer extent
                            var layerExtent = map.getLayer(layerToChange).fullExtent;
                            map.setExtent(layerExtent);
                        });
                    });
                    //end zoomto logic

                }
            }

            else {
                //otherwise append
                $('#toggle').append(button);
            }
        }

        //get visible and non visible layer lists
        function addMapServerLegend(layerName, layerDetails) {


            if (layerDetails.wimOptions.layerType === 'agisFeature') {

                //for feature layer since default icon is used, put that in legend
                var legendItem = $('<div align="left" id="' + camelize(layerName) + '"><img alt="Legend Swatch" src="https://raw.githubusercontent.com/Leaflet/Leaflet/master/dist/images/marker-icon.png" /><strong>&nbsp;&nbsp;' + layerName + '</strong></br></div>');
                $('#legendDiv').append(legendItem);

            }

            else if (layerDetails.wimOptions.layerType === 'agisWMS') {

                //for WMS layers, for now just add layer title
                var legendItem = $('<div align="left" id="' + camelize(layerName) + '"><img alt="Legend Swatch" src="http://placehold.it/25x41" /><strong>&nbsp;&nbsp;' + layerName + '</strong></br></div>');
                $('#legendDiv').append(legendItem);

            }

            else if (layerDetails.wimOptions.layerType === 'agisDynamic') {

                //create new legend div
                var legendItemDiv = $('<div align="left" id="' + camelize(layerName) + '"><strong>&nbsp;&nbsp;' + layerName + '</strong></br></div>');
                $('#legendDiv').append(legendItemDiv);

                //get legend REST endpoint for swatch
                $.getJSON(layerDetails.url + '/legend?f=json', function (legendResponse) {

                    console.log(layerName,'legendResponse',legendResponse);



                    //make list of layers for legend
                    if (layerDetails.options.layers) {
                        //console.log(layerName, 'has visisble layers property')
                        //if there is a layers option included, use that
                        var visibleLayers = layerDetails.options.layers;
                    }
                    else {
                        //console.log(layerName, 'no visible layers property',  legendResponse)

                        //create visibleLayers array with everything
                        var visibleLayers = [];
                        $.grep(legendResponse.layers, function(i,v) {
                            visibleLayers.push(v);
                        });
                    }

                    //loop over all map service layers
                    $.each(legendResponse.layers, function (i, legendLayer) {

                        //var legendHeader = $('<strong>&nbsp;&nbsp;' + legendLayer.layerName + '</strong>');
                        //$('#' + camelize(layerName)).append(legendHeader);

                        //sub-loop over visible layers property
                        $.each(visibleLayers, function (i, visibleLayer) {

                            //console.log(layerName, 'visibleLayer',  visibleLayer);

                            if (visibleLayer == legendLayer.layerId) {

                                console.log(layerName, visibleLayer,legendLayer.layerId, legendLayer)

                                //console.log($('#' + camelize(layerName)).find('<strong>&nbsp;&nbsp;' + legendLayer.layerName + '</strong></br>'))

                                var legendHeader = $('<strong>&nbsp;&nbsp;' + legendLayer.layerName + '</strong></br>');
                                $('#' + camelize(layerName)).append(legendHeader);

                                //get legend object
                                var feature = legendLayer.legend;
                                /*
                                 //build legend html for categorized feautres
                                 if (feature.length > 1) {
                                 */

                                //placeholder icon
                                //<img alt="Legend Swatch" src="http://placehold.it/25x41" />

                                $.each(feature, function () {

                                    //make sure there is a legend swatch
                                    if (this.imageData) {
                                        var legendFeature = $('<img alt="Legend Swatch" src="data:image/png;base64,' + this.imageData + '" /><small>' + this.label.replace('<', '').replace('>', '') + '</small></br>');

                                        $('#' + camelize(layerName)).append(legendFeature);
                                    }
                                });
                                /*
                                 }
                                 //single features
                                 else {
                                 var legendFeature = $('<img alt="Legend Swatch" src="data:image/png;base64,' + feature[0].imageData + '" /><small>&nbsp;&nbsp;' + legendLayer.layerName + '</small></br>');

                                 //$('#legendDiv').append(legendItem);
                                 $('#' + camelize(layerName)).append(legendFeature);

                                 }
                                 */
                            }
                        }); //each visible layer
                    }); //each legend item
                }); //get legend json
            }
        }
        /* parse layers.js */

        var legend = new Legend({
            map: map,
            layerInfos: legendLayers
        }, "legendDiv");
        legend.startup();


    });//end of require statement containing legend building code

});

$(document).ready(function () {
    //7 lines below are handler for the legend buttons. to be removed if we stick with the in-map legend toggle
    //$('#legendButtonNavBar, #legendButtonSidebar').on('click', function () {
    //    $('#legend').toggle();
    //    //return false;
    //});
    //$('#legendClose').on('click', function () {
    //    $('#legend').hide();
    //});

});
