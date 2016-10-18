function DatasetViewModel() {

    var self = this;
    var base = {};

    this.root = AppViewModel;

    self.pageHeader = ko.observable("Datasets");
    self.datasetsListData =  ko.observable("Datasets");
    self.dsJsonData = ko.observable();


    self.renderDsListJsonData = function () {
        var jsonString = self.dsJsonData();
        var htmlString = "<ul class='list-group'>";
        if ( jsonString != null) {
            var data = JSON.parse(jsonString);
            if (data.dscollection.length > 0 ) {
                for(var i=0;i<data.dscollection.length;i++) {
                    var idCode = "dataset".concat("_").concat(data.dscollection[i].id);
                    idCode = idCode.replace(/\s+/g, '');
                    htmlString = htmlString.concat("<li class='list-group-item'><span>").concat(data.dscollection[i].title).concat("</span>");
                    htmlString = htmlString.concat("<span class='pull-right'><button type='button' class='btn btn-warning btn-xs' data-toggle='collapse' data-target='");
                    htmlString = htmlString.concat("#").concat(idCode).concat("'>");
                    htmlString = htmlString.concat("<i class='fa fa-download fa-1'></i>");
                    htmlString = htmlString.concat("</button></span>");

                    htmlString = htmlString.concat("<div id='").concat(idCode).concat("' class='collapse'><br>");
                    htmlString = htmlString.concat("<span>").concat(data.dscollection[i].info).concat("</span>");
                    htmlString = htmlString.concat("<div>URL: <a href='").concat(data.dscollection[i].link).concat("' target='_blank'>");
                    htmlString = htmlString.concat(data.dscollection[i].link);
                    htmlString = htmlString.concat("</a></div>");
                    htmlString = htmlString.concat("<span>Tags: ");
                    if (data.dscollection[i].tags != null && data.dscollection[0].tags.length > 0) {

                        for(j=0;j<data.dscollection[0].tags.length;j++){
                            htmlString = htmlString.concat("<button class='btn btn-xs btn-primary'>");
                            htmlString = htmlString.concat(data.dscollection[i].tags[j].tag);
                            htmlString = htmlString.concat("</button>&nbsp");
                        }
                    }
                    htmlString = htmlString.concat("</span>");
                    htmlString = htmlString.concat("</div></li>");
                }
            }
        }else {
            htmlString = htmlString.concat("<li>No data</li>");
        }
        htmlString = htmlString.concat("</ul>");
        self.datasetsListData(htmlString);
    };

    self.load = function () {
        root.getDatasetsListFunction("pages/json/datasetslist.json");
        self.dsJsonData(root.DatasetsListJson());
        self.renderDsListJsonData();

    };
    self.load();

}