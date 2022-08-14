import React, { useEffect, useState } from "react";
import { Modal, Button, Carousel, Card } from "react-daisyui";
import "./App.css";
import Authorize from "./components/Authorize";
import Authorized from "./components/Authorized";
import ReactMarkdown from "react-markdown";
import screenshotLikedVideos from "./assets/images/features/Fetched Videos.png";
import screenshotFilterByProperties from "./assets/images/features/Filtering by Channel and Video.png";
import screenshotFilterByPrivacy from "./assets/images/features/Filtering by Status.png";
import screenshotSelection from "./assets/images/features/Video Selection.png";
import screenshotExport from "./assets/images/features/Export Data.png";

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
			<div className={`flex h-screen justify-center overflow-hidden ${accessToken ? "text-center items-start my-3" : "items-center"}`}>
				<div>
					<h1 className={`font-roboto ${accessToken ? "lg:text-4xl " : "text-2xl lg:text-7xl"}`}>Unlisted YouTube Video Finder</h1>
					{/* Not sure if this is the proper way to add padding WITHOUT increasing the sizing of the parent div, but it works
						Other methods I tried did not help and still increased the size such as box-border */}
					<h3 className={`italic ${accessToken ? "mb-4" : "mb-8 text-xs pl-28 -mr-6 lg:text-3xl w-5/6 lg:ml-24 lg:-mr-24"}`}>
						Find unlisted videos based on the specified filters {!accessToken ? <br /> : null}
						by parsing your liked videos.
					</h3>
					{process.env.REACT_APP_DEV_MODE === "true" && (
						<>
							<br />
							<h3>App Access Token: "{accessToken}"</h3>
						</>
					)}
					{!accessToken ? (
						<>
							<div className="w-[40vw] drop-shadow-lg rounded-2xl mb-8 ml-auto mr-auto">
								<Carousel display="sequential" width="full" className="rounded-2xl">
									<Carousel.Item>
										<Card side="lg">
											<Card.Image src={screenshotLikedVideos} alt="Fetched Liked Videos" className="saturate-[125%]" />
											<Card.Body className="bg-secondary/[5%] rounded-none">
												<Card.Title>Display Liked Videos</Card.Title>
												<p>Easily view all your liked videos associated with your YouTube account.</p>
											</Card.Body>
										</Card>
									</Carousel.Item>
									<Carousel.Item>
										<Card>
											<Card.Image
												src={screenshotFilterByProperties}
												alt="Filter Videos by Channel and Video Names"
												className="saturate-[125%]"
											/>
											<Card.Body className="bg-secondary/[5%] rounded-none">
												<Card.Title>Filtering by Channel or Video Names</Card.Title>
												<p>Quickly filter your liked videos to your requirements such as by channel name or video title.</p>
											</Card.Body>
										</Card>
									</Carousel.Item>
									<Carousel.Item>
										<Card>
											<Card.Image src={screenshotFilterByPrivacy} alt="Filter Videos by Unlisted Videos" className="saturate-[125%]" />
											<Card.Body className="bg-secondary/[5%] rounded-none">
												<Card.Title>Filtering by Unlisted Videos</Card.Title>
												<p>Quickly filter your liked videos based on their privacy status of either public or unlisted.</p>
											</Card.Body>
										</Card>
									</Carousel.Item>
									<Carousel.Item>
										<Card>
											<Card.Image src={screenshotSelection} alt="Video Selection" className="saturate-[125%]" />
											<Card.Body className="bg-secondary/[5%] rounded-none">
												<Card.Title>Video Selection</Card.Title>
												<p>The ability to select certain videos that you would like to export to only get the data you want.</p>
											</Card.Body>
										</Card>
									</Carousel.Item>
									<Carousel.Item>
										<Card>
											<Card.Image src={screenshotExport} alt="Export Data" className="saturate-[125%]" />
											<Card.Body className="bg-secondary/[5%] rounded-none">
												<Card.Title>Export the Data</Card.Title>
												<p>Easily share the data you choose at the click of a button in JSON format.</p>
											</Card.Body>
										</Card>
									</Carousel.Item>
								</Carousel>
							</div>
							<h2 className={`mb-4 text-center w-full ${accessToken ? "" : "text-xs lg:text-3xl w-5/6"}`}>
								Sign in with your YouTube account to begin.
							</h2>
						</>
					) : null}
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
