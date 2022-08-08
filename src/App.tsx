import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-daisyui";
import "./App.css";
import Authorize from "./components/Authorize";
import Authorized from "./components/Authorized";
import ReactMarkdown from "react-markdown";

function App() {
	const [accessToken, setAccessToken] = useState<string>("");
	const [privacyPolicy, setPrivacyPolicy] = useState<string>("");
	const [showPrivacyPolicy, setShowPrivacyPolicy] = useState<boolean>(false);

	useEffect(() => {
		fetch("https://raw.githubusercontent.com/Infinitay/Unlisted-YouTube-Video-Finder/master/PRIVACY_POLICY.md")
			.then((res) => res.text())
			.then((text) => setPrivacyPolicy(text));
	}, []);

	return (
		<div className="flex flex-col h-screen">
			<div className={`flex h-screen justify-center overflow-hidden ${accessToken ? "text-center items-start py-3" : "items-center"}`}>
				<div>
					<h1 className={`font-roboto ${accessToken ? "lg:text-4xl " : "text-2xl lg:text-7xl"}`}>Unlisted YouTube Video Finder</h1>
					{/* Not sure if this is the proper way to add padding WITHOUT increasing the sizing of the parent div, but it works
						Other methods I tried did not help and still increased the size such as box-border */}
					<h3 className={`italic pb-5 ${accessToken ? "" : "text-xs pl-6 -mr-6 lg:text-3xl w-5/6 lg:pl-24 lg:-mr-24"}`}>
						Find unlisted videos based on the specified filters by parsing your liked videos.
					</h3>
					{process.env.REACT_APP_DEV_MODE === "true" && (
						<>
							<br />
							<h3>App Access Token: "{accessToken}"</h3>
						</>
					)}
					{accessToken ? <Authorized accessToken={accessToken} setAccessToken={setAccessToken} /> : <Authorize setAccessToken={setAccessToken} />}
				</div>
			</div>
			{/* "sticky top-[100vh] text-center" or "mt-auto text-center" */}
			<div className="mt-auto text-center">
				<div className="cursor-pointer" onClick={() => setShowPrivacyPolicy(!showPrivacyPolicy)}>
					Privacy Policy
				</div>
				<Modal open={showPrivacyPolicy} onClickBackdrop={() => setShowPrivacyPolicy(!showPrivacyPolicy)}>
					<Modal.Header className="font-bold">
						<a href="https://github.com/Infinitay/Unlisted-YouTube-Video-Finder/blob/master/PRIVACY_POLICY.md">Privacy Policy</a>
					</Modal.Header>

					<Modal.Body>
						<ReactMarkdown children={privacyPolicy}></ReactMarkdown>
					</Modal.Body>

					<Modal.Actions>
						<Button onClick={() => setShowPrivacyPolicy(!showPrivacyPolicy)}>Okay</Button>
					</Modal.Actions>
				</Modal>
			</div>
		</div>
	);
}

export default App;
