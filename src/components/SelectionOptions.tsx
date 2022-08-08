import React from "react";
import { Button } from "react-daisyui";
import { LikedVideo, SelectedVideos } from "../types";

interface props {
	filteredVideos: LikedVideo[];
	selectedVideos: SelectedVideos;
	setSelectedVideos: React.Dispatch<React.SetStateAction<SelectedVideos>>;
}

const SelectionOptions: React.FC<props> = ({ filteredVideos, selectedVideos, setSelectedVideos }) => {
	const handleSelectAll = () => {
		console.log("Selecting all visible videos");
		let duplicates = 0;
		for (const video of filteredVideos) {
			if (selectedVideos.videos[video.id]) {
				duplicates++;
			}
			selectedVideos.videos[video.id] = video;
		}
		selectedVideos.length += filteredVideos.length - duplicates;
		setSelectedVideos({ ...selectedVideos });
	};

	const handleUnselectAll = () => {
		console.log("Unselecting all visible videos");
		let duplicates = 0;
		for (const video of filteredVideos) {
			if (!selectedVideos.videos[video.id]) {
				duplicates++;
			}
			delete selectedVideos.videos[video.id];
		}
		selectedVideos.length -= filteredVideos.length - duplicates;
		setSelectedVideos({ ...selectedVideos });
	};

	return (
		<div className="inline-flex mb-3 flex-row space-x-5 items-center justify-evenly">
			<Button onClick={handleSelectAll}>Select All</Button>
			<Button onClick={handleUnselectAll}>Unselect All</Button>
		</div>
	);
};

export default SelectionOptions;
