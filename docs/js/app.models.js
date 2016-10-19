

function AppViewModel() {
    var self = this;
    this.contentViewModel = ko.observable();


    this.currentWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    this.currentHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    this.testWord = ko.observable("Avkash");

    this.masterPageId = ko.observable("h2o");
    this.masterPageJson = ko.observable(""); //ko.observableArray([]);
    this.masterTab = ko.observable("Deeplearn");
    this.masterDir= ko.observable("Home");
    this.masterLink= ko.observable("home");
    this.masterKeywordId= ko.observable("");
    this.keywordJson = ko.observable(""); //ko.observableArray([]);
    this.keywordDataJson = ko.observable(""); //ko.observableArray([]);
    this.quickLinksDataJson = ko.observable("");
    this.dlDataJson = ko.observable();
    this.mlDataJson = ko.observable();
    this.DatasetsListJson = ko.observable();
    this.allLinkdDataJson = ko.observable();
    this.quickAlgoLinksDataJson = ko.observable();


    this.links = ko.observableArray([   "home", "thisweek", "links","github", "videos",
        "keywords",
        "social",
        "datasets",
        "research",
        "h2o", "tensorflow", "xgboost", "mxnet", "paddle", "caffe", "keras","theano",
        "dl4j", "ndimaj", "encog", "hpcct",
        "torch",
        "convnetjs",
        "accordnet",
        "mocha",
        "cntk",
        "gobrain",
        "algo",
        "algo_glm", "algo_gbm", "algo_dl", "algo_drf", "algo_nb", "algo_ensembles", "algo_glrm", "algo_kmeans", "algo_pca",
        "proj_deepdream"]);

    this.linksHtml = ko.observable({
        "home" : "home.html",
        "master" : "master.html",
        "thisweek" : "thisweek.html",
        "links": "alllinks.html",
        "github" : "my_github.html",
        "videos": "all_videos.html",
        "datasets" : "datasets.html",
        "research" : "research.html",
        /* "keywords" : "glossary-keywords.html", */
        "social" :  "my_social.html",
        /* Algorithms*/
        "algo_glm" : "algo_glm.html",
        "algo_gbm" : "algo_gbm.html",
        "algo_dl" : "algo_dl.html",
        "algo_drf" : "algo_drf.html",
        "algo_nb" : "algo_nb.html",
        "algo_ensembles" : "algo_ensembles.html",
        "algo_glrm" : "algo_glrm.html",
        "algo_kmeans" : "algo_kmeans.html",
        "algo_pca" : "algo_pca.html",
        /* Projects */
        "proj_deepdream" : "proj_deepdream.html",
        /* keywords */
        "keywords" : "keywords.html"
    });

    this.viewModelPool = ko.observable({
        "master" : MasterPageViewModel,
        "thisweek": ThisWeekViewModel,
        "links": LinksViewModel,
        "github": GitHubViewModel,
        "videos" : VideosViewModel,
        "social" : SocialViewModel,
        "datasets": DatasetViewModel,
        "research": ResearchViewModel,
        "algo" : AlgoMasterViewModel,
        /* Algorithms */
        "algo_glm" : AlgoMasterViewModel,
        "algo_gbm" : AlgoMasterViewModel,
        "algo_dl" : AlgoMasterViewModel,
        "algo_drf" : AlgoMasterViewModel,
        "algo_nb" : AlgoMasterViewModel,
        "algo_ensembles" : AlgoMasterViewModel,
        "algo_glrm" : AlgoMasterViewModel,
        "algo_kmeans" : AlgoMasterViewModel,
        "algo_pca" : AlgoMasterViewModel,
        /* Projects */
        "proj_deepdream" : ProjDeepDreamViewModel,
        /* */
        "keywords" : KeywordsViewModel,
        "home": HomeViewModel
    });

    this.masterCollection = ko.observable({
         "h2o" : "H2O Machine Learning in Java, Python, Scala and R",
         "tensorflow" : "TensorFlow from Google",
         "mxnet" : "MxNet",
         "xgboost" : "XGBoost",
         "paddle" : "Paddle from Baidu",
         "caffe" : "Caffe from Berkley",
         "keras" : "Keras",
         "theano" : "Theano",
         "dl4j" : "Deeplearning 4 Java",
         "hpcct" : "HPE Cognitive Computing Toolkit",
         "ndimaj" : "N-Dimensional Array for Java",
         "encog" : "EnCog",
         "convnetjs": "ConvNetJS",
         "torch" : "Torch",
         "accordnet" : "Accord.NET",
         "mocha" : "Mocha",
         "cntk" : "CNTK",
         "gobrain": "GoBrain"
    });

    this.contentView = ko.observable();

    this.changeUrl = function (linkKey) {
        location.hash = "/".concat(linkKey);
    };

    this.visibleHeight = ko.computed(function() {
        return screen.height;
    }, this);

    this.visibleWidth = ko.computed(function() {
        return screen.width;
    }, this);


    self.getMasterJsonFunction = function (pageId){
        $.get("pages/json/libs.json", function (data, status) {
            for(var i=0;i<data.length;i++) {
                if (data[i].id == pageId) {
                    self.masterPageJson(JSON.stringify(data[i]));
                    break;
                }
            }
        });
    };

    self.getKeywordsJsonFunction = function (pageId){
        $.get("pages/json/keywords.json", function (data, status) {
            for(var i=0;i<data.length;i++) {
                if (data[i].id == pageId) {
                    self.keywordJson(JSON.stringify(data[i]));
                    break;
                }
            }
        });
    };

    self.getKeywordsDataFunction = function (fileName){
        $.get(fileName, function (data, status) {
            self.keywordDataJson(JSON.stringify(data));
        });
    };

    self.getAllLinksFunction = function (fileName){
        console.log("fileName: " + fileName);
        $.get(fileName, function (data, status) {
            console.log("data: " + data);
            self.allLinkdDataJson(JSON.stringify(data));
        });
    };

    self.getQuickLinksFunction = function (fileName){
        $.get(fileName, function (data, status) {
            self.quickLinksDataJson(JSON.stringify(data));
        });
    };

    self.getQuickAlgoLinksFunction = function (fileName){
        $.get(fileName, function (data, status) {
            self.quickAlgoLinksDataJson(JSON.stringify(data));
        });
    };

    self.getDlResearchData = function (fileName){
        $.get(fileName, function (data, status) {
            self.dlDataJson(JSON.stringify(data));
        });
    };
    self.getMlResearchData = function (fileName){
        $.get(fileName, function (data, status) {
            self.mlDataJson(JSON.stringify(data));
        });
    };

    self.getDatasetsListFunction = function (fileName){
        $.get(fileName, function (data, status) {
            self.DatasetsListJson(JSON.stringify(data));
        });
    };

}




