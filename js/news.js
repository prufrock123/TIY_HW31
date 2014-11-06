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
		template: "<div class='row'><div class='large-10 columns'><a href='{link[0].$text}'><h4>{title.$text}</h4></a></div></div><hr/>",
		render: function(){
			this.el.innerHTML = _.template(this.template, this.options);
		}
	})

	function NewsClient(options) {
		this.options = _.extend({}, options, {
			api_key: "MDExMDUwNjE5MDEzNjMzNzI4MzNkM2M2Zg001"
		});

		this.makeNewsRequest();
	}

	NewsClient.prototype.makeSelection = function() {
		var input = {};
		var inputs = $(':input');

		inputs.each(function(element) {
			input[element.name] = element.value;
		});

		console.dir(input);
		return input;
	}

	NewsClient.prototype.queryAPI = function() {
			var selection = this.makeSelection()

			var url = [
			"http://api.npr.org/query?",
			selection,
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
					console.log(element)
					console.log(element.title.$text);
				})
				return show;
			});
	};

	NewsClient.prototype.makeNewsRequest = function() {
		var self = this;

		$("#submit").click(function(){
			$.when(
				self.queryAPI()
			).then(function(show){
				show.forEach(function(element){
					new newsView(element);
				})
			})
		})
	}

	// NewsClient.prototype.Instigator = function(){
	// 	$("#submit").click(makeNewsRequest());
	// }

	window.NewsClient = NewsClient;
})(window, undefined);