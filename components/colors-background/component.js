(function(){






	
	Polymer("colors-background", {

		palette : [
			"#594F4F",
			"#547980",
			"#45ADA8",
			"#9DE0AD",
			"#E5FCC2"
		],

		getRandomColor : function(){

			return this.palette[Math.floor(Math.random() * this.palette.length)];

		},


		ready: function(){

			this.getCanvas().width = 1000;
			this.getCanvas().height = 1000;

			var cg = new EvolvingColorsGrid(this.getCanvas(), this.palette, 10, 20);  

			console.log(cg);

			var element = this;

			setInterval(function(){

				cg.draw();	

			}, 20);



		}




	});

})();