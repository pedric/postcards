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

	var w = $(".publicThumb").width();
	$(".publicThumb").css("height", w);
}

window.addEventListener('load', thumbsHeight, false);
window.addEventListener('resize', thumbsHeight, false);