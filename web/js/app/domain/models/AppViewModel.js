
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
    this.quickAlgoLinksDataJson = ko.observable();


    this.links = ko.observableArray([   "home", "thisweek", "links","github", "videos",
        "keywords",
        "social",
        "datasets",
        "research",
        "h2o", "tensorflow", "mxnet", "paddle", "caffe", "keras","theano",
        "dl4j", "ndimaj", "encog", "hpcct",
        "torch",
        "convnetjs",
        "accordnet",
        "mocha",
        "cntk", "mxnet",
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

    this.algoCollection = ko.observable({
        "gbm" : "Gradient Boosting Machine (GBM)",
        "glm" : "Genearlized Linear Machine (GLM)"
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

