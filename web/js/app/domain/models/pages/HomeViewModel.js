
function HomeViewModel() {

    var self = this;
    var base = {};

    this.root = AppViewModel;

    this.m = ko.observable();
    this.w = ko.observable();
    this.h = ko.observable();
    this.i = ko.observable();
    this.diagonal = ko.observable();
    this.tree = ko.observable();
    self.selectedJsonFile = ko.observable();

    this.pageMainHeader = ko.observable("Your home for machine intelligence");
    this.pageHeader = ko.observable("Your home for machine intelligence");
    this.pageSubHeader = ko.observable("Subpage");
    this.sideHeader = ko.observable("Sideheader ");

    this.updateDataBox = function(link){
        console.log("link: " + link);
    };

    this.homePageChanger = function(data, event){
        return false;
    };

    self.jsonLoader = function(jsonId){
        var jsonFileName= "visual_ml.json";
        switch(jsonId){
            case 'main':
                jsonFileName = 'visual_ml.json';
                break;
            case 'algos':
                jsonFileName = 'visual_algos.json';
                break;
            case 'type':
                jsonFileName = 'visual_ml.json';
                break;
            case 'learn':
                jsonFileName = 'visual_ml.json';
                break;
            case 'package':
                jsonFileName = 'visual_ml.json';
                break;
            case 'language':
                jsonFileName = 'visual_ml.json';
                break;
            case 'usability':
                jsonFileName = 'visual_ml.json';
                break;
            case 'complexity':
                jsonFileName = 'visual_ml.json';
                break;
        }
        self.selectedJsonFile("pages/json/"+jsonFileName);
        self.selectJsonTree();
    };

    this.selectJsonTree = function() {
        var treeDiv = document.getElementById("mlTree");
        var svgDiv = treeDiv.getElementsByTagName("svg");
        this.generateMlTree(self.selectedJsonFile());
    };


    self.generateMlTree = function(mlJsonPath) {
        var visRoot;
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
            toggle(visRoot.children[0]);
            //toggle(visRoot.children[1].children[2]);
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
        }

        function showCircleToolTip(d, n, nu, nt){
            // d is circle here, n is the node,
            // nu.id will give the id of clicked node
            console.log("clicked - " + nu.id);
        }

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
                .style("stroke","blue")
                .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            vis.selectAll("circle").on("click", function(){
                d3.select(this).attr('r', 10)
                    .style("fill","pink")
                    .style("stroke","#d6d6d6");
                showCircleToolTip(this, node,nodeUpdate, nodeEnter);
            });

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
        self.vis = d3.select("#mlTree").append("svg:svg")
            .attr("width", w + m[1] + m[3])
            .attr("height", h + m[0] + m[2])
            .append("svg:g")
            .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

    };

    self.load();
}
