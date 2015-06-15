import React from 'react/addons.js';
import { range, numberInInterval } from '../util.js';

const DATA_TO_DISPLAY = 10;

let TuringTape = React.createClass({
	render(){
		
		let data = this.props.data;	
		let headPosition = this.props.headPosition;

		let cellIntervalToShow = [headPosition - DATA_TO_DISPLAY/2 + 1, headPosition + DATA_TO_DISPLAY/2 - 1];
		let indexes = Object.keys(data).map(Number).sort((a, b) => a - b);


		let cells = indexes.map((number) => {
			let cx = React.addons.classSet;
			let classes = cx({
				cell: true,
				'visibleCell': numberInInterval(number, cellIntervalToShow),
				'invisibleCell': !numberInInterval(number, cellIntervalToShow),
				'on': data[number] === "1",
				'off': data[number] === 0
			});

			return (
				<div className={classes} key={number}>
					<div className="data-holder"> {data[number]} </div>
				</div>
			);
		});



		return (
			<div className="turing-tape"> 
				<div className="currentCellMark"></div>
				{cells}
			</div>
		);
	}
});

export default TuringTape;