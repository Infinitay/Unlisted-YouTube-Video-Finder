import React, { useEffect } from "react";
import Filters from "./Filters";
import ResultContainer from "./ResultContainer";
import { GoogleLogout } from "react-google-login";
import SearchButtonContainer from "./SearchButtonContainer";
import { LikedVideo } from "../types";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || "";

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

	const onLogout = () => {
		console.log("Logged out.");
		setAccessToken("");
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
				<GoogleLogout clientId={CLIENT_ID} buttonText="Sign out" onLogoutSuccess={onLogout} />
			</div>
		</div>
	);
};

export default Authorized;
