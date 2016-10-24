function TrainingViewModel() {
    var self = this;
    var base = {};

    this.root = AppViewModel;

    this.pageHeader = ko.observable("Trainings all over");
    this.pageSubHeader = ko.observable();
    self.quickTrainingJson = ko.observable();
    self.quickTrainingDetails = ko.observable("Training Details");


    this.loadTrainingData = function(){
        root.getTrainingLinksFunction("pages/json/trainings.json");
        self.quickTrainingJson(root.selectedTrainingJson());
        renderTrainingData();
    };

    self.renderTrainingData = function() {
        if (self.quickTrainingJson() != null && self.quickTrainingJson().length > 0) {
            var data = JSON.parse(self.quickTrainingJson());
            var htmlString = "<ul class='list-group'>";
            if (data.alllinks != null && data.alllinks.length > 0 ) {
                for(var i=0;i<data.alllinks.length;i++) {
                    if (data.alllinks[i].section == root.masterPageId()) {
                        var localObj = data.alllinks[i].children;
                        if (localObj != null && localObj.length > 0) {
                            for(var j=0;j<localObj.length;j++){
                                var idCode = localObj[j].id;
                                idCode = idCode.replace(/\s+/g, '');
                                htmlString = htmlString.concat("<li class='list-group-item'>");
                                htmlString = htmlString.concat("<span class='input-group'>");
                                htmlString = htmlString.concat("<button type='button' class='btn btn-warning btn-xs' data-toggle='collapse' data-target='");
                                htmlString = htmlString.concat("#").concat(idCode).concat("'>");
                                htmlString = htmlString.concat("<i class='fa fa-link fa-1'></i>");
                                htmlString = htmlString.concat("</button>&nbsp;").concat(localObj[j].title);
                                htmlString = htmlString.concat("</span><span>");
                                htmlString = htmlString.concat("<div id='").concat(idCode).concat("' class='collapse'><br>");
                                htmlString = htmlString.concat("<div><a href='").concat(localObj[j].link).concat("' target='_blank'>");
                                htmlString = htmlString.concat(localObj[j].link);
                                htmlString = htmlString.concat("</a></span></div>");
                                htmlString = htmlString.concat("</div></li>");
                            }
                        }
                    }
                }
            }
            htmlString = htmlString.concat("</ul>");
            self.quickTrainingDetails(htmlString);
            console.log(self.quickTrainingDetails());
        }
    };

    this.load = function(){
        this.pageSubHeader(root.masterPageId());
        self.loadTrainingData();
    };

    this.load();

}