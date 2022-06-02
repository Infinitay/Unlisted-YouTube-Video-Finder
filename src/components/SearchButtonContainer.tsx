import React, { useEffect } from "react";
import { LikedVideo, SearchingStatus } from "../types";
import YouTubehelper from "../utils/YouTubeHelper";
import { filterVideos } from "../utils/FilterHelper";
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
	const [searchingStatus, setSearchingStatus] = React.useState<SearchingStatus>(SearchingStatus.Finished);

	const handleGetLikedVideos = () => {
		console.log("Getting liked videos...");
		setSearchingStatus(SearchingStatus.Searching);
		const yt = new YouTubehelper(accessToken);
		yt.getAllLikedVideos({
			setLikedVideos,
			setAmountLoaded,
			setTotalResults,
			abortControllerSignal: abortController.signal,
		}).then((result) => {
			if (abortController.signal.aborted) {
				console.log("Aborted fetching of videos.");
				return;
			}
			console.log("Finished fetching all liked videos.");
			setSearchingStatus(SearchingStatus.Finished);
		});
	};

	const handleStopFetchingLikes = () => {
		console.log("Pausing fetching liked videos.");
		setSearchingStatus(SearchingStatus.Paused);
		abortController.abort();
		setAbortController(new AbortController());
	};

	const handleToggleFilter = () => {
		console.log(`isFiltering State: ${isFiltering}`);
		setIsFiltering(!isFiltering);
	};

	const getSearchingStatusText = () => {
		switch (searchingStatus) {
			case SearchingStatus.Searching:
				return "Pause Fetching Videos";
			case SearchingStatus.Paused:
				return "Resume Fetching Videos";
			case SearchingStatus.Finished:
				return "Finished Fetching Videos";
			default:
				return "";
		}
	};

	// https://stackoverflow.com/a/71392984/7835042
	// Since we don't need to update anything on the UI when the variable changes, we use #useRef
	const timeout = React.useRef<ReturnType<typeof setTimeout>>();

	useEffect(() => {
		console.log(`isFiltering: ${isFiltering}`);
		if (timeout.current) clearTimeout(timeout.current);
		if (isFiltering) {
			timeout.current = setTimeout(() => {
				setFilteredVideos(
					filterVideos({ channelName: filterByChannel, videoTitle: filterByTitle, videos: likedVideos })
				);
			}, 750);
		}
	}, [filterByChannel, filterByTitle, isFiltering, likedVideos, setFilteredVideos]);

	return (
		<div>
			<button
				id="getLikedVideos"
				onClick={searchingStatus !== SearchingStatus.Searching ? handleGetLikedVideos : handleStopFetchingLikes}
				hidden={searchingStatus === SearchingStatus.Finished}
			>
				{getSearchingStatusText()}
			</button>
			<button id={isFiltering ? "toggleFilter--enabled" : "toggleFilter--disabled"} onClick={handleToggleFilter}>
				Toggle Filter
			</button>
		</div>
	);
};

export default SearchButtonContainer;
