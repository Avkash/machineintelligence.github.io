
function AppViewModel() {
    var self = this;
    this.contentViewModel = ko.observable();

    this.currentWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    this.currentHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    this.masterTab = ko.observable("Deeplearn");
    this.masterDir= ko.observable("Home");
    this.masterLink= ko.observable("home");

    this.links = ko.observableArray([   "home", "thisweek", "links","github", "videos", "keywords", "social", "ml_lib_tensorflow", "ml_lib_mxnet",
        "h2o_arch","h2o_dl", "h2o_gs", "h2o_docs", "h2o_faq", "h2o_tut",
        "sw_docs", "sw_arch",
        "algo_glm", "algo_gbm", "algo_dl", "algo_drf", "algo_nb", "algo_ensembles", "algo_glrm", "algo_kmeans", "algo_pca"]);
    this.linksHtml = ko.observable({
        "home" : "home.html",
        "ml_lib_tensorflow" : "master.html",
        "ml_lib_mxnet" : "master.html",
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
        "ml_lib_tensorflow" : MasterPageViewModel,
        "ml_lib_mxnet" : MasterPageViewModel,
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

