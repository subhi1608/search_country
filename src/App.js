import { useRef, useState } from "react";
import "./App.css";
import InputField from "./components/inputField";
import TableWrapper from "./components/tableWrapper";
import { useDispatch, useSelector } from "react-redux";
import { fetchCity } from "./redux/cityreducer";
import Loader from "./components/Loader";

function App() {
	const dispatch = useDispatch();
	const [count, setCount] = useState(5);
	const [city, setCity] = useState("");
	const [page, setPage] = useState(1);
	const inputRef = useRef(null);
	const stateData = useSelector((state) => state);
	const handleCitySearch = (cityValue) => {
		setCity(cityValue);
		if (cityValue && cityValue.length) {
			dispatch(fetchCity(cityValue, count));
		}
	};

	const selectPageHandler = (selectedPage) => {
		console.log(selectedPage <= stateData?.city?.cityList.length / 3, "asa");
		if (
			selectedPage >= 1 &&
			selectedPage <= stateData?.city?.cityList.length / 2 &&
			selectedPage !== page
		) {
			setPage(selectedPage);
		}
	};
	const handleKeyDown = (event) => {
		event.preventDefault();
		if (event.ctrlKey && event.key === "/") {
			event.preventDefault();
			inputRef.current.focus();
		}
	};

	return (
		<div className="App">
			{stateData?.city?.isLoading ? (
				<Loader />
			) : (
				<>
					{/* <input onKeyDown={handleKeyDown} /> */}
					<InputField
						handleKeyDown={handleKeyDown}
						count={count}
						setCount={setCount}
						handleCitySearch={handleCitySearch}
						city={city}
						setCity={setCity}
						inputRef={inputRef}
					/>
					<TableWrapper list={stateData?.city} city={city} page={page} />
					{stateData?.city?.cityList?.length > 0 && (
						<div className="pagination">
							<span
								onClick={() => selectPageHandler(page - 1)}
								className={page > 1 ? "" : "pagination__disable"}
							>
								◀
							</span>

							{[...Array(Math.ceil(stateData.city.cityList.length / 3))].map(
								(_, i) => {
									return (
										<span
											key={i}
											className={page === i + 1 ? "pagination__selected" : ""}
											onClick={() => selectPageHandler(i + 1)}
										>
											{i + 1}
										</span>
									);
								}
							)}

							<span
								onClick={() => selectPageHandler(page + 1)}
								className={
									page < stateData?.city?.cityList.length / 3
										? ""
										: "pagination__disable"
								}
							>
								▶
							</span>
						</div>
					)}
				</>
			)}
		</div>
	);
}

export default App;
