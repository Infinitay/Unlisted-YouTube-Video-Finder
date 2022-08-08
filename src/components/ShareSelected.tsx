import React, { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-daisyui";
import { LikedVideo } from "../types";
interface props {
	filteredVideos: LikedVideo[]; // Could also be all videos
	selectedVideos: LikedVideo[];
}

// https://react.daisyui.com/?path=/story/actions-modal--default
// Remember that React renders when things change. We call this in Authorized.tsx so unless we prevent anything in <Modal/> from running
// It will keep re-rendering that Modal and therefore mapping over and over.
const ShareSelected: React.FC<props> = ({ filteredVideos, selectedVideos }) => {
	const [visible, setVisible] = useState<boolean>(false);
	const [alertVisibility, setAlertVisibility] = useState<boolean>(false);
	const alertRef = React.useRef<HTMLDivElement>(null);

	const toggleVisibility = React.useCallback(() => {
		setVisible((v) => !v);
	}, []);

	const handleCopy = () => {
		navigator.clipboard.writeText(getJSONString(mapVideosToShare(selectedVideos.length > 0 ? selectedVideos : filteredVideos), false));
		console.log("Showing alert");
		setAlertVisibility(true);
	};

	const mapVideosToShare = (videos: LikedVideo[]) => {
		return videos.map(({ thumbnail, localizedTitle, ...v }) => v);
	};
	const getPreviewArray = (videos: LikedVideo[]) => {
		return videos.slice(0, 1);
	};

	const getJSONString = (videos: any[], pretty?: boolean) => {
		return pretty ? JSON.stringify(videos, null, 4) : JSON.stringify(videos);
	};

	useEffect(() => {
		if (alertVisibility) {
			toggleVisibility();
			// Update the alertRef's style
			alertRef.current!.style["right"] = "0";
			setTimeout(() => {
				console.log("Closing alert");
				alertRef.current!.style["right"] = "-100%";
			}, 3000);

			const finalTimer = setTimeout(() => {
				setAlertVisibility(false);
			}, 3250);
			return () => clearTimeout(finalTimer);
		}
	}, [alertVisibility, toggleVisibility]);

	return (
		<div className="overflow-hidden font-sans">
			{alertVisibility && (
				<Alert
					ref={alertRef}
					status="success"
					className="overflow-hidden w-auto m-5 transition-all duration-1000 ease-in-out fixed -right-[100%] top-0 z-10 shadow-md shadow-success"
				>
					{selectedVideos.length > 0
						? `Copied ${selectedVideos.length} selected video${selectedVideos.length > 1 ? "s" : ""}`
						: "Copied all shown videos"}
				</Alert>
			)}
			<Button color="secondary" onClick={toggleVisibility}>
				{selectedVideos.length > 0 ? `Share ${selectedVideos.length} selected video${selectedVideos.length > 1 ? "s" : ""}` : "Share all shown videos"}
			</Button>
			{visible && (
				<Modal className="w-[35vw] max-w-[35vw] max-h-[70vh] " open={visible} onClickBackdrop={toggleVisibility}>
					<Button size="sm" shape="circle" className="absolute right-2 top-2" onClick={toggleVisibility}>
						✕
					</Button>
					<Modal.Header className="font-bold">Export Preview</Modal.Header>
					<div className="max-h-[45vh] whitespace-pre-wrap text-ellipsis text-start">
						<code>
							{(() => {
								let videos: LikedVideo[] = selectedVideos.length > 0 ? selectedVideos : filteredVideos;
								const x = mapVideosToShare(getPreviewArray(videos));
								return getJSONString(x, true);
							})()}
						</code>
					</div>

					<Modal.Actions>
						<Button disabled={alertVisibility} onClick={handleCopy}>
							Copy
						</Button>
					</Modal.Actions>
				</Modal>
			)}
		</div>
	);
};

export default ShareSelected;
