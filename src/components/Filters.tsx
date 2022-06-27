import React from "react";
import { Input, Toggle } from "react-daisyui";

interface props {
	setFilterByChannel: React.Dispatch<React.SetStateAction<string>>;
	setFilterByTitle: React.Dispatch<React.SetStateAction<string>>;
	setIsFiltering: React.Dispatch<React.SetStateAction<boolean>>;
}

const Filters: React.FC<props> = ({ setFilterByChannel, setFilterByTitle, setIsFiltering }) => {
	const handleToggleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsFiltering(event.target.checked);
	};

	return (
		<div className="flex flex-row space-x-5 items-center justify-evenly">
			<Input
				id="channelName"
				type="text"
				onChange={(event) => setFilterByChannel(event.target.value)}
				placeholder="Filter by channel name"
			/>
			<Input
				id="videoTitle"
				type="text"
				onChange={(event) => setFilterByTitle(event.target.value)}
				placeholder="Filter by video title"
			/>
			<Toggle onChange={handleToggleFilter} size="lg" />
		</div>
	);
};

export default Filters;
