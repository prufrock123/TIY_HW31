(function(window, undefined){
	"use strict";
	
	var newsView = Backbone.View.extend({
		tagname: "div",
		className: "news",
		initialize: function(opts) {
			this.options = _.extend(
				{},
				{
					$container: $('#feed')
				},
				opts
			);

			this.options.$container.append(this.el);

			this.render();
		},
		template: "<div class='row'><div class='large-10 columns'><h4>{$text}</h4></div></div>",
		render: function(){
			this.el.innerHTML = _.template(this.template, this.options);
		}
	})

	function NewsClient(options) {
		this.options = _.extend({}, options, {
			api_key: "MDExMDUwNjE5MDEzNjMzNzI4MzNkM2M2Zg001"
		});

		this.queryAPI();
	}

	NewsClient.prototype.queryAPI = function(selection) {
			var url = [
			"http://api.npr.org/query?",
			"id=1007",
			"&apiKey=",
			this.options.api_key,
			"&format=json"
			].join('');

			console.log(url);
			return $.getJSON(url).then(function(data){
				console.log(data.list.story);
				var show = data.list.story;
				// console.dir(show)
				show.forEach(function(element){ 
					console.log(element.title.$text);
				})
				return show;
			});
	};

	NewsClient.prototype.makeNewsRequest = function() {
		$.when(
			this.queryAPI("id=1007")
		).then(function(show){
			show.title.forEach(function(showTitle){
				new newsView(showTitle);
			})
		})
	}

	window.NewsClient = NewsClient;
})(window, undefined);