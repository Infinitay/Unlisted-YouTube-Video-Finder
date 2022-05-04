import axios from "axios";
import { YouTubeListResult, LikedVideo } from "../types";

interface GetAllLikedVideosSync {
	setLikedVideos: React.Dispatch<React.SetStateAction<LikedVideo[]>>;
	setAmountLoaded: React.Dispatch<React.SetStateAction<number>>;
	setTotalResults: React.Dispatch<React.SetStateAction<number>>;
	abortControllerSignal?: AbortSignal;
	delay?: number;
}

export default class YouTubehelper {
	// Private variable to store auth token
	private oauthToken: string;

	constructor(oauthToken: string) {
		this.oauthToken = oauthToken;
	}

	async getLikedVideos(
		pageToken?: string,
		abortControllerSignal?: AbortSignal
	): Promise<{
		videos: LikedVideo[];
		totalVideos: number;
		nextPageToken: string;
	}> {
		// Include topicDetails in part as a way to determine whether or not a video is a short
		// That way we can get the appropriate thumbnails accordingly because sizes are different
		const results = await axios.get<YouTubeListResult>(`https://youtube.googleapis.com/youtube/v3/videos`, {
			headers: { Authorization: `Bearer ${this.oauthToken}` },
			params: {
				part: encodeURI("snippet,status"),
				myRating: "like",
				maxResults: 50,
				pageToken: pageToken, // ? pageToken : undefined,
				// ...(pageToken) && {pageToken: pageToken}
			},
			signal: abortControllerSignal,
		});
		console.log(results);
		const videos: LikedVideo[] = results.data.items.map((likedVideo) => {
			return {
				id: likedVideo.id,
				title: likedVideo.snippet.title,
				localizedTitle: likedVideo.snippet.localized.title,
				publishedAt: likedVideo.snippet.publishedAt,
				privacyStatus: likedVideo.status.privacyStatus,
				thumbnail: likedVideo.snippet.thumbnails.medium.url,
				channel: {
					id: likedVideo.snippet.channelId,
					name: likedVideo.snippet.channelTitle,
				},
			};
		});
		return {
			videos: videos,
			totalVideos: results.data.pageInfo.totalResults,
			nextPageToken: results.data.nextPageToken,
		};
	}

	async getAllLikedVideosSync(options: GetAllLikedVideosSync): Promise<{
		videos: LikedVideo[];
		loadedVideos: number;
		totalVideos: number;
	}> {
		let likedVideos: LikedVideo[] = [];
		let loadedVideos = 0;
		let _totalVideos = 0;
		let _nextPageToken = "";
		do {
			try {
				const { videos, totalVideos, nextPageToken } = await this.getLikedVideos(
					_nextPageToken,
					options.abortControllerSignal
				);
				_nextPageToken = nextPageToken;
				likedVideos = likedVideos.concat(videos);
				loadedVideos += videos.length;
				_totalVideos = totalVideos;
				options.setLikedVideos(likedVideos);
				options.setAmountLoaded(loadedVideos);
				options.setTotalResults(totalVideos);
				await this.sleep(options.delay || 1000);
			} catch (e) {
				if (e instanceof Error) {
					console.log(`Error: ${e.message}`);
				}
				break;
			}
		} while (_nextPageToken);

		return {
			videos: likedVideos,
			loadedVideos: loadedVideos,
			totalVideos: _totalVideos,
		};
	}

	async getAllLikedVideos(abortControllerSignal?: AbortSignal): Promise<{
		videos: LikedVideo[];
		loadedVideos: number;
		totalVideos: number;
	}> {
		let likedVideos: LikedVideo[] = [];
		let loadedVideos = 0;
		let _totalVideos = 0;
		let _nextPageToken = "";
		do {
			try {
				const { videos, totalVideos, nextPageToken } = await this.getLikedVideos(
					_nextPageToken,
					abortControllerSignal
				);
				_nextPageToken = nextPageToken;
				likedVideos = likedVideos.concat(videos);
				loadedVideos += videos.length;
				_totalVideos = totalVideos;
				await this.sleep(5000);
			} catch (e) {
				if (e instanceof Error) {
					console.log(`Error: ${e.message}`);
				}
				break;
			}
		} while (_nextPageToken);

		return {
			videos: likedVideos,
			loadedVideos: loadedVideos,
			totalVideos: _totalVideos,
		};
	}

	private sleep(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}
