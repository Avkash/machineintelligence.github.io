function MasterPageViewModel() {

    var self = this;
    this.root = AppViewModel;
    this.firstName = ko.observable("asc");
    this.pageHeader = ko.observable("Master");
    this.homeField = ko.observable("this is the test field for HomeViewModel");


}