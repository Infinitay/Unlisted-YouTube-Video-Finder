import React, { useEffect } from "react";
import { LikedVideo, SearchingStatus } from "../types";
import YouTubehelper from "../utils/YouTubeHelper";
import { filterVideos } from "../utils/FilterHelper";
import { Button } from "react-daisyui";
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
	setFilteredVideos,
}) => {
	const [abortController, setAbortController] = React.useState<AbortController>(new AbortController());
	const [searchingStatus, setSearchingStatus] = React.useState<SearchingStatus>(SearchingStatus.ColdStart);
	const [searchPageToken, setSearchPageToken] = React.useState<string>(""); // Used when the user pauses the search and resumes it later

	const handleGetLikedVideos = () => {
		console.log("Getting liked videos...");
		setSearchingStatus(SearchingStatus.Searching);
		const yt = new YouTubehelper(accessToken);
		yt.getAllLikedVideos({
			...(searchPageToken && { previousVideos: likedVideos }),
			setLikedVideos,
			setAmountLoaded,
			setTotalResults,
			...(searchPageToken && { pageToken: searchPageToken }),
			abortControllerSignal: abortController.signal,
		})
			.then((result) => {
				if (abortController.signal.aborted) {
					console.log("Aborted fetching of videos.");
					setSearchPageToken(result.nextPageToken!);
					return;
				}
				console.log("Finished fetching all liked videos.");
				setSearchingStatus(SearchingStatus.Finished);
			})
			.catch((error) => {
				console.log("Error fetching liked videos.");
				console.log(error);
			});
	};

	const handleStopFetchingLikes = () => {
		console.log("Pausing fetching liked videos.");
		setSearchingStatus(SearchingStatus.Paused);
		abortController.abort();
		setAbortController(new AbortController());
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
				return "Get Liked Videos";
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
				setFilteredVideos(filterVideos({ channelName: filterByChannel, videoTitle: filterByTitle, videos: likedVideos }));
			}, 750);
		}
	}, [filterByChannel, filterByTitle, isFiltering, likedVideos, setFilteredVideos]);

	return (
		<Button
			id="getLikedVideos"
			onClick={searchingStatus !== SearchingStatus.Searching ? handleGetLikedVideos : handleStopFetchingLikes}
			disabled={searchingStatus === SearchingStatus.Finished}
		>
			{getSearchingStatusText()}
		</Button>
	);
};

export default SearchButtonContainer;
