import React, { useEffect } from "react";
import Filters from "./Filters";
import ResultContainer from "./ResultContainer";
import { googleLogout } from "@react-oauth/google";
import SearchButtonContainer from "./SearchButtonContainer";
import { LikedVideo } from "../types";

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

	const logout = () => {
		console.log("Logged out.");
		setAccessToken("");
		googleLogout();
	};

	return (
		<div>
			<Filters setFilterByChannel={setFilterByChannel} setFilterByTitle={setFilterByTitle} />
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
				setIsFiltering={setIsFiltering}
				setFilteredVideos={setFilteredVideos}
			/>
			<ResultContainer
				likedVideos={likedVideos}
				amountLoaded={amountLoaded}
				totalResults={totalResults}
				filteredVideos={filteredVideos}
				isFiltering={isFiltering}
			/>
			<div id="signOut">
				<button onClick={logout}>Sign Out</button>
			</div>
		</div>
	);
};

export default Authorized;
