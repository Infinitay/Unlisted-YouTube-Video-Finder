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

export interface Status {
	uploadStatus: string;
	privacyStatus: string;
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
	privacyStatus: string; // "public" or "unlisted" or "private", although I don't think "private" is possible
	thumbnail: string;
	channel: LikedVideoChannel;
}

export interface LikedVideoChannel {
	id: string;
	name: string;
}
