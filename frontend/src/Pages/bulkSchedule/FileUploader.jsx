import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Button, Table, Tag, DatePicker, Input, Modal } from 'antd';
import Papa from 'papaparse';
import moment from 'moment';
import dayjs from 'dayjs';
import spreadsheet from '/home/devnode/Downloads/Maven-marketing/Latest Code/Maven-marketing/frontend/src/assets/SampleCSV.png'

const { TextArea } = Input;
const { Dragger } = Upload;

export function FileUpload({ csvData, setCSVData, confirm}) {
	// const [csvData, setCSVData] = useState([]); // State to hold the parsed CSV data
	const [expandedRowKeys, setExpandedRowKeys] = useState([]); // State to manage the expanded row keys
	const [visible, setVisible] = useState(false);

	const handleConfirm = () => {
		confirm();
		setVisible(false);
	};

	const showModal = () => {
		setVisible(true);
	};

	const hideModal = () => {
		setVisible(false);
	};

	const handleFileUpload = (file) => {
		Papa.parse(file, {
			complete: (result) => {
				const parsedData = result.data;
				const headerRow = Object.keys(parsedData[0]);
				const expectedColumns = ['subredditName', 'title', 'postText', 'Attachment', 'schedule time'];

				// Verify the header row against the expected columns
				const isSchemaValid = expectedColumns.every((column) => headerRow.includes(column));


				if (!isSchemaValid) {
					message.error('Invalid CSV file. The schema does not match the expected columns.');
					return;
				}

				// Add a unique key to each item
				const dataWithKeys = parsedData.map((item, index) => ({
					...item,
					key: index.toString(),
				}));

				setCSVData(dataWithKeys); // Save the parsed data to state
			},
			error: (error) => {
				console.error('Error:', error);
				message.error('Failed to parse CSV file.');
			},
			header: true, // Set to false if your CSV file doesn't have a header row
		});
	};

	const handleCellValueChange = (rowIndex, dataIndex, value) => {
		const updatedData = [...csvData];

		if (dataIndex === 'schedule time') {
			updatedData[rowIndex][dataIndex] = dayjs(value);
		} else {
			updatedData[rowIndex][dataIndex] = value;
		}

		setCSVData(updatedData);
	};

	const handleSaveRow = (rowIndex) => {
		// Here, you can send the updated row data to the server or perform any required actions
		console.log('Saved row:', csvData[rowIndex]);
	};

	const handleRowExpand = (expanded, record) => {
		const keys = expanded ? [record.key] : [];
		setExpandedRowKeys(keys);
	};

	const expandedRowRender = (record) => {
		const attachment = record['Attachment'];
		const fileExtension = attachment ? attachment.split('.').pop().toLowerCase() : '';

		return (
			<div className='flex gap-3'>
				<p className='font-railway'>Attachment Preview:</p>
				{attachment && (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png') && (
					<img width={100} height={100} src={attachment} alt="Image Preview" />
				)}
				{attachment && (fileExtension === 'mp4' || fileExtension === 'mov') && (
					<video width={100} height={100} src={attachment} controls />
				)}
			</div>
		);
	};

	const columns = csvData.length > 0 ? [
		...Object.keys(csvData[0]).map((key) => ({
			title: key,
			dataIndex: key,
			render: (text, record, rowIndex) => {
				if (key === 'key') {
					return <p className='w-20'>{text}</p>
				}
				if (key === 'postText') {
					return (
						<TextArea
							value={text}
							onChange={(e) => handleCellValueChange(rowIndex, key, e.target.value)}
							autoSize={{ minRows: 2, maxRows: 3 }}
						/>
					);
				}
				if (key === 'schedule time') {
					const scheduledTime = text ? dayjs(text) : null;
					const isPastToday = scheduledTime.isBefore(dayjs(), 'day');
					const isPastHour = scheduledTime.isBefore(dayjs().subtract(1, 'hour'));
					const isPastMinute = scheduledTime.isBefore(dayjs().subtract(1, 'minute'));

					let highlightColor = '';
					if (isPastToday) {
						highlightColor = 'red';
					} else if (isPastHour) {
						highlightColor = 'yellow';
					} else if (isPastMinute) {
						highlightColor = 'orange';
					}

					return (
						<DatePicker
							showTime
							value={scheduledTime}
							onChange={(value) => handleCellValueChange(rowIndex, key, value)}
							style={{ backgroundColor: highlightColor }}
						/>
					);
				}
				return (
					<Input
						value={text}
						onChange={(e) => handleCellValueChange(rowIndex, key, e.target.value)}
					/>
				);
			},
		})),
		{
			title: 'Status',
			dataIndex: 'status',
			render: (text, record) => {
				// You can define custom logic to determine the status value here
				// For now, let's assume the status is "Processed" for all rows
				return <Tag color="green">Processed</Tag>;
			},
		},
		{
			title: 'Actions',
			render: (text, record, rowIndex) => (
				<div className='flex gap-1'>
					<Button type="primary" size='small' onClick={() => handleSaveRow(rowIndex)}>
						Save
					</Button>
					<Button danger size='small' onClick={() => handleDeleteRow(rowIndex)}>
						Delete
					</Button>
				</div>
			),
		},
	] : [];

	const handleDeleteRow = (rowIndex) => {
		const updatedData = [...csvData];
		updatedData.splice(rowIndex, 1);
		setCSVData(updatedData);
	};

	return (
		<div className='p-5 bg-white'>
			{/* <Modal
				visible={visible}
				title="Confirmation"
				onCancel={hideModal}
				footer={[
					<Button key="cancel" onClick={hideModal}>
						Cancel
					</Button>,
					<Button key="confirm" type="primary" onClick={handleConfirm}>
						Confirm
					</Button>,
				]}
			>
				<p>Are you sure you want to Schedule the posts?</p>
			</Modal> */}
			<p className='text-xl font-railway'>Bulk Schedule Posts</p>
			<p className='text-sm text-neutral-600 font-thin mb-5'>Simply upload a CSV file with your post details. Stay organized and engage your audience consistently by planning ahead with our easy-to-use scheduling tool.</p>
			<div className='flex justify-center items-center my-3'>
				<Upload.Dragger
					accept=".csv"
					style={{ padding: '1rem', borderRadius: '1rem' }}
					beforeUpload={(file) => {
						handleFileUpload(file);
						return false; // Prevent default upload behavior
					}}
				>
					<div className='flex flex-col justify-center items-center gap-y-2'>
						<img style={{ opacity: 0.7 }} width={500} src={spreadsheet} />
						<p className="text-xl font-semibold font-railway text-neutral-700">Click or drag CSV file to this area to upload</p>
						<p className='w-64 text-sm text-neutral-600'>Please make sure the file follows the format as in the attached sample below.</p>
						<a className='btn-link' href='#'>Download Sample</a>
					</div>
				</Upload.Dragger>
			</div>
			<p className='text-lg font-railway'>Preview</p>
			{csvData.length > 0 &&
				<Table
					className='mt-3 mx-5'
					dataSource={csvData}
					columns={columns}
					pagination={{ pageSize: 50 }} scroll={{ y: 240 }}
					expandedRowRender={expandedRowRender}
					expandedRowKeys={expandedRowKeys}
					onExpand={handleRowExpand}
				/>
			}
			<div className='flex justify-end p-3'>
				{csvData.length > 0 &&
					<button onClick={confirm} className="bg-green hover:bg-emerald-400 text-white text-base font-bold py-2 px-4 rounded-md w-24">
						Submit
					</button>
				}
			</div>
		</div>
	);
};