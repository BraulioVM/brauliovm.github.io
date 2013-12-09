window.addEventListener("load", function(){

	var columns = 12;
	var rows = 9;
	var refresh_time = 50;



	function VeilSquare(x, y, width, height, ctx){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height= height;

		this.ctx = ctx;

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


		this.ctx.fillStyle = "rgba(0, 0, 0, " +  this.opacity + ")";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);

	};

	VeilSquare.prototype.activate = function(){
		console.log("Activated");
		this.increasing = true;
	};


	function VeilMatrix(rows, columns, cnv){
		this.rows = rows;
		this.columns = columns;
		this.cnv = cnv;
		this.ctx = cnv.getContext("2d");
		this.veils = this.createVeils();

		this.refresh_time = 50;
		this.probability_of_activation = 1 / 2;

		this.loop();
	};

	VeilMatrix.prototype.createVeils = function(){
		var veils = [];
		var width = this.cnv.width / this.columns;
		var height = this.cnv.height / this.rows;
		for(var i = 0; i < this.columns; i++){
			
			for(var j = 0; j < this.rows; j++){
				veils.push(new VeilSquare(i * width, j * height, width, height, this.ctx));
			}
		}

		return veils;
	};


	VeilMatrix.prototype.randomVeil = function(){
		return this.veils[Math.floor(Math.random() * this.veils.length)];
	};

	VeilMatrix.prototype.draw = function(){
		this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);

		this.veils.forEach(function(veil){
			veil.draw();
		});

	};

	VeilMatrix.prototype.loop = function(){
		var that = this;
		this.interval = setInterval(function(){

			if (Math.random() < that.probability_of_activation)
				that.randomVeil().activate();

			that.draw();


		}, this.refresh_time);
	};


	VeilMatrix.prototype.setRefreshTime = function(refresh_time){
		clearInterval(this.interval);
		this.refresh_time = refresh_time;
		this.loop();
	};

	VeilMatrix.prototype.setProbabilityOfActivation = function(probability){
		clearInterval(this.interval);
		this.probability_of_activation = probability;
		this.loop();
	};


	var veil_matrix = new VeilMatrix(rows, columns, document.getElementById("veil-canvas"));

	var probability_range = document.getElementById("probability-activation-range");
	var speed_range = document.getElementById("speed-range");




	probability_range.addEventListener("change", function(){
		var probability = this.value / 100;
		veil_matrix.setProbabilityOfActivation(probability);
	});
	speed_range.addEventListener("change", function(){
		var refresh_time = 101 - this.value;
		veil_matrix.setRefreshTime(refresh_time);
	});



});