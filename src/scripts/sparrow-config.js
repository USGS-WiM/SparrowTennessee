
var serviceBaseURL = "http://gis.wim.usgs.gov/arcgis/rest/services/SparrowTennessee/SparrowTennesseeDev/MapServer/";
var chartUnits = " (lb./yr.)"

var splitLayers = [4,5,6,11,12,13]; //important! UPDATE layer Ids of all state split layers

var tableOutFields = [
    { field: "FID", name: "Unique Feature Id"},
    { field: "GRP_1_NAM", name: "Independent Watershed name (in which HUC10 is nested)"},
    { field: "GRP_2_NAM", name: "HUC8 (in which HUC10 is nested)"},
    { field: "GRP_3_NA_1", name: "Join Field"},
    { field: "Area_g3", name: "HUC10 area (mi2)"}   
]

var stateTableOutFields = [
    { field: "FID", name: "Unique Feature Id"},
    { field: "ST_GP3_NAM", name: "HUC10/State (combination) ID"},
    { field: "Area_S3", name: "HUC10 area within the state and the  model area (mi2)"},   
    { field: "ST", name: "State"},
    { field: "GRP_1_NAM", name: "Independent Watershed name (in which HUC10 is nested)"},
    { field: "GRP_2_NAM", name: "HUC8 (in which HUC10 is nested)"},
    { field: "GRP_3_NAM", name: "HUC10"},
    { field: "ST_GP1_NAM", name: "State and Independent Watershed"},
    { field: "ST_GP2_NAM", name: "State amd HUC8"},
    { field: "ST_gp3_n_1", name: "Join Field"}

]


////PHOSPHORUS LAYER GROUPS______________________________________________________________________________________________________________________________
//HUC10 Metric choices, service Id 0
var Group3 = [
    
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
 