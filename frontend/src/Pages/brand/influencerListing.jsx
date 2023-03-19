import React, { useState } from "react";
import { Image, List } from 'antd';
import { useParams } from "react-router-dom";
import { useQuery } from "react-query"
import { Link } from "react-router-dom";
let formatter = Intl.NumberFormat('en', { notation: 'compact' });

export const InfluencerListing = () => {

	const [value, setValue] = useState(1);
	let { id } = useParams();

	const onChange = (e) => {
		console.log('radio checked', e);
		setValue(e);
	};

	const fetchProfile = async () => {
		return await fetch("http://localhost:3000/influencer/influencer/" + id, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			}
		})
		.then((response) => {
			if (!response.ok) throw new Error(response);
			else return response.json();
		})
	};

	const { data: influencer, isLoading, isError, isSuccess } = useQuery("influencer", fetchProfile);

	return (

		<div className="p-5">
			{
				isLoading ? (
					<div className="flex justify-center items-center h-screen">
						<div className="flex flex-col justify-center items-center">
							<div className="flex justify-center items-center">
								<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
								</svg>
								<h1 className="text-white">Loading...</h1>
							</div>
						</div>
					</div>
				) : (
					isError ? (
						<div className="flex justify-center items-center h-screen">
							<div className="flex flex-col justify-center items-center">
								<div className="flex justify-center items-center">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
										<path d="M12 2c-5.514 0-10 4.486-10 10s4.486 10 10 10 10-4.486 10-10-4.486-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-12h2v6h-2v-6zm0 8h2v2h-2v-2z"></path>
									</svg>
									<h1 className="text-white ml-2">Error</h1>
								</div>
							</div>
						</div>
					) : (
						isSuccess && (
							<>
								<div className="flex flex-row">
									<button className="btn btn-outline btn-warning gap-2">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
											<path d="M20 11h-9.586l3.293-3.293-1.414-1.414-5 5 5 5 1.414-1.414-3.293-3.293h9.586v-2z"></path>
										</svg>
										Back
									</button>
								</div>

								<div className="mt-3 rounded-xl h-96 border">
									<div className="grid grid-cols-5 gap-1 grid-rows-2 h-full">
										<div className="row-span-2 col-span-3 h-full overflow-hidden rounded-l-xl">
											<Image
												rootClassName="h-full w-full"
												style={{ objectFit: 'cover', height: '100%' }}
												src={influencer.data?.photo}
											/>
										</div>
										<div className="row-span-1 lg:col-span-1 col-span-2 overflow-hidden h-full bg-lime-300" />

										<div className="row-span-1 lg:col-span-1 col-span-2 h-full overflow-hidden rounded-tr-xl bg-amber-400">

										</div>
										<div className="hidden lg:block row-span-1 col-span-2 overflow-hidden h-full rounded-br-xl bg-emerald-300">

										</div>
									</div>
								</div>

								<div className="flex mt-3 justify-between h-full gap-5">
									<div>
										<div className="flex-col mb-6">
											<p className="font-semibold text-3xl font-sans mb-1">{influencer.data?.name}</p>
											<div className="flex items-center mb-1">
												{
													influencer.data?.platforms.map((platform, index) => (
														<p className="text-sm text-cyan-600	font-semibold m-1">{platform}</p>
													))
												}
												<p className="ml-1 mr-1 text-slate-300">|</p>
												{
													influencer.data?.category.map((category, index) => (
														<p className="text-sm text-cyan-600	font-semibold m-1">{category}</p>
													))
												}
											</div>
											<p className="text-base font-medium text-[#495057]">{influencer.data?.description}</p>
										</div>

										<div className="flex-col mt-3">
											<div className="flex w-full justify-between pr-4 mb-3">
												<p className="text-lg text-[#212529] font-medium">About {influencer.data?.name}</p>
												<div className="flex gap-1 items-center">
													{/* Analytics icon */}
													<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
														color={"#3f96b6"}
														width="16" height="16"
														viewBox="0 0 24 24">
														<path d="M 19.5 4 C 18.119 4 17 5.119 17 6.5 L 17 17.5 C 17 18.881 18.119 20 19.5 20 C 20.881 20 22 18.881 22 17.5 L 22 6.5 C 22 5.119 20.881 4 19.5 4 z M 12.5 8 C 11.119 8 10 9.119 10 10.5 L 10 17.5 C 10 18.881 11.119 20 12.5 20 C 13.881 20 15 18.881 15 17.5 L 15 10.5 C 15 9.119 13.881 8 12.5 8 z M 5.5 12 C 4.119 12 3 13.119 3 14.5 L 3 17.5 C 3 18.881 4.119 20 5.5 20 C 6.881 20 8 18.881 8 17.5 L 8 14.5 C 8 13.119 6.881 12 5.5 12 z"></path>
													</svg>
													<Link target="_blank" to={"/influencerprofile/"+id} className="link text-[#3f96b6] font-medium link-hover">See more Analytics</Link>
												</div>
											</div>
											<div className="flex gap-3 px-3">
												<div className="flex-col border rounded-xl p-6 items-center w-full">
													<p className="text-xs text-[#6c757d] font-medium mb-2">FOLLOWERS</p>
													<p className="text-2xl font-semibold">{formatter.format(influencer.data?.socialMediaHandles[0]?.followers)}</p>
												</div>
												<div className="flex-col border rounded-xl p-6 items-center w-full">
													<p className="text-xs text-[#6c757d] font-medium mb-2">DEMOGRAPHICS</p>
													<p className="text-2xl font-semibold">- - -</p>
												</div>
												<div className="flex-col border rounded-xl p-6 items-center w-full">
													<p className="text-xs text-[#6c757d] font-medium mb-2">FOLLOWERS</p>
													<p className="text-2xl font-semibold">- - -</p>
												</div>
											</div>
										</div>



									</div>

									<div className="lg:block w-[700px] hidden">
										<div className="flex-col p-5 h-fit shadow-md border rounded-xl sticky top-20">
											<h1 className="text-xl font-bold">Deal Overview</h1>
											<div className="divider mt-3 mb-3" />
											<div className="flex-col">
												<p className="text-sm font-semibold">DEAL</p>
												<div className="flex justify-between">
													<p className="font-medium">Custom</p>
													<p className="font-medium">$$$</p>
												</div>
												<div className="flex gap-1 items-center">
													<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
														width="15" height="15"
														viewBox="0 0 50 50">
														<path d="M 12 0 C 10.90625 0 10 0.90625 10 2 L 10 4 L 4 4 C 3.476563 4 2.945313 4.191406 2.570313 4.570313 C 2.191406 4.945313 2 5.476563 2 6 L 2 46 C 2 46.523438 2.191406 47.054688 2.570313 47.433594 C 2.945313 47.808594 3.476563 48 4 48 L 46 48 C 46.523438 48 47.054688 47.808594 47.433594 47.433594 C 47.808594 47.054688 48 46.523438 48 46 L 48 6 C 48 5.476563 47.808594 4.945313 47.433594 4.570313 C 47.054688 4.191406 46.523438 4 46 4 L 40 4 L 40 2 C 40 0.90625 39.09375 0 38 0 L 36 0 C 34.90625 0 34 0.90625 34 2 L 34 4 L 16 4 L 16 2 C 16 0.90625 15.09375 0 14 0 Z M 12 2 L 14 2 L 14 8 L 12 8 Z M 36 2 L 38 2 L 38 8 L 36 8 Z M 4 6 L 10 6 L 10 8 C 10 9.09375 10.90625 10 12 10 L 14 10 C 15.09375 10 16 9.09375 16 8 L 16 6 L 34 6 L 34 8 C 34 9.09375 34.90625 10 36 10 L 38 10 C 39.09375 10 40 9.09375 40 8 L 40 6 L 46 6 L 46 13 L 4 13 Z M 4 15 L 46 15 L 46 46 L 4 46 Z M 10 19 L 10 42 L 40 42 L 40 19 Z M 12 21 L 17 21 L 17 26 L 12 26 Z M 19 21 L 24 21 L 24 26 L 19 26 Z M 26 21 L 31 21 L 31 26 L 26 26 Z M 33 21 L 38 21 L 38 26 L 33 26 Z M 12 28 L 17 28 L 17 33 L 12 33 Z M 19 28 L 24 28 L 24 33 L 19 33 Z M 26 28 L 31 28 L 31 33 L 26 33 Z M 33 28 L 38 28 L 38 33 L 33 33 Z M 12 35 L 17 35 L 17 40 L 12 40 Z M 19 35 L 24 35 L 24 40 L 19 40 Z M 26 35 L 31 35 L 31 40 L 26 40 Z M 33 35 L 38 35 L 38 40 L 33 40 Z"></path>
													</svg>
													<p className="text-sm text-[#8e949b]"><b>5</b> days Delivery</p>
												</div>
												<div className="flex gap-1 items-center">
													<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
														width="15" height="15"
														viewBox="0 0 30 30">
														<path d="M 15 3 A 1.0001 1.0001 0 1 0 15 5 C 20.534534 5 25 9.4654664 25 15 C 25 20.534534 20.534534 25 15 25 C 9.4654664 25 5 20.534534 5 15 C 5 12.650241 5.8085376 10.496834 7.1601562 8.7929688 L 9 11 L 11 4 L 4 5 L 5.8671875 7.2402344 C 4.086665 9.3350655 3 12.041787 3 15 C 3 21.615466 8.3845336 27 15 27 C 21.615466 27 27 21.615466 27 15 C 27 8.3845336 21.615466 3 15 3 z"></path>
													</svg>
													<p className="text-sm text-[#8e949b]"><b>5</b> Revisions</p>
												</div>
												<div className="divider mt-3 mb-3" />
												<div className="flex-col" >
													<div className="flex justify-between">
														<p className="font-medium">Subtotal</p>
														<p className="font-medium">$<b>0</b></p>
													</div>
													{/* <div className="flex justify-between">
														<p className="font-medium">Total Delivery time</p>
														<p className="font-medium"><b>5</b> Days</p>
													</div> */}
												</div>
												<div className="flex justify-center">
													<button className="btn btn-success btn-wide mt-3">Send Request</button>
												</div>
											</div>
										</div>
									</div>

								</div>
							</>
						))
				)}

		</div>
	);
};