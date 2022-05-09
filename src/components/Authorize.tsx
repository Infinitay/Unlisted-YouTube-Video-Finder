import React from "react";
import { GoogleLogin } from "react-google-login";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || "";

interface props {
	setAccessToken: React.Dispatch<React.SetStateAction<string>>;
}

const Authorize: React.FC<props> = ({ setAccessToken }) => {
	const authSuccess = (response: any) => {
		console.log(response);
		setAccessToken(response.accessToken);
	};
	const authFail = (response: any) => {
		console.log(response);
		alert("Authorization failed. Check console (F12) for more details.");
	};

	return (
		<div id="authorizeButton">
			<GoogleLogin
				clientId={CLIENT_ID}
				onSuccess={authSuccess}
				onFailure={authFail}
				cookiePolicy={"single_host_origin"}
				redirectUri={window.location.href}
				scope={"https://www.googleapis.com/auth/youtube.readonly"}
			/>
		</div>
	);
};

export default Authorize;
