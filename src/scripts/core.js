//for jshint
'use strict';
// Generated on 2015-04-13 using generator-wim 0.0.1

var app = {};

require([
    'esri/arcgis/utils',
    'esri/map',
    'esri/tasks/QueryTask',
    'esri/tasks/query',
    'esri/Color',
    'esri/dijit/HomeButton',
    'esri/dijit/LocateButton',
    'esri/layers/ArcGISTiledMapServiceLayer',
    'esri/layers/ArcGISDynamicMapServiceLayer',
    'esri/layers/FeatureLayer',
    'esri/layers/WMSLayer',
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
    "esri/tasks/IdentifyTask",
    "esri/tasks/IdentifyParameters",
    'esri/geometry/webMercatorUtils',
    'esri/SpatialReference',
    'dojo/parser',
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
    ArcGISDynamicMapServiceLayer,
    FeatureLayer,
    WMSLayer,
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
    IdentifyTask,
    IdentifyParameters,
    webMercatorUtils,
    SpatialReference,
    parser,
    Moveable,
    query,
    dom,
    domClass,
    on
) {
    parser.parse();

    app.dragInfoWindows = true;
    app.defaultMapCenter = [-86, 36];

    //setup map
    app.map = Map('mapDiv', {
        basemap: 'gray',
        center: app.defaultMapCenter,
        zoom: 7
    });


    //button for returning to initial extent
    app.home = new HomeButton({
        map: app.map
    }, "homeButton");
    app.home.startup();

    //button for finding and zooming to user's location
    app.locate = new LocateButton({
        map: app.map
    }, "locateButton");
    app.locate.startup();

    app.geocoder = new Geocoder({
        value: '',
        maxLocations: 25,
        autoComplete: true,
        arcgisGeocoder: true,
        autoNavigate: false,
        map: app.map
    }, 'geosearch');
    app.geocoder.startup();
    app.geocoder.on('select', geocodeSelect);
    app.geocoder.on('findResults', geocodeResults);
    app.geocoder.on('clear', clearFindGraphics);


    //load additional basemap
    var nationalMapBasemap = new ArcGISTiledMapServiceLayer('http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer');

    loadEventHandlers();

    //TODO: FIGURE OUT HOW TO USE THE QUERY WHERECLAUSE     Call setupQueryTask for every layer inqueryParameters
    for (var key in queryParameters){
        setupQueryTask(serviceBaseURL + queryParameters[key].serviceId, [queryParameters[key].nameField], "1=1");
    }

    app.initMapScale = function() {
        var scale = app.map.getScale().toFixed(0);
        $('#scale')[0].innerHTML = addCommas(scale);
        var initMapCenter = webMercatorUtils.webMercatorToGeographic(app.map.extent.getCenter());
        $('#latitude').html(initMapCenter.y.toFixed(3));
        $('#longitude').html(initMapCenter.x.toFixed(3));
    };

    app.updateMousePosition = function(cursorPosition) {
        $('#mapCenterLabel').css("display", "none");
        if (cursorPosition.mapPoint != null) {
            var geographicMapPt = webMercatorUtils.webMercatorToGeographic(cursorPosition.mapPoint);
            $('#latitude').html(geographicMapPt.y.toFixed(3));
            $('#longitude').html(geographicMapPt.x.toFixed(3));
        }
    };

    app.updateMapCenter = function(extent) {
        //displays latitude and longitude of map center
        $('#mapCenterLabel').css("display", "inline");
        var geographicMapCenter = webMercatorUtils.webMercatorToGeographic(extent.getCenter());
        $('#latitude').html(geographicMapCenter.y.toFixed(3));
        $('#longitude').html(geographicMapCenter.x.toFixed(3));
    };

    app.setupDraggableInfoWindow = function() {
        //code for adding draggability to infoWindow. http://www.gavinr.com/2015/04/13/arcgis-javascript-draggable-infowindow/
        if (app.dragInfoWindows == true) {
            var handle = query(".title",app.map.infoWindow.domNode)[0];
            var dnd = new Moveable(app.map.infoWindow.domNode, {
                handle: handle
            });

            // when the infoWindow is moved, hide the arrow:
            on(dnd, 'FirstMove', function() {
                // hide pointer and outerpointer (used depending on where the pointer is shown)
                var arrowNode =  query(".outerPointer",app.map.infoWindow.domNode)[0];
                domClass.add(arrowNode, "hidden");

                var arrowNode =  query(".pointer",app.map.infoWindow.domNode)[0];
                domClass.add(arrowNode, "hidden");
            }.bind(this));
   
        }
    }


    app.identifyParams = new esri.tasks.IdentifyParameters();
    app.identifyParams.tolerance = 5;
    app.identifyParams.returnGeometry = true;
    //app.identifyParams.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE;
    app.identifyParams.width  = app.map.width;
    app.identifyParams.height = app.map.height;
    app.identifyTask = new esri.tasks.IdentifyTask(serviceBaseURL); 

    function getInfoWindowContent(){
        console.log('in getInfoWindowContent');
    }

    app.executeIdentifyTask = function(evt){
        console.log(evt)
        var sparrowLayer = app.map.getLayer("SparrowRanking").visibleLayers[0];

        app.identifyParams.layerIds = [sparrowLayer];
        app.identifyParams.geometry = evt.mapPoint;
        app.identifyParams.mapExtent = app.map.extent;
        
        var deferred = app.identifyTask.execute(app.identifyParams).addCallback(function(response){
            console.log(response);

            var fields = getChartOutfields( app.map.getLayer('SparrowRanking').visibleLayers[0] );
            var template = new esri.InfoTemplate();
            template.setTitle(fields[0].label + ": " + response[0].value);
            template.setContent('<div class="btn"><button type="button" onclick="createChartQuery" class="btn btn-primary" id="popupChartButton"><span class="glyphicon glyphicon-signal"></span> Show Full Chart</button></div>');
            

            /*template.setContent(getInfoWindowContent(fields, response));

            function getInfoWindowContent(fields, response){
                var responseObj = response[0].feature.attributes;
                console.log(responseObj);
                $.each(fields, function(index, field, responseObj){
                    if (index > 0){
                        console.log(field.label);
                        console.log(field.attribute);
                    }
                });
                
            }*/


            var graphic = new Graphic();
            var feature = graphic;
            feature.setInfoTemplate(template);
            app.map.infoWindow.setFeatures([feature]);
            app.map.infoWindow.show(evt.mapPoint);
            $("#popupChartButton").on('click', createChartQuery);
        });
    }

    // Symbols
    var sym = createPictureSymbol('../images/purple-pin.png', 0, 12, 13, 24);

    var selectionSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, 
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
        new Color([255, 0, 0]), 2), new Color([255,255, 0, 0.5])); 

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
                break;
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


    // Optionally confine search to map extent
    function setSearchExtent (){
        if (dom.byId('chkExtent').checked === 1) {
            geocoder.activeGeocoder.searchExtent = app.map.extent;
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
            app.map.centerAndZoom(centerPoint, 17);
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
        app.map.graphics.add(graphic);
    }

    function zoomToPlaces(places) {
        var multiPoint = new Multipoint(app.map.spatialReference);
        for (var i = 0; i < places.length; i++) {
            multiPoint.addPoint(places[i].feature.geometry);
        }
        app.map.setExtent(multiPoint.getExtent().expand(2.0));
    }

    function clearFindGraphics() {
        app.map.infoWindow.hide();
        app.map.graphics.clear();
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
        var sparrowLayerId = app.map.getLayer('SparrowRanking').visibleLayers[0];
        if (app.map.getLayer('SparrowRanking').layerDefinitions){
            var whereClause = app.map.getLayer('SparrowRanking').layerDefinitions[sparrowLayerId];
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
        var sparrowLayerId = app.map.getLayer('SparrowRanking').visibleLayers[0];
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
            var layerId = app.map.getLayer('SparrowRanking').visibleLayers[0];
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
            return label;
        }


         /*function highlightMapFeature(category){
            var layerDefinitions = "GRP_3_NAM = '" + category + "'";



            var selectionSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, 
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
                new Color([255, 0, 0]), 2), new Color([255,255, 0, 0.5]));

            app.map.getLayer("SparrowGraphics").setDefinitionExpression(layerDefinitions);

            app.map.getLayer("SparrowGraphics").setSelectionSymbol(selectionSymbol);
        }*/


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
            draggable: true,
            minWidth: 800,
            minHeight: 800,
            maxHeight: 1000
        
        });

        $("#chartWindowDiv").addClass( "chartWindowMaximize" );
        $("#chartWindowDiv").removeClass( "chartWindowMinimize" );
        $("#chartWindowDiv").css("visibility", "visible");

        //Important! UPDATE if nutrient Models change names.
        if( $(".radio input[type='radio']:checked")[0].id == "radio1"){
            $("#chartWindowPanelTitle").text("Phosphorus " + labelySelect() );
        }   else{
            $("#chartWindowPanelTitle").text("Nitrogen " + labelySelect() );
        }
        
        //only create close / minimize if they don't already exist
        if ($("#chartMinimize").length == 0){
            $("#chartWindowDiv .dropdown").prepend("<div id='chartClose' title='close'><b>X</b></div>");
            $("#chartWindowDiv .dropdown").prepend("<div id='chartMinimize' title='collapse'><b>_</b></div>");
        }


        var instance = $('#chartWindowDiv').data('lobiPanel');
        instance.unpin();

         $("#chartMinimize").on('click', function(){
            $("#chartWindowDiv").slideDown(250);
            $("#chartWindowDiv").removeClass("chartWindowMaximize");
            $("#chartWindowDiv").attr('style', '');
            $("#chartWindowDiv").addClass("chartWindowMinimize");
        });

        $("#chartClose").on('click', function(){
            app.map.graphics.clear();
            $("#chartWindowDiv").css("visibility", "hidden");
            $("#chartWindowContainer").empty();
            $("#chartWindowPanelTitle").empty();
            
        });


        //need listener to resize chart
        $("#chartWindowDiv").resize(function() {
            var height = $("#chartWindowDiv").height()
            var width = $("#chartWindowDiv").width()
            $('#chartWindowContainer').highcharts().setSize(width-50, height-75, true);
        });


        //END LOBIPANEL-------------------------------------------------------------------------------------------------------
        

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
                    zoomType: "x",
                    resetZoomButton: {
                        theme: {
                            display: 'none'
                        }
                    },
                    backgroundColor:'rgba(255, 255, 255, 0.1)',
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
                                + this.series.name + ': ' + this.point.y.toFixed(2) + this.point.stackTotal.toFixed(2) + '<br/> Rank: ' + rank;
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
                                    var visibleLayers = app.map.getLayer('SparrowRanking').visibleLayers[0];
                                    var URL = app.map.getLayer('SparrowRanking').url;
                                    var fieldName = switchWhereField( $("#groupResultsSelect")[0].selectedIndex );

                                    var queryTask;
                                    queryTask = new esri.tasks.QueryTask(URL + visibleLayers.toString() );

                                    var graphicsQuery = new esri.tasks.Query();
                                    graphicsQuery.returnGeometry = true; //important!
                                    graphicsQuery.outSpatialReference = app.map.spatialReference;  //important!
                                    graphicsQuery.outFields = ["*"];
                                    graphicsQuery.where = fieldName + "= '" + category + "'";

                                                                
                                    queryTask.execute(graphicsQuery, responseHandler);

                                    function responseHandler(response){
                                        app.map.graphics.clear();
                                        
                                        var feature = response.features[0];
                                        feature.setSymbol(new SimpleFillSymbol()
                                            .setColor(new Color([182,244,66,0.8]))
                                            .setOutline(null)
                                        );
                                        app.map.graphics.add(feature);
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
      
    } //END ShowChart()


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

    app.maxLegendHeight =  ($('#mapDiv').height()) * 0.90;
    $('#legendElement').css('max-height', app.maxLegendHeight);

    $('#legendCollapse').on('shown.bs.collapse', function () {
        app.maxLegendHeight =  ($('#mapDiv').height()) * 0.90;
        $('#legendElement').css('max-height', app.maxLegendHeight);
        app.maxLegendDivHeight = ($('#legendElement').height()) - parseInt($('#legendHeading').css("height").replace('px',''));
        $('#legendDiv').css('max-height', app.maxLegendDivHeight);
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
        generateRenderer();
    });


    /* AOI EVENTS */

    $('.aoiSelect').on('change', AOIChange);


    //clear AOI selections
    $("#clearAOIButton").on('click', function(){
        var sparrowId = app.map.getLayer('SparrowRanking').visibleLayers[0];
        var splitLayers = [4,5,6,11,12,13]; //important! UPDATE layer Ids of all state split layers

        
        //revert to default layer from split layer
        if( $.inArray(sparrowId, splitLayers) > -1 ){
            sparrowId = returnDefaultLayer( sparrowId, $(".radio input[type='radio']:checked")[0].id );
            var layerArr = [];
            layerArr.push(sparrowId);
            app.map.getLayer('SparrowRanking').setVisibleLayers(layerArr);
            //app.map.getLayer('SparrowRanking').setDefaultLayerDefinitions(true); //don't refresh yet.
            app.map.getLayer('SparrowRanking').setDefaultLayerDefinitions();
            console.log('Radio Change Clear')

            
        }else{
            //app.map.getLayer('SparrowRanking').setDefaultLayerDefinitions(true); //don't refresh yet.
            app.map.getLayer('SparrowRanking').setDefaultLayerDefinitions();
            console.log('AOI CLEAR');
        }

        //reset the selects
        $('.aoiSelect').selectpicker('val', '');  // 'hack' because selectpicker('deselectAll') method only works when select is open.
        //$('.aoiSelect').selectpicker('refresh'); //don't need refresh apparently
        populateMetricOptions($("#groupResultsSelect")[0].selectedIndex);
        //redraw the symbols
        generateRenderer();

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

    // var layer = new ArcGISDynamicMapServiceLayer("http://gis.wim.usgs.gov/arcgis/rest/services/SparrowTennessee/SparrowTennesseeDev/MapServer", {
    //     "id": "SparrowRanking",
    //     "opacity": 0.75,
    //     "visible": true
    // });
    // app.map.addLayer(layer);
    // layer.setVisibleLayers([0]);

    // console.log(app.map)

    require([
        'dijit/form/CheckBox'
    ], function(
        CheckBox
    ) {

        $.each(allLayers, function (index,group) {
            //sub-loop over layers within this groupType
            $.each(group.layers, function (layerName,layerDetails) {

                var layer = new ArcGISDynamicMapServiceLayer(layerDetails.url, layerDetails.options);
                if (layerDetails.visibleLayers) {
                    layer.setVisibleLayers(layerDetails.visibleLayers);
                }
                addLayer(group.groupHeading, group.showGroupHeading, layer, layerName, layerDetails.options, layerDetails.wimOptions);
            });
        });

        function addLayer(groupHeading, showGroupHeading, layer, layerName, options, wimOptions) {

            //add layer to map
            app.map.addLayer(layer);

            //create layer toggle
            //var button = $('<div align="left" style="cursor: pointer;padding:5px;"><span class="glyphspan glyphicon glyphicon-check"></span>&nbsp;&nbsp;' + layerName + '</div>');
            if (layer.visible && wimOptions.hasOpacitySlider !== undefined && wimOptions.hasOpacitySlider == true && wimOptions.hasZoomto !== undefined && wimOptions.hasZoomto == true) {
                //opacity icon and zoomto icon; button selected
                var button = $('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" > <button id="' + layer.id + '"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="opacity' + camelize(layerName) + '" class="glyphspan glyphicon glyphicon-adjust pull-right opacity"></span><span class="glyphicon glyphicon-search pull-right zoomto"></span></button></div>');
            } else if (!layer.visible && wimOptions.hasOpacitySlider !== undefined && wimOptions.hasOpacitySlider == true && wimOptions.hasZoomto !== undefined && wimOptions.hasZoomto == true){
                //opacity icon and zoomto icon; button not selected
                var button = $('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" > <button id="' + layer.id + '"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="opacity' + camelize(layerName) + '" class="glyphspan glyphicon glyphicon-adjust pull-right opacity"></span><span class="glyphicon glyphicon-search pull-right zoomto"></span></button></div>');
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
                $('#' + groupDivID).append(button);
                //begin opacity slider logic
                if ($("#opacity"+camelize(layerName)).length > 0) {
                    $("#opacity"+camelize(layerName)).hover(function () {
                        $(".opacitySlider").remove();
                        var currOpacity = app.map.getLayer(options.id).opacity;
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
                            app.map.getLayer(options.id).setOpacity(o);
                            //here I am just specifying the element to change with a "made up" attribute (but don't worry, this is in the HTML specs and supported by all browsers).
                            //var e = '#' + $(this).attr('data-wjs-element');
                            //$(e).css('opacity', o)
                        });
                    });
                }
                //end opacity slider logic

                //begin zoomto logic (in progress)
                $(".zoomto").hover(function (e) {
                    console.log('here')

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
                        var layerMinScale = app.map.getLayer(layerToChange).minScale;
                        app.map.setScale(layerMinScale);
                    });

                    $("#zoomcenter").click(function (e){
                        //logic to zoom to layer center
                        //var layerCenter = app.map.getLayer(layerToChange).fullExtent.getCenter();
                        //app.map.centerAt(layerCenter);
                        var dataCenter = new Point(defaultMapCenter, new SpatialReference({wkid:4326}));
                        app.map.centerAt(dataCenter);

                    });

                    $("#zoomextent").click(function (e){
                        //logic to zoom to layer extent
                        var layerExtent = app.map.getLayer(layerToChange).fullExtent;
                        app.map.setExtent(layerExtent);
                    });
                });
                //end zoomto logic
            }
        }
        //get visible and non visible layer lists
    });//end of require statement containing legend building code
});