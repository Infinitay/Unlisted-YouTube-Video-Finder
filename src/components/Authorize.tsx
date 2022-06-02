import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginButton from "./GoogleLoginButton";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || "";

interface props {
	setAccessToken: React.Dispatch<React.SetStateAction<string>>;
}

const Authorize: React.FC<props> = ({ setAccessToken }) => {
	return (
		<div id="authorizeButton">
			<GoogleOAuthProvider clientId={CLIENT_ID}>
				<GoogleLoginButton setAccessToken={setAccessToken}/>
			</GoogleOAuthProvider>
		</div>
	);
};

export default Authorize;
