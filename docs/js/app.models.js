

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
    this.DatasetListJson = ko.observable();
    this.VideosListJson = ko.observable();
    this.PdfListJson = ko.observable();
    this.allLinkdDataJson = ko.observable();
    this.quickAlgoLinksDataJson = ko.observable();
    this.selectedTrainingJson = ko.observable();


    this.links = ko.observableArray([   "home", "thisweek", "links","github", "videos",
        "keywords",
        "social",
        "datasets",
        "research",
        "h2o", "tensorflow", "xgboost", "mxnet", "paddle", "caffe", "keras","theano",
        "dl4j", "ndimaj", "encog", "hpcct", "nervana",
        "torch",
        "convnetjs",
        "accordnet",
        "mocha",
        "cntk",
        "gobrain",
        "algo",
        "algo_glm", "algo_gbm", "algo_dl", "algo_drf", "algo_nb", "algo_ensembles", "algo_glrm", "algo_kmeans", "algo_pca",
        "training", "cs231n", "101dskeys", "101dlkeys",
        "proj_deepdream"]);

    this.linksHtml = ko.observable({
        "home" : "home.html",
        "master" : "master.html",
        "thisweek" : "thisweek.html",
        "links": "alllinks.html",
        "github" : "my_github.html",
        "videos": "all_videos.html",
        "pdf": "all_pdf.html",
        "datasets" : "datasets.html",
        "research" : "research.html",
        /* "keywords" : "glossary-keywords.html", */
        "social" :  "my_social.html",
        /* Algorithms */
        "algo_glm" : "algo_master.html",
        "algo_gbm" : "algo_master.html",
        "algo_dl" : "algo_master.html",
        "algo_drf" : "algo_master.html",
        "algo_nb" : "algo_master.html",
        "algo_ensembles" : "algo_master.html",
        "algo_glrm" : "algo_master.html",
        "algo_kmeans" : "algo_master.html",
        "algo_pca" : "algo_master.html",
        /* Projects */
        "proj_deepdream" : "proj_deepdream.html",
        /* keywords */
        "keywords" : "keywords.html",
        "training": "training.html",
        "101dskeys" : "101keys.html",
        "101dlkeys" : "101keys.html"
    });

    this.viewModelPool = ko.observable({
        "master" : MasterPageViewModel,
        "thisweek": ThisWeekViewModel,
        "links": LinksViewModel,
        "github": GitHubViewModel,
        "videos" : VideosViewModel,
        "pdf" : PdfViewModel,
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
        "home": HomeViewModel,
        "training" : TrainingViewModel,
        "101dskeys" : KeysViewModel,
        "101dlkeys" : KeysViewModel
    });

    this.masterCollection = ko.observable({
         "h2o" : "H2O Machine Learning in Java, Python, Scala and R",
         "tensorflow" : "TensorFlow from Google",
         "mxnet" : "MxNet",
         "nervana" : "Nervana - Neon from Intel",
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
         "gobrain": "GoBrain",
         "cs231n" : "CS231n"
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

    self.getTrainingLinksFunction = function (fileName){
        $.get(fileName, function (data, status) {
            self.selectedTrainingJson(JSON.stringify(data));
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

    self.getDatasetListFunction = function (fileName){
        $.get(fileName, function (data, status) {
            self.DatasetListJson(JSON.stringify(data));
        });
    };

    self.getVideosListFunction = function (fileName){
        $.get(fileName, function (data, status) {
            self.VideosListJson(JSON.stringify(data));
        });
    };

    self.getPdfListFunction = function (fileName){
        $.get(fileName, function (data, status) {
            self.PdfListJson(JSON.stringify(data));
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

    self.quickDetailsFunc = function(){
        var algoType = root.masterPageId();
        algoType = algoType.replace("algo_", "");
        var algoLinks = "";
        switch(algoType){
            case "glm":
                algoLinks = "pages/research/algo_glm_links.json";
                self.pageHeader("Generalized Linear Modeling (GLM)");
                break;
            case "gbm":
                algoLinks = "pages/research/algo_gbm_links.json";
                self.pageHeader("Gradient Boosting Machine (GBM)");
                break;
            case "drf":
                algoLinks = "pages/research/algo_drf_links.json";
                self.pageHeader("Distributed Random Forest (DRF)");
                break;
            case "dl":
                algoLinks = "pages/research/algo_dl_links.json";
                self.pageHeader("Deep Learning (DL)");
                break;
            case "nb":
                algoLinks = "pages/research/algo_nb_links.json";
                self.pageHeader("Naive Bayes (NB)");
                break;
            case "ensembles":
                algoLinks = "pages/research/algo_ensembles_links.json";
                self.pageHeader("Ensembles or Stacking");
                break;
            case "glrm":
                algoLinks = "pages/research/algo_glrm_links.json";
                self.pageHeader("Generalized Low Rank Models (GLRM)");
                break;
            case "kmeans":
                algoLinks = "pages/research/algo_kmeans_links.json";
                self.pageHeader("K-Means");
                break;
            case "pca":
                algoLinks = "pages/research/algo_pca_links.json";
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

    self.generateMlTree = function() {
        var visRoot;
        var algoType = root.masterPageId();
        var mlJsonPath = "";
        algoType = algoType.replace("algo_", "");
        switch(algoType){
            case "glm":
                self.pageHeader("Generalized Linear Modeling (GLM)");
                mlJsonPath = "pages/research/algo_glm.json";
                break;
            case "gbm":
                mlJsonPath = "pages/research/algo_gbm.json";
                self.pageHeader("Gradient Boosting Machine (GBM)");
                break;
            case "drf":
                mlJsonPath = "pages/research/algo_drf.json";
                self.pageHeader("Distributed Random Forest (DRF)");
                break;
            case "dl":
                mlJsonPath = "pages/research/algo_dl.json";
                self.pageHeader("Deep Learning (DL)");
                break;
            case "nb":
                mlJsonPath = "pages/research/algo_nb.json";
                self.pageHeader("Naive Bayes (NB)");
                break;
            case "ensembles":
                mlJsonPath = "pages/research/algo_ensembles.json";
                self.pageHeader("Ensembles or Stacking");
                break;
            case "glrm":
                mlJsonPath = "pages/research/algo_glrm.json";
                self.pageHeader("Generalized Low Rank Models (GLRM)");
                break;
            case "kmeans":
                mlJsonPath = "pages/research/algo_kmeans.json";
                self.pageHeader("K-Means");
                break;
            case "pca":
                mlJsonPath = "pages/research/algo_pca.json";
                self.pageHeader("Principal Component Analysis");
                break;
            default:
                self.pageHeader("Algorithm");
        }
        console.log("XXX: " + root.masterPageId() + " / " + mlJsonPath);
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
        root.getDatasetListFunction("pages/json/datasetslist.json");
        self.dsJsonData(root.DatasetListJson());
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
    this.tree = ko.observable();
    self.selectedJsonFile = ko.observable();

    this.pageMainHeader = ko.observable("Your home for machine intelligence");
    this.pageHeader = ko.observable("Your home for machine intelligence");
    this.pageSubHeader = ko.observable("Subpage");
    this.sideHeader = ko.observable("Sideheader ");

    this.updateDataBox = function(link){
        console.log("link: " + link);
    };

    this.homePageChanger = function(data, event){
        return false;
    };

    self.jsonLoader = function(jsonId){
        var jsonFileName= "visual_ml.json";
        switch(jsonId){
            case 'main':
                jsonFileName = 'visual_ml.json';
                break;
            case 'algos':
                jsonFileName = 'visual_algos.json';
                break;
            case 'type':
                jsonFileName = 'visual_ml.json';
                break;
            case 'learn':
                jsonFileName = 'visual_ml.json';
                break;
            case 'package':
                jsonFileName = 'visual_ml.json';
                break;
            case 'language':
                jsonFileName = 'visual_ml.json';
                break;
            case 'usability':
                jsonFileName = 'visual_ml.json';
                break;
            case 'complexity':
                jsonFileName = 'visual_ml.json';
                break;
        }
        self.selectedJsonFile("pages/json/"+jsonFileName);
        self.selectJsonTree();
    };

    this.selectJsonTree = function() {
        var treeDiv = document.getElementById("mlTree");
        var svgDiv = treeDiv.getElementsByTagName("svg");
        this.generateMlTree(self.selectedJsonFile());
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
            toggle(visRoot.children[0]);
            //toggle(visRoot.children[1].children[2]);
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
        }

        function showCircleToolTip(d, n, nu, nt){
            // d is circle here, n is the node,
            // nu.id will give the id of clicked node
            console.log("clicked - " + nu.id);
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
                .style("stroke","blue")
                .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            vis.selectAll("circle").on("click", function(){
                d3.select(this).attr('r', 10)
                    .style("fill","pink")
                    .style("stroke","#d6d6d6");
                showCircleToolTip(this, node,nodeUpdate, nodeEnter);
            });

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

function KeysViewModel() {
    var self = this;
    var base = {};

    this.root = AppViewModel;

    this.pageHeader = ko.observable("All Keys");
    this.pageSubHeader = ko.observable();
    this.pageDetails =  ko.observable();



    self.generateMlTree = function() {
        var mlJsonPath;
        if (root.masterPageId() == '101dskeys') {
            //self.pageDetails(root.masterPageId());
            self.pageDetails("Data Science ");
            mlJsonPath = 'pages/json/101dskeys.json';
        } else if (root.masterPageId() == '101dlkeys')  {
            //self.pageDetails(root.masterPageId());
            self.pageDetails("Deep Learning ");
            mlJsonPath = 'pages/json/101dlkeys.json';
        } else {
            return;
        }

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
        self.w = 1480 - m[1] - m[3];
        self.h = 700 - m[0] - m[2];
        self.i = 0;
        self.tree = d3.layout.tree().size([h, w]);
        self.diagonal = d3.svg.diagonal().projection(function(d) { return [d.y, d.x]; });
        self.vis = d3.select("#keysTreeDiv").append("svg:svg")
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
        root.getPdfListFunction("pages/json/pdflist.json");
        self.pdfJsonData(root.PdfListJson());
        self.renderPdfListJsonData();

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
function TrainingViewModel() {
    var self = this;
    var base = {};

    this.root = AppViewModel;

    this.pageHeader = ko.observable("Trainings all over");
    this.pageSubHeader = ko.observable();
    self.quickTrainingJson = ko.observable();
    self.quickTrainingDetails = ko.observable("Training Details");


    this.loadTrainingData = function(){
        root.getTrainingLinksFunction("pages/json/trainings.json");
        self.quickTrainingJson(root.selectedTrainingJson());
        renderTrainingData();
    };

    self.renderTrainingData = function() {
        if (self.quickTrainingJson() != null && self.quickTrainingJson().length > 0) {
            var data = JSON.parse(self.quickTrainingJson());
            var htmlString = "<ul class='list-group'>";
            if (data.alllinks != null && data.alllinks.length > 0 ) {
                for(var i=0;i<data.alllinks.length;i++) {
                    if (data.alllinks[i].section == root.masterPageId()) {
                        var localObj = data.alllinks[i].children;
                        if (localObj != null && localObj.length > 0) {
                            for(var j=0;j<localObj.length;j++){
                                var idCode = localObj[j].id;
                                idCode = idCode.replace(/\s+/g, '');
                                htmlString = htmlString.concat("<li class='list-group-item'>");
                                htmlString = htmlString.concat("<span class='input-group'>");
                                htmlString = htmlString.concat("<button type='button' class='btn btn-warning btn-xs' data-toggle='collapse' data-target='");
                                htmlString = htmlString.concat("#").concat(idCode).concat("'>");
                                htmlString = htmlString.concat("<i class='fa fa-link fa-1'></i>");
                                htmlString = htmlString.concat("</button>&nbsp;").concat(localObj[j].title);
                                htmlString = htmlString.concat("</span><span>");
                                htmlString = htmlString.concat("<div id='").concat(idCode).concat("' class='collapse'><br>");
                                htmlString = htmlString.concat("<div><a href='").concat(localObj[j].link).concat("' target='_blank'>");
                                htmlString = htmlString.concat(localObj[j].link);
                                htmlString = htmlString.concat("</a></span></div>");
                                htmlString = htmlString.concat("</div></li>");
                            }
                        }
                    }
                }
            }
            htmlString = htmlString.concat("</ul>");
            self.quickTrainingDetails(htmlString);
            console.log(self.quickTrainingDetails());
        }
    };

    this.load = function(){
        this.pageSubHeader(root.masterPageId());
        self.loadTrainingData();
    };

    this.load();

}
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

function ProjDeepDreamViewModel(){

    this.pageHeader = ko.observable("DeepDream (Neural Networks by Google)");

}