var serviceBaseURL = "http://gis.wim.usgs.gov/arcgis/rest/services/SparrowTennessee/SparrowTennesseeDev/MapServer/";
var chartUnits = " (lb./yr.)"


//HUC10 Metric choices, service Id 0
var Group3 = [

	{
        field: "dl1_g3_tot", 
        name: "Group Aggregate Load delivered to donwstream boundary", 
        chartOutfields: [
            { attribute: "GRP_3_NAM", label: "HUC10 name"}, 
            { attribute: "dl1_g3_sc1", label: "Wastewater load from HUC10 delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_g3_sc2", label: "Urban-land load from HUC10 delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_g3_sc3", label: "Soil-parent-rock load from HUC10 delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_g3_sc4", label: "Mined-land load from HUC10 delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_g3_sc5", label: "Manure load from HUC10 delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_g3_sc6", label: "Agricultural-land load from HUC10 delivered to downstream boundary (lb/yr)"}
        ]
    },
	{
        field: "dy1_g3_tot", 
        name: "Group Aggregate Yield delivered to donwstream boundary", 
        chartOutfields: [
            { attribute: "GRP_3_NAM", label: "HUC10 name"}, 
            { attribute: "dy1_g3_sc1", label: "Wastewater yield from HUC10 delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_g3_sc2", label: "Urban-land yield from HUC10 delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_g3_sc3", label: "Soil-parent-rock yield from HUC10 delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_g3_sc4", label: "Mined-land yield from HUC10 delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_g3_sc5", label: "Manure yield from HUC10 delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_g3_sc6", label: "Agricultural-land yield from HUC10 delivered to downstream boundary (lb/yr/mi2)"}
        ]
    },
	{
        field: "dl3_g3_tot", 
        name: "Group Aggregate Load delivered to Group’s outlet", 
        chartOutfields: [
            { attribute: "GRP_3_NAM", label: "HUC10 name"}, 
            { attribute: "dl3_g3_sc1", label: "Wastewater load from HUC8 delivered to HUC8 outlet (lb/yr)"},
            { attribute: "dl3_g3_sc2", label: "Urban-land load from HUC8 delivered to HUC8 outlet (lb/yr)"},
            { attribute: "dl3_g3_sc3", label: "Soil-parent-rock load from HUC8 delivered to HUC8 outlet (lb/yr)"},
            { attribute: "dl3_g3_sc4", label: "Mined-land load from HUC8 delivered to HUC8 outlet (lb/yr)"},
            { attribute: "dl3_g3_sc5", label: "Manure load from HUC8 delivered to HUC8 outlet (lb/yr)"},
            { attribute: "dl3_g3_sc6", label: "Agricultural-land load from HUC8 delivered to HUC8 outlet (lb/yr)"}
        ]
    },
	{
        field: "dy3_g3_tot", 
        name: "Group Aggregate Yield delivered to Group’s outlet", 
        chartOutfields: [
            { attribute: "GRP_3_NAM", label: "HUC10 name"}, 
            { attribute: "dy3_g3_sc1", label: "Wastewater yield from HUC10 delivered to HUC10 outlet (lb/yr/mi2)"},
            { attribute: "dy3_g3_sc2", label: "Urban-land yield from HUC10 delivered to HUC10 outlet (lb/yr/mi2)"},
            { attribute: "dy3_g3_sc3", label: "Soil-parent-rock yield from HUC10 delivered to HUC10 outlet (lb/yr/mi2)"},
            { attribute: "dy3_g3_sc4", label: "Mined-land yield from HUC10 delivered to HUC10 outlet (lb/yr/mi2)"},
            { attribute: "dy3_g3_sc5", label: "Manure yield from HUC10 delivered to HUC10 outlet (lb/yr/mi2)"},
            { attribute: "dy3_g3_sc6", label: "Agricultural-land yield from HUC10 delivered to HUC10 outlet (lb/yr/mi2)"}
        ]
    },
	{
        field: "al_g3_tot", 
        name: "Accumulated Load at Group’s outlet", 
        chartOutfields: [
            { attribute: "GRP_3_NAM", label: "HUC10 name"}, 
            { attribute: "al_g3_sc1", label: "Accumulated wastewater load at HUC10 outlet (lb/yr)"},
            { attribute: "al_g3_sc2", label: "Accumulated urban-land load at HUC10 outlet (lb/yr)"},
            { attribute: "al_g3_sc3", label: "Accumulated soil-parent-rock load at HUC10 outlet (lb/yr)"},
            { attribute: "al_g3_sc4", label: "Accumulated mined-land load at HUC10 outlet (lb/yr)"},
            { attribute: "al_g3_sc5", label: "Accumulated manure load at HUC10 outlet (lb/yr)"},
            { attribute: "al_g3_sc6", label: "Accumulated agricultural-land load at HUC10 outlet (lb/yr)"}
        ]
    },
	{
        field: "ay_g3_tot", 
        name: "Accumulated Yield at Group’s outlet", 
        chartOutfields: [
        { attribute: "GRP_3_NAM", label: "HUC10 name"}, 
            { attribute: "ay_g3_sc1", label: "Accumulated wastewater yield at HUC10 outlet (lb/yr/mi2)"},
            { attribute: "ay_g3_sc2", label: "Accumulated urban-land yield at HUC10 outlet (lb/yr/mi2)"},
            { attribute: "ay_g3_sc3", label: "Accumulated soil-parent-rock yield at HUC10 outlet (lb/yr/mi2)"},
            { attribute: "ay_g3_sc4", label: "Accumulated mined-land yield at HUC10 outlet (lb/yr/mi2)"},
            { attribute: "ay_g3_sc5", label: "Accumulated manure yield at HUC10 outlet (lb/yr/mi2)"},
            { attribute: "ay_g3_sc6", label: "Accumulated agricultural-land yield at HUC10 outlet (lb/yr/mi2)"}
        ]
    }

]

