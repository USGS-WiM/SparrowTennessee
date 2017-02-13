/**
 * Created by bdraper on 4/17/2015.
 */
//utility function for formatting numbers with commas every 3 digits
function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
}

var serviceBaseURL = "http://gis.wim.usgs.gov/arcgis/rest/services/SparrowTennessee/SparrowTennesseeDev/MapServer/";
var chartUnits = " (lb./yr.)"

////PHOSPHORUS LAYER GROUPS______________________________________________________________________________________________________________________________
//HUC10 Metric choices, service Id 0
var Group3 = [

	{
        field: "dl1_g3_tot", 
        name: "Group Aggregate Load delivered to donwstream boundary (lb/yr)", 
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
        name: "Yield from HUC10 delivered to downstream boundary (lb/yr/mi2)", 
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
        name: "Load from HUC10 delivered to HUC10 outlet (lb/yr)", 
        chartOutfields: [
            { attribute: "GRP_3_NAM", label: "HUC10 name"}, 
            { attribute: "dl3_g3_sc1", label: "Wastewater load from HUC10 delivered to HUC10 outlet (lb/yr)"},
            { attribute: "dl3_g3_sc2", label: "Urban-land load from HUC10 delivered to HUC10 outlet (lb/yr)"},
            { attribute: "dl3_g3_sc3", label: "Soil-parent-rock load from HUC10 delivered to HUC10 outlet (lb/yr)"},
            { attribute: "dl3_g3_sc4", label: "Mined-land load from HUC10 delivered to HUC10 outlet (lb/yr)"},
            { attribute: "dl3_g3_sc5", label: "Manure load from HUC10 delivered to HUC10 outlet (lb/yr)"},
            { attribute: "dl3_g3_sc6", label: "Agricultural-land load from HUC10 delivered to HUC10 outlet (lb/yr)"}
        ]
    },
	{
        field: "dy3_g3_tot", 
        name: "Yield from HUC10 delivered to HUC10 outlet (lb/yr/mi2)", 
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
        name: "Accumulated load at HUC10 outlet (lb/yr)", 
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
        name: "Accumulated yield at HUC10 outlet (lb/yr/mi2)", 
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
        name: "Load from HUC8 delivered to downstream boundary (lb/yr)", 
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
        name: "Yield from HUC8 delivered to downstream boundary (lb/yr/mi2)", 
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
        name: "Load from HUC8 delivered to HUC8 outlet (lb/yr)", 
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
        name: "Yield from HUC8 delivered to HUC8 outlet (lb/yr/mi2)", 
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
        name: "Load from independent watershed delivered to downstream boundary (lb/yr)", 
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
        name: "Yield from independent watershed delivered to downstream boundary (lb/yr/mi2)", 
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

var ST = [

    {
        field: "dl1_ST_tot", 
        name: "Load from State delivered to downstream boundary (lb/yr)", 
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
        name: "Yield from State delivered to downstream boundary (lb/yr/mi2)", 
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
        field: "l_ST_tot", 
        name: "Load from State within model area (lb/yr)", 
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
        name: "Yield from State within model area (lb/yr/mi2)", 
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

var Group3_st = [

    {
        field: "dl1_S3_tot", 
        name: "Load from HUC10/State delivered to downstream boundary (lb/yr)", 
        chartOutfields: [
            { attribute: "ST_GP3_NAM", label: "HUC10/State"}, 
            { attribute: "dl1_S3_sc1", label: "Wastewater load from HUC10/State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_S3_sc2", label: "Urban-land load from HUC10/State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_S3_sc3", label: "Soil-parent-rock load from HUC10/State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_S3_sc4", label: "Mined-land load from HUC10/State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_S3_sc5", label: "Manure load from HUC10/State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_S3_sc6", label: "Agricultural-land load from HUC10/State delivered to downstream boundary (lb/yr)"}
        ]
    },
    {
        field: "dy1_S3_tot", 
        name: "Yield from HUC10/State delivered to downstream boundary (lb/yr/mi2)", 
        chartOutfields: [
            { attribute: "ST_GP3_NAM", label: "HUC10/State"},
            { attribute: "dy1_S3_sc1", label: "Wastewater yield from HUC10/State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_S3_sc2", label: "Urban-land yield from HUC10/State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_S3_sc3", label: "Soil-parent-rock yield from State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_S3_sc4", label: "Mined-land yield from HUC10/State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_S3_sc5", label: "Manure yield from HUC10/State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_S3_sc6", label: "Agricultural-land yield from HUC10/State delivered to downstream boundary (lb/yr/mi2)"}
        ]
    },
    {
        field: "l_S3_tot", 
        name: "Load from HUC10/State within model area (lb/yr)", 
        chartOutfields: [
            { attribute: "ST_GP3_NAM", label: "HUC10/State"},
            { attribute: "l_S3_sc1", label: "Wastewater load from HUC10/State within model area (lb/yr)"},
            { attribute: "l_S3_sc2", label: "Urban-land load from State within model area (lb/yr)"},
            { attribute: "l_S3_sc3", label: "Soil-parent-rock load from HUC10/State within model area (lb/yr)"},
            { attribute: "l_S3_sc4", label: "Mined-land load from HUC10/State within model area (lb/yr)"},
            { attribute: "l_S3_sc5", label: "Manure load from HUC10/State within model area (lb/yr)"},
            { attribute: "l_S3_sc6", label: "Agricultural-land load from HUC10/State within model area (lb/yr)"}
        ]
    },
    {
        field: "y_S3_tot", 
        name: "Yield from HUC10/State within model area (lb/yr/mi2)", 
        chartOutfields: [
            { attribute: "ST_GP3_NAM", label: "HUC10/State"},
            { attribute: "y_S3_sc1", label: "Wastewater yield from HUC10/State within model area (lb/yr/mi2)"},
            { attribute: "y_S3_sc2", label: "Urban-land yield from HUC10/State within model area (lb/yr/mi2)"},
            { attribute: "y_S3_sc3", label: "Soil-parent-rock yield from HUC10/State within model area (lb/yr/mi2)"},
            { attribute: "y_S3_sc4", label: "Mined-land yield from HUC10/State within model area (lb/yr/mi2)"},
            { attribute: "y_S3_sc5", label: "Manure yield from HUC10/State within model area (lb/yr/mi2)"},
            { attribute: "y_S3_sc6", label: "Agricultural-land yield from HUC10/State within model area (lb/yr/mi2)"}
        ]
    }

]

var Group2_st = [

    {
        field: "dl1_S2_tot", 
        name: "Load from HUC8/State delivered to downstream boundary (lb/yr)", 
        chartOutfields: [
            { attribute: "ST_GP2_NAM", label: "HUC8/State"}, 
            { attribute: "dl1_S2_sc1", label: "Wastewater load from HUC8/State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_S2_sc2", label: "Urban-land load from HUC8/State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_S2_sc3", label: "Soil-parent-rock load from HUC8/State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_S2_sc4", label: "Mined-land load from HUC8/State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_S2_sc5", label: "Manure load from HUC8/State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_S2_sc6", label: "Agricultural-land load from HUC8/State delivered to downstream boundary (lb/yr)"}
        ]
    },
    {
        field: "dy1_S2_tot", 
        name: "Yield from HUC8/State delivered to downstream boundary (lb/yr/mi2)", 
        chartOutfields: [
            { attribute: "ST_GP2_NAM", label: "HUC8/State"},
            { attribute: "dy1_S2_sc1", label: "Wastewater yield from HUC8/State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_S2_sc2", label: "Urban-land yield from HUC8/State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_S2_sc3", label: "Soil-parent-rock yield from State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_S2_sc4", label: "Mined-land yield from HUC8/State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_S2_sc5", label: "Manure yield from HUC8/State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_S2_sc6", label: "Agricultural-land yield from HUC8/State delivered to downstream boundary (lb/yr/mi2)"}
        ]
    },
    {
        field: "l_S2_tot", 
        name: "Load from HUC8/State within model area (lb/yr)", 
        chartOutfields: [
            { attribute: "ST_GP2_NAM", label: "HUC8/State"},
            { attribute: "l_S2_sc1", label: "Wastewater load from HUC8/State within model area (lb/yr)"},
            { attribute: "l_S2_sc2", label: "Urban-land load from State within model area (lb/yr)"},
            { attribute: "l_S2_sc3", label: "Soil-parent-rock load from HUC8/State within model area (lb/yr)"},
            { attribute: "l_S2_sc4", label: "Mined-land load from HUC8/State within model area (lb/yr)"},
            { attribute: "l_S2_sc5", label: "Manure load from HUC8/State within model area (lb/yr)"},
            { attribute: "l_S2_sc6", label: "Agricultural-land load from HUC8/State within model area (lb/yr)"}
        ]
    },
    {
        field: "y_S2_tot", 
        name: "Yield from HUC8/State within model area (lb/yr/mi2)", 
        chartOutfields: [
            { attribute: "ST_GP2_NAM", label: "HUC8/State"},
            { attribute: "y_S2_sc1", label: "Wastewater yield from HUC8/State within model area (lb/yr/mi2)"},
            { attribute: "y_S2_sc2", label: "Urban-land yield from HUC8/State within model area (lb/yr/mi2)"},
            { attribute: "y_S2_sc3", label: "Soil-parent-rock yield from HUC8/State within model area (lb/yr/mi2)"},
            { attribute: "y_S2_sc4", label: "Mined-land yield from HUC8/State within model area (lb/yr/mi2)"},
            { attribute: "y_S2_sc5", label: "Manure yield from HUC8/State within model area (lb/yr/mi2)"},
            { attribute: "y_S2_sc6", label: "Agricultural-land yield from HUC8/State within model area (lb/yr/mi2)"}
        ]
    }
]

var Group1_st = [

    {
        field: "dl1_S1_tot", 
        name: "Load from watershed/State delivered to downstream boundary (lb/yr)", 
        chartOutfields: [
            { attribute: "ST_GP1_NAM", label: "Independend Watershed/State"}, 
            { attribute: "dl1_S1_sc1", label: "Wastewater load from watershed/State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_S1_sc2", label: "Urban-land load from watershed/State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_S1_sc3", label: "Soil-parent-rock load from watershed/State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_S1_sc4", label: "Mined-land load from watershed/State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_S1_sc5", label: "Manure load from watershed/State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_S1_sc6", label: "Agricultural-land load from watershed/State delivered to downstream boundary (lb/yr)"}
        ]
    },
    {
        field: "dy1_S1_tot", 
        name: "Yield from watershed/State delivered to downstream boundary (lb/yr/mi2)", 
        chartOutfields: [
            { attribute: "ST_GP1_NAM", label: "Independend Watershed/State"},
            { attribute: "dy1_S1_sc1", label: "Wastewater yield from watershed/State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_S1_sc2", label: "Urban-land yield from watershed/State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_S1_sc3", label: "Soil-parent-rock yield from State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_S1_sc4", label: "Mined-land yield from watershed/State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_S1_sc5", label: "Manure yield from watershed/State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_S1_sc6", label: "Agricultural-land yield from watershed/State delivered to downstream boundary (lb/yr/mi2)"}
        ]
    },
    {
        field: "l_S1_tot", 
        name: "Load from watershed/State within model area (lb/yr)", 
        chartOutfields: [
            { attribute: "ST_GP1_NAM", label: "Independend Watershed/State"},
            { attribute: "l_S1_sc1", label: "Wastewater load from watershed/State within model area (lb/yr)"},
            { attribute: "l_S1_sc2", label: "Urban-land load from State within model area (lb/yr)"},
            { attribute: "l_S1_sc3", label: "Soil-parent-rock load from watershed/State within model area (lb/yr)"},
            { attribute: "l_S1_sc4", label: "Mined-land load from watershed/State within model area (lb/yr)"},
            { attribute: "l_S1_sc5", label: "Manure load from watershed/State within model area (lb/yr)"},
            { attribute: "l_S1_sc6", label: "Agricultural-land load from watershed/State within model area (lb/yr)"}
        ]
    },
    {
        field: "y_S1_tot", 
        name: "Yield from watershed/State within model area (lb/yr/mi2)", 
        chartOutfields: [
            { attribute: "ST_GP1_NAM", label: "Independend Watershed/State"},
            { attribute: "y_S1_sc1", label: "Wastewater yield from watershed/State within model area (lb/yr/mi2)"},
            { attribute: "y_S1_sc2", label: "Urban-land yield from watershed/State within model area (lb/yr/mi2)"},
            { attribute: "y_S1_sc3", label: "Soil-parent-rock yield from watershed/State within model area (lb/yr/mi2)"},
            { attribute: "y_S1_sc4", label: "Mined-land yield from watershed/State within model area (lb/yr/mi2)"},
            { attribute: "y_S1_sc5", label: "Manure yield from watershed/State within model area (lb/yr/mi2)"},
            { attribute: "y_S1_sc6", label: "Agricultural-land yield from watershed/State within model area (lb/yr/mi2)"}
        ]
    }
]
////END PHOSPHORUS LAYER GROUPS______________________________________________________________________________________________________________________________

////BEGIN NITROGEN LAYER GROUPS______________________________________________________________________________________________________________________________
//HUC10 Metric choices, service Id 0
var Group3_tn = [

    {
        field: "dl1_g3_tot", 
        name: "Group Aggregate Load delivered to donwstream boundary (lb/yr)", 
        chartOutfields: [
            { attribute: "GRP_3_NAM", label: "HUC10 name"}, 
            { attribute: "dl1_g3_sc1", label: "Wastewater load from HUC10 delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_g3_sc2", label: "Urban-land load from HUC10 delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_g3_sc3", label: "Atmospheric deposition load from HUC10 delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_g3_sc4", label: "Manure load from HUC10 delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_g3_sc5", label: "Fertilizer load from HUC10 delivered to downstream boundary (lb/yr)"}
        ]
    },
    {
        field: "dy1_g3_tot", 
        name: "Yield from HUC10 delivered to downstream boundary (lb/yr/mi2)", 
        chartOutfields: [
            { attribute: "GRP_3_NAM", label: "HUC10 name"}, 
            { attribute: "dy1_g3_sc1", label: "Wastewater yield from HUC10 delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_g3_sc2", label: "Urban-land yield from HUC10 delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_g3_sc3", label: "Atmospheric deposition yield from HUC10 delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_g3_sc4", label: "Manure yield from HUC10 delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_g3_sc5", label: "Fertilizer yield from HUC10 delivered to downstream boundary (lb/yr/mi2)"}
        ]
    },
    {
        field: "dl3_g3_tot", 
        name: "Load from HUC10 delivered to HUC10 outlet (lb/yr)", 
        chartOutfields: [
            { attribute: "GRP_3_NAM", label: "HUC10 name"}, 
            { attribute: "dl3_g3_sc1", label: "Wastewater load from HUC10 delivered to HUC10 outlet (lb/yr)"},
            { attribute: "dl3_g3_sc2", label: "Urban-land load from HUC10 delivered to HUC10 outlet (lb/yr)"},
            { attribute: "dl3_g3_sc3", label: "Atmospheric deposition load from HUC10 delivered to HUC10 outlet (lb/yr)"},
            { attribute: "dl3_g3_sc4", label: "Manure load from HUC10 delivered to HUC10 outlet (lb/yr)"},
            { attribute: "dl3_g3_sc5", label: "Fertilizer load from HUC10 delivered to HUC10 outlet (lb/yr)"}
        ]
    },
    {
        field: "dy3_g3_tot", 
        name: "Yield from HUC10 delivered to HUC10 outlet (lb/yr/mi2)", 
        chartOutfields: [
            { attribute: "GRP_3_NAM", label: "HUC10 name"}, 
            { attribute: "dy3_g3_sc1", label: "Wastewater yield from HUC10 delivered to HUC10 outlet (lb/yr/mi2)"},
            { attribute: "dy3_g3_sc2", label: "Urban-land yield from HUC10 delivered to HUC10 outlet (lb/yr/mi2)"},
            { attribute: "dy3_g3_sc3", label: "Atmospheric deposition yield from HUC10 delivered to HUC10 outlet (lb/yr/mi2)"},
            { attribute: "dy3_g3_sc4", label: "Manure yield from HUC10 delivered to HUC10 outlet (lb/yr/mi2)"},
            { attribute: "dy3_g3_sc5", label: "Fertilizer yield from HUC10 delivered to HUC10 outlet (lb/yr/mi2)"}
        ]
    },
    {
        field: "al_g3_tot", 
        name: "Accumulated load at HUC10 outlet (lb/yr)", 
        chartOutfields: [
            { attribute: "GRP_3_NAM", label: "HUC10 name"}, 
            { attribute: "al_g3_sc1", label: "Accumulated wastewater load at HUC10 outlet (lb/yr)"},
            { attribute: "al_g3_sc2", label: "Accumulated urban-land load at HUC10 outlet (lb/yr)"},
            { attribute: "al_g3_sc3", label: "Accumulated Atmospheric deposition load at HUC10 outlet (lb/yr)"},
            { attribute: "al_g3_sc4", label: "Accumulated Manure load at HUC10 outlet (lb/yr)"},
            { attribute: "al_g3_sc5", label: "Accumulated Fertilizer load at HUC10 outlet (lb/yr)"}
        ]
    },
    {
        field: "ay_g3_tot", 
        name: "Accumulated yield at HUC10 outlet (lb/yr/mi2)", 
        chartOutfields: [
        { attribute: "GRP_3_NAM", label: "HUC10 name"}, 
            { attribute: "ay_g3_sc1", label: "Accumulated wastewater yield at HUC10 outlet (lb/yr/mi2)"},
            { attribute: "ay_g3_sc2", label: "Accumulated urban-land yield at HUC10 outlet (lb/yr/mi2)"},
            { attribute: "ay_g3_sc3", label: "Accumulated Atmospheric deposition yield at HUC10 outlet (lb/yr/mi2)"},
            { attribute: "ay_g3_sc4", label: "Accumulated Manure yield at HUC10 outlet (lb/yr/mi2)"},
            { attribute: "ay_g3_sc5", label: "Accumulated Fertilizer yield at HUC10 outlet (lb/yr/mi2)"}
        ]
    }

]

//HUC8 Metric choices, Service Id 1
var Group2_tn = [

    {
        field: "dl1_g2_tot", 
        name: "Load from HUC8 delivered to downstream boundary (lb/yr)", 
        chartOutfields: [
            { attribute: "GRP_2_NAM", label: "HUC8 name"}, 
            { attribute: "dl1_g2_sc1", label: "Wastewater load from HUC8 delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_g2_sc2", label: "Urban-land load from HUC8 delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_g2_sc3", label: "Atmospheric deposition load from HUC8 delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_g2_sc4", label: "Manure load from HUC8 delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_g2_sc5", label: "Fertilizer load from HUC8 delivered to downstream boundary (lb/yr)"}
        ]
    },
    {
        field: "dy1_g2_tot", 
        name: "Yield from HUC8 delivered to downstream boundary (lb/yr)", 
        chartOutfields: [
            { attribute: "GRP_2_NAM", label: "HUC8 name"}, 
            { attribute: "dy1_g2_sc1", label: "Wastewater yield from HUC8 delivered to downstream boundary (lb/yr)"},
            { attribute: "dy1_g2_sc2", label: "Urban-land yield from HUC8 delivered to downstream boundary (lb/yr)"},
            { attribute: "dy1_g2_sc3", label: "Atmospheric deposition yield from HUC8 delivered to downstream boundary (lb/yr)"},
            { attribute: "dy1_g2_sc4", label: "Manure yield from HUC8 delivered to downstream boundary (lb/yr)"},
            { attribute: "dy1_g2_sc5", label: "Fertilizer yield from HUC8 delivered to downstream boundary (lb/yr)"}
        ]
    },
    {
        field: "dl2_g2_tot", 
        name: "Load from HUC8 delivered to HUC8 outlet (lb/yr)", 
        chartOutfields: [
            { attribute: "GRP_2_NAM", label: "HUC8 name"}, 
            { attribute: "dl2_g2_sc1", label: "Wastewater load from HUC8 delivered to HUC8 outlet (lb/yr)"},
            { attribute: "dl2_g2_sc2", label: "Urban-land load from HUC8 delivered to HUC8 outlet (lb/yr)"},
            { attribute: "dl2_g2_sc3", label: "Atmospheric deposition load from HUC8 delivered to HUC8 outlet (lb/yr)"},
            { attribute: "dl2_g2_sc4", label: "Manure load from HUC8 delivered to HUC8 outlet(lb/yr)"},
            { attribute: "dl2_g2_sc5", label: "Fertilizer load from HUC8 delivered to HUC8 outlet (lb/yr)"}

        ]
    },
    {
        field: "dy2_g2_tot", 
        name: "Yield from HUC8 delivered to HUC8 outlet (lb/yr)", 
        chartOutfields: [
            { attribute: "GRP_2_NAM", label: "HUC8 name"}, 
            { attribute: "dy2_g2_sc1", label: "Wastewater yield from HUC8 delivered to HUC8 outlet (lb/yr)"},
            { attribute: "dy2_g2_sc2", label: "Urban-land yield from HUC8 delivered to HUC8 outlet (lb/yr)"},
            { attribute: "dy2_g2_sc3", label: "Atmospheric deposition yield from HUC8 delivered to HUC8 outlet (lb/yr)"},
            { attribute: "dy2_g2_sc4", label: "Manure yield from HUC8 delivered to HUC8 outlet(lb/yr)"},
            { attribute: "dy2_g2_sc5", label: "Fertilizer yield from HUC8 delivered to HUC8 outlet (lb/yr)"}

        ]
    }

]

//independent watershed Metric choices, Service ID 2
var Group1_tn = [

    {
        field: "dl1_g1_tot", 
        name: "Load from independent watershed delivered to downstream boundary (lb/yr)", 
        chartOutfields: [
            { attribute: "GRP_1_NAM", label: "Independent Watershed name"},
            { attribute: "dl1_g1_sc1", label: "Wastewater load from independent watershed delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_g1_sc2", label: "Urban-land load from independent watershed delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_g1_sc3", label: "Atmospheric deposition load from independent watershed delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_g1_sc4", label: "Manure load from independent watershed delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_g1_sc5", label: "Fertilizer load from independent watershed delivered to downstream boundary (lb/yr)"}
        ]
    },
    {
        field: "dy1_g1_tot", 
        name: "Yield from independent watershed delivered to downstream boundary (lb/yr)", 
        chartOutfields: [
            { attribute: "GRP_1_NAM", label: "Independent Watershed name"}, 
            { attribute: "dy1_g1_sc1", label: "Wastewater yield from independent watershed delivered to downstream boundary (lb/yr)"},
            { attribute: "dy1_g1_sc2", label: "Urban-land yield from independent watershed delivered to downstream boundary (lb/yr)"},
            { attribute: "dy1_g1_sc3", label: "Atmospheric deposition yield from independent watershed delivered to downstream boundary (lb/yr)"},
            { attribute: "dy1_g1_sc4", label: "Manure yield from independent watershed delivered to downstream boundary (lb/yr)"},
            { attribute: "dy1_g1_sc5", label: "Fertilizer yield from independent watershed delivered to downstream boundary (lb/yr)"}
        ]
    }

]

var ST_tn = [

    {
        field: "dl1_ST_tot", 
        name: "Load from State delivered to downstream boundary (lb/yr)", 
        chartOutfields: [
            { attribute: "ST", label: "State"}, 
            { attribute: "dl1_ST_sc1", label: "Wastewater load from State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_ST_sc2", label: "Urban-land load from State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_ST_sc3", label: "Atmospheric deposition load from State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_ST_sc4", label: "Manure load from State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_ST_sc5", label: "Fertilizer load from State delivered to downstream boundary (lb/yr)"}
        ]
    },
    {
        field: "dy1_ST_tot", 
        name: "Yield from State delivered to downstream boundary (lb/yr)", 
        chartOutfields: [
            { attribute: "ST", label: "State"},
            { attribute: "dy1_ST_sc1", label: "Wastewater yield from State delivered to downstream boundary (lb/yr)"},
            { attribute: "dy1_ST_sc2", label: "Urban-land yield from State delivered to downstream boundary (lb/yr)"},
            { attribute: "dy1_ST_sc3", label: "Atmospheric deposition yield from State delivered to downstream boundary (lb/yr)"},
            { attribute: "dy1_ST_sc4", label: "Manure yield from State delivered to downstream boundary (lb/yr)"},
            { attribute: "dy1_ST_sc5", label: "Fertilizer yield from State delivered to downstream boundary (lb/yr)"}
        ]
    },
    {
        field: "l_ST_tot", 
        name: "Load from State within model area (lb/yr)", 
        chartOutfields: [
            { attribute: "ST", label: "State"},
            { attribute: "l_ST_sc1", label: "Wastewater load from State within model area (lb/yr)"},
            { attribute: "l_ST_sc2", label: "Urban-land load from State within model area (lb/yr)"},
            { attribute: "l_ST_sc3", label: "Atmospheric-deposition load from State within model area (lb/yr)"},
            { attribute: "l_ST_sc4", label: "Manure load from State within model area (lb/yr)"},
            { attribute: "l_ST_sc5", label: "Fertilizer load from State within model area (lb/yr)"}
        ]
    },
    {
        field: "y_ST_tot", 
        name: "Yield from State within model area (lb/yr/mi2)", 
        chartOutfields: [
            { attribute: "ST", label: "State"},
            { attribute: "y_ST_sc1", label: "Wastewater yield from State within model area (lb/yr)"},
            { attribute: "y_ST_sc2", label: "Urban-land yield from State within model area (lb/yr)"},
            { attribute: "y_ST_sc3", label: "Atmospheric-deposition yield from State within model area (lb/yr)"},
            { attribute: "y_ST_sc4", label: "Manure yield from State within model area (lb/yr)"},
            { attribute: "y_ST_sc5", label: "Fertilizer yield from State within model area (lb/yr)"}
        ]
    }
]

var Group3_st_tn = [

    {
        field: "dl1_S3_tot", 
        name: "Load from HUC10/State delivered to downstream boundary (lb/yr)", 
        chartOutfields: [
            { attribute: "ST_GP3_NAM", label: "HUC10/State"}, 
            { attribute: "dl1_S3_sc1", label: "Wastewater load from HUC10/State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_S3_sc2", label: "Urban-land load from HUC10/State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_S3_sc3", label: "Atmospheric deposition load from HUC10/State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_S3_sc4", label: "Manure load from HUC10/State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_S3_sc5", label: "Fertilizer load from HUC10/State delivered to downstream boundary (lb/yr)"}
        ]
    },
    {
        field: "dy1_S3_tot", 
        name: "Yield from HUC10/State delivered to downstream boundary (lb/yr/mi2)", 
        chartOutfields: [
            { attribute: "ST_GP3_NAM", label: "HUC10/State"},
            { attribute: "dy1_S3_sc1", label: "Wastewater yield from HUC10/State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_S3_sc2", label: "Urban-land yield from HUC10/State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_S3_sc3", label: "Atmospheric deposition yield from HUC10/State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_S3_sc4", label: "Manure yield from HUC10/State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_S3_sc5", label: "Fertilizer yield from HUC10/State delivered to downstream boundary (lb/yr/mi2)"}
        ]
    },
    {
        field: "l_S3_tot", 
        name: "Load from HUC10/State within model area (lb/yr)", 
        chartOutfields: [
            { attribute: "ST_GP3_NAM", label: "HUC10/State"},
            { attribute: "l_S3_sc1", label: "Wastewater load from HUC10/State within model area (lb/yr)"},
            { attribute: "l_S3_sc2", label: "Urban-land load from HUC10/State within model area (lb/yr)"},
            { attribute: "l_S3_sc3", label: "Atmospheric-deposition load from HUC10/State within model area (lb/yr)"},
            { attribute: "l_S3_sc4", label: "Manure load from HUC10/State within model area (lb/yr)"},
            { attribute: "l_S3_sc5", label: "Fertilizer load from HUC10/State within model area (lb/yr)"}
        ]
    },
    {
        field: "y_S3_tot", 
        name: "Yield from HUC10/State within model area (lb/yr)", 
        chartOutfields: [
            { attribute: "ST_GP3_NAM", label: "HUC10/State"},
            { attribute: "y_S3_sc1", label: "Wastewater yield from HUC10/State within model area (lb/yr)"},
            { attribute: "y_S3_sc2", label: "Urban-land yield from HUC10/State within model area (lb/yr)"},
            { attribute: "y_S3_sc3", label: "Atmospheric-deposition yield from HUC10/State within model area (lb/yr)"},
            { attribute: "y_S3_sc4", label: "Manure yield from HUC10/State within model area (lb/yr)"},
            { attribute: "y_S3_sc5", label: "Fertilizer yield from HUC10/State within model area (lb/yr)"}
        ]
    }

]

var Group2_st_tn = [

    {
        field: "dl1_S2_tot", 
        name: "Load from HUC8/State delivered to downstream boundary (lb/yr)", 
        chartOutfields: [
            { attribute: "ST_GP2_NAM", label: "HUC8/State"}, 
            { attribute: "dl1_S2_sc1", label: "Wastewater load from HUC8/State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_S2_sc2", label: "Urban-land load from HUC8/State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_S2_sc3", label: "Atmospheric deposition load from HUC8/State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_S2_sc4", label: "Manure load from HUC8/State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_S2_sc5", label: "Fertilizer load from HUC8/State delivered to downstream boundary (lb/yr)"}
        ]
    },
    {
        field: "dy1_S2_tot", 
        name: "Yield from HUC8/State delivered to downstream boundary (lb/yr/mi2)", 
        chartOutfields: [
            { attribute: "ST_GP2_NAM", label: "HUC8/State"},
            { attribute: "dy1_S2_sc1", label: "Wastewater yield from HUC8/State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_S2_sc2", label: "Urban-land yield from HUC8/State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_S2_sc3", label: "Atmospheric deposition yield from HUC8/State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_S2_sc4", label: "Manure yield from HUC8/State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_S2_sc5", label: "Fertilizer yield from HUC8/State delivered to downstream boundary (lb/yr/mi2)"}
        ]
    },
    {
        field: "l_S2_tot", 
        name: "Load from HUC8/State within model area (lb/yr)", 
        chartOutfields: [
            { attribute: "ST_GP2_NAM", label: "HUC8/State"},
            { attribute: "l_S2_sc1", label: "Wastewater load from HUC8/State within model area (lb/yr)"},
            { attribute: "l_S2_sc2", label: "Urban-land load from HUC8/State within model area (lb/yr)"},
            { attribute: "l_S2_sc3", label: "Atmospheric-deposition load from HUC8/State within model area (lb/yr)"},
            { attribute: "l_S2_sc4", label: "Manure load from HUC8/State within model area (lb/yr)"},
            { attribute: "l_S2_sc5", label: "Fertilizer load from HUC8/State within model area (lb/yr)"}
        ]
    },
    {
        field: "y_S2_tot", 
        name: "Yield from HUC8/State within model area (lb/yr)", 
        chartOutfields: [
            { attribute: "ST_GP2_NAM", label: "HUC8/State"},
            { attribute: "y_S2_sc1", label: "Wastewater yield from HUC8/State within model area (lb/yr)"},
            { attribute: "y_S2_sc2", label: "Urban-land yield from HUC8/State within model area (lb/yr)"},
            { attribute: "y_S2_sc3", label: "Atmospheric-deposition yield from HUC8/State within model area (lb/yr)"},
            { attribute: "y_S2_sc4", label: "Manure yield from HUC8/State within model area (lb/yr)"},
            { attribute: "y_S2_sc5", label: "Fertilizer yield from HUC8/State within model area (lb/yr)"}
        ]
    }
]

var Group1_st_tn = [

    {
        field: "dl1_S1_tot", 
        name: "Load from watershed/State delivered to downstream boundary (lb/yr)", 
        chartOutfields: [
            { attribute: "ST_GP1_NAM", label: "Independend Watershed/State"}, 
            { attribute: "dl1_S1_sc1", label: "Wastewater load from Independend Watershed/State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_S1_sc2", label: "Urban-land load from Independend Watershed/State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_S1_sc3", label: "Atmospheric deposition load from Independend Watershed/State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_S1_sc4", label: "Manure load from Independend Watershed/State delivered to downstream boundary (lb/yr)"},
            { attribute: "dl1_S1_sc5", label: "Fertilizer load from Independend Watershed/State delivered to downstream boundary (lb/yr)"}
        ]
    },
    {
        field: "dy1_S1_tot", 
        name: "Yield from watershed/State delivered to downstream boundary (lb/yr/mi2)", 
        chartOutfields: [
            { attribute: "ST_GP1_NAM", label: "Independend Watershed/State"},
            { attribute: "dy1_S1_sc1", label: "Wastewater yield from Independend Watershed/State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_S1_sc2", label: "Urban-land yield from Independend Watershed/State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_S1_sc3", label: "Atmospheric deposition yield from Independend Watershed/State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_S1_sc4", label: "Manure yield from Independend Watershed/State delivered to downstream boundary (lb/yr/mi2)"},
            { attribute: "dy1_S1_sc5", label: "Fertilizer yield from Independend Watershed/State delivered to downstream boundary (lb/yr/mi2)"}
        ]
    },
    {
        field: "l_S1_tot", 
        name: "Load from watershed/State within model area (lb/yr)", 
        chartOutfields: [
            { attribute: "ST_GP1_NAM", label: "Independend Watershed/State"},
            { attribute: "l_S1_sc1", label: "Wastewater load from Independend Watershed/State within model area (lb/yr)"},
            { attribute: "l_S1_sc2", label: "Urban-land load from Independend Watershed/State within model area (lb/yr)"},
            { attribute: "l_S1_sc3", label: "Atmospheric-deposition load from Independend Watershed/State within model area (lb/yr)"},
            { attribute: "l_S1_sc4", label: "Manure load from Independend Watershed/State within model area (lb/yr)"},
            { attribute: "l_S1_sc5", label: "Fertilizer load from Independend Watershed/State within model area (lb/yr)"}
        ]
    },
    {
        field: "y_S1_tot", 
        name: "Yield from watershed/State within model area (lb/yr/mi2)", 
        chartOutfields: [
            { attribute: "ST_GP1_NAM", label: "Independend Watershed/State"},
            { attribute: "y_S1_sc1", label: "Wastewater yield from Independend Watershed/State within model area (lb/yr)"},
            { attribute: "y_S1_sc2", label: "Urban-land yield from Independend Watershed/State within model area (lb/yr)"},
            { attribute: "y_S1_sc3", label: "Atmospheric-deposition yield from Independend Watershed/State within model area (lb/yr)"},
            { attribute: "y_S1_sc4", label: "Manure yield from Independend Watershed/State within model area (lb/yr)"},
            { attribute: "y_S1_sc5", label: "Fertilizer yield from Independend Watershed/State within model area (lb/yr)"}
        ]
    }
]
////END NITROGEN LAYER GROUPS______________________________________________________________________________________________________________________________


var queryParameters = {
    grp3: {idField: "GRP_3_NUM",
        nameField: ["GRP_3_NAM", "GRP_2_NAM", "GRP_1_NAM", "ST"], //actually set in core.js for loop currently
        alias: "HUC10",
        serviceId: 4,
        AOISelect: false
    },
    grp2: {idField: "GRP_2_NUM",
        nameField: ["GRP_2_NAM"],
        alias: "HUC8",
        serviceId: 1,
        AOISelect: true

    },
    grp1: {idField: "GRP_1_NUM",
        nameField: ["GRP_1_NAM"],
        alias: "Independent Watershed",
        serviceId: 2,
        AOISelect: true
    },
    st: {idField: "ST",
        nameField: ["ST"],
        alias: "State",
        serviceId: 3,
        AOISelect: true
    }
} 

//
 
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

    var sparrowOverlay;
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
            "groupHeading": "Model Calibration Sites",
            "showGroupHeading": true,
            "includeInLayerList": true,
            "layers": {
                "Phosphorus Calibration Sites" : {
                    "url": serviceBaseURL,
                    "visibleLayers": [14],
                    "options": {
                        "id": "phosCalibration",
                        "opacity": 0.85,
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
                "Nitrogen Calibration Sites" : {
                    "url": serviceBaseURL,
                    "visibleLayers": [15],
                    "options": {
                        "id": "nitroCalibration",
                        "visible": false,
                        "opacity": 0.85
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
        },
        {
            "groupHeading": "Auxilliary Layers",
            "showGroupHeading": true,
            "includeInLayerList": true,
            "layers": {
                "Tennessee Mainstems" : {
                    "url": serviceBaseURL,
                    "visibleLayers": [17],
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
                    "visibleLayers": [16],
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
    var layerDefObj = {};
    var AllAOIOptions = [];


    //load additional basemap
    var nationalMapBasemap = new ArcGISTiledMapServiceLayer('http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer');

    loadEventHandlers();

    //TODO: FIGURE OUT HOW TO USE THE QUERY WHERECLAUSE     Call setupQueryTask for every layer inqueryParameters
    setupQueryTask(serviceBaseURL + 4, ["ST", "GRP_3_NAM", "GRP_2_NAM", "GRP_1_NAM" ], "1=1");
    /*for (var key in queryParameters){
        if (key == 'grp3'){
            setupQueryTask(serviceBaseURL + queryParameters[key].serviceId, ["ST", "GRP_3_NAM", "GRP_2_NAM", "GRP_1_NAM" ], "1=1");
        } else{
            setupQueryTask(serviceBaseURL + queryParameters[key].serviceId, queryParameters[key].nameField, "1=1");
        }     
    }*/

    app.setLayerDefObj = function(newObj){
        switch(newObj.selectedId){
            case "st-select":
                layerDefObj.AOIST = newObj.selectedValue;
                break;
            case "grp1-select":
                layerDefObj.AOI1 = newObj.selectedValue;

                break;
            case "grp2-select":
                layerDefObj.AOI2 = newObj.selectedValue;
                break;
        }
        app.updateAOIs(newObj.selectedId);
    }

    app.clearLayerDefObj = function(){
        layerDefObj = {};
        $("#st-select").empty();
        $("#grp1-select").empty();
        $("#grp2-select").empty();
        defaultAOIOptions();

    }

    app.getLayerDefObj = function(){
        return layerDefObj;
    }

    app.updateAOIs = function(selectedId){
        var filteredAOIOptions = [];

        var grp2Options = [];
        var grp1Options = [];
        var stOptions = [];
        
        switch(selectedId){
            case "st-select":
                //UPDATE INDEPENDENT WATERSHED AOI
                $("#grp1-select").empty();
                $("#grp2-select").empty();

                //need to know if ST and grp2 have values
                if (layerDefObj.AOI2) {
                    filteredAOIOptions = AllAOIOptions.filter(function(s){ return s.ST == layerDefObj.AOIST && s.GRP_2_NAM == layerDefObj.AOI2; });
                }
                else {
                    filteredAOIOptions = AllAOIOptions.filter(function(s){ return s.ST == layerDefObj.AOIST; });
                }
                grp1Options = [...new Set(filteredAOIOptions.map(item => item.GRP_1_NAM))];
                $.each(grp1Options, function(index, option){
                    $("#grp1-select").append(new Option(option));
                });

                $('#grp1-select').selectpicker('refresh');
                
                //of a watershed is selected
                if(layerDefObj.AOI1){
                    $("#grp1-select").val(layerDefObj.AOI1);
                    $('#grp1-select').selectpicker('render');
                }
                
                //need to know if ST and grp1 have values
                filteredAOIOptions = [];
                if (layerDefObj.AOI1) {
                    filteredAOIOptions = AllAOIOptions.filter(function(s){ return s.ST == layerDefObj.AOIST && s.GRP_1_NAM == layerDefObj.AOI1; });
                }
                else {
                    filteredAOIOptions = AllAOIOptions.filter(function(s){ return s.ST == layerDefObj.AOIST; });
                }
                grp2Options = [...new Set(filteredAOIOptions.map(item => item.GRP_2_NAM))];
                $.each(grp2Options, function(index, option){
                    $("#grp2-select").append(new Option(option));
                });
                
                $('#grp2-select').selectpicker('refresh');
                
                if(layerDefObj.AOI2){
                    $("#grp2-select").val(layerDefObj.AOI2);
                    $('#grp2-select').selectpicker('render');

                }
                break;
            
            case "grp1-select":
                $("#st-select").empty();
                $("#grp2-select").empty();

                //need to know if gr1 and grp2 have values
                if (layerDefObj.AOI2) {
                    filteredAOIOptions = AllAOIOptions.filter(function(s){ return s.GRP_2_NAM == layerDefObj.AOI2 && s.GRP_1_NAM == layerDefObj.AOI1; });
                }
                else {
                    filteredAOIOptions = AllAOIOptions.filter(function(s){ return s.GRP_1_NAM == layerDefObj.AOI1 });
                }
                
                
                stOptions = [...new Set(filteredAOIOptions.map(item => item.ST))];
                $.each(stOptions, function(index, option){
                    $("#st-select").append(new Option(option));
                });

                $('#st-select').selectpicker('refresh');
                
                //of a watershed is selected
                if(layerDefObj.AOIST){
                    $("#st-select").val(layerDefObj.AOIST);
                    $('#st-select').selectpicker('render');
                }

                filteredAOIOptions = [];
                //need to know if gr1 and st have values
                if (layerDefObj.AOIST) {
                    filteredAOIOptions = AllAOIOptions.filter(function(s){ return s.GRP_1_NAM == layerDefObj.AOI1 && s.ST == layerDefObj.AOIST; });
                }
                else {
                    filteredAOIOptions = AllAOIOptions.filter(function(s){ return s.GRP_1_NAM == layerDefObj.AOI1 });
                }
                grp2Options = [...new Set(filteredAOIOptions.map(item => item.GRP_2_NAM))];
                $.each(grp2Options, function(index, option){
                    $("#grp2-select").append(new Option(option));
                });
                
                $('#grp2-select').selectpicker('refresh');
                
                if(layerDefObj.AOI2){
                    $("#grp2-select").val(layerDefObj.AOI2);
                    $('#grp2-select').selectpicker('render');

                }
                break;
            
            case "grp2-select":
                $("#st-select").empty();
                $("#grp1-select").empty();

                //need to know if gr1 and st have values
                if (layerDefObj.AOIST) {
                    filteredAOIOptions = AllAOIOptions.filter(function(s){ return s.GRP_2_NAM == layerDefObj.AOI2 && s.ST == layerDefObj.AOIST; });
                }
                else {
                    filteredAOIOptions = AllAOIOptions.filter(function(s){ return s.GRP_2_NAM == layerDefObj.AOI2 });
                }
                                
                stOptions = [...new Set(filteredAOIOptions.map(item => item.ST))];
                $.each(stOptions, function(index, option){
                    $("#st-select").append(new Option(option));
                });

                $('#st-select').selectpicker('refresh');
                
                //of a watershed is selected
                if(layerDefObj.AOIST){
                    $("#st-select").val(layerDefObj.AOIST);
                    $('#st-select').selectpicker('render');
                }
                
                filteredAOIOptions= [];
                //need to know if st and grp2 have values
                if (layerDefObj.AOIST) {
                    filteredAOIOptions = AllAOIOptions.filter(function(s){ return s.GRP_2_NAM == layerDefObj.AOI2 && s.ST == layerDefObj.AOIST; });
                }
                else {
                    filteredAOIOptions = AllAOIOptions.filter(function(s){ return s.GRP_2_NAM == layerDefObj.AOI2 });
                }
                grp1Options = [...new Set(filteredAOIOptions.map(item => item.GRP_1_NAM))];
                $.each(grp1Options, function(index, option){
                    $("#grp1-select").append(new Option(option));
                });

                $('#grp1-select').selectpicker('refresh');
                
                //of a watershed is selected
                if(layerDefObj.AOI1){
                    $("#grp1-select").val(layerDefObj.AOI1);
                    $('#grp1-select').selectpicker('render');
                }
                break;
        }

        //let grp1Options = [...new Set(AllAOIOptions.map(item => item.GRP_1_NAM))];
    
        //console.log(grp1Options);

        
        
    }

    app.updateAOI2 = function(changedAOI){
        console.log('changed AOI: ' + changedAOI);
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

        $.each(response.features, function(index, feature){
            AllAOIOptions.push(feature.attributes);  
        });
        console.log("ALL AOI Object: "+ AllAOIOptions);
        defaultAOIOptions();
    }

    function defaultAOIOptions(){
        
        let grp2Options = [...new Set(AllAOIOptions.map(item => item.GRP_2_NAM))];
        let grp1Options = [...new Set(AllAOIOptions.map(item => item.GRP_1_NAM))];
        let STOptions = [...new Set(AllAOIOptions.map(item => item.ST))];
        
        console.log(grp2Options);
        console.log(grp1Options);
        console.log(STOptions);
        
        $.each(grp2Options, function(index, option){
            $("#grp2-select").append(new Option(option));
        });
        $.each(grp1Options, function(index, option){
            $("#grp1-select").append(new Option(option));
        });
        $.each(STOptions, function(index, option){
            $("#st-select").append(new Option(option));
        });
        
        $('#grp2-select').selectpicker('refresh');
        $('#grp1-select').selectpicker('refresh');
        $('#st-select').selectpicker('refresh');

        /*switch(response.displayFieldName){
            case "ST_GP3_NAM":
                console.log("Currently no AOI for Group 3");
                $.each(response.features, function(index, feature){
                    AllAOIOptions.push(feature.attributes);  
                });
                console.log(AllAOIOptions);
                let states = [...new Set(featureArr.map(item => item.ST))];
                let states = [...new Set(featureArr.map(item => item.ST))];
                console.log(states);
                break;
            case queryParameters["grp2"].nameField[0]:
                $.each(response.features, function(index, feature){
                    var attributeName = queryParameters["grp2"].nameField[0];
                    $("#grp2-select").append(new Option(feature.attributes[attributeName], feature.attributes["GRP_2_NUM"]));
                    $('#grp2-select').selectpicker('refresh');
                });
                break;
            case queryParameters["grp1"].nameField[0]:
                 $.each(response.features, function(index, feature){
                    var attributeName = queryParameters["grp1"].nameField[0];
                    $("#grp1-select").append(new Option(feature.attributes[attributeName], feature.attributes["GRP_1_NUM"]));
                    $('#grp1-select').selectpicker('refresh');
                });
                break;
            case queryParameters["st"].nameField[0]:
                $.each(response.features, function(index, feature){
                    var attributeName = queryParameters["st"].nameField[0];
                    $("#st-select").append(new Option(feature.attributes[attributeName], feature.attributes["ST"]));
                    $('#st-select').selectpicker('refresh');
                });
                break;
        }*/
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

        //reflow the chart if it's open
        if( $("#chartWindowDiv").css("visibility") == "visible" ) {
            createChartQuery();
        }
    });


    /* AOI EVENTS */
    $('.aoiSelect').on('change', AOIChange);

    /*$('.aoiSelect').on('change', function(e){
        AOIChange(e);
        if( $("#chartWindowDiv").css("visibility") == "visible" ) {
            createChartQuery();
        }
    });*/



    //removed from eventhandlers________________________________________________________________________________________
    /*GROUP RESULTS*/
    $("#groupResultsSelect").on('changed.bs.select', function(e){  
        populateMetricOptions(e.currentTarget.selectedIndex);
        setAggregateGroup( e.currentTarget.selectedIndex, $(".radio input[type='radio']:checked")[0].id );
        generateRenderer();

        if( $("#chartWindowDiv").css("visibility") == "visible" ) {
            createChartQuery();
        }
        
    });

    /*METRIC*/
    $("#displayedMetricSelect").on('changed.bs.select', function(e){
        generateRenderer();

        if( $("#chartWindowDiv").css("visibility") == "visible" ) {
            createChartQuery();
        }
    });
    //END removed from eventhandlers________________________________________________________________________________________

    /*CLEAR AOI SELECTIONS */
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

        app.clearLayerDefObj();
        generateRenderer();

    });


    // enable/disable Show Chart button 
    $('.nonAOISelect').on('change', function(){
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
function loadEventHandlers() {

    //set initial Displayed Metric options
    $('#groupResultsSelect').on('loaded.bs.select', function(){  
        populateMetricOptions($("#groupResultsSelect")[0].selectedIndex);
        generateRenderer();
    });

   /* //keep Displayed Metric options in sync -- can be moved to sidebar events lower in code
    $("#groupResultsSelect").on('changed.bs.select', function(e){  
        populateMetricOptions(e.currentTarget.selectedIndex);
        setAggregateGroup( e.currentTarget.selectedIndex, $(".radio input[type='radio']:checked")[0].id );
        generateRenderer();

        if( $("#chartWindowDiv").css("visibility") == "visible" ) {
            createChartQuery();
        }
        
    });

    //TODO TEMPORARY SOLOUTION?  MUST CALL RENDERER WHEN DISPLAYED METRIC CHANGES
        $("#displayedMetricSelect").on('changed.bs.select', function(e){
        generateRenderer();

        if( $("#chartWindowDiv").css("visibility") == "visible" ) {
            createChartQuery();
        }
        });*/

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
    sparrowRanking.setVisibleLayers(visibleLayerIds, true);


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


/*    var newObj = {
        state:"",
        watershed:"",
        huc8:"",
        selectId: selectId,
        selectedItem: e.currentTarget.value,
        sparrowRankingId: app.map.getLayer('SparrowRanking').visibleLayers[0]
    }
*/
    

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

} //END AOIChange()

//function setLayerDefs(selectId, definitionString, layerDefs, selectedItem){
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