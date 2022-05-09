import React, { useEffect } from "react";
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
	filterByChannel: string;
	filterByTitle: string;
	isFiltering: boolean;
	setIsFiltering: React.Dispatch<React.SetStateAction<boolean>>;
	setFilteredVideos: React.Dispatch<React.SetStateAction<LikedVideo[]>>;
}

const SearchButtonContainer: React.FC<props> = ({
	accessToken,
	likedVideos,
	setLikedVideos,
	amountLoaded,
	setAmountLoaded,
	totalResults,
	setTotalResults,
	filterByChannel,
	filterByTitle,
	isFiltering,
	setIsFiltering,
	setFilteredVideos,
}) => {
	const [abortController, setAbortController] = React.useState<AbortController>(new AbortController());
	const [searching, setSearching] = React.useState(false);
	const [isLocalFiltering, setIsLocalFiltering] = React.useState(false);

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
		// setSearching(false);
	};

	const handleStopFetchingLikes = () => {
		console.log("Stopped fetching liked videos.");
		setSearching(false);
		abortController.abort();
		setAbortController(new AbortController());
	};

	const handleToggleFilter = () => {
		console.log(`isFiltering State: ${isFiltering}`);
		console.log(`isLocalFiltering State: ${isLocalFiltering}`);
		setIsLocalFiltering(!isLocalFiltering);
		if (isFiltering) {
			setIsFiltering(false);
		}
	};

	const filterVideos = () => {
		console.log("Filtering videos...");
		let filteredVideos = filterVideosByChannel(filterByChannel, likedVideos);
		filteredVideos = filterVideosByTitle(filterByTitle, filteredVideos);
		setFilteredVideos(filteredVideos);
		setIsFiltering(!isFiltering);
	};

	const filterVideosByTitle = (title: string, videos: LikedVideo[]) => {
		if (!title) return videos;
		const filtered = likedVideos.filter((video) => video.title.toLowerCase().includes(title.toLowerCase()));
		console.log(`Found ${filtered.length} videos that match video title of "${title}"`);
		return filtered;
	};

	const filterVideosByChannel = (channel: string, videos: LikedVideo[]) => {
		if (!channel) return videos;
		const filtered = likedVideos.filter((video) =>
			video.channel.name.toLowerCase().includes(channel.toLowerCase())
		);
		console.log(`Found ${filtered.length} videos that match channel name of "${channel}"`);
		return filtered;
	};

	// https://stackoverflow.com/a/71392984/7835042
	// Since we don't need to update anything on the UI when the variable changes, we use #useRef
	const timeout = React.useRef<ReturnType<typeof setTimeout>>();

	useEffect(() => {
		console.log(`isFiltering: ${isFiltering}`);
		if (timeout.current) clearTimeout(timeout.current);
		if (isLocalFiltering) {
			timeout.current = setTimeout(() => {
				filterVideos();
			}, 750);
		} else {
			console.log("Clearing filter");
			setFilteredVideos(likedVideos);
		}
	}, [filterByChannel, filterByTitle, isLocalFiltering]);

	return (
		<div>
			<button id="getLikedVideos" onClick={!searching ? handleGetLikedVideos : handleStopFetchingLikes}>
				{searching ? "Stop Fetching Videos" : "Get Liked Videos"}
			</button>
			<button
				id={isLocalFiltering ? "toggleFilter--enabled" : "toggleFilter--disabled"}
				onClick={handleToggleFilter}
			>
				Toggle Filter
			</button>
		</div>
	);
};

export default SearchButtonContainer;