//HUC8 Metric choices, Service Id 1
var Group2 = [

	{
        field: "dl1_g2_tot", 
        name: "Group Aggregate Load delivered to donwstream boundary", 
        chartOutfields: [
            { attribute: "GRP_2_NAM", label: "HUC8 name"}, 
            { attribute: "dl1_g2_sc1", label: "Wastewater load from HUC8 delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_g2_sc2", label: "Urban-land load from HUC8 delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_g2_sc3", label: "Soil-parent-rock load from HUC8 delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_g2_sc4", label: "Mined-land load from HUC8 delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_g2_sc5", label: "Manure load from HUC8 delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_g2_sc6", label: "Agricultural-land load from HUC8 delivered to downstream boundary (lb/yr)"}
        ]
    },
	{
        field: "dy1_g2_tot", 
        name: "Group Aggregate Yield delivered to donwstream boundary", 
        chartOutfields: [
            { attribute: "GRP_2_NAM", label: "HUC8 name"}, 
            { attribute: "dy1_g2_sc1", label: "Wastewater yield from HUC8 delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_g2_sc2", label: "Urban-land yield from HUC8 delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_g2_sc3", label: "Soil-parent-rock yield from HUC8 delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_g2_sc4", label: "Mined-land yield from HUC8 delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_g2_sc5", label: "Manure yield from HUC8 delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_g2_sc6", label: "Agricultural-land yield from HUC8 delivered to downstream boundary (lb/yr/mi2)"}
        ]
    },
	{
        field: "dl2_g2_tot", 
        name: "Group Aggregate Load delivered to Group’s outlet", 
        chartOutfields: [
            { attribute: "GRP_2_NAM", label: "HUC8 name"}, 
            { attribute: "dl2_g2_sc1", label: "Wastewater load from HUC8 delivered to HUC8 outlet (lb/yr)"},
            { attribute: "dl1_g2_sc2", label: "Urban-land load from HUC8 delivered to HUC8 outlet (lb/yr)"},
            { attribute: "dl1_g2_sc3", label: "Soil-parent-rock load from HUC8 delivered to HUC8 outlet (lb/yr)"},
            { attribute: "dl1_g2_sc4", label: "Mined-land load from HUC8 delivered to HUC8 outlet (lb/yr)"},
            { attribute: "dl1_g2_sc5", label: "Manure load from HUC8 delivered to HUC8 outlet (lb/yr)"},
            { attribute: "dl1_g2_sc6", label: "Agricultural-land load from HUC8 delivered to HUC8 outlet (lb/yr)"}

        ]
    },
	{
        field: "dy2_g2_tot", 
        name: "Group Aggregate Yield delivered to Group’s outlet", 
        chartOutfields: [
            { attribute: "GRP_2_NAM", label: "HUC8 name"}, 
            { attribute: "dy2_g2_sc1", label: "Wastewater yield from HUC8 delivered to HUC8 outlet (lb/yr/mi2)"},
            { attribute: "dy2_g2_sc2", label: "Urban-land yield from HUC8 delivered to HUC8 outlet (lb/yr/mi2)"},
            { attribute: "dy2_g2_sc3", label: "Soil-parent-rock yield from HUC8 delivered to HUC8 outlet (lb/yr/mi2)"},
            { attribute: "dy2_g2_sc4", label: "Mined-land yield from HUC8 delivered to HUC8 outlet (lb/yr/mi2)"},
            { attribute: "dy2_g2_sc5", label: "Manure yield from HUC8 delivered to HUC8 outlet (lb/yr/mi2)"},
            { attribute: "dy2_g2_sc6", label: "Agricultural-land yield from HUC8 delivered to HUC8 outlet (lb/yr/mi2)"}

        ]
    }

]

