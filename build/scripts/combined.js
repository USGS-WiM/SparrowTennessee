function addCommas(e){e+="";for(var t=e.split("."),a=t[0],l=t.length>1?"."+t[1]:"",r=/(\d+)(\d{3})/;r.test(a);)a=a.replace(r,"$1,$2");return a+l}function camelize(e){return e.replace(/(?:^\w|[A-Z]|\b\w)/g,function(e,t){return 0==t?e.toLowerCase():e.toUpperCase()}).replace(/\s+/g,"")}function getChartOutfields(e){var t=[];switch(e){case 0:return $.each(Group3,function(e,a){$("#displayedMetricSelect").val()==a.field&&$.each(a.chartOutfields,function(e,a){t.push(a)})}),t;case 1:return $.each(Group2,function(e,a){$("#displayedMetricSelect").val()==a.field&&$.each(a.chartOutfields,function(e,a){t.push(a)})}),t;case 2:return $.each(Group1,function(e,a){$("#displayedMetricSelect").val()==a.field&&$.each(a.chartOutfields,function(e,a){t.push(a)})}),t;case 3:return $.each(ST,function(e,a){$("#displayedMetricSelect").val()==a.field&&$.each(a.chartOutfields,function(e,a){t.push(a)})}),t}}function addMetricOptions(e){var t;switch(e){case 0:t=Group3;break;case 1:t=Group2;break;case 2:t=Group1;break;case 3:t=ST}$("#displayedMetricSelect").find("option").remove(),$.each(t,function(e,t){$("#displayedMetricSelect").append(new Option(t.name,t.field)),$("#displayedMetricSelect").selectpicker("refresh")})}function checkSelectedAggregateGroup(e,t){if("radio1"==t){var a;switch(e){case 0:a=0;break;case 1:a=1;break;case 2:a=2;break;case 3:a=3}}else if("radio2"==t){var a;switch(e){case 0:a=4;break;case 1:a=5;break;case 2:a=6;break;case 3:a=6}}var l=[a],r=map.getLayer("SparrowRanking");r.setVisibleLayers(l)}function showChart(e){function t(){var e=$("#groupResultsSelect")[0].selectedIndex;switch(e){case 0:return"HUC10";case 1:return"HUC8";case 2:return"Independent Watershed";case 3:return"State"}}function a(){var e,t=map.getLayer("SparrowRanking").visibleLayers[0];switch(t){case 0:$.each(Group3,function(t,a){a.field==$("#displayedMetricSelect").val()&&(e=a.name)});break;case 1:$.each(Group2,function(t,a){a.field==$("#displayedMetricSelect").val()&&(e=a.name)});break;case 2:$.each(Group1,function(t,a){a.field==$("#displayedMetricSelect").val()&&(e=a.name)});break;case 3:$.each(ST,function(t,a){a.field==$("#displayedMetricSelect").val()&&(e=a.name)})}return e+" (lb./yr.)"}var l=[],r=[],i=[],o=[];$.each(e.features[0].attributes,function(e,t){r.push(e)}),$.each(r,function(t,a){var l=[];$.each(e.features,function(e,t){l.push(t.attributes[a])}),i.push(l)}),l=i.shift(),r.shift();var d=map.getLayer("SparrowRanking").visibleLayers[0],n=getChartOutfields(d),s=[];$.each(n,function(e,t){s.push(t.label)}),s.shift(),$.each(s,function(e,t){o.push({name:t})}),$.each(i,function(e,t){o[e].data=i[e]}),console.log("Data Series",o),$("#chartModal").modal("show");$("#chartContainer").highcharts();$(function(){Highcharts.setOptions({lang:{thousandsSep:","}}),$("#chartContainer").highcharts({chart:{type:"column",width:770,height:700,zoomType:"x",events:{selection:function(e){var t=e.xAxis[0];return t&&$.each(this.series,function(e,t){$.each(t.points,function(e,t){console.log(e,t)})}),!0}}},title:{text:null},subtitle:{text:null},xAxis:{categories:l,title:{text:"Ranked by "+t()}},yAxis:{min:0,title:{text:a()},stackLabels:{enabled:!1,style:{fontWeight:"bold",color:Highcharts.theme&&Highcharts.theme.textColor||"gray"}}},legend:{align:"center",x:10,verticalAlign:"top",y:0,floating:!1,padding:5,backgroundColor:Highcharts.theme&&Highcharts.theme.background2||"white",borderColor:"#CCC",borderWidth:1,shadow:!1},tooltip:{headerFormat:"<b>"+t()+": {point.x}</b><br/>",pointFormat:"{series.name}: {point.y:,.2f}<br/>Total (lb./yr.): {point.stackTotal:,.2f}"},plotOptions:{column:{stacking:"normal",dataLabels:{enabled:!1,color:Highcharts.theme&&Highcharts.theme.dataLabelsColor||"white"}}},credits:{enabled:!1},series:o})}),$("#chartModal").on("show.bs.modal",function(){$("#chartModalTitle").empty(),$("#chartModalTitle").text("Phosphorus "+a())}),$("#chartModal").on("shown.bs.modal",function(){$("#chartModalTitle").empty(),$("#chartModalTitle").text("Phosphorus "+a())})}var allLayers;require(["esri/geometry/Extent","esri/layers/WMSLayerInfo","esri/layers/FeatureLayer","dojo/domReady!"],function(e,t,a){1==$("#radio1")[0].checked?sparrowOverlay=0:sparrowOverlay=1,allLayers=[{groupHeading:"Nutrient Model",showGroupHeading:!0,includeInLayerList:!0,layers:{"Nutrient Model Results Overlay":{url:serviceBaseURL,visibleLayers:[sparrowOverlay],options:{id:"SparrowRanking",opacity:.75,visible:!0},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,hasOpacitySlider:!0,hasZoomto:!0,includeLegend:!1}}}},{groupHeading:"Auxilliary Layers",showGroupHeading:!0,includeInLayerList:!0,layers:{"Tennessee Mainstems":{url:serviceBaseURL,visibleLayers:[4],options:{id:"mainstems",opacity:.75,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,zoomScale:144448,hasOpacitySlider:!0,hasZoomto:!0,includeLegend:!0}},"Tennessee Streams":{url:serviceBaseURL,visibleLayers:[5],options:{id:"streams",visible:!1,opacity:.6},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,hasOpacitySlider:!0,hasZoomto:!0,includeLegend:!1}}}}]});var serviceBaseURL="http://gis.wim.usgs.gov/arcgis/rest/services/SparrowTennessee/SparrowTennesseeDev/MapServer/",Group3=[{field:"dl1_g3_tot",name:"Group Aggregate Load delivered to donwstream boundary",chartOutfields:[{attribute:"GRP_3_NAM",label:"HUC10 name"},{attribute:"dl1_g3_sc1",label:"Wastewater load from HUC10 delivered to downstream boundary (lb/yr)"},{attribute:"dl1_g3_sc2",label:"Urban-land load from HUC10 delivered to downstream boundary (lb/yr)"},{attribute:"dl1_g3_sc3",label:"Soil-parent-rock load from HUC10 delivered to downstream boundary (lb/yr)"},{attribute:"dl1_g3_sc4",label:"Mined-land load from HUC10 delivered to downstream boundary (lb/yr)"},{attribute:"dl1_g3_sc5",label:"Manure load from HUC10 delivered to downstream boundary (lb/yr)"},{attribute:"dl1_g3_sc6",label:"Agricultural-land load from HUC10 delivered to downstream boundary (lb/yr)"}]},{field:"dy1_g3_tot",name:"Group Aggregate Yield delivered to donwstream boundary",chartOutfields:[{attribute:"GRP_3_NAM",label:"HUC10 name"},{attribute:"dy1_g3_sc1",label:"Wastewater yield from HUC10 delivered to downstream boundary (lb/yr/mi2)"},{attribute:"dy1_g3_sc2",label:"Urban-land yield from HUC10 delivered to downstream boundary (lb/yr/mi2)"},{attribute:"dy1_g3_sc3",label:"Soil-parent-rock yield from HUC10 delivered to downstream boundary (lb/yr/mi2)"},{attribute:"dy1_g3_sc4",label:"Mined-land yield from HUC10 delivered to downstream boundary (lb/yr/mi2)"},{attribute:"dy1_g3_sc5",label:"Manure yield from HUC10 delivered to downstream boundary (lb/yr/mi2)"},{attribute:"dy1_g3_sc6",label:"Agricultural-land yield from HUC10 delivered to downstream boundary (lb/yr/mi2)"}]},{field:"dl3_g3_tot",name:"Group Aggregate Load delivered to Group’s outlet",chartOutfields:[{attribute:"GRP_3_NAM",label:"HUC10 name"},{attribute:"dl3_g3_sc1",label:"Wastewater load from HUC8 delivered to HUC8 outlet (lb/yr)"},{attribute:"dl3_g3_sc2",label:"Urban-land load from HUC8 delivered to HUC8 outlet (lb/yr)"},{attribute:"dl3_g3_sc3",label:"Soil-parent-rock load from HUC8 delivered to HUC8 outlet (lb/yr)"},{attribute:"dl3_g3_sc4",label:"Mined-land load from HUC8 delivered to HUC8 outlet (lb/yr)"},{attribute:"dl3_g3_sc5",label:"Manure load from HUC8 delivered to HUC8 outlet (lb/yr)"},{attribute:"dl3_g3_sc6",label:"Agricultural-land load from HUC8 delivered to HUC8 outlet (lb/yr)"}]},{field:"dy3_g3_tot",name:"Group Aggregate Yield delivered to Group’s outlet",chartOutfields:[{attribute:"GRP_3_NAM",label:"HUC10 name"},{attribute:"dy3_g3_sc1",label:"Wastewater yield from HUC10 delivered to HUC10 outlet (lb/yr/mi2)"},{attribute:"dy3_g3_sc2",label:"Urban-land yield from HUC10 delivered to HUC10 outlet (lb/yr/mi2)"},{attribute:"dy3_g3_sc3",label:"Soil-parent-rock yield from HUC10 delivered to HUC10 outlet (lb/yr/mi2)"},{attribute:"dy3_g3_sc4",label:"Mined-land yield from HUC10 delivered to HUC10 outlet (lb/yr/mi2)"},{attribute:"dy3_g3_sc5",label:"Manure yield from HUC10 delivered to HUC10 outlet (lb/yr/mi2)"},{attribute:"dy3_g3_sc6",label:"Agricultural-land yield from HUC10 delivered to HUC10 outlet (lb/yr/mi2)"}]},{field:"al_g3_tot",name:"Accumulated Load at Group’s outlet",chartOutfields:[{attribute:"GRP_3_NAM",label:"HUC10 name"},{attribute:"al_g3_sc1",label:"Accumulated wastewater load at HUC10 outlet (lb/yr)"},{attribute:"al_g3_sc2",label:"Accumulated urban-land load at HUC10 outlet (lb/yr)"},{attribute:"al_g3_sc3",label:"Accumulated soil-parent-rock load at HUC10 outlet (lb/yr)"},{attribute:"al_g3_sc4",label:"Accumulated mined-land load at HUC10 outlet (lb/yr)"},{attribute:"al_g3_sc5",label:"Accumulated manure load at HUC10 outlet (lb/yr)"},{attribute:"al_g3_sc6",label:"Accumulated agricultural-land load at HUC10 outlet (lb/yr)"}]},{field:"ay_g3_tot",name:"Accumulated Yield at Group’s outlet",chartOutfields:[{attribute:"GRP_3_NAM",label:"HUC10 name"},{attribute:"ay_g3_sc1",label:"Accumulated wastewater yield at HUC10 outlet (lb/yr/mi2)"},{attribute:"ay_g3_sc2",label:"Accumulated urban-land yield at HUC10 outlet (lb/yr/mi2)"},{attribute:"ay_g3_sc3",label:"Accumulated soil-parent-rock yield at HUC10 outlet (lb/yr/mi2)"},{attribute:"ay_g3_sc4",label:"Accumulated mined-land yield at HUC10 outlet (lb/yr/mi2)"},{attribute:"ay_g3_sc5",label:"Accumulated manure yield at HUC10 outlet (lb/yr/mi2)"},{attribute:"ay_g3_sc6",label:"Accumulated agricultural-land yield at HUC10 outlet (lb/yr/mi2)"}]}],Group2=[{field:"dl1_g2_tot",name:"Group Aggregate Load delivered to donwstream boundary",chartOutfields:[{attribute:"GRP_2_NAM",label:"HUC8 name"},{attribute:"dl1_g2_sc1",label:"Wastewater load from HUC8 delivered to downstream boundary (lb/yr)"},{attribute:"dl1_g2_sc2",label:"Urban-land load from HUC8 delivered to downstream boundary (lb/yr)"},{attribute:"dl1_g2_sc3",label:"Soil-parent-rock load from HUC8 delivered to downstream boundary (lb/yr)"},{attribute:"dl1_g2_sc4",label:"Mined-land load from HUC8 delivered to downstream boundary (lb/yr)"},{attribute:"dl1_g2_sc5",label:"Manure load from HUC8 delivered to downstream boundary (lb/yr)"},{attribute:"dl1_g2_sc6",label:"Agricultural-land load from HUC8 delivered to downstream boundary (lb/yr)"}]},{field:"dy1_g2_tot",name:"Group Aggregate Yield delivered to donwstream boundary",chartOutfields:[{attribute:"GRP_2_NAM",label:"HUC8 name"},{attribute:"dy1_g2_sc1",label:"Wastewater yield from HUC8 delivered to downstream boundary (lb/yr/mi2)"},{attribute:"dy1_g2_sc2",label:"Urban-land yield from HUC8 delivered to downstream boundary (lb/yr/mi2)"},{attribute:"dy1_g2_sc3",label:"Soil-parent-rock yield from HUC8 delivered to downstream boundary (lb/yr/mi2)"},{attribute:"dy1_g2_sc4",label:"Mined-land yield from HUC8 delivered to downstream boundary (lb/yr/mi2)"},{attribute:"dy1_g2_sc5",label:"Manure yield from HUC8 delivered to downstream boundary (lb/yr/mi2)"},{attribute:"dy1_g2_sc6",label:"Agricultural-land yield from HUC8 delivered to downstream boundary (lb/yr/mi2)"}]},{field:"dl2_g2_tot",name:"Group Aggregate Load delivered to Group’s outlet",chartOutfields:[{attribute:"GRP_2_NAM",label:"HUC8 name"},{attribute:"dl2_g2_sc1",label:"Wastewater load from HUC8 delivered to HUC8 outlet (lb/yr)"},{attribute:"dl1_g2_sc2",label:"Urban-land load from HUC8 delivered to HUC8 outlet (lb/yr)"},{attribute:"dl1_g2_sc3",label:"Soil-parent-rock load from HUC8 delivered to HUC8 outlet (lb/yr)"},{attribute:"dl1_g2_sc4",label:"Mined-land load from HUC8 delivered to HUC8 outlet (lb/yr)"},{attribute:"dl1_g2_sc5",label:"Manure load from HUC8 delivered to HUC8 outlet (lb/yr)"},{attribute:"dl1_g2_sc6",label:"Agricultural-land load from HUC8 delivered to HUC8 outlet (lb/yr)"}]},{field:"dy2_g2_tot",name:"Group Aggregate Yield delivered to Group’s outlet",chartOutfields:[{attribute:"GRP_2_NAM",label:"HUC8 name"},{attribute:"dy2_g2_sc1",label:"Wastewater yield from HUC8 delivered to HUC8 outlet (lb/yr/mi2)"},{attribute:"dy2_g2_sc2",label:"Urban-land yield from HUC8 delivered to HUC8 outlet (lb/yr/mi2)"},{attribute:"dy2_g2_sc3",label:"Soil-parent-rock yield from HUC8 delivered to HUC8 outlet (lb/yr/mi2)"},{attribute:"dy2_g2_sc4",label:"Mined-land yield from HUC8 delivered to HUC8 outlet (lb/yr/mi2)"},{attribute:"dy2_g2_sc5",label:"Manure yield from HUC8 delivered to HUC8 outlet (lb/yr/mi2)"},{attribute:"dy2_g2_sc6",label:"Agricultural-land yield from HUC8 delivered to HUC8 outlet (lb/yr/mi2)"}]}],Group1=[{field:"dl1_g1_tot",name:"Group Aggregate Load delivered to donwstream boundary",chartOutfields:[{attribute:"GRP_1_NAM",label:"Independent Watershed name"},{attribute:"dl1_g1_sc1",label:"Wastewater load from independent watershed delivered to downstream boundary (lb/yr)"},{attribute:"dl1_g1_sc2",label:"Urban-land load from independent watershed delivered to downstream boundary (lb/yr)"},{attribute:"dl1_g1_sc3",label:"Soil-parent-rock load from independent watershed delivered to downstream boundary (lb/yr)"},{attribute:"dl1_g1_sc4",label:"Mined-land load from independent watershed delivered to downstream boundary (lb/yr)"},{attribute:"dl1_g1_sc5",label:"Manure load from independent watershed delivered to downstream boundary (lb/yr)"},{attribute:"dl1_g1_sc6",label:"Agricultural-land load from independent watershed delivered to downstream boundary (lb/yr)"}]},{field:"dy1_g1_tot",name:"Group Aggregate Yield delivered to donwstream boundary",chartOutfields:[{attribute:"GRP_1_NAM",label:"Independent Watershed name"},{attribute:"dy1_g1_sc1",label:"Wastewater yield from independent watershed delivered to downstream boundary (lb/yr/mi2)"},{attribute:"dy1_g1_sc2",label:"Urban-land yield from independent watershed delivered to downstream boundary (lb/yr/mi2)"},{attribute:"dy1_g1_sc3",label:"Soil-parent-rock yield from independent watershed delivered to downstream boundary (lb/yr/mi2)"},{attribute:"dy1_g1_sc4",label:"Mined-land yield from independent watershed delivered to downstream boundary (lb/yr/mi2)"},{attribute:"dy1_g1_sc5",label:"Manure yield from independent watershed delivered to downstream boundary (lb/yr/mi2)"},{attribute:"dy1_g1_sc6",label:"Agricultural-land yield from independent watershed delivered to downstream boundary (lb/yr/mi2)"}]}],ST=[{field:"dl1_ST_tot",name:"State Aggregate Load delivered to downstream boundary",chartOutfields:[{attribute:"ST",label:"State"},{attribute:"dl1_ST_sc1",label:"Wastewater load from State delivered to downstream boundary (lb/yr)"},{attribute:"dl1_ST_sc2",label:"Urban-land load from State delivered to downstream boundary (lb/yr)"},{attribute:"dl1_ST_sc3",label:"Soil-parent-rock load from State delivered to downstream boundary (lb/yr)"},{attribute:"dl1_ST_sc4",label:"Mined-land load from State delivered to downstream boundary (lb/yr)"},{attribute:"dl1_ST_sc5",label:"Manure load from State delivered to downstream boundary (lb/yr)"},{attribute:"dl1_ST_sc6",label:"Agricultural-land load from State delivered to downstream boundary (lb/yr)"}]},{field:"dy1_ST_tot",name:"State Aggregate Yield delivered to downstream boundary",chartOutfields:[{attribute:"ST",label:"State"},{attribute:"dy1_ST_sc1",label:"Wastewater yield from State delivered to downstream boundary (lb/yr/mi2)"},{attribute:"dy1_ST_sc2",label:"Urban-land yield from State delivered to downstream boundary (lb/yr/mi2)"},{attribute:"dy1_ST_sc3",label:"Soil-parent-rock yield from State delivered to downstream boundary (lb/yr/mi2)"},{attribute:"dy1_ST_sc4",label:"Mined-land yield from State delivered to downstream boundary (lb/yr/mi2)"},{attribute:"dy1_ST_sc5",label:"Manure yield from State delivered to downstream boundary (lb/yr/mi2)"},{attribute:"dy1_ST_sc6",label:"Agricultural-land yield from State delivered to downstream boundary (lb/yr/mi2)"}]},{field:"I_ST_tot",name:"State Aggregate Load",chartOutfields:[{attribute:"ST",label:"State"},{attribute:"l_ST_sc1",label:"Wastewater load from State within model area (lb/yr)"},{attribute:"l_ST_sc2",label:"Urban-land load from State within model area (lb/yr)"},{attribute:"l_ST_sc3",label:"Soil-parent-rock load from State within model area (lb/yr)"},{attribute:"l_ST_sc4",label:"Mined-land load from State within model area (lb/yr)"},{attribute:"l_ST_sc5",label:"Manure load from State within model area (lb/yr)"},{attribute:"l_ST_sc6",label:"Agricultural-land load from State within model area (lb/yr)"}]},{field:"y_ST_tot",name:"State Aggregate Yield",chartOutfields:[{attribute:"ST",label:"State"},{attribute:"y_ST_sc1",label:"Wastewater yield from State within model area (lb/yr/mi2)"},{attribute:"y_ST_sc2",label:"Urban-land yield from State within model area (lb/yr/mi2)"},{attribute:"y_ST_sc3",label:"Soil-parent-rock yield from State within model area (lb/yr/mi2)"},{attribute:"y_ST_sc4",label:"Mined-land yield from State within model area (lb/yr/mi2)"},{attribute:"y_ST_sc5",label:"Manure yield from State within model area (lb/yr/mi2)"},{attribute:"y_ST_sc6",label:"Agricultural-land yield from State within model area (lb/yr/mi2)"}]}],queryParameters={grp3:{idField:"GRP_3_NUM",nameField:"GRP_3_NAM",alias:"HUC10",serviceId:0,AOISelect:!1},grp2:{idField:"GRP_2_NUM",nameField:"GRP_2_NAM",alias:"HUC8",serviceId:1,AOISelect:!0},grp1:{idField:"GRP_1_NUM",nameField:"GRP_1_NAM",alias:"Independent Watershed",serviceId:2,AOISelect:!0},st:{idField:"ST",nameField:"ST",alias:"State",serviceId:3,AOISelect:!0}};$(".selectpicker").selectpicker();var map,allLayers,maxLegendHeight,maxLegendDivHeight,dragInfoWindows=!0,defaultMapCenter=[-86,36],queryParametersLength=Object.getOwnPropertyNames(queryParameters).length;require(["esri/arcgis/utils","esri/map","esri/tasks/QueryTask","esri/tasks/query","esri/dijit/HomeButton","esri/dijit/LocateButton","esri/layers/ArcGISTiledMapServiceLayer","esri/dijit/Geocoder","esri/dijit/PopupTemplate","esri/graphic","esri/geometry/Multipoint","esri/geometry/Point","esri/symbols/PictureMarkerSymbol","esri/geometry/webMercatorUtils","dojo/dnd/Moveable","dojo/query","dojo/dom","dojo/dom-class","dojo/on","dojo/domReady!"],function(e,t,a,l,r,i,o,d,n,s,c,u,b,p,m,y,g,h,f){function v(e,t,a){var l;l=new esri.tasks.QueryTask(e);var r=new esri.tasks.Query;r.returnGeometry=!1,r.outFields=t,r.where=a,l.execute(r,_)}function _(e){switch(e.displayFieldName){case queryParameters.grp3.nameField:console.log("Currently no AOI for Group 3");break;case queryParameters.grp2.nameField:$.each(e.features,function(e,t){$("#grp2-select").append(new Option(t.attributes.GRP_2_NAM,t.attributes.GRP_2_NUM)),$("#grp2-select").selectpicker("refresh")});break;case queryParameters.grp1.nameField:$.each(e.features,function(e,t){$("#grp1-select").append(new Option(t.attributes.GRP_1_NAM,t.attributes.GRP_1_NUM)),$("#grp1-select").selectpicker("refresh")});break;case queryParameters.st.nameField:$.each(e.features,function(e,t){$("#st-select").append(new Option(t.attributes.ST,t.attributes.ST)),$("#st-select").selectpicker("refresh")})}}function w(){1===g.byId("chkExtent").checked?O.activeGeocoder.searchExtent=map.extent:O.activeGeocoder.searchExtent=null}function S(){w();var e=O.find();e.then(function(e){H(e)}),$("#geosearchModal").modal("hide")}function C(e){U();var t=e.graphic?e.graphic:e.result.feature;t.setSymbol(G)}function H(e){if(e=e.results,e.length>0){U();for(var t=0;t<e.length;t++);var a=new u(e[0].feature.geometry);map.centerAndZoom(a,17)}}function U(){map.infoWindow.hide(),map.graphics.clear()}function k(e,t,a,l,r){return new b({angle:0,xoffset:t,yoffset:a,type:"esriPMS",url:e,contentType:"image/png",width:l,height:r})}function L(){$("#chartContainer").empty(),console.log("creating chart query");var e,t=map.getLayer("SparrowRanking").visibleLayers[0],a=serviceBaseURL+t;e=new esri.tasks.QueryTask(a);var l=getChartOutfields(t),r=[];$.each(l,function(e,t){r.push(t.attribute)});var i=new esri.tasks.Query;i.returnGeometry=!1,i.outFields=r,i.where="1=1",e.execute(i,showChart)}$("#groupResultsSelect").on("loaded.bs.select",function(){addMetricOptions($("#groupResultsSelect")[0].selectedIndex)}),$("#groupResultsSelect").on("changed.bs.select",function(e){addMetricOptions(e.currentTarget.selectedIndex),console.log($("#radio")),checkSelectedAggregateGroup(e.currentTarget.selectedIndex,$(".radio input[type='radio']:checked")[0].id)}),$(".clearAOI").on("click",function(){var e="#"+this.classList[1];$(e).selectpicker("deselectAll")}),map=t("mapDiv",{basemap:"gray",center:defaultMapCenter,zoom:7});for(var M in queryParameters)v(serviceBaseURL+queryParameters[M].serviceId,[queryParameters[M].namefield],"1=1");var x=new r({map:map},"homeButton");x.startup();var T=new i({map:map},"locateButton");T.startup(),$(window).resize(function(){$("#legendCollapse").hasClass("in")?(maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("height",maxLegendHeight),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)):$("#legendElement").css("height","initial")}),f(map,"load",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e);var t=p.webMercatorToGeographic(map.extent.getCenter());if($("#latitude").html(t.y.toFixed(3)),$("#longitude").html(t.x.toFixed(3)),1==dragInfoWindows){var a=y(".title",map.infoWindow.domNode)[0],l=new m(map.infoWindow.domNode,{handle:a});f(l,"FirstMove",function(){var e=y(".outerPointer",map.infoWindow.domNode)[0];h.add(e,"hidden");var e=y(".pointer",map.infoWindow.domNode)[0];h.add(e,"hidden")}.bind(this))}}),f(map,"zoom-end",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e)}),f(map,"mouse-move",function(e){if($("#mapCenterLabel").css("display","none"),null!=e.mapPoint){var t=p.webMercatorToGeographic(e.mapPoint);$("#latitude").html(t.y.toFixed(3)),$("#longitude").html(t.x.toFixed(3))}}),f(map,"pan-end",function(){$("#mapCenterLabel").css("display","inline");var e=p.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(e.y.toFixed(3)),$("#longitude").html(e.x.toFixed(3))});var A=new o("http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer");f(g.byId("btnStreets"),"click",function(){map.setBasemap("streets"),map.removeLayer(A)}),f(g.byId("btnSatellite"),"click",function(){map.setBasemap("satellite"),map.removeLayer(A)}),f(g.byId("btnHybrid"),"click",function(){map.setBasemap("hybrid"),map.removeLayer(A)}),f(g.byId("btnTerrain"),"click",function(){map.setBasemap("terrain"),map.removeLayer(A)}),f(g.byId("btnGray"),"click",function(){map.setBasemap("gray"),map.removeLayer(A)}),f(g.byId("btnNatGeo"),"click",function(){map.setBasemap("national-geographic"),map.removeLayer(A)}),f(g.byId("btnOSM"),"click",function(){map.setBasemap("osm"),map.removeLayer(A)}),f(g.byId("btnTopo"),"click",function(){map.setBasemap("topo"),map.removeLayer(A)}),f(g.byId("btnNatlMap"),"click",function(){map.addLayer(A)}),f(map,"click",function(e){var t=new s,a=t,l=new esri.InfoTemplate("test popup","attributes and stuff go here");a.setInfoTemplate(l),map.infoWindow.setFeatures([a]),map.infoWindow.show(e.mapPoint),map.infoWindow.show()});var O=new d({value:"",maxLocations:25,autoComplete:!0,arcgisGeocoder:!0,autoNavigate:!1,map:map},"geosearch");O.startup(),O.on("select",C),O.on("findResults",H),O.on("clear",U),f(O.inputNode,"keydown",function(e){13==e.keyCode&&w()});var G=k("../images/purple-pin.png",0,12,13,24);map.on("load",function(){map.infoWindow.set("highlight",!1),map.infoWindow.set("titleInBody",!1)}),f(g.byId("btnGeosearch"),"click",S),$(document).ready(function(){function e(){$("#geosearchModal").modal("show")}function t(){$("#aboutModal").modal("show")}$("#geosearchNav").click(function(){e()}),$("#aboutNav").click(function(){t()}),$("#html").niceScroll(),$("#sidebar").niceScroll(),$("#sidebar").scroll(function(){$("#sidebar").getNiceScroll().resize()}),$("#legendDiv").niceScroll(),maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("max-height",maxLegendHeight),$("#legendCollapse").on("shown.bs.collapse",function(){maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)}),$("#legendCollapse").on("hide.bs.collapse",function(){$("#legendElement").css("height","initial")}),$(".radio").on("change",function(e){var t=$("#groupResultsSelect")[0].selectedIndex,a=this.firstElementChild.id;checkSelectedAggregateGroup(t,a)}),$(".nonAOISelect").on("change",function(){0==$("#groupResultsSelect")[0].selectedIndex&&(4==$("#displayedMetricSelect")[0].selectedIndex||5==$("#displayedMetricSelect")[0].selectedIndex)?$("#chartButton").addClass("disabled"):$("#chartButton").removeClass("disabled")}),$("#chartButton").on("click",L)}),require(["esri/dijit/Legend","esri/tasks/locator","esri/tasks/query","esri/tasks/QueryTask","esri/graphicsUtils","esri/geometry/Point","esri/geometry/Extent","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/FeatureLayer","esri/SpatialReference","esri/layers/WMSLayer","esri/layers/WMSLayerInfo","dijit/form/CheckBox","dijit/form/RadioButton","dojo/query","dojo/dom","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/on"],function(e,t,a,l,r,i,o,d,n,s,c,u,b,p,m,y,g,h,f,v){function _(e,t,a,l,r,o,d){if(map.addLayer(a),S.push([r,camelize(l),a]),r){if(!$("#"+camelize(r)).length){var n=$('<div id="'+camelize(r+" Root")+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+r+"</button> </div>");n.click(function(e){n.find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$.each(S,function(e,t){var a=map.getLayer(t[2].id);if(t[0]==r)if($("#"+t[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&n.find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",t[1]),map.addLayer(t[2]);var a=map.getLayer(t[2].id);a.setVisibility(!0)}else n.find("i.glyphspan").hasClass("fa-square-o")&&(console.log("removing layer: ",t[1]),map.removeLayer(t[2]))})});var c=$('<div id="'+camelize(r)+'" class="btn-group-vertical" data-toggle="buttons"></div');$("#toggle").append(c)}if(a.visible)var u=$('<div id="'+camelize(l)+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(r)+'" autocomplete="off"><i class="glyphspan fa fa-dot-circle-o '+camelize(r)+'"></i>&nbsp;&nbsp;'+l+"</label> </div>");else var u=$('<div id="'+camelize(l)+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(r)+'" autocomplete="off"><i class="glyphspan fa fa-circle-o '+camelize(r)+'"></i>&nbsp;&nbsp;'+l+"</label> </div>");$("#"+camelize(r)).append(u),u.click(function(e){if($(this).find("i.glyphspan").hasClass("fa-circle-o")){$(this).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o");var t=$(this)[0].id;$.each(S,function(e,a){if(a[0]==r)if(a[1]==t&&$("#"+camelize(r+" Root")).find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",a[1]),map.addLayer(a[2]);var l=map.getLayer(a[2].id);l.setVisibility(!0)}else a[1]==t&&$("#"+camelize(r+" Root")).find("i.glyphspan").hasClass("fa-square-o")?console.log("groud heading not checked"):(console.log("removing layer: ",a[1]),map.removeLayer(a[2]),$("#"+a[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&$("#"+a[1]).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o"),$("#"+camelize(this[1])).toggle())})}})}else{if(a.visible&&void 0!==d.hasOpacitySlider&&1==d.hasOpacitySlider&&void 0!==d.hasZoomto&&1==d.hasZoomto)var u=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+a.id+'"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+l+'<span id="opacity'+camelize(l)+'" class="glyphspan glyphicon glyphicon-adjust pull-right opacity"></span><span class="glyphicon glyphicon-search pull-right zoomto"></span></button></div>');else if(a.visible||void 0===d.hasOpacitySlider||1!=d.hasOpacitySlider||void 0===d.hasZoomto||1!=d.hasZoomto)if(a.visible&&void 0!==d.hasOpacitySlider&&1==d.hasOpacitySlider)var u=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+a.id+'"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+l+'<span id="opacity'+camelize(l)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></div>');else if(a.visible||void 0===d.hasOpacitySlider||1!=d.hasOpacitySlider)if(a.visible&&0==d.hasOpacitySlider&&void 0!==d.hasZoomto&&1==d.hasZoomto)var u=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+a.id+'"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+l+'<span class="glyphicon glyphicon-search pull-right zoomto"></span></button></span></div>');else if(a.visible||0!=d.hasOpacitySlider||void 0===d.hasZoomto||1!=d.hasZoomto)if(a.visible)var u=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+a.id+'"type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+l+"</button></span></div>");else var u=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+a.id+'"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+l+"</button> </div>");else var u=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+a.id+'"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+l+'<span class="glyphicon glyphicon-search pull-right zoomto"></span></button></span></div>');else var u=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+a.id+'"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+l+'<span id="opacity'+camelize(l)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></div>');else var u=$('<div class="btn-group-vertical lyrTogDiv" style="cursor: pointer;" data-toggle="buttons"> <button id="'+a.id+'"type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+l+'<span id="opacity'+camelize(l)+'" class="glyphspan glyphicon glyphicon-adjust pull-right opacity"></span><span class="glyphicon glyphicon-search pull-right zoomto"></span></button></div>');u.click(function(e){$(this).find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$(this).find("button").button("toggle"),e.preventDefault(),e.stopPropagation(),$("#"+camelize(l)).toggle(),a.visible?a.setVisibility(!1):a.setVisibility(!0)})}if(t){var b=camelize(e);if(!$("#"+b).length){var p=$('<div id="'+b+'"><div class="alert alert-info" role="alert"><strong>'+e+"</strong></div></div>");$("#toggle").append(p)}r?($("#"+b).append(n),$("#"+b).append(c)):($("#"+b).append(u),
$("#opacity"+camelize(l)).length>0&&$("#opacity"+camelize(l)).hover(function(){$(".opacitySlider").remove();var e=map.getLayer(o.id).opacity,t=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+e+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(t),$("#slider")[0].value=100*e,$(".opacitySlider").css("left",event.clientX-180),$(".opacitySlider").css("top",event.clientY-50),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),$("#slider").change(function(e){var t=$("#slider")[0].value/100;console.log("o: "+t),$("#opacityValue").html("Opacity: "+t),map.getLayer(o.id).setOpacity(t)})}),$(".zoomto").hover(function(e){$(".zoomDialog").remove();var t=this.parentNode.id,a=$('<div class="zoomDialog"><label class="zoomClose pull-right">X</label><br><div class="list-group"><a href="#" id="zoomscale" class="list-group-item lgi-zoom zoomscale">Zoom to scale</a> <a id="zoomcenter" href="#" class="list-group-item lgi-zoom zoomcenter">Zoom to center</a><a id="zoomextent" href="#" class="list-group-item lgi-zoom zoomextent">Zoom to extent</a></div></div>');$("body").append(a),$(".zoomDialog").css("left",event.clientX-80),$(".zoomDialog").css("top",event.clientY-5),$(".zoomDialog").mouseleave(function(){$(".zoomDialog").remove()}),$(".zoomClose").click(function(){$(".zoomDialog").remove()}),$("#zoomscale").click(function(e){var a=map.getLayer(t).minScale;map.setScale(a)}),$("#zoomcenter").click(function(e){var t=new i(defaultMapCenter,new s({wkid:4326}));map.centerAt(t)}),$("#zoomextent").click(function(e){var a=map.getLayer(t).fullExtent;map.setExtent(a)})}))}else $("#toggle").append(u)}var w=[],S=[];$.each(allLayers,function(e,t){console.log("processing: ",t.groupHeading),$.each(t.layers,function(e,a){var l="";if(a.wimOptions.exclusiveGroupName&&(l=a.wimOptions.exclusiveGroupName),"agisFeature"===a.wimOptions.layerType){var r=new n(a.url,a.options);a.wimOptions&&1==a.wimOptions.includeLegend&&w.push({layer:r,title:e}),_(t.groupHeading,t.showGroupHeading,r,e,l,a.options,a.wimOptions)}else if("agisWMS"===a.wimOptions.layerType){var r=new c(a.url,{resourceInfo:a.options.resourceInfo,visibleLayers:a.options.visibleLayers},a.options);a.wimOptions&&1==a.wimOptions.includeLegend&&w.push({layer:r,title:e}),_(t.groupHeading,t.showGroupHeading,r,e,l,a.options,a.wimOptions)}else if("agisDynamic"===a.wimOptions.layerType){var r=new d(a.url,a.options);a.wimOptions&&1==a.wimOptions.includeLegend&&w.push({layer:r,title:e}),a.visibleLayers&&r.setVisibleLayers(a.visibleLayers),_(t.groupHeading,t.showGroupHeading,r,e,l,a.options,a.wimOptions)}})});var C=new e({map:map,layerInfos:w},"legendDiv");C.startup()})}),$(document).ready(function(){});