function MasterPageViewModel() {

    var self = this;
    this.root = AppViewModel;
    this.firstName = ko.observable("asc");
    this.homeField = ko.observable("this is the test field for HomeViewModel");



    this.pageMainHeader = ko.observable("Page Heading...");
    this.pageSubHeader = ko.observable("Sub Heading..");
    this.pageContent = ko.observable("Content");
    this.pageContentLinks = ko.observable("ContentLinks");

    this.loadPageContent = function(){




    }

}