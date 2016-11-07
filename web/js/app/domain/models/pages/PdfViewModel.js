function PdfViewModel(){

    var self = this;
    var base = {};
    this.root = AppViewModel;

    this.pageHeader = ko.observable("PDF Content");
    self.pdfListData =  ko.observable("PDF List is empty!!");
    self.pdfJsonData = ko.observable();
    self.pdfContentSource = ko.observable('http://docs.h2o.ai/h2o/latest-stable/h2o-docs/booklets/GLMBooklet.pdf');



    self.renderPdfListJsonData = function () {
        var jsonString = self.pdfJsonData();
        var htmlString = "<ul class='list-group'>";
        if ( jsonString != null) {
            var data = JSON.parse(jsonString);
            if (data.pdfcollection.length > 0 ) {
                for(var i=0;i<data.pdfcollection.length;i++) {
                    var idCode = "pdf".concat("_").concat(data.pdfcollection[i].id);
                    idCode = idCode.replace(/\s+/g, '');
                    htmlString = htmlString.concat("<li class='list-group-item'><span>").concat(data.pdfcollection[i].title).concat("</span>");
                    htmlString = htmlString.concat("<span class='pull-right'><button type='button' class='btn btn-warning btn-xs' data-toggle='collapse' data-target='");
                    htmlString = htmlString.concat("#").concat(idCode).concat("'>");
                    htmlString = htmlString.concat("<i class='fa fa-download fa-1'></i>");
                    htmlString = htmlString.concat("</button></span>");

                    htmlString = htmlString.concat("<div id='").concat(idCode).concat("' class='collapse'><br>");
                    htmlString = htmlString.concat("<span>").concat(data.pdfcollection[i].info).concat("</span>");
                    htmlString = htmlString.concat("<div>URL: <a href='").concat(data.pdfcollection[i].link).concat("' target='h2o-pdf-link-content'>");
                    htmlString = htmlString.concat(data.pdfcollection[i].link);
                    htmlString = htmlString.concat("</a></div><br>");
                    htmlString = htmlString.concat("<span>Tags: ");
                    if (data.pdfcollection[i].tags != null && data.pdfcollection[0].tags.length > 0) {

                        for(j=0;j<data.pdfcollection[0].tags.length;j++){
                            htmlString = htmlString.concat("<button class='btn btn-xs btn-primary'>");
                            htmlString = htmlString.concat(data.pdfcollection[i].tags[j].tag);
                            htmlString = htmlString.concat("</button>&nbsp");
                        }
                    }
                    htmlString = htmlString.concat("</span>");
                    htmlString = htmlString.concat("</div></li>");
                }
            }
        }else {
            htmlString = htmlString.concat("<li>No data</li>");
        }
        htmlString = htmlString.concat("</ul>");
        self.pdfListData(htmlString);
    };

    self.load = function () {
        root.getGenericListFunction("pages/json/pdflist.json");
        self.pdfJsonData(root.GenericListJson());
        self.renderPdfListJsonData();

    };
    self.load();


}