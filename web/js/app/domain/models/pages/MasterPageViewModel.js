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

    self.load = function(){
        root.getMasterJsonFunction(root.masterPageId());
        getPageJsonData();
    };

    self.getPageJsonData = function () {
        console.log("root.masterPageJson()" + root.masterPageJson().title);
        if (root.masterPageJson().title != null) {
            self.pageMainHeader(root.masterPageJson().title);
        }
        if (root.masterPageJson().subTitle != null) {
            self.pageSubHeader(root.masterPageJson().subTitle);
        }
        if (root.masterPageJson().contents > 0) {

        }
        if (root.masterPageJson().links > 0) {

        }
    };
    self.load();
}