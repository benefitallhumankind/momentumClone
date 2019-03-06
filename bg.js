const body = document.querySelector("body"),
    overlap = document.querySelector("#overlap");
	
function fadeOutOverlap(){
	var opacity = 1;
	var id = setInterval(frame, 20);
	function frame(){
		if(opacity <= 0){
			clearInterval(id);
			body.removeChild(overlap);
		}else{
			opacity = opacity-0.02;
			overlap.style.opacity = opacity;
		}
	}
}
function paintImage(){
    const bgSrc = `https://source.unsplash.com/1600x900/?nature`;
    const bodybg = body.style.backgroundImage = `url(${bgSrc})`;
}
function init(){
    paintImage();
}
init();

window.onload = function(){
	body.style.height = window.innerHeight+'px';
	fadeOutOverlap();	
}
