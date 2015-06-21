import React from 'react/addons.js';

let ProgramChooser = React.createClass({
	
	render(){
		let currentProgramIndex = this.props.currentProgramIndex;

		if (currentProgramIndex != -1){
			let program = this.props.programs[currentProgramIndex];


			return (
				<div className="programChooser">
					<div className="left">
						<a className="leftArrow" onClick={this.props.onLeftClick}>{' <- '}</a>
					</div>
					<div className="center">
						<span className="programName"> 
							<a href={program.link}>{program.name} </a>
						</span>
					</div>
					<div className="right">
						<a className="rightArrow" onClick={this.props.onRightClick}>{ ' -> ' }</a>
					</div>
				</div>
			);
		} else {
			return <div></div>
		}
	}
});

export default ProgramChooser;

