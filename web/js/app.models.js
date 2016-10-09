

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
        "home": HomeViewModel,
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
        "keywords" : KeywordsViewModel
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
        //console.log("getMasterJsonFunction: " + root.masterPageId() + " / " + root.masterPageJson());
        $.get("pages/libs.json", function (data, status) {
            for(var i=0;i<data.length;i++) {
                if (data[i].id == pageId) {
                    self.masterPageJson(JSON.stringify(data[i]));
                    break;
                }
            }
        });
    }

    self.getKeywordsJsonFunction = function (pageId){
        console.log("getKeywordsJsonFunction: [" + root.masterKeywordId() + "]");
        $.get("pages/keywords.json", function (data, status) {
            for(var i=0;i<data.length;i++) {
                if (data[i].id == pageId) {
                    self.keywordJson(JSON.stringify(data[i]));
                    break;
                }
            }
        });
        console.log("keywordJson: [" + self.keywordJson() + "]");
    }



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

    this.firstName = ko.observable("asc");
    this.pageHeader = ko.observable("Home sweet home");
    this.homeField = ko.observable("this is the test field for HomeViewModel");

    this.divHeight = root.visibleWidth;


    this.showD3Tree = function() {
        var resultHTML = "";
        var divId = "mlTreeZ";
        resultHTML = resultHTML.concat("<h1>AAAAAAABBBBB</h1>");
        $(divId).html(resultHTML);
    }
}

function KeywordsViewModel(){

    var self = this;
    var base = {};
    this.root = AppViewModel;

    this.pageHeader = ko.observable("Machine Learning Keywords");
    self.pageMainHeader = ko.observable("Page Heading...");
    self.pageSubHeader = ko.observable("Sub Heading..");
    self.pageContent = ko.observable("Content");


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
            if (localObj.contents > 0) {

            }
            if (localObj.links > 0) {

            }
        }
    };



    self.load = function(){
        root.getKeywordsJsonFunction(root.masterKeywordId());
        console.log("KLog: [" + root.masterKeywordId() + "] / " + root.keywordJson());
        getKeywordsJsonData(root.keywordJson());
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