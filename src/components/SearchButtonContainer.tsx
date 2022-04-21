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
	const handleGetLikedVideos = () => {
		console.log("Getting liked videos...");
		const yt = new YouTubehelper(accessToken);
		yt.getLikedVideos().then((result) => {
			console.log("Got liked videos.");
			setLikedVideos([...likedVideos, ...result.videos]);
			setAmountLoaded(amountLoaded + result.videos.length);
			setTotalResults(result.totalVideos);
		});
	};

	const handleToggleFilter = () => {};
	return (
		<div>
			<button id="getLikedVideos" onClick={handleGetLikedVideos}>
				Get Liked Videos
			</button>
			<button id="toggleFilter" onClick={handleToggleFilter}>
				Toggle Filter
			</button>
		</div>
	);
};

export default SearchButtonContainer;
