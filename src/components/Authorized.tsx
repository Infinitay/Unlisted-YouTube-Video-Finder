import React, { useEffect } from "react";
import Filters from "./Filters";
import ResultContainer from "./ResultContainer";
import { googleLogout } from "@react-oauth/google";
import SearchButtonContainer from "./SearchButtonContainer";
import { LikedVideo, SearchingStatus } from "../types";
import { Button } from "react-daisyui";

interface props {
	accessToken: string;
	setAccessToken: React.Dispatch<React.SetStateAction<string>>;
}

const Authorized: React.FC<props> = ({ accessToken, setAccessToken }) => {
	useEffect(() => {
		if (process.env.REACT_APP_DEV_MODE === "true") {
			console.log("AUTHORIZED: " + accessToken);
		}
	}, [accessToken]);

	const [filterByChannel, setFilterByChannel] = React.useState("");
	const [filterByTitle, setFilterByTitle] = React.useState("");
	const [isFiltering, setIsFiltering] = React.useState(false);

	const [likedVideos, setLikedVideos] = React.useState<LikedVideo[]>([]);
	const [amountLoaded, setAmountLoaded] = React.useState<number>(0);
	const [totalResults, setTotalResults] = React.useState<number>(0);

	const [filteredVideos, setFilteredVideos] = React.useState<LikedVideo[]>([]);

	const [searchingStatus, setSearchingStatus] = React.useState<SearchingStatus>(SearchingStatus.ColdStart);

	const logout = () => {
		console.log("Logged out.");
		setAccessToken("");
		googleLogout();
	};

	const resetState = () => {
		console.log("Resetting videos and filters");
		// Keep in mind doing this will cause the SearchButtonContainer#useEffect that uses the respective variables as dependencies will run
		setLikedVideos([]);
		setAmountLoaded(0);
		setTotalResults(0);
		setFilteredVideos([]);
		setFilterByChannel("");
		setFilterByTitle("");
		setIsFiltering(false);
		setSearchingStatus(SearchingStatus.ColdStart);
	};

	return (
		<div>
			<div className="inline-flex py-3 flex-row space-x-5 items-center justify-evenly">
				<SearchButtonContainer
					accessToken={accessToken}
					likedVideos={likedVideos}
					setLikedVideos={setLikedVideos}
					amountLoaded={amountLoaded}
					setAmountLoaded={setAmountLoaded}
					totalResults={totalResults}
					setTotalResults={setTotalResults}
					filterByChannel={filterByChannel}
					filterByTitle={filterByTitle}
					isFiltering={isFiltering}
					setFilteredVideos={setFilteredVideos}
					searchingStatus={searchingStatus}
					setSearchingStatus={setSearchingStatus}
				/>
				{likedVideos.length > 0 && (
					<Filters setFilterByChannel={setFilterByChannel} setFilterByTitle={setFilterByTitle} setIsFiltering={setIsFiltering} />
				)}
			</div>
			<ResultContainer
				likedVideos={likedVideos}
				amountLoaded={amountLoaded}
				totalResults={totalResults}
				filteredVideos={filteredVideos}
				isFiltering={isFiltering}
			/>
			<div className="inline-flex py-3 flex-row space-x-5 items-center justify-evenly">
				<Button color="secondary" onClick={logout}>
					Sign Out
				</Button>
				<Button color="secondary" onClick={resetState}>
					Reset All
				</Button>
			</div>
		</div>
	);
};

export default Authorized;
