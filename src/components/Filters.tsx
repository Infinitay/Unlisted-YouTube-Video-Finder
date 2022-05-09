import React from "react";

interface props {
	setFilterByChannel: React.Dispatch<React.SetStateAction<string>>;
	setFilterByTitle: React.Dispatch<React.SetStateAction<string>>;
}

const Filters: React.FC<props> = ({ setFilterByChannel, setFilterByTitle }) => {
	return (
		<div>
			<div className="filters">
				<input
					id="channelName"
					type="text"
					onChange={(event) => setFilterByChannel(event.target.value)}
					placeholder="Filter by channel name"
				/>
				<input
					id="videoTitle"
					type="text"
					onChange={(event) => setFilterByTitle(event.target.value)}
					placeholder="Filter by video title"
				/>
			</div>
		</div>
	);
};

export default Filters;
