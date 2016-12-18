/**********************************************************/
// Author: Fredrik Larsson | epost.larsson@gmail.com
/**********************************************************/

// Trigger functions on document load
$(function(){

	// Handle images "theatre mode" (class "pop")
	$(".pop").on("click", function( e ){

		e.preventDefault();

		var src = $(this).attr("href");

		var imgPopUp = '<div class="imgPopUp" onclick="closeImgPopUp()"><img class="vh-middle" src="' + src + '" alt="Portfolio image" /></div>';
		
		$(".imgPopUp").remove();
		$("#img-pops").append( imgPopUp );
		$(".imgPopUp").animate({ "opacity": 1 }, 250);

	});

	$(".imgPopUp").on("click", function(){
		$(".imgPopUp").remove();
	});

	// Opacity 0 on deprecated image urls
	$("img.album-piece").on('error', function(){
		$("#image-container").css("opacity", 0);	
	});

	// Fade in body on load
	$("body").animate({ "opacity": 1 });
});


// Close and remove image pop-up in "theatre-mode"
function closeImgPopUp() {
	$(".imgPopUp").animate({ "opacity": 0 }, 250, function(){
		$(".imgPopUp").remove();
	});
}


// Set imagethumbs to be square
function thumbsHeight() {

	var h = $("#text-container-start").height();
	$("#image-container-start").css("height", h);

	var w = $(window).width();

	if (w < 650) { w = w/2; } else { w = w/4; }
	$(".publicThumb").css("height", w + "px");
}

thumbsHeight();

window.addEventListener('resize', thumbsHeight, false);


// Toggle about in to view on click
function toggleAbout() {

	var w = $("#about-container").width();

	if ($("#about-container").css("right") == "0px") {
		$("#about-container").animate({ "right": w + "px" });
		$("#about-btn").css( "color", "#ffffff" );
	} else {
		$("#about-container").animate({ "right": "0px" }, function(){ $("#about-btn").css( "color", "#f14ab6" ); });
		
	}
}


// Remove element which shows the share-url for postcards
function closeSharelink() {
	$("#share-link").remove();
}


