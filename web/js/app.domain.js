
ko.bindingHandlers.loadPage = {
    update: function (element, valueAccessor) {
        console.log(valueAccessor());
        $(element).html(AppViewModel.contentView());
        ko.cleanNode($(element).find(".content")[0]);
        ko.applyBindings(AppViewModel.contentViewModel(), $(element).find(".content")[0])
    }
};
