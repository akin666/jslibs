/**
 * Created by akin on 1.9.2015.
 */
define(["system"], function (System) {
    function Application(config){
        this.element = config.element;
        this.src = this.element.attr("data-src");
        this.width = parseInt(this.element.attr("data-width"));
        this.height = parseInt(this.element.attr("data-height"));

        this.iframe = $('<iframe width="' + this.width + '" height="' + this.height + '" src="' + this.src + '" frameborder="0" allowfullscreen></iframe>');

        this.element.append(this.iframe);

        return this;
    }

    return Application;
});
