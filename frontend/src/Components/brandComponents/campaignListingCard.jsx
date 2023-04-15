import React, { useState } from "react";
import { Tab } from '@headlessui/react'
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space, notification } from 'antd';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export function CampaignListing({banner, title, date, status, id}) {

	const navigate = useNavigate();

	const openNotification = () => {
		notification.open({
			message: 'Campaign Deleted',
			description:
				'Campaign has been deleted successfully',
			icon: <SmileOutlined style={{ color: '#108ee9' }} />,
		});
	};

	const deleteCampaign = async () => {
		const response = await axios.delete("http://localhost:3000/campaign/delete/"+id);
		console.log(response);
		message.success("Campaign Deleted");
		openNotification();
	}

	const items = [
		{
			key: '1',
			label: (
				<Link to="/campaigndetails" state={{
					id: id
				}}
					>
					Open
				</Link>
			),
		},
		{
			key: '2',
			label: (
				<Link target="_blank" to={"/editcampaign/"+id}>
					Edit
				</Link>
			),
		},
		{
			key: '3',
			danger: true,
			label: (
				<a onClick={()=>deleteCampaign()}>
					Delete
				</a>
			),
		}
	];
	
	return (
		<div className="border w-full rounded-xl h-20 p-2 flex items-center hover:shadow-lg">
			<div className="avatar">
				<div className="w-14 rounded">
					<img src={banner} />
				</div>
			</div>
			<div className="ml-4">
				<div className="text-sm font-medium text-gray-900">{title}</div>
				<div className="text-sm text-gray-500">
					<time dateTime="2020-01-07">{date}</time>
				</div>
			</div>
			<div className="ml-auto">
				<Dropdown
					menu={{
						items,
					}}
					trigger={['click']}
				>
					<a onClick={(e) => e.preventDefault()}>
						<div className="border rounded-lg p-2 flex justify-center items-center">
							<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
								width="15" height="15"
								viewBox="0 0 50 50">
								<path d="M 25 3 C 21.699219 3 19 5.699219 19 9 C 19 12.300781 21.699219 15 25 15 C 28.300781 15 31 12.300781 31 9 C 31 5.699219 28.300781 3 25 3 Z M 25 19 C 21.699219 19 19 21.699219 19 25 C 19 28.300781 21.699219 31 25 31 C 28.300781 31 31 28.300781 31 25 C 31 21.699219 28.300781 19 25 19 Z M 25 35 C 21.699219 35 19 37.699219 19 41 C 19 44.300781 21.699219 47 25 47 C 28.300781 47 31 44.300781 31 41 C 31 37.699219 28.300781 35 25 35 Z"></path>
							</svg>
						</div>
					</a>
				</Dropdown>
				{
					status === "live" ? (
						<div className="badge badge-success">{status}</div>
					) : (
						<div className="badge badge-accent">{status}</div>
					)
				}
			</div>
		</div>
	);
}