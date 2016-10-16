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
    self.keywordsList = ko.observable();

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
                loadKeywordsFile(self.keywordsFile());
            }
        }
    };

    self.loadKeywordsFile = function(fileName){

        self.pageContent(fileName);
    };

    self.load = function(){
        root.getKeywordsJsonFunction(root.masterKeywordId());
        console.log("KLog: [" + root.masterKeywordId() + "] / " + root.keywordJson());
        getKeywordsJsonData(root.keywordJson());
    };

    self.load();

}