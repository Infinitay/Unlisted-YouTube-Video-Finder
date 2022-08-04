import React from "react";
import { LikedVideo } from "../types";
import VideoResult from "./VideoResult";

interface props {
	likedVideos: LikedVideo[];
	amountLoaded: number;
	totalResults: number;
	filteredVideos: LikedVideo[];
	isFiltering: boolean;
	showOnlyUnlisted?: boolean;
}

const ResultsContainer: React.FC<props> = ({ likedVideos, amountLoaded, totalResults, filteredVideos, isFiltering, showOnlyUnlisted }) => {
	let resultsString = "";
	let videosResult: JSX.Element[] = [];

	if (!isFiltering) {
		resultsString = `Showing ${amountLoaded} of ${totalResults} results`;
		videosResult = likedVideos.map((video) => <VideoResult key={video.id} likedVideo={video} />);
	} else if (isFiltering) {
		resultsString = `Found ${filteredVideos.length} out of ${totalResults} videos that match your filter(s)`;
		videosResult = filteredVideos.map((video) => <VideoResult key={video.id} likedVideo={video} />);
	}

	if (showOnlyUnlisted) {
		resultsString = `Found ${filteredVideos.length} unlisted videos out of ${totalResults} total videos`;
		videosResult = filteredVideos.map((video) => <VideoResult key={video.id} likedVideo={video} />);
	} else if (showOnlyUnlisted && isFiltering) {
		resultsString = `Found ${filteredVideos.length} unlisted videos out of ${totalResults} videos that match your filter(s)`;
		videosResult = filteredVideos.map((video) => <VideoResult key={video.id} likedVideo={video} />);
	}

	return (
		<div className="results-container">
			{totalResults > 0 && <div className="mb-3">{resultsString}</div>}
			<div className="videos scrollbar scrollbar-thumb-rounded scrollbar-thumb-base-content scrollbar-track-base-200">{videosResult}</div>
		</div>
	);
};

export default ResultsContainer;
