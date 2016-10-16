function MasterPageViewModel() {

    var self = this;
    var base = {};
    this.root = AppViewModel;

    this.firstName = ko.observable("asc");
    this.homeField = ko.observable("this is the test field for HomeViewModel");

    self.pageMainHeader = ko.observable("Page Heading...");
    self.pageSubHeader = ko.observable("Sub Heading..");
    self.pageContent = ko.observable("Content");
    self.pageContentLinks = ko.observable("ContentLinks");
    self.masterHtmlPage = ko.observable("pages/data/data_h2o.html");

    self.getPageJsonData = function (localObjStr) {
        console.log("root.masterPageJson() -> " + localObjStr);
        if (localObjStr.trim().length > 0) {
            var localObj = JSON.parse(localObjStr);
            if (localObj.id != null){
                var hPage = "pages/data/data_";
                hPage = hPage.concat(localObj.id);
                hPage = hPage.concat(".html");
                self.masterHtmlPage(hPage);
            }
            if (localObj.title != null) {
                self.pageMainHeader(localObj.title);
            }
            if (localObj.subTitle != null) {
                self.pageSubHeader(localObj.subTitle);
            }
            if (localObj.links > 0) {

            }
        }
        console.log("htmlpage: " + self.masterHtmlPage());
    };


    self.load = function(){
        root.getMasterJsonFunction(root.masterPageId());
        //console.log("Log: " + root.masterPageId() + " / " + root.masterPageJson());
        getPageJsonData(root.masterPageJson());
    };
    self.load();
}