

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
        "h2o_arch","h2o_dl", "h2o_gs", "h2o_docs", "h2o_faq", "h2o_tut",
        "sw_docs", "sw_arch",
        "algo_glm", "algo_gbm", "algo_dl", "algo_drf", "algo_nb", "algo_ensembles", "algo_glrm", "algo_kmeans", "algo_pca"]);
    this.linksHtml = ko.observable({
        "home" : "home.html",
        "tensorflow" : "master.html",
        "mxnet" : "master.html",
        "paddle" : "master.html",
        "caffe" : "master.html",
        "thisweek" : "thisweek.html",
        "links": "h2o_links.html",
        "github" : "h2o_github.html",
        "videos": "h2o_videos.html",
        "keywords" : "glossary-keywords.html",
        "social" :  "h2o_social.html",
        /* H2O */
        "h2o_arch" : "h2o_arch.html",
        "h2o_dl" : "h2o_download.html",
        "h2o_gs" : "h2o_started.html",
        "h2o_docs": "h2o_docs.html",
        "h2o_faq": "h2o_faq.html",
        "h2o_tut": "h2o_tut.html",
        /* Sparkling Water*/
        "sw_docs" : "sw_docs.html",
        "sw_arch" : "sw_arch.html",
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
        "tensorflow" : MasterPageViewModel,
        "mxnet" : MasterPageViewModel,
        "paddle" : MasterPageViewModel,
        "caffe" : MasterPageViewModel,
        "thisweek": ThisWeekViewModel,
        "links": LinksViewModel,
        "github": GitHubViewModel,
        "videos" : VideosViewModel,
        "keywords" : KeywordsViewModel,
        "social" : SocialViewModel,
        /* H2O */
        "h2o_arch" : H2OArchViewModel,
        "h2o_dl" : H2ODownloadViewModel,
        "h2o_gs" : H2OStartedViewModel,
        "h2o_faq": H2OFaqViewModel,
        "h2o_docs": H2ODocsViewModel,
        "h2o_tut" : H2OTutorialViewModel,
        /* Sparkling Water */
        "sw_docs" : SwDocsViewModel,
        "sw_arch" : SwArchViewModel,
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

    this.contentView = ko.observable();
    this.changeUrl = function (linkKey) {
        switch(linkKey) {
            case "tensorflow":
                this.masterTab("DL");
                this.masterDir("Python");
                this.masterLink("TensorFlow");
                break;
            case "mxnet":
                this.masterTab("DL");
                this.masterDir("Python");
                this.masterLink("MxNet");
                break;
            case "paddle":
                this.masterTab("DL");
                this.masterDir("Python");
                this.masterLink("Paddle");
                break;
            case "caffe":
                this.masterTab("DL");
                this.masterDir("Python");
                this.masterLink("Caffe");
                break;
        }
        location.hash = "/".concat(linkKey);
    };


    /*
    this.links = ko.observableArray([   "home", "master", "ml_lib_tensorflow", "ml_lib_mxnet" ]);

    this.linksHtml = ko.observable({
        "home": "home.html",
        "master": "master.html",
        "ml_lib_tensorflow" : "master.html",
        "ml_lib_mxnet" : "master.html"
    });

    this.viewModelPool = ko.observable({
        "home": HomeViewModel,
        "master": MasterPageViewModel,
        "ml_lib_tensorflow": MasterPageViewModel,
        "ml_lib_mxnet" : MasterPageViewModel
    });



    this.changeUrl = function (linkKey) {
        switch(linkKey) {
            case "ml_lib_tensorflow":
                this.masterTab("ml");
                this.masterDir("lib");
                this.masterLink("tensorflow");
                break;
            case "ml_lib_mxnet":
                this.masterTab("ml");
                this.masterDir("lib");
                this.masterLink("mxnet");
                break;
        }
        location.hash = "/".concat(linkKey);
    };

    this.contentView = ko.observable();

    */

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
    this.pageHeader = ko.observable("Master");
    this.homeField = ko.observable("this is the test field for HomeViewModel");


}


function SecondLinkViewModel() {
    this.testField = ko.observable("second link's viewModel");
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


function H2OArchViewModel() {
    this.pageHeader = ko.observable("Architecture");
    this.homeField = ko.observable("this is the test field for HomeViewModel");
}

function H2ODocsViewModel() {
    this.pageHeader = ko.observable("Full Documentation");
}

function H2ODownloadViewModel() {
    this.pageHeader = ko.observable("Downloads");
    this.homeField = ko.observable("this is the test field for H2OArchViewModel");


}

function H2OFaqViewModel(){
    this.pageHeader = ko.observable("Frequently Asked Questions (FAQ)");
}
function H2OStartedViewModel(){


}
function H2OTutorialViewModel(){
    this.pageHeader = ko.observable("Tutorials");
}

function SwArchViewModel(){

    this.pageHeader = ko.observable("Architecture");

}
function SwDocsViewModel(){

    this.pageHeader = ko.observable("Documentation");

}