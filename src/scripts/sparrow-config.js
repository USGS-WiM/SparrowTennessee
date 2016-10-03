var serviceBaseURL = "http://gis.wim.usgs.gov/arcgis/rest/services/SparrowTennessee/SparrowTennesseeDev/MapServer/"


//HUC10 Metric choices
var Group3 = [

	{field: "dl1_g3_tot", name: "Group Aggregate Load delivered to donwstream boundary"},
	{field: "dy1_g3_tot", name: "Group Aggregate Yield delivered to donwstream boundary"},
	{field: "dl3_g3_tot", name: "Group Aggregate Load delivered to Group’s outlet"},
	{field: "dy3_g3_tot", name: "Group Aggregate Yield delivered to Group’s outlet"},
	{field: "al_g3_tot", name: "Accumulated Load at Group’s outlet"},
	{field: "ay_g3_tot", name: "Accumulated Yield at Group’s outlet"}

]

//HUC8 Metric choices
var Group2 = [

	{field: "dl1_g2_tot", name: "Group Aggregate Load delivered to donwstream boundary"},
	{field: "dy1_g2_tot", name: "Group Aggregate Yield delivered to donwstream boundary"},
	{field: "dl2_g2_tot", name: "Group Aggregate Load delivered to Group’s outlet"},
	{field: "dy2_g2_tot", name: "Group Aggregate Yield delivered to Group’s outlet"}

]

//independent watershed Metric choices
var Group1 = [

	{field: "dl1_g1_tot", name: "Group Aggregate Load delivered to donwstream boundary"},
	{field: "dy1_g1_tot", name: "Group Aggregate Yield delivered to donwstream boundary"}

]

//state metric choices
var ST = [

	{field: "dl1_ST_tot", name: "State Aggregate Load delivered to downstream boundary"},
	{field: "dy1_ST_TOT", name: "State Aggregate Yield delivered to downstream boundary"},
	{field: "I_ST_tot", name: "State Aggregate Load"},
	{field: "y_ST_tot", name: "State Aggregate Yield"}

]


/*var PhosLayerIds = [
	{name: "GRP_2_NAM", serviceId: 1, selectId: "#GRP2-select", selectClass: "2"},
	{name: "GRP_1_NAM", serviceId: 2, selectId: "#GRP1-select",  selectClass: "1"},
	{name: "ST", serviceId: 3, selectId: "#ST-select",  selectClass: "0"}
]*/

/*var NitroLayerIds = [
	{Group3: 0},
	{Group2: 1},
	{Group1: 3},
	{State: 4}
]*/

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