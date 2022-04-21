import axios from "axios";
import { YouTubeListResult, LikedVideo } from "../types";

export default class YouTubehelper {
	// Private variable to store auth token
	private oauthToken: string;

	constructor(oauthToken: string) {
		this.oauthToken = oauthToken;
	}

	async getLikedVideos(
		pageToken?: string
	): Promise<{ videos: LikedVideo[]; totalVideos: number }> {
		const results = await axios.get<YouTubeListResult>(
			`https://youtube.googleapis.com/youtube/v3/videos`,
			{
				headers: { Authorization: `Bearer ${this.oauthToken}` },
				params: {
					part: encodeURI("snippet,status"),
					myRating: "like",
					maxResults: 50,
					pageToken: pageToken ? pageToken : undefined,
					// ...(pageToken) && {pageToken: pageToken}
				},
				method: "GET",
			}
		);
		console.log(results);
		const videos: LikedVideo[] = results.data.items.map((likedVideo) => {
			return {
				id: likedVideo.id,
				title: likedVideo.snippet.title,
				localizedTitle: likedVideo.snippet.localized.title,
				publishedAt: likedVideo.snippet.publishedAt,
				privacyStatus: likedVideo.status.privacyStatus,
				thumbnail: likedVideo.snippet.thumbnails.default.url,
				channel: {
					id: likedVideo.snippet.channelId,
					name: likedVideo.snippet.channelTitle,
				},
			};
		});
		return {
			videos: videos,
			totalVideos: results.data.pageInfo.totalResults,
		};
	}
}
