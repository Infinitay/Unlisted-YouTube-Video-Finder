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

	const [likedVideos, setLikedVideos] = React.useState<LikedVideo[]>([]);
	const [amountLoaded, setAmountLoaded] = React.useState<number>(0);
	const [totalResults, setTotalResults] = React.useState<number>(0);

	const onLogout = () => {
		console.log("Logged out.");
		setAccessToken("");
	};

	return (
		<div>
			<Filters />
			<SearchButtonContainer
				accessToken={accessToken}
				likedVideos={likedVideos}
				setLikedVideos={setLikedVideos}
				amountLoaded={amountLoaded}
				setAmountLoaded={setAmountLoaded}
				totalResults={totalResults}
				setTotalResults={setTotalResults}
			/>
			<ResultContainer likedVideos={likedVideos} amountLoaded={amountLoaded} totalResults={totalResults} />
			<div id="signOut">
				<GoogleLogout clientId={CLIENT_ID} buttonText="Sign out" onLogoutSuccess={onLogout} />
			</div>
		</div>
	);
};

export default Authorized;