function HeaderViewModel(){

    var self = this;
    this.links = params.links;
    this.root = AppViewModel;

}

function LeftSideMenuViewModel(params) {
    var self = this;
    this.links = params.links;
    this.root = AppViewModel;
}

ko.components.register("left-side-menu", {
    viewModel: LeftSideMenuViewModel,
    template: {element: "left-side-menu"}
});



function HeaderBarViewModel(params) {
    var self = this;
    this.links = params.links;
    this.root = AppViewModel;
}

ko.components.register("header-bar", {
    viewModel: HeaderBarViewModel,
    template: {element: "header-bar"}
});


function AlgoMasterViewModel(){

    var self = this;
    var base = {};

    this.root = AppViewModel;

    this.m = ko.observable();
    this.w = ko.observable();
    this.h = ko.observable();
    this.i = ko.observable();
    this.diagonal = ko.observable();
    this.vis = ko.observable();
    this.tree = ko.observable();

    this.pageHeader = ko.observable();
    self.alogPageType = ko.observable();
    self.quickDetails = ko.observable("Quick Details1");

    self.quickDetailsFunc = function(algoType, algoLinks){
        switch(algoType){
            case "glm":
                self.pageHeader("Generalized Linear Modeling (GLM)");
                break;
            case "gbm":
                self.pageHeader("Gradient Boosting Machine (GBM)");
                break;
            case "drf":
                self.pageHeader("Distributed Random Forest (DRF)");
                break;
            case "dl":
                self.pageHeader("Deep Learning (DL)");
                break;
            case "nb":
                self.pageHeader("Naive Bayes (NB)");
                break;
            case "ensembles":
                self.pageHeader("Ensembles or Stacking");
                break;
            case "glrm":
                self.pageHeader("Generalized Low Rank Models (GLRM)");
                break;
            case "kmeans":
                self.pageHeader("K-Means");
                break;
            case "pca":
                self.pageHeader("Principal Component Analysis");
                break;
            default:
                self.pageHeader("Algorithm");
        }
        root.getQuickAlgoLinksFunction(algoLinks);
        renderQuickAlgoLinksData(root.quickAlgoLinksDataJson());
    };

    self.renderQuickAlgoLinksData = function(jsonData){
        if (jsonData != null && jsonData.length > 0) {
            var data = JSON.parse(jsonData);
            var htmlString = "<ul class='list-group'>";
            if (data.links.length > 0 ) {
                for(var i=0;i<data.links.length;i++) {
                    var idCode = data.links[i].id;
                    idCode = idCode.replace(/\s+/g, '');
                    htmlString = htmlString.concat("<li class='list-group-item'><button type='button' class='btn btn-info btn-xs' data-toggle='collapse' data-target='");
                    htmlString = htmlString.concat("#").concat(idCode).concat("'>");
                    htmlString = htmlString.concat(data.links[i].id);
                    htmlString = htmlString.concat("</button>");
                    htmlString = htmlString.concat("<div id='").concat(idCode).concat("' class='collapse'><br>");
                    htmlString = htmlString.concat("<div><a href='").concat(data.links[i].linkInfo).concat("' target='_blank'>");
                    htmlString = htmlString.concat(data.links[i].linkInfo);
                    htmlString = htmlString.concat("</a></div>");
                    htmlString = htmlString.concat("</div></li>");
                }
            }
            htmlString = htmlString.concat("</ul>");
            self.quickDetails(htmlString);
        }
    };

    self.generateMlTree = function(mlJsonPath) {
        var visRoot;
        d3.json(mlJsonPath, function(json) {
            visRoot = json;
            visRoot.x0 = h / 2;
            visRoot.y0 = 0;

            function toggleAll(d) {
                if (d.children) {
                    d.children.forEach(toggleAll);
                    toggle(d);
                }
            }
            // Initialize the display to show a few nodes.
            visRoot.children.forEach(toggleAll);
            if (visRoot.children.length > 0) {
                toggle(visRoot.children[0]);
            }
            if (visRoot.children.length > 1) {
                toggle(visRoot.children[1]);
                //toggle(visRoot.children[1].children[2]);
            }

            //toggle(visRoot.children[9]);
            //toggle(visRoot.children[9].children[0]);
            update(visRoot);
        });

        function toggle(d) {
                if (d.children) {
                    d._children = d.children;
                    d.children = null;
                } else {
                    d.children = d._children;
                    d._children = null;
                }
        };

        function update(source) {
            var duration = d3.event && d3.event.altKey ? 5000 : 500;

            // Compute the new tree layout.
            //var nodes = tree.nodes(root).reverse();
            var nodes = tree.nodes(visRoot).reverse();

            // Normalize for fixed-depth.
            nodes.forEach(function(d) { d.y = d.depth * 180; });

            // Update the nodes…
            var node = vis.selectAll("g.node")
                .data(nodes, function(d) { return d.id || (d.id = ++i); });

            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("svg:g")
                .attr("class", "node")
                .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                .on("click", function(d) { toggle(d); update(d); });

            nodeEnter.append("svg:circle")
                .attr("r", 1e-6)
                .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeEnter.append("svg:text")
                .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
                .attr("dy", ".35em")
                .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
                .text(function(d) { return d.name; })
                .style("fill-opacity", 1e-6);

            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

            nodeUpdate.select("circle")
                .attr("r", 4.5)
                .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
                .remove();

            nodeExit.select("circle")
                .attr("r", 1e-6);

            nodeExit.select("text")
                .style("fill-opacity", 1e-6);

            // Update the links…
            var link = vis.selectAll("path.link")
                .data(tree.links(nodes), function(d) { return d.target.id; });

            // Enter any new links at the parent's previous position.
            link.enter().insert("svg:path", "g")
                .attr("class", "link")
                .attr("d", function(d) {
                    var o = {x: source.x0, y: source.y0};
                    return diagonal({source: o, target: o});
                })
                .transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", function(d) {
                    var o = {x: source.x, y: source.y};
                    return diagonal({source: o, target: o});
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function(d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }
    };

    self.load = function(){

        self.m = [20, 120, 20, 120];
        self.w = 1280 - m[1] - m[3];
        self.h = 800 - m[0] - m[2];
        self.i = 0;
        self.tree = d3.layout.tree().size([h, w]);
        self.diagonal = d3.svg.diagonal().projection(function(d) { return [d.y, d.x]; });
        self.vis = d3.select("#algoTree").append("svg:svg")
            .attr("width", w + m[1] + m[3])
            .attr("height", h + m[0] + m[2])
            .append("svg:g")
            .attr("transform", "translate(" + m[3] + "," + m[0] + ")");
    };

    self.load();

}
function DatasetViewModel() {

    var self = this;
    var base = {};

    this.root = AppViewModel;

    self.pageHeader = ko.observable("Datasets");
    self.datasetsListData =  ko.observable("Datasets");
    self.dsJsonData = ko.observable();


    self.renderDsListJsonData = function () {
        var jsonString = self.dsJsonData();
        var htmlString = "<ul class='list-group'>";
        if ( jsonString != null) {
            var data = JSON.parse(jsonString);
            if (data.dscollection.length > 0 ) {
                for(var i=0;i<data.dscollection.length;i++) {
                    var idCode = "dataset".concat("_").concat(data.dscollection[i].id);
                    idCode = idCode.replace(/\s+/g, '');
                    htmlString = htmlString.concat("<li class='list-group-item'><span>").concat(data.dscollection[i].title).concat("</span>");
                    htmlString = htmlString.concat("<span class='pull-right'><button type='button' class='btn btn-warning btn-xs' data-toggle='collapse' data-target='");
                    htmlString = htmlString.concat("#").concat(idCode).concat("'>");
                    htmlString = htmlString.concat("<i class='fa fa-download fa-1'></i>");
                    htmlString = htmlString.concat("</button></span>");

                    htmlString = htmlString.concat("<div id='").concat(idCode).concat("' class='collapse'><br>");
                    htmlString = htmlString.concat("<span>").concat(data.dscollection[i].info).concat("</span>");
                    htmlString = htmlString.concat("<div>URL: <a href='").concat(data.dscollection[i].link).concat("' target='_blank'>");
                    htmlString = htmlString.concat(data.dscollection[i].link);
                    htmlString = htmlString.concat("</a></div>");
                    htmlString = htmlString.concat("<span>Tags: ");
                    if (data.dscollection[i].tags != null && data.dscollection[0].tags.length > 0) {

                        for(j=0;j<data.dscollection[0].tags.length;j++){
                            htmlString = htmlString.concat("<button class='btn btn-xs btn-primary'>");
                            htmlString = htmlString.concat(data.dscollection[i].tags[j].tag);
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
        self.datasetsListData(htmlString);
    };

    self.load = function () {
        root.getDatasetsListFunction("pages/json/datasetslist.json");
        self.dsJsonData(root.DatasetsListJson());
        self.renderDsListJsonData();

    };
    self.load();

}
function GitHubViewModel(){

    var self = this;
    this.root = AppViewModel;
    this.pageHeader = ko.observable("Github");

}

function HomeViewModel() {

    var self = this;
    var base = {};

    this.root = AppViewModel;

    this.m = ko.observable();
    this.w = ko.observable();
    this.h = ko.observable();
    this.i = ko.observable();
    this.diagonal = ko.observable();
    this.vis = ko.observable();
    this.tree = ko.observable();
    this.selectedJsonFile = ko.observable();

    this.pageMainHeader = ko.observable("Your home for machine intelligence");
    this.pageHeader = ko.observable("Your home for machine intelligence");
    this.pageSubHeader = ko.observable("Subpage");
    this.sideHeader = ko.observable("Sideheader ");

    this.showD3Tree = function() {
        var resultHTML = "";
        var divId = "mlTreeZ";
        resultHTML = resultHTML.concat("<h1>AAAAAAABBBBB</h1>");
        $(divId).html(resultHTML);
    };

    this.updateDataBox = function(link){
        console.log("link: " + link);
    };

    this.homePageChanger = function(data, event){
        //root.changeUrl(data);
        return false;
    };

    this.jsonLoader = function(jsonId){
        var jsonFileName= "ml.json";
        switch(jsonId){
            case 'main':
                jsonFileName = 'ml.json';
                break;
            case 'type':
                jsonFileName = 'new.json';
                break;
            case 'learn':
                jsonFileName = 'flare.json';
                break;
            case 'package':
                jsonFileName = 'ml.json';
                break;
            case 'language':
                jsonFileName = 'ml.json';
                break;
            case 'usability':
                jsonFileName = 'ml.json';
                break;
            case 'complexity':
                jsonFileName = 'ml.json';
                break;
        }
        this.selectedJsonFile("js/"+jsonFileName);
        this.selectJsonTree(this.selectedJsonFile());
    };

    this.selectJsonTree = function(jsonTree) {
        var treeDiv = document.getElementById("mlTree");
        var svgDiv = treeDiv.getElementsByTagName("svg");
        this.generateMlTree(jsonTree);
    };


    self.generateMlTree = function(mlJsonPath) {
        var visRoot;
        d3.json(mlJsonPath, function(json) {
            visRoot = json;
            visRoot.x0 = h / 2;
            visRoot.y0 = 0;

            function toggleAll(d) {
                if (d.children) {
                    d.children.forEach(toggleAll);
                    toggle(d);
                }
            }
            // Initialize the display to show a few nodes.
            visRoot.children.forEach(toggleAll);
            toggle(visRoot.children[1]);
            toggle(visRoot.children[1].children[2]);
            toggle(visRoot.children[9]);
            toggle(visRoot.children[9].children[0]);
            update(visRoot);
        });

        function toggle(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
        }

        function update(source) {
            var duration = d3.event && d3.event.altKey ? 5000 : 500;

            // Compute the new tree layout.
            //var nodes = tree.nodes(root).reverse();
            var nodes = tree.nodes(visRoot).reverse();

            // Normalize for fixed-depth.
            nodes.forEach(function(d) { d.y = d.depth * 180; });

            // Update the nodes…
            var node = vis.selectAll("g.node")
                .data(nodes, function(d) { return d.id || (d.id = ++i); });

            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("svg:g")
                .attr("class", "node")
                .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                .on("click", function(d) { toggle(d); update(d); });

            nodeEnter.append("svg:circle")
                .attr("r", 1e-6)
                .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeEnter.append("svg:text")
                .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
                .attr("dy", ".35em")
                .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
                .text(function(d) { return d.name; })
                .style("fill-opacity", 1e-6);

            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

            nodeUpdate.select("circle")
                .attr("r", 4.5)
                .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
                .remove();

            nodeExit.select("circle")
                .attr("r", 1e-6);

            nodeExit.select("text")
                .style("fill-opacity", 1e-6);

            // Update the links…
            var link = vis.selectAll("path.link")
                .data(tree.links(nodes), function(d) { return d.target.id; });

            // Enter any new links at the parent's previous position.
            link.enter().insert("svg:path", "g")
                .attr("class", "link")
                .attr("d", function(d) {
                    var o = {x: source.x0, y: source.y0};
                    return diagonal({source: o, target: o});
                })
                .transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", function(d) {
                    var o = {x: source.x, y: source.y};
                    return diagonal({source: o, target: o});
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function(d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }
    };

    self.load = function(){

        self.m = [20, 120, 20, 120];
        self.w = 1280 - m[1] - m[3];
        self.h = 800 - m[0] - m[2];
        self.i = 0;
        self.tree = d3.layout.tree().size([h, w]);
        self.diagonal = d3.svg.diagonal().projection(function(d) { return [d.y, d.x]; });
        self.vis = d3.select("#mlTree").append("svg:svg")
            .attr("width", w + m[1] + m[3])
            .attr("height", h + m[0] + m[2])
            .append("svg:g")
            .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

    };

    self.load();
}

function KeywordsViewModel(){

    /*
    Look for later
     http://projects.delimited.io/experiments/force-bubbles/gates.html
     http://neuralengr.com/asifr/journals/
     */
    var self = this;
    var base = {};
    this.root = AppViewModel;

    this.pageHeader = ko.observable("Machine Learning Keywords");
    self.pageMainHeader = ko.observable("Page Heading...");
    self.pageSubHeader = ko.observable("Sub Heading..");
    self.sideHeader = ko.observable("Keywords List");
    self.pageContent = ko.observable("Content is here");
    self.keywordsFile = ko.observable();
    self.keywordJson = ko.observable();

    self.getKeywordsJsonData = function (localObjStr) {
        console.log("root.keywordJson() -> " + localObjStr);
        if (localObjStr.trim().length > 0) {
            var localObj = JSON.parse(localObjStr);
            if (localObj.title != null) {
                self.pageMainHeader(localObj.title);
            }
            if (localObj.subTitle != null) {
                self.pageSubHeader(localObj.subTitle);
            }
            if (localObj.sideTitle != null) {
                self.sideHeader(localObj.sideTitle);
            }
            if (localObj.keywordsFile != null) {
                self.keywordsFile(localObj.keywordsFile);
                root.getKeywordsDataFunction(self.keywordsFile());
                self.keywordJson(root.keywordDataJson());
                renderKeywordsData();
            }
        }
    };

    self.loadKeywordsFile = function(fileName){
        var jsonData = "";
        $.get(fileName, function (data, status) {
            jsonData = JSON.stringify(data);
            console.log("jsonData1: " + jsonData);
        });
    };

    self.renderKeywordsData = function(){
         if (self.keywordJson().length > 0) {
             var data = JSON.parse(self.keywordJson());
             var htmlIdString = "<ul>";
             var htmlString = "<ul>";
             for(var i=0;i<data.length;i++) {
                 // Main Data
                 htmlString = htmlString.concat("<li>");
                 htmlString = htmlString.concat(data[i].def);
                 htmlString = htmlString.concat("</li>");
                 // ID
                 htmlIdString = htmlIdString.concat("<li>");
                 htmlIdString = htmlIdString.concat(data[i].word);
                 htmlIdString = htmlIdString.concat("</li>");
             }
             htmlString = htmlString.concat("</ul>");
             htmlIdString = htmlIdString.concat("</ul>");
             $(keywordContent).html(htmlString);
             $(keywordsList).html(htmlIdString);
         }
    };

    self.load = function(){
        self.keywordJson();
        root.getKeywordsJsonFunction(root.masterKeywordId());
        self.getKeywordsJsonData(root.keywordJson());
    };

    self.load();

}
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


function MainViewModel() {
    this.testField = ko.observable("this is the test field for mainViewModel");
}

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
                    htmlString = htmlString.concat("<li class='list-group-item'><button type='button' class='btn btn-info btn-sm' data-toggle='collapse' data-target='");
                    htmlString = htmlString.concat("#").concat(idCode).concat("'>");
                    htmlString = htmlString.concat(data.links[i].id);
                    htmlString = htmlString.concat("</button>");
                    htmlString = htmlString.concat("<div id='").concat(idCode).concat("' class='collapse'><br>");
                    htmlString = htmlString.concat("<div><a href='").concat(data.links[i].linkInfo).concat("' target='_blank'>");
                    htmlString = htmlString.concat(data.links[i].linkInfo);
                    htmlString = htmlString.concat("</a></div>");
                    htmlString = htmlString.concat("</div></li>");
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
function ResearchViewModel() {

    var self = this;
    var base = {};

    this.root = AppViewModel;

    self.pageHeader = ko.observable("Research Papers");
    self.mlResearchData = ko.observable();
    self.dlResearchData = ko.observable();
    self.dlJsonData = ko.observable();
    self.mlJsonData = ko.observable();

    self.renderResearchJsonData = function (jsonString, type) {
        var htmlString = "<ul class='list-group'>";
        if ( jsonString != null) {
            var data = JSON.parse(jsonString);
            if (data.papers.length > 0 ) {
                for(var i=0;i<data.papers.length;i++) {
                    var idCode = type.concat("_").concat(data.papers[i].id);
                    idCode = idCode.replace(/\s+/g, '');
                    htmlString = htmlString.concat("<li class='list-group-item'>").concat(data.papers[i].title).concat("</span>");
                    htmlString = htmlString.concat("<span class='pull-right'><button type='button' class='btn btn-info btn-xs' data-toggle='collapse' data-target='");
                    htmlString = htmlString.concat("#").concat(idCode).concat("'>");
                    htmlString = htmlString.concat("<i class='fa fa-download fa-1'></i>");
                    htmlString = htmlString.concat("</button></span>");
                    htmlString = htmlString.concat("<div id='").concat(idCode).concat("' class='collapse'><br>");
                    htmlString = htmlString.concat("<span>").concat(data.papers[i].info).concat("</span>");
                    htmlString = htmlString.concat("<div>URL: <a href='").concat(data.papers[i].link).concat("' target='_blank'>");
                    htmlString = htmlString.concat(data.papers[i].link);
                    htmlString = htmlString.concat("</a></div>");
                    htmlString = htmlString.concat("<span>Tags: ");
                    if (data.papers[i].tags != null && data.papers[0].tags.length > 0) {
                        for(j=0;j<data.papers[0].tags.length;j++){
                            htmlString = htmlString.concat("<button class='btn btn-xs btn-primary'>");
                            htmlString = htmlString.concat(data.papers[i].tags[j].tag);
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
        if (type == "dl") {
            self.dlResearchData(htmlString);
        } else if ( type == "ml") {
            self.mlResearchData(htmlString);
        }
    };

    self.updateDlLocalData = function(){
        self.dlJsonData(root.dlDataJson());
        self.renderResearchJsonData(self.dlJsonData(), "dl");
    };

    self.updateMlLocalData = function(){
        self.mlJsonData(root.mlDataJson());
        self.renderResearchJsonData(self.mlJsonData() , "ml");
    };

    self.load = function () {
        root.getDlResearchData("pages/research/dl_research.json");
        self.updateDlLocalData();

        root.getMlResearchData("pages/research/ml_research.json");
        self.updateMlLocalData();
    };
    self.load();

}
function SocialViewModel(){


}
function ThisWeekViewModel(){
    this.pageHeader = ko.observable("This week at H2O");

}
function VideosViewModel(){


}

function ProjDeepDreamViewModel(){

    this.pageHeader = ko.observable("DeepDream (Neural Networks by Google)");

}