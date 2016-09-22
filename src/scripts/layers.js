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



    allLayers = [
        {
            "groupHeading": "Nutrient Model",
            "showGroupHeading": true,
            "includeInLayerList": true,
            "layers": {
                "phosphorus":{
                    "url" : serviceBaseURL,
                    "visibleLayers": [0],
                    "options":{
                        "id": "PhosphorusLayer",
                        "opacity": 0.75,
                        "visible": true
                    },
                    "wimOptions":{
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": true,
                        "exclusiveGroupName":"Nutrient Model Results",
                        "includeLegend" : false
                        
                    }
                },
                "nitrogen": {
                    "url" : serviceBaseURL,
                    "visibleLayers": [2],
                    "options":{
                        "id": "NitrogenLayer",
                        "opacity": 0.75,
                        "visible": false
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisDynamic",
                        "includeInLayerList": true,
                        "exclusiveGroupName":"Nutrient Model Results",
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





