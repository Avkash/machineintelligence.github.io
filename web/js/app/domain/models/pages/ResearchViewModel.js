function ResearchViewModel() {

    var self = this;
    var base = {};

    this.root = AppViewModel;

    self.pageHeader = ko.observable("Research Papers");
    self.mlResearchData = ko.observable();
    self.dlResearchData = ko.observable();
    self.dlJsonData = ko.observable();
    self.mlJsonData = ko.observable();

    self.renderResearchJsonData = function (jsonString, type) {
        var htmlString = "<ul class='list-group'>";
        if ( jsonString != null) {
            var data = JSON.parse(jsonString);
            if (data.papers.length > 0 ) {
                for(var i=0;i<data.papers.length;i++) {
                    var idCode = type.concat("_").concat(data.papers[i].id);
                    idCode = idCode.replace(/\s+/g, '');
                    htmlString = htmlString.concat("<li class='list-group-item'><button type='button' class='btn btn-info btn-sm' data-toggle='collapse' data-target='");
                    htmlString = htmlString.concat("#").concat(idCode).concat("'>");
                    htmlString = htmlString.concat("[").concat(data.papers[i].title).concat("]");
                    htmlString = htmlString.concat("</button>");
                    htmlString = htmlString.concat("<div id='").concat(idCode).concat("' class='collapse'><br>");
                    htmlString = htmlString.concat("<span>").concat(data.papers[i].info).concat("</span>");
                    htmlString = htmlString.concat("<div>URL: <a href='").concat(data.papers[i].link).concat("' target='_blank'>");
                    htmlString = htmlString.concat(data.papers[i].link);
                    htmlString = htmlString.concat("</a></div>");
                    htmlString = htmlString.concat("<span>Tags: ").concat(data.papers[i].tags).concat("</span>");
                    htmlString = htmlString.concat("</div></li>");
                }
            }
        }else {
            htmlString = htmlString.concat("<li>No data</li>");
        }
        htmlString = htmlString.concat("</ul>");
        if (type == "dl") {
            self.dlResearchData(htmlString);
        } else if ( type == "ml") {
            self.mlResearchData(htmlString);
        }
    };

    self.updateDlLocalData = function(){
        self.dlJsonData(root.dlDataJson());
        self.renderResearchJsonData(self.dlJsonData(), "dl");
    };

    self.updateMlLocalData = function(){
        self.mlJsonData(root.mlDataJson());
        self.renderResearchJsonData(self.mlJsonData() , "ml");
    };

    self.load = function () {
        root.getDlResearchData("pages/research/dl_research.json");
        self.updateDlLocalData();

        root.getMlResearchData("pages/research/ml_research.json");
        self.updateMlLocalData();
    };
    self.load();

}