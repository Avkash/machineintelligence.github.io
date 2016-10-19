function LinksViewModel(){

    var self = this;
    var base = {};

    this.root = AppViewModel;

    this.pageHeader = ko.observable("Helpful Links");
    this.externalLinks = ko.observable();
    this.socialLinks = ko.observable();
    this.dlmlLinks  = ko.observable();
    this.groupLinks  = ko.observable();
    this.dsLinks  = ko.observable();
    this.otherLinks  = ko.observable();


    self.getLinksJsonData = function (localObjStr) {
        if (localObjStr != null && localObjStr.trim().length > 0) {
            var localObj = JSON.parse(localObjStr);
            console.log(localObj);
            if (localObj.alllinks.length > 0 ) {
                for(var i=0;i<localObj.alllinks.length;i++) {
                    var secObj = localObj.alllinks[i];
                    if (secObj != null && secObj.children != null & secObj.children.length > 0){
                        var htmlString = "<ul>";
                        for(var j = 0; j< secObj.children.length; j++ ) {
                            htmlString = htmlString.concat("<li>");
                            htmlString = htmlString.concat("<a href='").concat(secObj.children[j].link).concat("' target='_blank'>");
                            htmlString = htmlString.concat(secObj.children[j].title);
                            htmlString = htmlString.concat("</a>");
                            htmlString = htmlString.concat("</li>");
                        }
                        htmlString = htmlString.concat("</ul>");
                        if (secObj.section == "social") {
                            self.socialLinks(htmlString);
                        } else if (secObj.section == "external") {
                            self.externalLinks(htmlString);
                        } else if (secObj.section == "dlml") {
                            self.dlmlLinks(htmlString);
                        } else if (secObj.section == "groups") {
                            self.groupLinks(htmlString);
                        } else if (secObj.section == "ds") {
                            self.dsLinks(htmlString);
                        } else if (secObj.section == "other") {
                            self.otherLinks(htmlString);
                        }
                    }
                }
            }
        }
    };

    self.load = function(){
        root.getAllLinksFunction("pages/json/all_links.json");
        getLinksJsonData(root.allLinkdDataJson());
    };
    self.load();

}