(function () {
    Sammy(function() {
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
        } else if (view.startsWith("h2o_")) {
            urlStr = "pages/h2o/".concat(AppViewModel.linksHtml()[view]);
        } else if (view.startsWith("sw_")) {
            urlStr = "pages/sw/".concat(AppViewModel.linksHtml()[view]);
        } else {
            urlStr = "pages/".concat(AppViewModel.linksHtml()[view]);
        }
        console.log("urlStr: " + urlStr);
        $.ajax({
            url: urlStr, //url: "pages/".concat(view, ".html"),
            type: "GET",
            dataType: "html",
            success: function (data) {
                //AppViewModel.contentView(data);
                //AppViewModel.pageLoaderSensor(!AppViewModel.pageLoaderSensor());

                //var element = $("#content-holder").find(".content");
                var element = $("#content-holder").find(".main-content-holder");
                element.html(data);
                ko.cleanNode(element[0]);
                ko.applyBindings(AppViewModel.contentViewModel(), element[0]);
            }
        });
    }
})();

/*
(function () {
    Sammy(function() {
        this.get('#/:link', function() {
            getView(this.params["link"]);
        });
        this.notFound = function(){
            console.log("not found");
        }
    }).run();

    function getView(view) {
        console.log("view: " + view);
        AppViewModel.contentViewModel(AppViewModel.viewModelPool()[view]);
        var urlStr = "pages/".concat(AppViewModel.linksHtml()[view]);
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

    */