/* Open img class "pop" blank *********************************************************/

$(function(){

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
});

function closeImgPopUp() {

	$(".imgPopUp").animate({ "opacity": 0 }, 250, function(){
		$(".imgPopUp").remove();
	});
}


function thumbsHeight() {

	var h = $("#text-container-start").height();
	$("#image-container-start").css("height", h);

	var w = $(window).width();

	if (w < 650) { w = w/2; } else { w = w/4; }
	$(".publicThumb").css("height", w + "px");
}

thumbsHeight();

window.addEventListener('resize', thumbsHeight, false);


function toggleAbout() {

	var w = $("#about-container").width();

	if ($("#about-container").css("right") == "0px") {
		$("#about-container").animate({ "right": w + "px" });
		$("#about-btn").css( "color", "#ffffff" );
	} else {
		$("#about-container").animate({ "right": "0px" }, function(){ $("#about-btn").css( "color", "#f14ab6" ); });
		
	}
}


function closeSharelink() {

	$("#share-link").remove();
}


function hideImg() {
	$("#image-container").css("opacity", 0);
}