//independent watershed Metric choices, Service ID 2
var Group1 = [

	{
        field: "dl1_g1_tot", 
        name: "Group Aggregate Load delivered to donwstream boundary", 
        chartOutfields: [
            { attribute: "GRP_1_NAM", label: "Independent Watershed name"}, 
            { attribute: "dl1_g1_sc1", label: "Wastewater load from independent watershed delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_g1_sc2", label: "Urban-land load from independent watershed delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_g1_sc3", label: "Soil-parent-rock load from independent watershed delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_g1_sc4", label: "Mined-land load from independent watershed delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_g1_sc5", label: "Manure load from independent watershed delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_g1_sc6", label: "Agricultural-land load from independent watershed delivered to downstream boundary (lb/yr)"}
        ]
    },
	{
        field: "dy1_g1_tot", 
        name: "Group Aggregate Yield delivered to donwstream boundary", 
        chartOutfields: [
            { attribute: "GRP_1_NAM", label: "Independent Watershed name"}, 
            { attribute: "dy1_g1_sc1", label: "Wastewater yield from independent watershed delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_g1_sc2", label: "Urban-land yield from independent watershed delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_g1_sc3", label: "Soil-parent-rock yield from independent watershed delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_g1_sc4", label: "Mined-land yield from independent watershed delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_g1_sc5", label: "Manure yield from independent watershed delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_g1_sc6", label: "Agricultural-land yield from independent watershed delivered to downstream boundary (lb/yr/mi2)"}
        ]
    }

]

//state metric choices, Service ID 3
/*var ST = [

	{field: "dl1_ST_tot", name: "State Aggregate Load delivered to downstream boundary", chartOutfields: ["ST", "dl1_ST_sc1", "dl1_ST_sc2", "dl1_ST_sc3", "dl1_ST_sc4", "dl1_ST_sc5", "dl1_ST_sc6"]},
	{field: "dy1_ST_tot", name: "State Aggregate Yield delivered to downstream boundary", chartOutfields: ["ST", "dy1_ST_sc1", "dy1_ST_sc2", "dy1_ST_sc3", "dy1_ST_sc4", "dy1_ST_sc5", "dy1_ST_sc6"]},
	{field: "I_ST_tot", name: "State Aggregate Load", chartOutfields: ["ST", "l_ST_sc1", "l_ST_sc2", "l_ST_sc3", "l_ST_sc4", "l_ST_sc5", "l_ST_sc6"]},
	{field: "y_ST_tot", name: "State Aggregate Yield", chartOutfields: ["ST", "y_ST_sc1", "y_ST_sc2", "y_ST_sc3", "y_ST_sc4", "y_ST_sc5", "y_ST_sc6"]}

]*/

