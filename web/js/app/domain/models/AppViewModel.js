
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
        "dl4j", "ndimaj", "encog", "hpcct",
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

