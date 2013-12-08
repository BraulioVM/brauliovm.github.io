window.addEventListener("load", function(){

	var columns = 4;
	var rows = 3;
	var refresh_time = 50;



	function VeilSquare(x, y, width, height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height= height;

		this.opacity = 0;
		this.increasing = false;
		this.decreasing = false;
		this.step = 0.05;

	}

	VeilSquare.prototype.physics = function(){
		if(this.increasing){
			this.opacity += this.step;
		}
		else if (this.decreasing){
			this.opacity -= this.step;
		}

		if (this.opacity > 1){
			this.increasing = false;
			this.decreasing = true;
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

	VeilSquare.prototype.activate = function(){
		this.increasing = true;
	};


	var veil = document.getElementById("veil");
	var ctx = veil.getContext("2d");

	function createVeils(){
		var veils = [];
		var width = veil.width / columns;
		var height = veil.height / rows;
		for(var i = 0; i < columns; i++){
			
			for(var j = 0; j < rows; j++){
				veils.push(new VeilSquare(i * width, j * height, width, height));
			}
		}

		return veils;
	};

	function chooseRandom(array){
		return array[Math.floor(Math.random() * array.length)];
	}

	function doWithProbability(callback, probability){
		if(Math.random() < probability){
			callback();
		}
	}

	function getLoop(probability){
		
		var result = function(){
			ctx.clearRect(0, 0, veil.width, veil.height);

			doWithProbability(function(){
				chooseRandom(veils).activate();
			}, probability);

			veils.forEach(function(veil){
				veil.draw();
			});
		}

		return result;


	}

	var probability_range = document.getElementById("probability-activation-range");
	var speed_range = document.getElementById("speed-range");

	function startWithConditions(){
		var probability = probability_range.value / 100;
		var speed = (1 - speed_range.value / 100) * 1000;

		clearInterval(interval);

		interval =  setInterval(getLoop(probability), speed);

	};
	
	var veils = createVeils();

	// Randomly, some will flag
	var interval = setInterval(getLoop(1/7), refresh_time);

	probability_range.addEventListener("change", startWithConditions);
	speed_range.addEventListener("change", startWithConditions);



});