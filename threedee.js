var cnv, context, h, w;
$(document).ready(function () {
	cnv = $('#display')[0];
	context = cnv.getContext('2d');
	fullScreenCanvas();
	start();
});

$(window).resize(function() {
	fullScreenCanvas();
});

function fullScreenCanvas() {
	"use strict";
	cnv.width = $(document).width();
	cnv.height = $(document).height();
	h = cnv.height;
	w = cnv.width;
}

//////////////////////////////////
$(document).mousemove(function (ev) {
	start(ev.pageX, ev.pageY);
})

function start (camerax, cameray) {
	context.clearRect ( 0 , 0 , w, h);
	var width = 200;
	var posX = (cnv.width - width)/2;
	var posY = (cnv.height - width)/2;
	var posZ = 200;
	var camera = [camerax || 200, cameray || 200, 50];
	var i = 0;
	var points = [];
	var pointsPerLine = 4;
	var currentIncrement;
	for (var i = 0; i <= pointsPerLine; i++) {
		currentIncrement = i*width/pointsPerLine;
		points.push([posX, posY + currentIncrement, posZ]);
		points.push([posX, posY + currentIncrement, posZ + width]);
		points.push([posX, posY, posZ + currentIncrement]);
		points.push([posX, posY + width, posZ + currentIncrement]);

		points.push([posX + width, posY + currentIncrement, posZ]);
		points.push([posX + width, posY + currentIncrement, posZ + width]);
		points.push([posX + width, posY, posZ + currentIncrement]);
		points.push([posX + width, posY + width, posZ + currentIncrement]);

		points.push([posX + currentIncrement, posY, posZ]);
		points.push([posX + currentIncrement, posY + width, posZ]);
		points.push([posX + currentIncrement, posY, posZ + width]);
		points.push([posX + currentIncrement, posY + width, posZ + width]);
	}

	context.fillStyle = 'white';
	points.forEach(function (point) {
		var x = (point[0]-camera[0]) * (point[2]-camera[2])/point[2] + camera[0];
		var y = (point[1]-camera[1]) * (point[2]-camera[2])/point[2] + camera[1];

		context.beginPath();
		context.arc(x, y, 2, 0, Math.PI*2, true);
		context.closePath();
		context.fill();
	});
}
