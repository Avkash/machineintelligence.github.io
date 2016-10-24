(function () {
    Sammy(function() {
        console.log("window.location.hash: " + window.location.hash);
        this.get('#/deeplearning/python/:link', function() {
            AppViewModel.masterTab("Deep Learning");
            AppViewModel.masterDir("Python");
            AppViewModel.masterPageId(this.params["link"]);
            AppViewModel.masterLink(AppViewModel.masterCollection()[this.params["link"]]);
            getView("master");
        });

        this.get('#/deeplearning/java/:link', function() {
            AppViewModel.masterTab("Deep Learning");
            AppViewModel.masterDir("Java");
            AppViewModel.masterPageId(this.params["link"]);
            AppViewModel.masterLink(AppViewModel.masterCollection()[this.params["link"]]);
            getView("master");
        });
        this.get('#/deeplearning/js/:link', function() {
            AppViewModel.masterTab("Deep Learning");
            AppViewModel.masterDir("JavaScript");
            AppViewModel.masterPageId(this.params["link"]);
            AppViewModel.masterLink(AppViewModel.masterCollection()[this.params["link"]]);
            getView("master");
        });
        this.get('#/deeplearning/lua/:link', function() {
            AppViewModel.masterTab("Deep Learning");
            AppViewModel.masterDir("Lua");
            AppViewModel.masterPageId(this.params["link"]);
            AppViewModel.masterLink(AppViewModel.masterCollection()[this.params["link"]]);
            getView("master");
        });
        this.get('#/deeplearning/cpp/:link', function() {
            AppViewModel.masterTab("Deep Learning");
            AppViewModel.masterDir("C++");
            AppViewModel.masterPageId(this.params["link"]);
            AppViewModel.masterLink(AppViewModel.masterCollection()[this.params["link"]]);
            getView("master");
        });
        this.get('#/deeplearning/go/:link', function() {
            AppViewModel.masterTab("Deep Learning");
            AppViewModel.masterDir("Go");
            AppViewModel.masterPageId(this.params["link"]);
            AppViewModel.masterLink(AppViewModel.masterCollection()[this.params["link"]]);
            getView("master");
        });
        this.get('#/deeplearning/julia/:link', function() {
            AppViewModel.masterTab("Deep Learning");
            AppViewModel.masterDir("Julia");
            AppViewModel.masterPageId(this.params["link"]);
            AppViewModel.masterLink(AppViewModel.masterCollection()[this.params["link"]]);
            getView("master");
        });
        this.get('#/deeplearning/net/:link', function() {
            AppViewModel.masterTab("Deep Learning");
            AppViewModel.masterDir(".NET");
            AppViewModel.masterPageId(this.params["link"]);
            AppViewModel.masterLink(AppViewModel.masterCollection()[this.params["link"]]);
            getView("master");
        });
        this.get('#/algorithm/all/:link', function() {
            AppViewModel.masterTab("Algorithm");
            AppViewModel.masterDir("All");
            AppViewModel.masterPageId(this.params["link"]);
            getView(this.params["link"]);
        });
        this.get('#/training/all/:link', function() {
            AppViewModel.masterTab("Training");
            AppViewModel.masterDir("All");
            AppViewModel.masterPageId(this.params["link"]);
            getView('training');
        });

        this.get('#/:link', function() {
            getView(this.params["link"]);
        });

        this.notFound = function(){
            //console.log("not found");
        }
    }).run();

    function getView(view) {
        console.log("what is view:" + view);
        var urlStr = "pages/".concat(AppViewModel.linksHtml()[view]);
        if (view.startsWith("algo_")) {
            AppViewModel.contentViewModel(AppViewModel.viewModelPool()[view]);
            urlStr = "pages/algos/".concat(AppViewModel.linksHtml()[view]);
        } else if (view.startsWith("proj_")) {
            AppViewModel.contentViewModel(AppViewModel.viewModelPool()[view]);
            urlStr = "pages/projs/".concat(AppViewModel.linksHtml()[view]);
        } else if (view.startsWith("keywords_")) {
            var locVal = view.indexOf("_")+1;
            var actualKey = view.substr(view.indexOf("_") + 1, 1);
            console.log("actualKey : " + locVal + " / " + actualKey);
            AppViewModel.masterKeywordId(actualKey);
            view = "keywords";
            urlStr = "pages/".concat(AppViewModel.linksHtml()[view]);
            AppViewModel.contentViewModel(AppViewModel.viewModelPool()[view]);
        } else if (view.startsWith("training_")) {
            view = "training";
            urlStr = "pages/".concat(AppViewModel.linksHtml()[view]);
            AppViewModel.contentViewModel(AppViewModel.viewModelPool()[view]);
        } else {
            urlStr = "pages/".concat(AppViewModel.linksHtml()[view]);
            AppViewModel.contentViewModel(AppViewModel.viewModelPool()[view]);
        }
        console.log("url: " + urlStr);
        $.ajax({
            url: urlStr, //url: "pages/".concat(view, ".html"),
            type: "GET",
            dataType: "html",
            success: function (data) {
                var element = $("#content-holder").find(".main-content-holder");
                element.html(data);
                ko.cleanNode(element[0]);
                ko.applyBindings(AppViewModel.contentViewModel(), element[0]);
            }
        });
    }
})();
