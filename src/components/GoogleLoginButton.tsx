import React from "react";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { Button } from "react-daisyui";

interface props {
	setAccessToken: React.Dispatch<React.SetStateAction<string>>;
}

const GoogleLoginButton: React.FC<props> = ({ setAccessToken }) => {
	const login = useGoogleLogin({
		onSuccess: (response) => {
			authSuccess(response);
		},
		onError: (error) => {
			authFail(error);
		},
		scope: "https://www.googleapis.com/auth/youtube.readonly",
	});

	const authSuccess = (tokenResponse: Omit<TokenResponse, "error" | "error_description" | "error_uri">) => {
		console.log(tokenResponse);
		setAccessToken(tokenResponse.access_token);
	};
	const authFail = (error: Pick<TokenResponse, "error" | "error_description" | "error_uri">) => {
		console.log(error);
		alert("Authorization failed. Check console (F12) for more details.");
	};

	return (
		<div>
			<Button color="secondary" onClick={() => login()}>Sign in with Google</Button>
		</div>
	);
};

export default GoogleLoginButton;
