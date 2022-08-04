import React from "react";
import { Button, Input, Toggle, Tooltip } from "react-daisyui";
import { ReactComponent as EyeOffIcon } from "../assets/svgs/eye-off.svg";
interface props {
	setFilterByChannel: React.Dispatch<React.SetStateAction<string>>;
	setFilterByTitle: React.Dispatch<React.SetStateAction<string>>;
	setIsFiltering: React.Dispatch<React.SetStateAction<boolean>>;
}

const Filters: React.FC<props> = ({ setFilterByChannel, setFilterByTitle, setIsFiltering }) => {
	const [showOnlyUnlisted, setShowOnlyUnlisted] = React.useState(false);

	const handleToggleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsFiltering(event.target.checked);
	};

	const handleToggleShowUnlisted = () => {
		setShowOnlyUnlisted(!showOnlyUnlisted);
	};

	return (
		<div className="flex flex-row space-x-5 items-center justify-evenly">
			<Input id="channelName" type="text" onChange={(event) => setFilterByChannel(event.target.value)} placeholder="Filter by channel name" />
			<Input id="videoTitle" type="text" onChange={(event) => setFilterByTitle(event.target.value)} placeholder="Filter by video title" />
			<Toggle onChange={handleToggleFilter} size="lg" />
			<Button color="ghost" className={`unlisted-button-${showOnlyUnlisted ? "enabled" : "disabled"}`} onClick={handleToggleShowUnlisted}>
				<Tooltip message="Show only unlisted videos">
					<EyeOffIcon />
				</Tooltip>
			</Button>
		</div>
	);
};

export default Filters;
