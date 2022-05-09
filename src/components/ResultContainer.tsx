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
	filteredVideos: LikedVideo[];
	isFiltering: boolean;
}

const ResultsContainer: React.FC<props> = ({
	likedVideos,
	amountLoaded,
	totalResults,
	filteredVideos,
	isFiltering,
}) => {
	return (
		<div className="results-container">
			{totalResults > 0 && (
				<div>
					{!isFiltering
						? `Showing ${amountLoaded} of ${totalResults} results`
						: `Found ${filteredVideos.length} out of ${totalResults} videos that match your filter(s)`}
				</div>
			)}
			<div className="videos">
				{isFiltering
					? filteredVideos.map((video) => <VideoResult key={video.id} likedVideo={video} />)
					: likedVideos.map((video) => <VideoResult key={video.id} likedVideo={video} />)}
			</div>
		</div>
	);
};

export default ResultsContainer;
