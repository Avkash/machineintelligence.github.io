function AlgoMasterViewModel(){

    var self = this;
    var base = {};

    this.root = AppViewModel;

    this.m = ko.observable();
    this.w = ko.observable();
    this.h = ko.observable();
    this.i = ko.observable();
    this.diagonal = ko.observable();
    this.vis = ko.observable();
    this.tree = ko.observable();

    this.pageHeader = ko.observable();
    self.alogPageType = ko.observable();
    self.quickDetails = ko.observable("Quick Details1");

    self.quickDetailsFunc = function(){
        var algoType = root.masterPageId();
        algoType = algoType.replace("algo_", "");
        var algoLinks = "";
        switch(algoType){
            case "glm":
                algoLinks = "pages/research/algo_glm_links.json";
                self.pageHeader("Generalized Linear Modeling (GLM)");
                break;
            case "gbm":
                algoLinks = "pages/research/algo_gbm_links.json";
                self.pageHeader("Gradient Boosting Machine (GBM)");
                break;
            case "drf":
                algoLinks = "pages/research/algo_drf_links.json";
                self.pageHeader("Distributed Random Forest (DRF)");
                break;
            case "dl":
                algoLinks = "pages/research/algo_dl_links.json";
                self.pageHeader("Deep Learning (DL)");
                break;
            case "nb":
                algoLinks = "pages/research/algo_nb_links.json";
                self.pageHeader("Naive Bayes (NB)");
                break;
            case "ensembles":
                algoLinks = "pages/research/algo_ensembles_links.json";
                self.pageHeader("Ensembles or Stacking");
                break;
            case "glrm":
                algoLinks = "pages/research/algo_glrm_links.json";
                self.pageHeader("Generalized Low Rank Models (GLRM)");
                break;
            case "kmeans":
                algoLinks = "pages/research/algo_kmeans_links.json";
                self.pageHeader("K-Means");
                break;
            case "pca":
                algoLinks = "pages/research/algo_pca_links.json";
                self.pageHeader("Principal Component Analysis");
                break;
            default:
                self.pageHeader("Algorithm");
        }
        root.getQuickAlgoLinksFunction(algoLinks);
        renderQuickAlgoLinksData(root.quickAlgoLinksDataJson());
    };

    self.renderQuickAlgoLinksData = function(jsonData){
        if (jsonData != null && jsonData.length > 0) {
            var data = JSON.parse(jsonData);
            var htmlString = "<ul class='list-group'>";
            if (data.links.length > 0 ) {
                for(var i=0;i<data.links.length;i++) {
                    var idCode = data.links[i].id;
                    idCode = idCode.replace(/\s+/g, '');
                    htmlString = htmlString.concat("<li class='list-group-item'><button type='button' class='btn btn-info btn-xs' data-toggle='collapse' data-target='");
                    htmlString = htmlString.concat("#").concat(idCode).concat("'>");
                    htmlString = htmlString.concat(data.links[i].id);
                    htmlString = htmlString.concat("</button>");
                    htmlString = htmlString.concat("<div id='").concat(idCode).concat("' class='collapse'><br>");
                    htmlString = htmlString.concat("<div><a href='").concat(data.links[i].linkInfo).concat("' target='_blank'>");
                    htmlString = htmlString.concat(data.links[i].linkInfo);
                    htmlString = htmlString.concat("</a></div>");
                    htmlString = htmlString.concat("</div></li>");
                }
            }
            htmlString = htmlString.concat("</ul>");
            self.quickDetails(htmlString);
        }
    };

    self.generateMlTree = function() {
        var visRoot;
        var algoType = root.masterPageId();
        var mlJsonPath = "";
        algoType = algoType.replace("algo_", "");
        switch(algoType){
            case "glm":
                self.pageHeader("Generalized Linear Modeling (GLM)");
                mlJsonPath = "pages/research/algo_glm.json";
                break;
            case "gbm":
                mlJsonPath = "pages/research/algo_gbm.json";
                self.pageHeader("Gradient Boosting Machine (GBM)");
                break;
            case "drf":
                mlJsonPath = "pages/research/algo_drf.json";
                self.pageHeader("Distributed Random Forest (DRF)");
                break;
            case "dl":
                mlJsonPath = "pages/research/algo_dl.json";
                self.pageHeader("Deep Learning (DL)");
                break;
            case "nb":
                mlJsonPath = "pages/research/algo_nb.json";
                self.pageHeader("Naive Bayes (NB)");
                break;
            case "ensembles":
                mlJsonPath = "pages/research/algo_ensembles.json";
                self.pageHeader("Ensembles or Stacking");
                break;
            case "glrm":
                mlJsonPath = "pages/research/algo_glrm.json";
                self.pageHeader("Generalized Low Rank Models (GLRM)");
                break;
            case "kmeans":
                mlJsonPath = "pages/research/algo_kmeans.json";
                self.pageHeader("K-Means");
                break;
            case "pca":
                mlJsonPath = "pages/research/algo_pca.json";
                self.pageHeader("Principal Component Analysis");
                break;
            default:
                self.pageHeader("Algorithm");
        }
        console.log("XXX: " + root.masterPageId() + " / " + mlJsonPath);
        d3.json(mlJsonPath, function(json) {
            visRoot = json;
            visRoot.x0 = h / 2;
            visRoot.y0 = 0;

            function toggleAll(d) {
                if (d.children) {
                    d.children.forEach(toggleAll);
                    toggle(d);
                }
            }
            // Initialize the display to show a few nodes.
            visRoot.children.forEach(toggleAll);
            if (visRoot.children.length > 0) {
                toggle(visRoot.children[0]);
            }
            if (visRoot.children.length > 1) {
                toggle(visRoot.children[1]);
                //toggle(visRoot.children[1].children[2]);
            }

            //toggle(visRoot.children[9]);
            //toggle(visRoot.children[9].children[0]);
            update(visRoot);
        });

        function toggle(d) {
                if (d.children) {
                    d._children = d.children;
                    d.children = null;
                } else {
                    d.children = d._children;
                    d._children = null;
                }
        };

        function update(source) {
            var duration = d3.event && d3.event.altKey ? 5000 : 500;

            // Compute the new tree layout.
            //var nodes = tree.nodes(root).reverse();
            var nodes = tree.nodes(visRoot).reverse();

            // Normalize for fixed-depth.
            nodes.forEach(function(d) { d.y = d.depth * 180; });

            // Update the nodes…
            var node = vis.selectAll("g.node")
                .data(nodes, function(d) { return d.id || (d.id = ++i); });

            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("svg:g")
                .attr("class", "node")
                .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                .on("click", function(d) { toggle(d); update(d); });

            nodeEnter.append("svg:circle")
                .attr("r", 1e-6)
                .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeEnter.append("svg:text")
                .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
                .attr("dy", ".35em")
                .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
                .text(function(d) { return d.name; })
                .style("fill-opacity", 1e-6);

            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

            nodeUpdate.select("circle")
                .attr("r", 4.5)
                .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
                .remove();

            nodeExit.select("circle")
                .attr("r", 1e-6);

            nodeExit.select("text")
                .style("fill-opacity", 1e-6);

            // Update the links…
            var link = vis.selectAll("path.link")
                .data(tree.links(nodes), function(d) { return d.target.id; });

            // Enter any new links at the parent's previous position.
            link.enter().insert("svg:path", "g")
                .attr("class", "link")
                .attr("d", function(d) {
                    var o = {x: source.x0, y: source.y0};
                    return diagonal({source: o, target: o});
                })
                .transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", function(d) {
                    var o = {x: source.x, y: source.y};
                    return diagonal({source: o, target: o});
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function(d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }
    };

    self.load = function(){

        self.m = [20, 120, 20, 120];
        self.w = 1280 - m[1] - m[3];
        self.h = 800 - m[0] - m[2];
        self.i = 0;
        self.tree = d3.layout.tree().size([h, w]);
        self.diagonal = d3.svg.diagonal().projection(function(d) { return [d.y, d.x]; });
        self.vis = d3.select("#algoTree").append("svg:svg")
            .attr("width", w + m[1] + m[3])
            .attr("height", h + m[0] + m[2])
            .append("svg:g")
            .attr("transform", "translate(" + m[3] + "," + m[0] + ")");
    };

    self.load();

}