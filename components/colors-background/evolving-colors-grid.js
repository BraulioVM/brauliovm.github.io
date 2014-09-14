Array.prototype.chooseRandom = function(){

	return this[Math.floor(Math.random() * this.length) ];

}

var EvolvingColorsGrid = function(canvas, colors, cols_number, rows_number){
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");

	this.palette = colors;

	this.cols_number = cols_number;
	this.rows_number = rows_number;

	this.evolving_steps = 200;

	this.width = canvas.width;
	this.height = canvas.height;


	this.cell_width = this.width / cols_number;
	this.cell_height = this.height / rows_number;


	this.initGrid();
};

EvolvingColorsGrid.prototype.initGrid = function(){
	this.grid = [];

	var c_row;

	for(var i = 0; i < this.cols_number; i++){

		c_row = [];

		for (var j = 0; j < this.rows_number; j++) {

			c_row.push(new ColourCell(this.palette, this.evolving_steps));

		}

		this.grid.push(c_row);
	}
}

EvolvingColorsGrid.prototype.draw = function(){

	var width = this.cell_width;
	var height = this.cell_height;

	var c_color;

	for(var i = 0; i < this.cols_number; i++){

		for(var j = 0; j < this.rows_number; j++){


			c_color = this.grid[i][j].getNextColor();
			this.ctx.fillStyle = c_color;
			this.ctx.fillRect(i * width, j * height, width, height);

		}

	}

	this.ctx.fill();

}


var ColourCell = function(colors, evolving_steps){

	this.color_palette = colors;

	this.current_color = colors.chooseRandom();

	this.evolving_steps = evolving_steps;

	this.color_queue = [];

};



ColourCell.prototype.getNextColor = function(){
	function arrayOf(element, times) {
		var result = [];
		for (var i = 0; i < times; i++)
			result.push(element);

		return result;
	}


	if (this.color_queue.length == 0) {

		console.log(this.current_color);

		var random_color = this.color_palette.chooseRandom();
		this.color_queue = this.color_queue.concat(this.gradientColorsTo(random_color));

		this.color_queue = this.color_queue.concat(arrayOf(random_color, 100));

	}

	
	this.current_color = this.color_queue.shift()
	
	return this.current_color;
	

};


ColourCell.prototype.parseColorToRGBNumberArray = function(color){
	var r = parseInt(color.substr(1, 2), 16);
	var g = parseInt(color.substr(3, 2), 16);
	var b = parseInt(color.substr(5, 2), 16);


	return [r, g, b];
}

ColourCell.prototype.parseRGBNumberArrayToHexColor = function(number_array){
	return "#" + number_array[0].toString(16) + number_array[1].toString(16) + number_array[2].toString(16);
}


ColourCell.prototype.gradientColorsTo = function(color){

	var result = [];

	var current_color = this.parseColorToRGBNumberArray(this.current_color);
	var new_color = this.parseColorToRGBNumberArray(color);

	var r_sum = (new_color[0] - current_color[0]) / this.evolving_steps;
	var g_sum = (new_color[1] - current_color[1]) / this.evolving_steps;
	var b_sum = (new_color[2] - current_color[2]) / this.evolving_steps;


	var c_color;

	for(var i = 1; i <= this.evolving_steps; i++){

		c_color = [
			current_color[0] + i * r_sum, 
			current_color[1] + i * g_sum,
			current_color[2] + i * b_sum
		];

		c_color = c_color.map(Math.floor);

		result.push(this.parseRGBNumberArrayToHexColor(c_color));

	}

	return result;

};


