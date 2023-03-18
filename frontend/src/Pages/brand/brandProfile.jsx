import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "react-query"
import { useLinkedIn } from 'react-linkedin-login-oauth2';

let formatter = Intl.NumberFormat('en', { notation: 'compact' });

export const BrandProfile = (props) => {
	const { state } = useLocation();
	const { user } = state;

	const exchange = async (code) => {
		return await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/x-www-form-urlencoded",
				"grant_type": "authorization_code",
				"code": code,
				"redirect_uri": "http://localhost:5173/brand/linkedin/",
				"client_id": "77oyqfmbrr2780",
				"client_secret":"7VhpJoOGUOjz6TdS"
			},
			body: JSON.stringify({
				code: code
			})
		})
			.then((response) => {
				if (!response.ok) throw new Error(response);
				else return response.json();
			})
	}

	const { linkedInLogin } = useLinkedIn({
    clientId: '77oyqfmbrr2780',
		scope: 'r_liteprofile r_emailaddress w_member_social',
    redirectUri: `http://localhost:5173/brand/linkedin/`,
    onSuccess: (code) => {
      console.log(code);
			// exchange for access token
			exchange(code)
    },
    onError: (error) => {
      console.log(error);
    },
  });

	// const { id } = useParams();

	// const fetchProfile = async () => {
	// 	return await fetch("http://localhost:3000/influencer/influencer/" + id, {
	// 		method: "GET",
	// 		headers: {
	// 			Accept: "application/json",
	// 			"Content-Type": "application/json",
	// 		}
	// 	})
	// 		.then((response) => {
	// 			if (!response.ok) throw new Error(response);
	// 			else return response.json();
	// 		})
	// };

	// const { data: influencer, isLoading, isError, isSuccess } = useQuery("influencer", fetchProfile);

	return (
		<>


			<div className="grid grid-cols-4">
				<div className="col-span-1 h-full flex-col p-4">
					<div className="flex flex-col items-center w-full">
						<div className="avatar">
							<div className="w-28 rounded-full">
								<img src={user.photo} />
							</div>
						</div>
						<p className="text-2xl font-bold"></p>
						<p className="text-sm text-stone-500"></p>
						<div className="divider" />
						<div className="flex-col items-start w-full min-h-[250px]">
							<h1 className="text-lg font-bold mb-1">About</h1>
							<p className="text-stone-500">{user?.description}</p>
						</div>
						<div className="divider" />
						<div className="flex-col items-start w-full">
							<h1 className="text-lg font-bold mb-1">Location</h1>
							<p className="text-stone-500">Pakistan</p>
						</div>
					</div>
				</div>

				<div className="col-span-3 shadow-xl p-4">


					<div className="divider" />
					<div className="flex mt-3 justify-between">
						<div className="flex-col">
							<div className="flex w-full justify-between pr-4 mb-3">
								<p className="text-lg text-[#212529] font-medium">View Connections</p>
							</div>
							<div className="border w-96 h-96">

							</div>
						</div>

						<div className="flex justify-evenly flex-wrap border w-96 h-96">
							{/* Linnkedin button */}
							<div className="flex items-center justify-center w-1/2 h-1/2">
								<div onClick={linkedInLogin} className="btn btn-outline btn-wide glass gap-1 flex items-center justify-center">
									<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
										width="16" height="16"
										viewBox="0 0 48 48">
										<path fill="#0288d1" d="M8.421 14h.052 0C11.263 14 13 12 13 9.5 12.948 6.945 11.263 5 8.526 5 5.789 5 4 6.945 4 9.5 4 12 5.736 14 8.421 14zM4 17H13V43H4zM44 26.5c0-5.247-4.253-9.5-9.5-9.5-3.053 0-5.762 1.446-7.5 3.684V17h-9v26h9V28h0c0-2.209 1.791-4 4-4s4 1.791 4 4v15h9C44 43 44 27.955 44 26.5z"></path>
									</svg>
									<p className="text-lg text-[#212529] font-medium">LinkedIn</p>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</>
	);
}