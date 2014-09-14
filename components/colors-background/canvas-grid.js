var CanvasGrid = function(canvas){
	this.canvas = canvas;

	this.ctx = canvas.getContext("2d");


	this.width = canvas.width;
	this.height = canvas.height;


	this.grid_width = 120;
	this.grid_height = 180;
	
};

CanvasGrid.prototype.maxX = function(){

	return Math.floor(this.width / this.grid_width) + 1;

};

CanvasGrid.prototype.maxY = function(){
	return Math.floor(this.height / this.grid_height) + 1;
}

CanvasGrid.prototype.fillRectangle = function(color, x, y){

	var cx = this.grid_width * x;
	var cy = this.grid_height * y;

	var ctx = this.ctx;

	ctx.fillStyle = color;


	ctx.fillRect(cx, cy, this.grid_width, this.grid_height);

	ctx.fill();

}


CanvasGrid.prototype.fillNextRectangle = function(color){
	var x = this.current_grid_x, y = this.current_grid_y;

	if (x == undefined  |  y == undefined) {
		this.current_grid_x = x = 0; 
		this.current_grid_y = y = 0;
	}

	this.fillRectangle(color, x, y++);

	if (y > this.maxY()){
		y = 0;
		x++;

		if (x > this.maxX())
			x = 0;
	}

	this.current_grid_x = x;
	this.current_grid_y = y;


};

