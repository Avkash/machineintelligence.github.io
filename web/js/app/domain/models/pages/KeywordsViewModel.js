function KeywordsViewModel(){

    var self = this;
    var base = {};
    this.root = AppViewModel;

    this.pageHeader = ko.observable("Machine Learning Keywords");
    self.pageMainHeader = ko.observable("Page Heading...");
    self.pageSubHeader = ko.observable("Sub Heading..");
    self.pageContent = ko.observable("Content");


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
            if (localObj.contents > 0) {

            }
            if (localObj.links > 0) {

            }
        }
    };



    self.load = function(){
        root.getKeywordsJsonFunction(root.masterKeywordId());
        console.log("KLog: [" + root.masterKeywordId() + "] / " + root.keywordJson());
        getKeywordsJsonData(root.keywordJson());
    };

    self.load();

}