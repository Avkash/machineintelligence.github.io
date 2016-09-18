
function HomeViewModel() {

    var self = this;
    this.root = AppViewModel;

    this.firstName = ko.observable("asc");
    this.pageHeader = ko.observable("Home99");
    this.homeField = ko.observable("this is the test field for HomeViewModel");

    this.divHeight = root.visibleWidth;


    this.showD3Tree = function() {
        var resultHTML = "";
        var divId = "mlTreeZ";
        resultHTML = resultHTML.concat("<h1>AAAAAAABBBBB</h1>");
        $(divId).html(resultHTML);
    }
}
