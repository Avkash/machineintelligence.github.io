function KeywordsViewModel(){

    /*
    Look for later
     http://projects.delimited.io/experiments/force-bubbles/gates.html
     http://neuralengr.com/asifr/journals/
     */
    var self = this;
    var base = {};
    this.root = AppViewModel;

    this.pageHeader = ko.observable("Machine Learning Keywords");
    self.pageMainHeader = ko.observable("Page Heading...");
    self.pageSubHeader = ko.observable("Sub Heading..");
    self.sideHeader = ko.observable("Keywords List");
    self.pageContent = ko.observable("Content is here");
    self.keywordsFile = ko.observable();
    self.keywordJson = ko.observable();

    self.getKeywordsJsonData = function (localObjStr) {
        console.log("root.keywordJson() -> " + localObjStr);
        if (localObjStr.trim().length > 0) {
            var localObj = JSON.parse(localObjStr);
            if (localObj.title != null) {
                self.pageMainHeader(localObj.title);
            }
            if (localObj.subTitle != null) {
                self.pageSubHeader(localObj.subTitle);
            }
            if (localObj.sideTitle != null) {
                self.sideHeader(localObj.sideTitle);
            }
            if (localObj.keywordsFile != null) {
                self.keywordsFile(localObj.keywordsFile);
                root.getKeywordsDataFunction(self.keywordsFile());
                self.keywordJson(root.keywordDataJson());
                renderKeywordsData();
            }
        }
    };

    self.loadKeywordsFile = function(fileName){
        var jsonData = "";
        $.get(fileName, function (data, status) {
            jsonData = JSON.stringify(data);
            console.log("jsonData1: " + jsonData);
        });
    };

    self.renderKeywordsData = function(){
         if (self.keywordJson().length > 0) {
             var data = JSON.parse(self.keywordJson());
             var htmlIdString = "<ul>";
             var htmlString = "<ul>";
             for(var i=0;i<data.length;i++) {
                 // Main Data
                 htmlString = htmlString.concat("<li>");
                 htmlString = htmlString.concat(data[i].def);
                 htmlString = htmlString.concat("</li>");
                 // ID
                 htmlIdString = htmlIdString.concat("<li>");
                 htmlIdString = htmlIdString.concat(data[i].word);
                 htmlIdString = htmlIdString.concat("</li>");
             }
             htmlString = htmlString.concat("</ul>");
             htmlIdString = htmlIdString.concat("</ul>");
             $(keywordContent).html(htmlString);
             $(keywordsList).html(htmlIdString);
         }
    };

    self.load = function(){
        self.keywordJson();
        root.getKeywordsJsonFunction(root.masterKeywordId());
        self.getKeywordsJsonData(root.keywordJson());
    };

    self.load();

}