

function AppViewModel() {
    var self = this;
    this.contentViewModel = ko.observable();

    this.currentWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    this.currentHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    this.masterTab = ko.observable("Deeplearn");
    this.masterDir= ko.observable("Home");
    this.masterLink= ko.observable("home");

    this.links = ko.observableArray([   "home", "thisweek", "links","github", "videos", "keywords", "social",
        "tensorflow", "mxnet", "paddle", "caffe",
        "dl4j", "ndimaj", "encog",
        "algo_glm", "algo_gbm", "algo_dl", "algo_drf", "algo_nb", "algo_ensembles", "algo_glrm", "algo_kmeans", "algo_pca"]);

    this.linksHtml = ko.observable({
        "home" : "home.html",
        "master" : "master.html",
        "thisweek" : "thisweek.html",
        "links": "h2o_links.html",
        "github" : "h2o_github.html",
        "videos": "h2o_videos.html",
        "keywords" : "glossary-keywords.html",
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
        "algo_pca" : "algo_pca.html"
    });

    this.viewModelPool = ko.observable({
        "home": HomeViewModel,
        "master" : MasterPageViewModel,
        "thisweek": ThisWeekViewModel,
        "links": LinksViewModel,
        "github": GitHubViewModel,
        "videos" : VideosViewModel,
        "keywords" : KeywordsViewModel,
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
        "algo_pca" : AlgoPcaViewModel
    });

    this.masterCollection = ko.observable({
         "tensorflow" : "TenserFlow from Google",
         "mxnet" : "MxNet",
         "paddle" : "Paddle from Baidu",
         "caffe" : "Caffe from Berkley",
         "dl4j" : "Deeplearning 4 Java",
         "ndimaj" : "N-Dimensional Array for Java",
         "encog" : "EnCog"
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




function FirstLinkViewModel() {
    this.testField = ko.observable("first link's viewModel");
}

function GitHubViewModel(){

    var self = this;
    this.root = AppViewModel;
    this.pageHeader = ko.observable("Github");

}

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

function KeywordsViewModel(){


}
function LinksViewModel(){


}


function MainViewModel() {
    this.testField = ko.observable("this is the test field for mainViewModel");
}

function MasterPageViewModel() {

    var self = this;
    this.root = AppViewModel;
    this.firstName = ko.observable("asc");
    this.homeField = ko.observable("this is the test field for HomeViewModel");



    this.pageMainHeader = ko.observable("Page Heading...");
    this.pageSubHeader = ko.observable("Sub Heading..");
    this.pageContent = ko.observable("Content");
    this.pageContentLinks = ko.observable("ContentLinks");

    this.loadPageContent = function(){




    }

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