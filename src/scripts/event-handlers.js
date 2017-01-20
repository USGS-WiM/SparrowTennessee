function loadEventHandlers() {

    //set initial Displayed Metric options
    $('#groupResultsSelect').on('loaded.bs.select', function(){  
        populateMetricOptions($("#groupResultsSelect")[0].selectedIndex);
        generateRenderer();
    });

    //keep Displayed Metric options in sync -- can be moved to sidebar events lower in code
    $("#groupResultsSelect").on('changed.bs.select', function(e){  
        populateMetricOptions(e.currentTarget.selectedIndex);
        setAggregateGroup( e.currentTarget.selectedIndex, $(".radio input[type='radio']:checked")[0].id );
        generateRenderer();
        
    });

    //TODO TEMPORARY SOLOUTION?  MUST CALL RENDERER WHEN DISPLAYED METRIC CHANGES
        $("#displayedMetricSelect").on('changed.bs.select', function(e){
        generateRenderer();
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
    app.map.on("click", function(evt) { app.executeIdentifyTask(evt) });

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
    $('#btnNatlMap').on('click', function () {
        app.map.addLayer(nationalMapBasemap);
    });



    // on(geocoder.inputNode, 'keydown', function (e) {
    //     if (e.keyCode == 13) {
    //         setSearchExtent();
    //     }
    // });

    // Geosearch functions
    $('#btnGeosearch').on ('click', geosearch);
}