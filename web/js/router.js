(function () {
    Sammy(function() {
        this.get('#/deeplearning/python/:link', function() {
            AppViewModel.masterTab("Deep Learning");
            AppViewModel.masterDir("Python");
            AppViewModel.masterLink(AppViewModel.masterCollection()[this.params["link"]]);
            //getView(this.params["link"]);
            getView("master");
        });

        this.get('#/deeplearning/java/:link', function() {
            AppViewModel.masterTab("Deep Learning");
            AppViewModel.masterDir("Java");
            AppViewModel.masterLink(AppViewModel.masterCollection()[this.params["link"]]);
            //getView(this.params["link"]);
            getView("master");
        });

        this.get('#/:link', function() {
            getView(this.params["link"]);
        });

        this.notFound = function(){
            console.log("not found");
        }
    }).run();

    function getView(view) {
        AppViewModel.contentViewModel(AppViewModel.viewModelPool()[view]);
        var urlStr;
        console.log("view: " + view);
        if (view.startsWith("algo_")) {
            urlStr = "pages/algos/".concat(AppViewModel.linksHtml()[view]);
        } else {
            urlStr = "pages/".concat(AppViewModel.linksHtml()[view]);
        }
        console.log("urlStr: " + urlStr);
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
