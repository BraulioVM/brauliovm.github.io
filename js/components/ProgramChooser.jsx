import React from 'react/addons.js';

let ProgramChooser = React.createClass({
	
	render(){
		let currentProgramIndex = this.props.currentProgramIndex;

		if (currentProgramIndex != -1){
			let program = this.props.programs[currentProgramIndex];


			return (
				<div className="programChooser">
					<a className="leftArrow" onClick={this.props.onLeftClick}>{' <- '}</a>
					<span className="programName"> 
						<a href={program.link}>{program.name} </a>
					</span>
					<a className="rightArrow" onClick={this.props.onRightClick}>{ ' -> ' }</a>
				</div>
			);
		} else {
			return <div></div>
		}
	}
});

export default ProgramChooser;

