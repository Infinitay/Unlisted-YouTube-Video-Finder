import React, { useState } from "react";
import "./App.css";
import Authorize from "./components/Authorize";
import Authorized from "./components/Authorized";

function App() {
	const [accessToken, setAccessToken] = useState<string>("");

	return (
		<div className="App">
			<div className="header">Unlisted YouTube Video Finder</div>
			<div className="description">
				Helps find unlisted videos based on the specified filters by
				parsing your liked videos.
			</div>
			{<>
				<br />
				App Access Token: "{accessToken}"
			</>}

			{accessToken ? (
				<Authorized
					accessToken={accessToken}
					setAccessToken={setAccessToken}
				/>
			) : (
				<Authorize setAccessToken={setAccessToken} />
			)}
		</div>
	);
}

export default App;
