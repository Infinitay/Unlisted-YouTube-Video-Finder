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
	const getYouTubeVideoLink = (videoId: string): string => {
		return `https://www.youtube.com/watch?v=${videoId}`;
	};

	const getYouTubeChannelLink = (channelId: string): string => {
		return `https://www.youtube.com/channel/${channelId}`;
	};

	// https://stackoverflow.com/a/53567198/7835042
	const openURL = (url: string) => {
		window.open(url, "_blank");
	};
	return (
		<div className="video-result" key={likedVideo.id}>
			<img
				className="video-result-thumbnail"
				onClick={() => openURL(getYouTubeVideoLink(likedVideo.id))}
				src={likedVideo.thumbnail}
				alt={likedVideo.title}
			/>
			<div className="video-result-info">
				<div className="video-result-title" onClick={() => openURL(getYouTubeVideoLink(likedVideo.id))}>
					{likedVideo.title}
				</div>
				<div
					className="video-result-channel"
					onClick={() => openURL(getYouTubeChannelLink(likedVideo.channel.id))}
				>
					{likedVideo.channel.name}
				</div>
			</div>
		</div>
	);
};

export default VideoResult;
