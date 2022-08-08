export interface YouTubeListResult {
	kind: string;
	etag: string;
	items: Item[];
	nextPageToken: string;
	pageInfo: PageInfo;
}

export interface Item {
	kind: string;
	etag: string;
	id: string;
	snippet: Snippet;
	status: Status;
	topicDetails?: TopicDetails;
}

export interface Snippet {
	publishedAt: Date;
	channelId: string;
	title: string;
	description: string;
	thumbnails: Thumbnails;
	channelTitle: string;
	tags?: string[];
	categoryId: string;
	liveBroadcastContent: string;
	defaultLanguage?: string;
	localized: Localized;
	defaultAudioLanguage?: string;
}

export interface Localized {
	title: string;
	description: string;
}

export interface Thumbnails {
	default: Default;
	medium: Default;
	high: Default;
	standard?: Default;
	maxres?: Default;
}

export interface Default {
	url: string;
	width: number;
	height: number;
}

// https://developers.google.com/youtube/v3/docs/videos#status.privacyStatus
export type PrivacyStatus = "private" | "public" | "unlisted";

export interface Status {
	uploadStatus: string;
	privacyStatus: PrivacyStatus;
	license: string;
	embeddable: boolean;
	publicStatsViewable: boolean;
	madeForKids: boolean;
}

export interface TopicDetails {
	topicCategories: string[];
}

export interface PageInfo {
	totalResults: number;
	resultsPerPage: number;
}

export interface LikedVideo {
	id: string;
	title: string;
	localizedTitle: string;
	publishedAt: Date;
	privacyStatus: PrivacyStatus;
	thumbnail: string;
	channel: LikedVideoChannel;
}

export interface LikedVideoChannel {
	id: string;
	name: string;
}

// Enums are "objects" in JavaScript, so it will compare the actual values rather than memory addresses
export enum SearchingStatus {
	ColdStart,
	Searching,
	Paused,
	Finished,
}

// Used to store the state of selected videos. This will be an object with the video id as the key, and the LikedVideo as the value.
export interface SelectedVideos {
	videos: { [id: string]: LikedVideo };
	length: number; // Store the number of entries to make an O(1) lookup instead of O(n) with Object#keys#length
}
