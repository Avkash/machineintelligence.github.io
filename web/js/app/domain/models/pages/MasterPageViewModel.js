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

    self.getPageJsonData = function (localObjStr) {
        //console.log("root.masterPageJson() -> " + localObjStr);
        if (localObjStr.trim().length > 0) {
            var localObj = JSON.parse(localObjStr);
            if (localObj.title != null) {
                self.pageMainHeader(localObj.title);
            }
            if (root.masterPageJson().subTitle != null) {
                self.pageSubHeader(localObj.subTitle);
            }
            if (localObj.contents > 0) {

            }
            if (localObj.links > 0) {

            }
        }
    };
    self.load = function(){
        root.getMasterJsonFunction(root.masterPageId());
        //console.log("Log: " + root.masterPageId() + " / " + root.masterPageJson());
        getPageJsonData(root.masterPageJson());
    };
    self.load();
}