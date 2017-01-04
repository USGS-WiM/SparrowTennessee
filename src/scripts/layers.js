/**
 * Created by bdraper on 4/27/2015.
 */
var allLayers;

require([
    "esri/geometry/Extent",
    "esri/layers/WMSLayerInfo",
    "esri/layers/FeatureLayer",
    'dojo/domReady!'
], function(
    Extent,
    WMSLayerInfo,
    FeatureLayer
) {

    var SparrowOverlay;
    if ($("#radio1")[0].checked == true){
        sparrowOverlay = 0;
    } else{
        sparrowOverlay = 1;
    }

    allLayers = [
        {
            "groupHeading": "Nutrient Model",
            "showGroupHeading": true,
            "includeInLayerList": true,
            "layers": {
                "Nutrient Model Results Overlay":{
                    "url" : serviceBaseURL,
                    "visibleLayers": [sparrowOverlay],
                    "options":{
                        "id": "SparrowRanking",
                        "opacity": 0.75,
                        "visible": true
                    },
                    "wimOptions":{
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": true,
                        "hasOpacitySlider": true,
                        "hasZoomto" : true,
                        "includeLegend" : false
                    }
                }
            }    
        },
        {
            "groupHeading": "Auxilliary Layers",
            "showGroupHeading": true,
            "includeInLayerList": true,
            "layers": {
                "Tennessee Mainstems" : {
                    "url": serviceBaseURL,
                    "visibleLayers": [4],
                    "options": {
                        "id": "mainstems",
                        "opacity": 0.75,
                        "visible": false
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": true,
                        "zoomScale": 144448,
                        "hasOpacitySlider": true,
                        "hasZoomto" : true,
                        "includeLegend" : true
                    }
                },
                "Tennessee Streams" : {
                    "url": serviceBaseURL,
                    "visibleLayers": [5],
                    "options": {
                        "id": "streams",
                        "visible": false,
                        "opacity": 0.6
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": true,
                        "hasOpacitySlider": true,
                        "hasZoomto": true,
                        "includeLegend" : false
                    }
                }
            }
        }
    ]

});





