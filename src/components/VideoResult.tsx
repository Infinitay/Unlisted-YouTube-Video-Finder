import React from "react";

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
	likedVideo: LikedVideo;
}

const VideoResult: React.FC<props> = ({ likedVideo }) => {
	return (
		<div className="video-result" key={likedVideo.id}>
			<img src={likedVideo.thumbnail} alt={likedVideo.title} />
			<div className="video-result-info">
				<div className="video-result-title">{likedVideo.title}</div>
				<div className="video-result-channel">
					{likedVideo.channel.name}
				</div>
			</div>
		</div>
	);
};

export default VideoResult;
