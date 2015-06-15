import { parse, Machine, LEFT, RIGHT } from 'turing-lang';

export class Program {
	constructor(name, link, code){
		this.name = name;
		this.link = link;
		this.code = code;
	}

	getMachine(){
		return parse(this.code);
	}
}

const PROGRAMS_URL = "/data/programs.turing";

export function getPrograms(){
	return fetch(PROGRAMS_URL).then(
		(response) => response.text()
	).then((text) => text.split("--").filter((code) => code.length > 0)).then(turnToPrograms);
}

function turnToPrograms(program_texts){
	return program_texts.map((text) => {
		let [ firstLine, secondLine ] = text.split("\n").filter((line) => line.length > 0);

		let name = firstLine.substring(1); 	// remove the # character
		let link = secondLine.substring(1);

		return new Program(name, link, text);
	});
}
