export function range(i, j){
	let result = [];
	for(let k = i; k < j; k++)
		result.push(k);

	return result;
}

export function numberInInterval(number, interval){
	return interval[0] <= number && number <= interval[1];
}