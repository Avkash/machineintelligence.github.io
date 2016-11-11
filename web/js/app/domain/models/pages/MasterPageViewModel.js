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
    self.quickLinksFile =  ko.observable("pages/data/details_h2o.json");
    self.quickDetailsJson = ko.observable("");
    self.quickDetails = ko.observable("Quick Details");

    self.getPageJsonData = function (localObjStr) {
        if (localObjStr.trim().length > 0) {
            var localObj = JSON.parse(localObjStr);
            if (localObj.id != null){
                var hPage = "pages/data/data_";
                hPage = hPage.concat(localObj.id);
                hPage = hPage.concat(".html");
                self.masterHtmlPage(hPage);

                var qlPage = "pages/data/details_";
                qlPage = qlPage.concat(localObj.id);
                qlPage = qlPage.concat(".json");
                self.quickLinksFile(qlPage);
                root.getQuickLinksFunction(self.quickLinksFile());
                self.quickDetailsJson(root.quickLinksDataJson());
                renderQuickLinksData();

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
    };

    self.renderQuickLinksData = function(){
        console.log(self.quickDetailsJson());
        if (self.quickDetailsJson().length > 0) {
            var data = JSON.parse(self.quickDetailsJson());
            var htmlString = "<ul class='list-group'>";
            if (data.links.length > 0 ) {
                for(var i=0;i<data.links.length;i++) {
                    var idCode = data.links[i].id;
                    idCode = idCode.replace(/\s+/g, '');
                    idCode = idCode.replace(/[^a-zA-Z ]/g, '');
                    /*
                    htmlString = htmlString.concat("<li class='list-group-item'><button type='button' class='btn btn-info btn-sm' data-toggle='collapse' data-target='");
                    htmlString = htmlString.concat("#").concat(idCode).concat("'>");
                    htmlString = htmlString.concat(data.links[i].id);
                    htmlString = htmlString.concat("</button>");
                    htmlString = htmlString.concat("<div id='").concat(idCode).concat("' class='collapse'><br>");
                    htmlString = htmlString.concat("<div><a href='").concat(data.links[i].linkInfo).concat("' target='_blank'>");
                    htmlString = htmlString.concat(data.links[i].linkInfo);
                    htmlString = htmlString.concat("</a></div>");
                    htmlString = htmlString.concat("</div></li>");
                    */

                    htmlString = htmlString.concat("<li class='list-group-item'><span>").concat(data.links[i].id).concat("</span>");
                    htmlString = htmlString.concat("<span class='pull-right'><button type='button' class='btn btn-warning btn-xs' data-toggle='collapse' data-target='");
                    htmlString = htmlString.concat("#").concat(idCode).concat("'>");
                    htmlString = htmlString.concat("<i class='fa fa-download fa-1'></i>");
                    htmlString = htmlString.concat("</button></span>");

                    htmlString = htmlString.concat("<div id='").concat(idCode).concat("' class='collapse'><br>");
                    if (data.links[i].details) {
                        htmlString = htmlString.concat("<span>").concat(data.links[i].details).concat("</span>");
                    }
                    htmlString = htmlString.concat("<div>URL: <a href='").concat(data.links[i].linkInfo).concat("' target='_blank'>");
                    htmlString = htmlString.concat(data.links[i].linkInfo);
                    htmlString = htmlString.concat("</a></div>");

                }
            }
            htmlString = htmlString.concat("</ul>");
            self.quickDetails(htmlString);
        }
    };

    self.load = function(){
        root.getMasterJsonFunction(root.masterPageId());
        getPageJsonData(root.masterPageJson());
    };
    self.load();
}