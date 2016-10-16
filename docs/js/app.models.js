

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

    this.links = ko.observableArray([   "home", "thisweek", "links","github", "videos",
        "keywords",
        "social",
        "h2o", "tensorflow", "mxnet", "paddle", "caffe", "keras","theano",
        "dl4j", "ndimaj", "encog", "hpcct",
        "torch",
        "convnetjs",
        "accordnet",
        "mocha",
        "cntk", "mxnet",
        "gobrain",
        "algo_glm", "algo_gbm", "algo_dl", "algo_drf", "algo_nb", "algo_ensembles", "algo_glrm", "algo_kmeans", "algo_pca",
        "proj_deepdream"]);

    this.linksHtml = ko.observable({
        "home" : "home.html",
        "master" : "master.html",
        "thisweek" : "thisweek.html",
        "links": "h2o_links.html",
        "github" : "h2o_github.html",
        "videos": "h2o_videos.html",
        /* "keywords" : "glossary-keywords.html", */
        "social" :  "h2o_social.html",
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
        /* Algorithms*/
        "algo_glm" : AlgoGlmViewModel,
        "algo_gbm" : AlgoGbmViewModel,
        "algo_dl" : AlgoDlViewModel,
        "algo_drf" : AlgoDrfViewModel,
        "algo_nb" : AlgoNbViewModel,
        "algo_ensembles" : AlgoEnsemblesViewModel,
        "algo_glrm" : AlgoGlrmViewModel,
        "algo_kmeans" : AlgoKmeansViewModel,
        "algo_pca" : AlgoPcaViewModel,
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
    }

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

    this.pageHeader = ko.observable("Your home for machine intelligence");

    this.showD3Tree = function() {
        var resultHTML = "";
        var divId = "mlTreeZ";
        resultHTML = resultHTML.concat("<h1>AAAAAAABBBBB</h1>");
        $(divId).html(resultHTML);
    };

    this.updateDataBox = function(link){
        console.log("link: " + link);
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
        d3.json(mlJsonPath, function(json) {   /*  "js/vendor/d3/flare.json" */
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

    this.pageHeader = ko.observable("External Links");

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

    self.getPageJsonData = function (localObjStr) {
        console.log("root.masterPageJson() -> " + localObjStr);
        if (localObjStr.trim().length > 0) {
            var localObj = JSON.parse(localObjStr);
            if (localObj.title != null) {
                self.pageMainHeader(localObj.title);
            }
            if (localObj.subTitle != null) {
                self.pageSubHeader(localObj.subTitle);
            }
            if (localObj.contents > 0) {

            }
            if (localObj.links > 0) {

            }
        }
    };
    self.load = function(){
        root.getMasterJsonFunction(root.masterPageId());
        //console.log("Log: " + root.masterPageId() + " / " + root.masterPageJson());
        getPageJsonData(root.masterPageJson());
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

function AlgoDlViewModel(){

    this.pageHeader = ko.observable("Deep Learning (Neural Networks)");

}
function AlgoDrfViewModel(){

    this.pageHeader = ko.observable("Distributed Random Forest (DRF)");

}
function AlgoEnsemblesViewModel(){

    this.pageHeader = ko.observable("Ensembles (Stacking)");


}
function AlgoGbmViewModel(){

    this.pageHeader = ko.observable("Gradient Boosting Machine (GBM)");

}
function AlgoGlmViewModel() {
    this.pageHeader = ko.observable("Generalized Linear Modeling (GLM)");
}
function AlgoGlrmViewModel(){

    this.pageHeader = ko.observable("Generalized Low Rank Models (GLRM)");


}
function AlgoKmeansViewModel(){

    this.pageHeader = ko.observable("K-Means Clustering");


}
function AlgoNbViewModel(){

    this.pageHeader = ko.observable("Naive Bayes");

}
function AlgoPcaViewModel(){

    this.pageHeader = ko.observable("Principal Components Analysis (PCA)");

}

function ProjDeepDreamViewModel(){

    this.pageHeader = ko.observable("DeepDream (Neural Networks by Google)");

}