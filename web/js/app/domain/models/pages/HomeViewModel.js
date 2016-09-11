
function HomeViewModel() {

    var self = this;
    this.root = AppViewModel;

    this.firstName = ko.observable("asc");
    this.homeField = ko.observable("this is the test field for HomeViewModel");

    this.divHeight = root.visibleWidth;

}
