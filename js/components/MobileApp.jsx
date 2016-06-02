import React, { Component, PropTypes } from 'react'
import secret from '../../secret.js' 

export default class MobileApp extends Component {

	componentDidMount(){

		$.ajax({
        // Flickr API is SSL only:
        // https://code.flickr.net/2014/04/30/flickr-api-going-ssl-only-on-june-27th-2014/
        url: 'https://api.flickr.com/services/rest/',
        data: {
            user_id: secret.flickr.user_id,
            photoset_id: '72157667930809982', 
            format: 'json',
            // method: 'flickr.people.getPhotos',
            method: 'flickr.photosets.getPhotos',
            api_key: secret.flickr.api_key // jshint ignore:line
        },
        dataType: 'jsonp',
        jsonp: 'jsoncallback'
        }).done(function (result) {

            var carouselLinks = [],
                linksContainer = $('#links'),
                baseUrl;
            // Add the demo images as links with thumbnails to the page:
            $.each(result.photoset.photo, function (index, photo) {
                baseUrl = 'https://farm' + photo.farm + '.static.flickr.com/' +
                    photo.server + '/' + photo.id + '_' + photo.secret;
                $('<a/>')
                    .append($('<img>').prop('src', baseUrl + '_q.jpg').prop('class', 'small'))
                    .prop('href', baseUrl + '_b.jpg')
                    .prop('title', photo.title)
                    .attr('data-gallery', '')
                    .appendTo(linksContainer);
                carouselLinks.push({
                    href: baseUrl + '_c.jpg',
                    title: photo.title
                });
            });

            // // Initialize the Gallery as image carousel:
            // blueimp.Gallery(carouselLinks, {
            //     container: '#blueimp-image-carousel',
            //     carousel: true
            // });

                    $.ajax({
                // Flickr API is SSL only:
                // https://code.flickr.net/2014/04/30/flickr-api-going-ssl-only-on-june-27th-2014/
                url: 'https://api.flickr.com/services/rest/',
                data: {
                    user_id: '142478112@N07',
                    photoset_id: '72157665770117924', 
                    format: 'json',
                    // method: 'flickr.people.getPhotos',
                    method: 'flickr.photosets.getPhotos',
                    api_key: '7aa3ef388299f4637883fc3f2398b76a' // jshint ignore:line
                },
                dataType: 'jsonp',
                jsonp: 'jsoncallback'
                }).done(function (result) {
                    
                    var carouselLinks = [],
                        linksContainer = $('#links'),
                        baseUrl;
                    // Add the demo images as links with thumbnails to the page:
                    $.each(result.photoset.photo, function (index, photo) {
                        baseUrl = 'https://farm' + photo.farm + '.static.flickr.com/' +
                            photo.server + '/' + photo.id + '_' + photo.secret;
                        $('<a/>')
                            .append($('<img>').prop('src', baseUrl + '_q.jpg').prop('class', 'small'))
                            .prop('href', baseUrl + '_b.jpg')
                            .prop('title', photo.title)
                            .attr('data-gallery', '')
                            .appendTo(linksContainer);
                        carouselLinks.push({
                            href: baseUrl + '_c.jpg',
                            title: photo.title
                        });
                    });

                    // // Initialize the Gallery as image carousel:
                    // blueimp.Gallery(carouselLinks, {
                    //     container: '#blueimp-image-carousel',
                    //     carousel: true
                    // });
                });
       	});
	}

	render() {
		return(

			<div id="links" className="links"></div>
		)
	}
}