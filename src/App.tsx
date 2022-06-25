import React, { useState } from "react";
import "./App.css";
import Authorize from "./components/Authorize";
import Authorized from "./components/Authorized";

function App() {
	const [accessToken, setAccessToken] = useState<string>("");

	return (
		<div className="App">
			<h1 className="text-4xl font-roboto">Unlisted YouTube Video Finder</h1>
			<h3>
				Helps find unlisted videos based on the specified filters by parsing your liked videos.
			</h3>
			{process.env.REACT_APP_DEV_MODE === "true" && (
				<>
					<br />
					<h3>App Access Token: "{accessToken}"</h3>
				</>
			)}

			{accessToken ? (
				<Authorized accessToken={accessToken} setAccessToken={setAccessToken} />
			) : (
				<Authorize setAccessToken={setAccessToken} />
			)}
		</div>
	);
}

export default App;
