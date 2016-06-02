import React, { Component, PropTypes } from 'react'

var svg = '<defs>' +
		  	'<mask id="mask" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">'+
			'<image width="100%" height="100%" xlink:href="http://www.antiblanks.com/static/animatedheart.proto/img/heart-mask-inverted.png"></image>'+
			'</mask>'+
			'</defs>'+
			'<foreignObject width="100%" height="100%" style="mask: url(#mask);">'+
			'<div class="cards">'+
			'<img class="cards-image" src="img/po@.jpg" />'+
			'</div>'+
			'</foreignObject>'

var style = {
	display: 'none'
}

export default class DesktopApp extends Component {

	componentDidMount(){
		if (window["animatedHeartApplication"]){
		window.debugUtil.log("index.js: Error >> animatedHeartApplication already instantiated");
		return false;
	}

	var animatedHeartApplication = null;
	var AnimatedHeartApplication = function() {
		var application = {
			init: function() {
				// window.debugUtil.log("AnimatedHeartApplication", "init();");
				$("#animatedHeart").animatedHeart({
					// "cardColors": ["#004687", "#b2826e", "#eb9f4b", "#90d2e2", "#e6f3f9"],
					"cardColors": ["#FF9999", "#FFD6CC", "#FFD6FF", "#FFD1B2", "#FFCCE0"],
					"cardOpacities": [0, 10, 20, 30, 40, 60]
				});
			}
		};
		return application;
	};

	$(document).ready(function(evt) {
		window.animatedHeartApplication = new AnimatedHeartApplication();
		window.animatedHeartApplication.init();

		$( '#ri-grid' ).gridrotator( {
					rows: 3,
					columns: 3,
					animSpeed : 300,
					animType : 'rotateBottom',
					w320 : {
						rows : 3,
						columns : 3
					},
					w240 : {
						rows : 3,
						columns : 3
					},
					slideshow : false,
					onhover : true
		} );

		$('.gallery').hide()

		$('#animatedHeart').click( function(){ 

			$(this).fadeOut(1500, function(){ 
				$('.gallery').fadeIn(1500)
				// $(".gallery").css('visibility', 'visible'); 
			}) 
		} );
	});

	return true;
	}

	render() {

		return(
			<div>
				<div className="gallery">
			        <div id="ri-grid" className="ri-grid ri-grid-size-1 ri-shadow">
			          <ul>
			            <li><a ><img src="img/gallery/1.jpg"/></a></li>
			            <li><a ><img src="img/gallery/2.jpg"/></a></li>
			            <li><a ><img src="img/gallery/3.jpg"/></a></li>
			            <li><a ><img src="img/gallery/4.jpg"/></a></li>
			            <li><a ><img src="img/gallery/5.jpg"/></a></li>
			            <li><a ><img src="img/gallery/6.jpg"/></a></li>
			            <li><a ><img src="img/gallery/7.jpg"/></a></li>
			            <li><a ><img src="img/gallery/8.jpg"/></a></li>
			            <li><a ><img src="img/gallery/9.jpg"/></a></li>
			            <li><a ><img src="img/gallery/10.jpg"/></a></li>
			        
			          </ul>
			        </div>       
			    </div>
				<div id="animatedHeart" className="animated-heart">
			      <div className="cards-container">
			        <div className="cards-mask">
			          <svg dangerouslySetInnerHTML={{__html: svg }} />
			        </div>
			      </div>
			      <div style={style}>
			        <div className="card-container-template">
			          <div className="card card-1">
			            <div className="front-crop">
			              <div className="front"></div>
			            </div>
			            <div className="back-crop">
			              <div className="back"></div>
			            </div>
			          </div>
			          <div className="card card-2 flip">
			            <div className="front-crop">
			              <div className="front"></div>
			            </div>
			            <div className="back-crop">
			              <div className="back"></div>
			            </div>
			          </div>
			        </div>
			      </div>
			    </div>
		    </div>
		)
	}
}