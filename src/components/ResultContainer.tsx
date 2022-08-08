import React from "react";
import { LikedVideo, SelectedVideos } from "../types";
import VideoResult from "./VideoResult";

interface props {
	likedVideos: LikedVideo[];
	amountLoaded: number;
	totalResults: number;
	filteredVideos: LikedVideo[];
	isFiltering: boolean;
	showOnlyUnlisted?: boolean;
	selectedVideos: SelectedVideos;
	setSelectedVideos: React.Dispatch<React.SetStateAction<SelectedVideos>>;
}

const ResultsContainer: React.FC<props> = ({
	likedVideos,
	amountLoaded,
	totalResults,
	filteredVideos,
	isFiltering,
	showOnlyUnlisted,
	selectedVideos,
	setSelectedVideos,
}) => {
	let resultsString = "";
	let videosResult: JSX.Element[] = [];

	const handleVideoResultOnClick = (event: React.MouseEvent<Element>, video: LikedVideo) => {
		// If the user clicks on anywhere other than the empty space, it won't select it.
		if (event.currentTarget !== event.target) return;

		if (selectedVideos.videos[video.id]) {
			// Video was selected, unselect it
			console.log("Unselecting video: " + video.title);
			delete selectedVideos.videos[video.id];
			selectedVideos.length--;
		} else {
			// Video wasn't selected, select it
			console.log("Selecting video: " + video.title);
			selectedVideos.videos[video.id] = video;
			selectedVideos.length++;
		}
		setSelectedVideos({ ...selectedVideos });
	};

	if (!isFiltering) {
		resultsString = `Showing ${amountLoaded} of ${totalResults} results`;
		videosResult = likedVideos.map((video) => (
			<VideoResult
				key={video.id}
				likedVideo={video}
				onClick={(event) => handleVideoResultOnClick(event, video)}
				isSelected={!!selectedVideos.videos[video.id]}
			/>
		));
	} else if (isFiltering) {
		resultsString = `Found ${filteredVideos.length} out of ${totalResults} videos that match your filter(s)`;
		videosResult = filteredVideos.map((video) => (
			<VideoResult
				key={video.id}
				likedVideo={video}
				onClick={(event) => handleVideoResultOnClick(event, video)}
				isSelected={!!selectedVideos.videos[video.id]}
			/>
		));
	}

	if (showOnlyUnlisted) {
		resultsString = `Found ${filteredVideos.length} unlisted videos out of ${totalResults} total videos`;
		videosResult = filteredVideos.map((video) => (
			<VideoResult
				key={video.id}
				likedVideo={video}
				onClick={(event) => handleVideoResultOnClick(event, video)}
				isSelected={!!selectedVideos.videos[video.id]}
			/>
		));
	} else if (showOnlyUnlisted && isFiltering) {
		resultsString = `Found ${filteredVideos.length} unlisted videos out of ${totalResults} videos that match your filter(s)`;
		videosResult = filteredVideos.map((video) => (
			<VideoResult
				key={video.id}
				likedVideo={video}
				onClick={(event) => handleVideoResultOnClick(event, video)}
				isSelected={!!selectedVideos.videos[video.id]}
			/>
		));
	}

	return (
		<div className="results-container">
			{totalResults > 0 && <div className="mb-3">{resultsString}</div>}
			<div className="videos scrollbar scrollbar-thumb-rounded scrollbar-thumb-base-content scrollbar-track-base-200">{videosResult}</div>
		</div>
	);
};

export default ResultsContainer;
