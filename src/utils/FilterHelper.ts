import { LikedVideo, PrivacyStatus } from "../types";

interface FilterVideosOptions {
	channelName?: string;
	videoTitle?: string;
	showOnlyUnlisted?: boolean;
	videos: LikedVideo[];
}

export const filterVideos = (options: FilterVideosOptions): LikedVideo[] => {
	let filteredVideos = filterVideosByChannel(options.channelName || "", options.videos);
	filteredVideos = filterVideosByTitle(options.videoTitle || "", filteredVideos);

	if (options.showOnlyUnlisted) {
		filteredVideos = filterVideosByUnlisted(filteredVideos);
	}
	return filteredVideos;
};

export const filterVideosByTitle = (title: string, videos: LikedVideo[]): LikedVideo[] => {
	if (!title) return videos;
	const filtered = videos.filter((video) => video.title.toLowerCase().includes(title.toLowerCase()));
	console.log(`Found ${filtered.length} videos that match video title of "${title}"`);
	return filtered;
};

export const filterVideosByChannel = (channel: string, videos: LikedVideo[]): LikedVideo[] => {
	if (!channel) return videos;
	const filtered = videos.filter((video) => video.channel.name.toLowerCase().includes(channel.toLowerCase()));
	console.log(`Found ${filtered.length} videos that match channel name of "${channel}"`);
	return filtered;
};

const filterVideosByPrivacyStatus = (privacyStatus: PrivacyStatus | "", videos: LikedVideo[]): LikedVideo[] => {
	if (!privacyStatus) return videos;
	const filtered = videos.filter((video) => video.privacyStatus.toLowerCase().includes(privacyStatus.toLowerCase()));
	console.log(`Found ${filtered.length} videos that match privacy status of "${privacyStatus}"`);
	return filtered;
};

export const filterVideosByUnlisted = (videos: LikedVideo[]): LikedVideo[] => {
	const filtered = filterVideosByPrivacyStatus("unlisted", videos);
	console.log(`Found ${filtered.length} videos that are unlisted`);
	return filtered;
};
