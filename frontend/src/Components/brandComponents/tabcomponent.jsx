import React, { useState } from "react";
import { Tab } from '@headlessui/react'
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { CampaignListing } from "./campaignListingCard";
import { useQuery } from 'react-query';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export function TabComponent({uid}) {

	const getCampaigns = async () => {
		const response = await fetch("http://localhost:3000/campaign/campaigns/brand/"+uid);
		const data = await response.json();
		console.log(data)
		setCampaigns(data.data);
		return data.data;
	}

	// use usequery to get campaigns
	const { data, isLoading } = useQuery('campaigns', getCampaigns);

	const [campaigns, setCampaigns] = useState(data);
	let [categories] = useState({ "Campaigns": "", "Analytics": "", "Reviews": "", "Finances": "" })

	return (
		<div className="w-full max-w-full px-2 py-2 sm:px-0 z-10">
			<Tab.Group onChange={()=>getCampaigns()}>
				<Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
					{Object.keys(categories).map((category) => (
						<Tab
							key={category}
							className={({ selected }) =>
								classNames(
									'w-28 rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
									'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
									selected
										? 'bg-white shadow'
										: 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
								)
							}
						>
							{category}
						</Tab>
					))}
				</Tab.List>
				<Tab.Panels className="mt-2">
					<Tab.Panel
						className={classNames(
							'overflow-y-auto h-96 p-10 rounded-xl bg-white ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
						)}
					>
						{/* {
							campaigns?.map((campaign) => (
								<CampaignListing key={campaign._id} banner={campaign.bannerImg} title={campaign.title} status={campaign.status} date={campaign.updatedAt} />
							))
						} */}
						{
							isLoading ? <div>Loading...</div> : campaigns?.map((campaign) => (
								<CampaignListing key={campaign._id} banner={campaign.bannerImg} title={campaign.title} status={campaign.status} date={campaign.updatedAt} />
							))
						}
					</Tab.Panel>
					<Tab.Panel
						className={classNames(
							'h-96 rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
						)}
					>

					</Tab.Panel>
					<Tab.Panel
						className={classNames(
							'h-96 rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
						)}
					>

					</Tab.Panel>
					<Tab.Panel
						className={classNames(
							'h-96 rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
						)}
					>

					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
}