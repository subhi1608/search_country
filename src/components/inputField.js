import React, { useState } from "react";

const InputField = (props) => {
	const { count, setCount, handleCitySearch, city, setCity, inputRef } = props;
	const [error, setError] = useState("");

	const handleCityCount = (value) => {
		if (value > 10) {
			setCount(value);
			setError("Enter a number less than 10");
		} else {
			setCount(value);
			setError("");
		}
	};
	return (
		<>
			<div className="searchable_container">
				<div>
					<input
						className="searchable_city"
						type="text"
						name=""
						id=""
						placeholder="Enter a city"
						value={city}
						ref={inputRef}
						onChange={(e) => setCity(e.target.value)}
						onKeyDown={(e) =>
							e.key === "Enter" ? handleCitySearch(e.target.value) : null
						}
					/>
					<button className="keyboard_shortcut" disabled>
						Ctrl + /
					</button>
				</div>
				<div>
					<input
						className="searchable_city limit"
						type="text"
						name=""
						id=""
						value={count}
						placeholder="Enter number of cities to be shown"
						onChange={(e) => handleCityCount(e.target.value)}
					/>
				</div>
			</div>
			{count > 10 && <p>{error}</p>}
		</>
	);
};

export default InputField;
