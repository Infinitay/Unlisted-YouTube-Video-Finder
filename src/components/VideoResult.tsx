import React from "react";
import { ReactComponent as EyeIcon } from "../assets/svgs/eye.svg";
import { ReactComponent as EyeOffIcon } from "../assets/svgs/eye-off.svg";
import { Tooltip } from "react-daisyui";
import { LikedVideo } from "../types";

interface props {
	likedVideo: LikedVideo;
	onClick: (event: React.MouseEvent<Element>) => void;
	isSelected: boolean;
}

const VideoResult: React.FC<props> = ({ likedVideo, onClick, isSelected }) => {
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
		<div className={`video-result ${isSelected ? "video-result-selected" : ""}`} key={likedVideo.id} onClick={(event) => onClick(event)}>
			<div className="video-result-thumbnail-container">
				<img
					className="video-result-thumbnail"
					onClick={() => openURL(getYouTubeVideoLink(likedVideo.id))}
					src={likedVideo.thumbnail}
					alt={likedVideo.title}
				/>
				<Tooltip message={likedVideo.privacyStatus} className="video-result-privacy-status-tooltip" position="top">
					{likedVideo.privacyStatus === "public" ? (
						<EyeIcon className="video-result-privacy-status" />
					) : (
						<EyeOffIcon className="video-result-privacy-status" />
					)}
				</Tooltip>
			</div>
			<div className="video-result-info">
				<div className="video-result-title" onClick={() => openURL(getYouTubeVideoLink(likedVideo.id))}>
					{likedVideo.title}
				</div>
				<div className="video-result-channel" onClick={() => openURL(getYouTubeChannelLink(likedVideo.channel.id))}>
					{likedVideo.channel.name}
				</div>
			</div>
		</div>
	);
};

export default VideoResult;
