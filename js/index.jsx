import React from 'react';
import TuringMachine from './components/TuringMachine.jsx';


(function(window, React){

	React.render(<TuringMachine />, document.getElementById("turing-machine"));

})(window, React);