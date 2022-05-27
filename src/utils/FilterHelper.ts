import { LikedVideo } from "../types";

interface FilterVideosOptions {
	channelName?: string;
	videoTitle?: string;
	videos: LikedVideo[];
}

	export const filterVideos = (options: FilterVideosOptions): LikedVideo[] => {
		let filteredVideos = filterVideosByChannel(options.channelName || "", options.videos);
		filteredVideos = filterVideosByTitle(options.videoTitle || "", filteredVideos);
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
		const filtered = videos.filter((video) =>
			video.channel.name.toLowerCase().includes(channel.toLowerCase())
		);
		console.log(`Found ${filtered.length} videos that match channel name of "${channel}"`);
		return filtered;
	};

