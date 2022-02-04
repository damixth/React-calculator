import { useState } from 'react';


function App() {
	const [calc, setCalc] = useState("");
	const [result, setResult] = useState("");

	const ops = ['/', '*', '+', '-', '.'];

	const updateCalc = value =>{
		// if the last value is an operator and the calculation is empty
		// or last value is an operator and the previous value is an operator
		if(
			ops.includes(value) && calc === '' ||
			ops.includes(value) && ops.includes(calc.slice(-1))
		){
			return;
		}

		setCalc(calc + value);
		
		// if the last value is not an operator
		if(!ops.includes(value)){
			setResult(eval(calc + value).toString());
		}
	}

	//To display the numbers
	const createDigits = () => {
		const digits = [];

		for(let i =1; i < 10; i++){
			digits.push(
				<button onClick={() => updateCalc(i.toString())} 
					key={i}> {i}
				</button>
			)
		}
		return digits;
	}

	const calculate = () =>{
		setCalc(eval(calc).toString());
	}

	const deleteLast = () => {
		if(calc === ''){
			return;
		}
		
		const value = calc.slice(0, -1); // remove the last value
		
		setCalc(value);
	}

	return (
		<div className="App">
			<div className="calculator">
				<div className="display">

					{ calc || "0"} <br />
					{ result ? <span>({ result })</span> : ''}

				</div>

				<div className="operators">
					<button onClick={() => updateCalc('/')}>/</button>
					<button onClick={() => updateCalc('*')}>*</button>
					<button onClick={() => updateCalc('+')}>+</button>
					<button onClick={() => updateCalc('-')}>-</button>

					<button onClick={deleteLast}>DEL</button>
				</div>

				<div className="digits">
					{ createDigits() }

					<button onClick={() => updateCalc('0')}>0</button>
					<button onClick={() => updateCalc('.')}>.</button>
					
					<button onClick={calculate}>=</button>
				</div>
			</div>
		</div>
	);
}

export default App;
