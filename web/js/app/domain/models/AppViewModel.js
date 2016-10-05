
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

    this.links = ko.observableArray([   "home", "thisweek", "links","github", "videos", "keywords", "social",
        "h2o", "tensorflow", "mxnet", "paddle", "caffe", "keras","theano",
        "dl4j", "ndimaj", "encog",
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
        "algo_pca" : "algo_pca.html",
        /* Projects */
        "proj_deepdream" : "proj_deepdream.html"
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
        "algo_pca" : AlgoPcaViewModel,
        /* Projects */
        "proj_deepdream" : ProjDeepDreamViewModel
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




}

