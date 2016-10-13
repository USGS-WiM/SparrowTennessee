var serviceBaseURL = "http://gis.wim.usgs.gov/arcgis/rest/services/SparrowTennessee/SparrowTennesseeDev/MapServer/"


//HUC10 Metric choices, service Id 0
var Group3 = [

	{field: "dl1_g3_tot", name: "Group Aggregate Load delivered to donwstream boundary", chartOutfields: ["GRP_3_NAM", "dl1_g3_sc1", "dl1_g3_sc2", "dl1_g3_sc3", "dl1_g3_sc4", "dl1_g3_sc5", "dl1_g3_sc6"]},
	{field: "dy1_g3_tot", name: "Group Aggregate Yield delivered to donwstream boundary", chartOutfields: ["GRP_3_NAM", "dy1_g3_sc1", "dy1_g3_sc2", "dy1_g3_sc3", "dy1_g3_sc4", "dy1_g3_sc5", "dy1_g3_sc6"]},
	{field: "dl3_g3_tot", name: "Group Aggregate Load delivered to Group’s outlet", chartOutfields: ["GRP_3_NAM", "dl3_g3_sc1", "dl3_g3_sc2", "dl3_g3_sc3", "dl3_g3_sc4", "dl3_g3_sc5", "dl3_g3_sc6"]},
	{field: "dy3_g3_tot", name: "Group Aggregate Yield delivered to Group’s outlet", chartOutfields: ["GRP_3_NAM", "dy3_g3_sc1", "dy3_g3_sc2", "dy3_g3_sc3", "dy3_g3_sc4", "dy3_g3_sc5", "dy3_g3_sc6"]},
	{field: "al_g3_tot", name: "Accumulated Load at Group’s outlet", chartOutfields: ["GRP_3_NAM", "al_g3_sc1", "al_g3__sc2", "al_g3_sc3", "al_g3_sc4", "al_g3_sc5", "al_g3_sc6"]},
	{field: "ay_g3_tot", name: "Accumulated Yield at Group’s outlet", chartOutfields: ["GRP_3_NAM", "ay_g3_sc1", "ay_g3__sc2", "ay_g3_sc3", "ay_g3_sc4", "ay_g3_sc5", "ay_g3_sc6"]}

]

//HUC8 Metric choices, Service Id 1
var Group2 = [

	{field: "dl1_g2_tot", name: "Group Aggregate Load delivered to donwstream boundary", chartOutfields: ["GRP_2_NAM", "dl1_g2_sc2", "dl1_g2_sc3", "dl1_g2_sc3", "dl1_g2_sc4", "dl1_g2_sc5", "dl1_g2_sc6"]},
	{field: "dy1_g2_tot", name: "Group Aggregate Yield delivered to donwstream boundary", chartOutfields: ["GRP_2_NAM", "dy1_g2_sc1", "dy1_g2_sc2", "dy1_g2_sc3", "dy1_g2_sc3", "dy1_g2_sc4", "dy1_g2_sc5", "dy1_g2_sc6"]},
	{field: "dl2_g2_tot", name: "Group Aggregate Load delivered to Group’s outlet", chartOutfields: ["GRP_2_NAM", "dl2_g2_sc2", "dl2_g2_sc3", "dl2_g2_sc3", "dl2_g2_sc4", "dl2_g2_sc5", "dl2_g2_sc6"]},
	{field: "dy2_g2_tot", name: "Group Aggregate Yield delivered to Group’s outlet", chartOutfields: ["GRP_2_NAM", "dy2_g2_sc1", "dy2_g2_sc2", "dy2_g2_sc3", "dy2_g2_sc3", "dy2_g2_sc4", "dy2_g2_sc5", "dy2_g2_sc6"]}

]

//independent watershed Metric choices, Service ID 2
var Group1 = [

	{field: "dl1_g1_tot", name: "Group Aggregate Load delivered to donwstream boundary", chartOutfields: ["GRP_1_NAM", "dl1_g1_sc1", "dl1_g1_sc2", "dl1_g1_sc3", "dl1_g1_sc4", "dl1_g1_sc5", "dl1_g1_sc6"]},
	{field: "dy1_g1_tot", name: "Group Aggregate Yield delivered to donwstream boundary", chartOutfields: ["GRP_1_NAM", "dy1_g1_sc1", "dy1_g1_sc2", "dy1_g1_sc3", "dy1_g1_sc4", "dy1_g1_sc5", "dy1_g1_sc6"]}

]

//state metric choices, Service ID 3
var ST = [

	{field: "dl1_ST_tot", name: "State Aggregate Load delivered to downstream boundary", chartOutfields: ["ST", "dl1_ST_sc1", "dl1_ST_sc2", "dl1_ST_sc3", "dl1_ST_sc4", "dl1_ST_sc5", "dl1_ST_sc6"]},
	{field: "dy1_ST_tot", name: "State Aggregate Yield delivered to downstream boundary", chartOutfields: ["ST", "dy1_ST_sc1", "dy1_ST_sc2", "dy1_ST_sc3", "dy1_ST_sc4", "dy1_ST_sc5", "dy1_ST_sc6"]},
	{field: "I_ST_tot", name: "State Aggregate Load", chartOutfields: ["ST", "l_ST_sc1", "l_ST_sc2", "l_ST_sc3", "l_ST_sc4", "l_ST_sc5", "l_ST_sc6"]},
	{field: "y_ST_tot", name: "State Aggregate Yield", chartOutfields: ["ST", "y_ST_sc1", "y_ST_sc2", "y_ST_sc3", "y_ST_sc4", "y_ST_sc5", "y_ST_sc6"]}

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

function getChartOutfields(sparrowLayerId){
    var chartFieldsArr = [];
    //chartFieldsArr.push( $("#displayedMetricSelect").val() );
    switch(sparrowLayerId){
        case 0:
            //HUC10
            $.each(Group3, function(index, item){
                if( $("#displayedMetricSelect").val() == item.field ) {
                    chartFieldsArr = Group3[index].chartOutfields;
                }
            });
            return chartFieldsArr;
            break;
        case 1:
            //HUC8
            $.each(Group2, function(index, item){
                if( $("#displayedMetricSelect").val() == item.field ) {
                    chartFieldsArr = Group2[index].chartOutfields;
                }
            });
            return chartFieldsArr;
            break;
        case 2:
            //Independent Watershed
             $.each(Group1, function(index, item){
                if( $("#displayedMetricSelect").val() == item.field ) {
                    chartFieldsArr = Group1[index].chartOutfields;
                }
            });
            return chartFieldsArr;
            break;
        case 3:
            //State
            $.each(ST, function(index, item){
                if( $("#displayedMetricSelect").val() == item.field ) {
                    chartFieldsArr = ST[index].chartOutfields;
                }
            });
            return chartFieldsArr;
            break;
    }

} //END getChartOutfields()
