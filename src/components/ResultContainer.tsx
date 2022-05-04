import React from "react";
import VideoResult from "./VideoResult";

interface LikedVideo {
	id: string;
	title: string;
	localizedTitle: string;
	publishedAt: Date;
	privacyStatus: string; // "public" or "unlisted" or "private", although I don't think "private" is possible
	thumbnail: string;
	channel: LikedVideoChannel;
}

interface LikedVideoChannel {
	id: string;
	name: string;
}

interface props {
	likedVideos: LikedVideo[];
	amountLoaded: number;
	totalResults: number;
}

const ResultsContainer: React.FC<props> = ({ likedVideos, amountLoaded, totalResults }) => {
	return (
		<div className="results-container">
			<div>
				Showing {amountLoaded} of {totalResults} results
			</div>
			<div className="videos">
				{likedVideos.map((video) => (
					<VideoResult key={video.id} likedVideo={video} />
				))}
			</div>
		</div>
	);
};

export default ResultsContainer;
