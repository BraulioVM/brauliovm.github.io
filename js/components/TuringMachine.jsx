import { parse, Machine, LEFT, RIGHT } from 'turing-lang';
import React from 'react/addons.js';
import Tape from './TuringTape.jsx';
import ProgramChooser from './ProgramChooser.jsx';
import { Program, getPrograms } from '../services/programs.js';



const COMPUTATION_STEP_TIME = 1000;
const UPDATE_HEAD_POSITION_DATA_TIME = 800;

let TuringMachine = React.createClass({
	getInitialState(){
		return { data: [], headPosition: 0, currentProgramIndex: -1 };
	},
	componentDidMount(){
		this.getPrograms().then(() => {
			this.loadProgram(0);
		});
	},

	performMachineStep() {
		let machine = this.state.machine;

		this.setState({ headPosition: machine.headPosition });

		setTimeout(() => {
			this.setState({ data: machine.surroundingData(20) });
		}, UPDATE_HEAD_POSITION_DATA_TIME);
	},

	getPrograms(){
		return getPrograms().then((programs) => {
			this.setState({ programs, currentProgramIndex: 0 });
		});
	},

	loadNextProgram() {
		let nextProgramIndex = (this.state.currentProgramIndex + 1) % this.state.programs.length;
		this.loadProgram(nextProgramIndex);
	},

	loadPreviousProgram() {
		let currentIndex = this.state.currentProgramIndex;
		let previousProgramIndex = currentIndex == 0? this.state.programs.length - 1 : currentIndex - 1;
		this.loadProgram(previousProgramIndex);
	},	

	loadProgram(programNumber){	
		
		this.cleanPreviousMachineListeners();
		this.setState({ currentProgramIndex: programNumber });
		
		let program = this.state.programs[programNumber];
		let machine = parse(program.code);
		this.setState({ machine, headPosition: 0, data: machine.surroundingData(20) });

		this.setMachineListeners();
		machine.run(COMPUTATION_STEP_TIME);
	},

	setMachineListeners() {
		let machine = this.state.machine;

		machine.on("step", () => { this.performMachineStep(); })
		machine.on("halt", () => { 
			this.loadNextProgram(); 
		});
	},

	cleanPreviousMachineListeners(){
		if (this.state.machine){
			this.state.machine.removeAllListeners("step");
			this.state.machine.removeAllListeners("halt");
		}
	},



	render(){
		return (
			<div className="turing-machine">
				<Tape data={this.state.data} headPosition={this.state.headPosition} />
				<ProgramChooser 
					onRightClick={this.loadNextProgram} 
					onLeftClick={this.props.loadPreviousProgram}
					programs={this.state.programs} 
					currentProgramIndex={this.state.currentProgramIndex}
				/>
			</div>
		);
	}
});

export default TuringMachine;