var ST = [

    {
        field: "dl1_ST_tot", 
        name: "State Aggregate Load delivered to downstream boundary", 
        chartOutfields: [
            { attribute: "ST", label: "State"}, 
            { attribute: "dl1_ST_sc1", label: "Wastewater load from State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_ST_sc2", label: "Urban-land load from State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_ST_sc3", label: "Soil-parent-rock load from State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_ST_sc4", label: "Mined-land load from State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_ST_sc5", label: "Manure load from State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_ST_sc6", label: "Agricultural-land load from State delivered to downstream boundary (lb/yr)"}
        ]
    },
    {
        field: "dy1_ST_tot", 
        name: "State Aggregate Yield delivered to downstream boundary", 
        chartOutfields: [
            { attribute: "ST", label: "State"},
            { attribute: "dy1_ST_sc1", label: "Wastewater yield from State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_ST_sc2", label: "Urban-land yield from State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_ST_sc3", label: "Soil-parent-rock yield from State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_ST_sc4", label: "Mined-land yield from State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_ST_sc5", label: "Manure yield from State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_ST_sc6", label: "Agricultural-land yield from State delivered to downstream boundary (lb/yr/mi2)"}
        ]
    },
    {
        field: "I_ST_tot", 
        name: "State Aggregate Load", 
        chartOutfields: [
            { attribute: "ST", label: "State"},
            { attribute: "l_ST_sc1", label: "Wastewater load from State within model area (lb/yr)"},
            { attribute: "l_ST_sc2", label: "Urban-land load from State within model area (lb/yr)"},
            { attribute: "l_ST_sc3", label: "Soil-parent-rock load from State within model area (lb/yr)"},
            { attribute: "l_ST_sc4", label: "Mined-land load from State within model area (lb/yr)"},
            { attribute: "l_ST_sc5", label: "Manure load from State within model area (lb/yr)"},
            { attribute: "l_ST_sc6", label: "Agricultural-land load from State within model area (lb/yr)"}
        ]
    },
    {
        field: "y_ST_tot", 
        name: "State Aggregate Yield", 
        chartOutfields: [
            { attribute: "ST", label: "State"},
            { attribute: "y_ST_sc1", label: "Wastewater yield from State within model area (lb/yr/mi2)"},
            { attribute: "y_ST_sc2", label: "Urban-land yield from State within model area (lb/yr/mi2)"},
            { attribute: "y_ST_sc3", label: "Soil-parent-rock yield from State within model area (lb/yr/mi2)"},
            { attribute: "y_ST_sc4", label: "Mined-land yield from State within model area (lb/yr/mi2)"},
            { attribute: "y_ST_sc5", label: "Manure yield from State within model area (lb/yr/mi2)"},
            { attribute: "y_ST_sc6", label: "Agricultural-land yield from State within model area (lb/yr/mi2)"}
        ]
    }

]


var queryParameters = {
    grp3: {idField: "GRP_3_NUM",
        nameField: "GRP_3_NAM",
        alias: "HUC10",
        serviceId: 0,
        AOISelect: false
    },
    grp2: {idField: "GRP_2_NUM",
        nameField: "GRP_2_NAM",
        alias: "HUC8",
        serviceId: 1,
        AOISelect: true

    },
    grp1: {idField: "GRP_1_NUM",
        nameField: "GRP_1_NAM",
        alias: "Independent Watershed",
        serviceId: 2,
        AOISelect: true
    },
    st: {idField: "ST",
        nameField: "ST",
        alias: "State",
        serviceId: 3,
        AOISelect: true
    }
} 

//defaultSparrowLayer = "st";

function getChartOutfields(sparrowLayerId){
    var chartFieldsArr = [];
    var chartLabelsArr = [];
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
    }

} //END getChartOutfields()
