import React from "react";
import { LikedVideo } from "../types";
import YouTubehelper from "../utils/YouTubeHelper";

interface props {
	accessToken: string;
	likedVideos: LikedVideo[];
	setLikedVideos: React.Dispatch<React.SetStateAction<LikedVideo[]>>;
	amountLoaded: number;
	setAmountLoaded: React.Dispatch<React.SetStateAction<number>>;
	totalResults: number;
	setTotalResults: React.Dispatch<React.SetStateAction<number>>;
}

const SearchButtonContainer: React.FC<props> = ({
	accessToken,
	likedVideos,
	setLikedVideos,
	amountLoaded,
	setAmountLoaded,
	totalResults,
	setTotalResults,
}) => {
	const [abortController, setAbortController] = React.useState<AbortController>(new AbortController());
	const [searching, setSearching] = React.useState(false);
	const [isFiltering, setIsFiltering] = React.useState(false);

	const handleGetLikedVideos = () => {
		console.log("Getting liked videos...");
		setSearching(true);
		console.log(abortController);
		const yt = new YouTubehelper(accessToken);
		yt.getAllLikedVideosSync({
			setLikedVideos,
			setAmountLoaded,
			setTotalResults,
			abortControllerSignal: abortController.signal,
		});
		setSearching(false);
	};

	const handleStopFetchingLikes = () => {
		console.log("Stopped fetching liked videos.");
		setSearching(false);
		abortController.abort();
		setAbortController(new AbortController());
	};

	const handleToggleFilter = () => {
		setIsFiltering(!isFiltering);
	};

	return (
		<div>
			<button id="getLikedVideos" onClick={!searching ? handleGetLikedVideos : handleStopFetchingLikes}>
				{searching ? "Stop Fetching Videos" : "Get Liked Videos"}
			</button>
			<button id="toggleFilter" onClick={handleToggleFilter}>
				Toggle Filter
			</button>
		</div>
	);
};

export default SearchButtonContainer;
