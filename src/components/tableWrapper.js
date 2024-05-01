import React from "react";

const TableWrapper = (props) => {
	const { city, list, page } = props;
	return (
		<div>
			{city === "" ? (
				"Start Searching"
			) : (
				<>
					<table>
						<th>
							<tr>
								<td>No</td>
								<td>Name</td>
								<td>Country</td>
							</tr>
						</th>
						<tbody>
							{list?.cityList?.length
								? list.cityList
										.slice(page * 3 - 3, page * 3)
										.map((item, index) => {
											const { name, countryCode } = item;
											return (
												<tr>
													<td>
														{list?.cityList?.findIndex(
															(ele) => ele.id === item.id
														) + 1}
													</td>
													<td>{name}</td>
													<td>{countryCode}</td>
												</tr>
											);
										})
								: "No results found"}
						</tbody>
					</table>
				</>
			)}
		</div>
	);
};

export default TableWrapper;
