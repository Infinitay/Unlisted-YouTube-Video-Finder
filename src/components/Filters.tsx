import React from "react";

const Filters = () => {
	return (
		<div>
			<form className="filters">
				<input
					id="channelName"
					type="text"
					placeholder="Filter by channel name"
				/>
				<input
					id="videoTitle"
					type="text"
					placeholder="Filter by video title"
				/>
			</form>
		</div>
	);
};

export default Filters;
