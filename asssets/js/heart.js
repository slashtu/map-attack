if (!window["$"]) {
	console.log("jquery-animatedheart.js: Error >> JQuery must be defined");
}

/**
 * @component animatedHeart
 * 3D animated heart using 3D transitions and masking techniques
 * @requires JQuery http://www.jquery.com
 * @author Daniel Ivanovic dan.ivanovic@antiblanks.com
 */
(function ($) {
    $.fn.animatedHeart = function(options) {
    	var self = this;
    	var tickerSpeedSeconds = 0.1;
		var animationSpeedSecondsMin = 0.5;
		var animationSpeedSecondsMax = 0.9;

		options = $.extend({
    		"cardColors": ["#fff", "#000"],
    		"cardOpacities": [0, 25, 50, 75, 100]
    	}, options);

		$(document).ready(function(evt) {
			var releaseAnimationTimers = {};
			window.setInterval(function() {
				var randomCardContainerIndex = Math.ceil(Math.random()*(parseInt(self.find(".card-container").length)-1));
				var randomCardIndex = Math.floor(Math.random()*2);
				var randomCard = self.find(".card-container.card-container-"+randomCardContainerIndex+" .card")[randomCardIndex];
				if (randomCard.length != 0 && !$(randomCard).attr("data-is-animating")) {
					var cardAnimationId = "card-animation-"+Math.floor(Math.random()*100000);
					$(randomCard).attr("data-is-animating", 1);
					$(randomCard).attr("data-animation-id", cardAnimationId);
					
					// Setup animation speed and easing
					var randomAnimateSpeedIndex = Math.ceil(((Math.random()*animationSpeedSecondsMax)+animationSpeedSecondsMin)*100)/100;

					$(randomCard).css("-webkit-transition", "transform "+randomAnimateSpeedIndex+"s");
					$(randomCard).css("-moz-transition", "transform "+randomAnimateSpeedIndex+"s");
					$(randomCard).css("transition", "transform "+randomAnimateSpeedIndex+"s");

					// Start the animation
					$(randomCard).toggleClass("flip");
					
					// Release from animation timer
					releaseAnimationTimers[cardAnimationId] = window.setTimeout(function() {
						self.find(".card[data-animation-id='"+cardAnimationId+"']")
							.removeAttr("data-is-animating")
							.removeAttr("data-animation-id");
					}, animationSpeedSecondsMax*1000);
				}
			}, tickerSpeedSeconds*1000);

			var cards = [
				"square", 				"square", 
				"triangle", "triangle", "triangle", "triangle",
				"triangle", "triangle", "triangle", "triangle",
				"triangle", "triangle", "triangle", "triangle"];

			var cardRotations = [
				"0deg", 				"0deg", 
				"0deg", 	"0deg", 	"0deg",  	"90deg", 
				"0deg", 	"90deg", 	"0deg", 	"90deg", 
				"0deg", 	"0deg", 	"90deg", 	"0deg"];

			for (var i=0; i<cards.length; i++) {
				var cardContainer = self.find(".card-container-template").clone();

				// Setup card opacity
				var cardOpacities = options.cardOpacities;
				var randomCardOpacityIndex1 = Math.floor(Math.random()*cardOpacities.length);
				var randomCardOpacityIndex2 = Math.floor(Math.random()*cardOpacities.length);
				var cardOpacity1 = cardOpacities[randomCardOpacityIndex1]/100;
				var cardOpacity2 = cardOpacities[randomCardOpacityIndex2]/100;
				$(cardContainer.find(".card")[0]).css("opacity", cardOpacity1);
				$(cardContainer.find(".card")[1]).css("opacity", cardOpacity2);

				// Setup card colour
				var cardColors = options.cardColors;
				var randomCardColorIndex1 = Math.floor(Math.random()*cardColors.length);
				var randomCardColorIndex2 = Math.floor(Math.random()*cardColors.length);
				var cardColor1 = cardColors[randomCardColorIndex1];
				var cardColor2 = cardColors[randomCardColorIndex2];
				cardContainer.find(".card .front").css("background", cardColor1);
				cardContainer.find(".card .back").css("background", cardColor2);

				// Setup card rotation
				var cardRotation = cardRotations[i];
				cardContainer.css("-webkit-transform", "rotate("+cardRotation+")");
				cardContainer.css("-moz-transform", "rotate("+cardRotation+")");
				cardContainer.css("transform", "rotate("+cardRotation+")");

				// Initialise card
				cardContainer
					.removeClass("card-container-template")
					.addClass("card-container")
					.addClass(cards[i])
					.addClass("card-container-"+(i+1));
				cardContainer.find(".card").addClass(cards[i]);
				
				// Add to stage
				self.find(".cards").append(cardContainer);
			}
		});
        return self;
    };
}(jQuery));