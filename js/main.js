window.addEventListener("load", function(){

	function VeilSquare(x, y, width, height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height= height;

		this.opacity = 0;
		this.increasing = false;
		this.decreasing = false;
		this.step = 0.1;

	}

	VeilSquare.prototype.physics = function(){
		if(this.increasing){
			this.opacity += this.step;
		}
		else if (this.decreasing){
			this.opacity -= this.step;
		}

		if (this.opacity > 0.6){
			this.increasing = ! this.increasing;
			this.decreasing = ! this.decreasing;
		}

		if (this.opacity < 0){
			this.opacity = 0;
			this.decreasing = false;
		}



	};

	VeilSquare.prototype.draw = function(){
		this.physics();

		ctx.fillStyle = "rgba(0, 0, 0, " +  this.opacity + ")";
        ctx.fillRect(this.x, this.y, this.width, this.height);

	};


	var veil = document.getElementById("veil");
	var ctx = veil.getContext("2d");

	var columns = 4;
	var rows = 3;

	var refresh_time = 200;
	var veil_flip_regularity = 40;
	var frames = 0;

	var veils = [];

	function createVeils(){
		var width = veil.width / columns;
		var height = veil.height / rows;
		for(var i = 0; i < columns; i++){
			
			for(var j = 0; j < rows; j++){
				veils.push(new VeilSquare(i * width, j * height, width, height));
			}
		}
	};
	
	createVeils();

	var i = 0;

	setInterval(function(){
		ctx.clearRect(0, 0, veil.width, veil.height);
		veils.forEach(function(t_veil){
			t_veil.draw();
		});

		if(i++ % veil_flip_regularity == 0){
			veils[Math.floor(i / veil_flip_regularity) % veils.length].increasing = true;
		}

	}, refresh_time);

	



});