function VideosViewModel(){


    var self = this;
    var base = {};
    this.root = AppViewModel;

    this.pageHeader = ko.observable("Video Content");
    self.videoListData =  ko.observable("Video List is empty!!");
    self.videoJsonData = ko.observable();
    self.videoContentSource = ko.observable('https://channel9.msdn.com/Events/Machine-Learning-and-Data-Sciences-Conference/Data-Science-Summit-2016/MSDSS11/player');

    self.renderVideoListJsonData = function () {
        var jsonString = self.videoJsonData();
        var htmlString = "<ul class='list-group'>";
        if ( jsonString != null) {
            var data = JSON.parse(jsonString);
            if (data.vidcollection.length > 0 ) {
                for(var i=0;i<data.vidcollection.length;i++) {
                    var idCode = "video".concat("_").concat(data.vidcollection[i].id);
                    idCode = idCode.replace(/\s+/g, '');
                    htmlString = htmlString.concat("<li class='list-group-item'><span>").concat(data.vidcollection[i].title).concat("</span>");
                    htmlString = htmlString.concat("<span class='pull-right'><button type='button' class='btn btn-warning btn-xs' data-toggle='collapse' data-target='");
                    htmlString = htmlString.concat("#").concat(idCode).concat("'>");
                    htmlString = htmlString.concat("<i class='fa fa-download fa-1'></i>");
                    htmlString = htmlString.concat("</button></span>");
                    htmlString = htmlString.concat("<div id='").concat(idCode).concat("' class='collapse'><br>");
                    htmlString = htmlString.concat("<span>").concat(data.vidcollection[i].info).concat("</span>");

                    if (data.vidcollection[i].link) {
                        htmlString = htmlString.concat("<div>URL: <a href='").concat(data.vidcollection[i].link).concat("' target='h2o-video-link-content'>");
                        htmlString = htmlString.concat(data.vidcollection[i].link);
                        htmlString = htmlString.concat("</a></div>");
                    } else if (data.vidcollection[i].sublinks) {
                        var localObj = data.vidcollection[i].sublinks;
                        if (localObj.length > 0){
                            htmlString = htmlString.concat("<ul>");
                            for(var k=0;k<localObj.length;k++) {
                                htmlString = htmlString.concat("<li><div><a href='").concat(localObj[k].link).concat("' target='h2o-video-link-content'>");
                                htmlString = htmlString.concat(localObj[k].info);
                                htmlString = htmlString.concat("</a></div></li>");
                            }
                            htmlString = htmlString.concat("</ul>");
                        }
                    }
                    htmlString = htmlString.concat("<br><span>Tags: ");
                    if (data.vidcollection[i].tags != null && data.vidcollection[0].tags.length > 0) {

                        for(j=0;j<data.vidcollection[0].tags.length;j++){
                            htmlString = htmlString.concat("<button class='btn btn-xs btn-primary'>");
                            htmlString = htmlString.concat(data.vidcollection[i].tags[j].tag);
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
        self.videoListData(htmlString);
    };

    self.load = function () {
        root.getVideosListFunction("pages/json/videolist.json");
        self.videoJsonData(root.VideosListJson());
        self.renderVideoListJsonData();

    };
    self.load();

}