import React, { useState, useRef } from "react";
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, Divider } from 'antd';
import { message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
const { Option } = Select;
const { Dragger } = Upload;

const props = {
	name: 'file',
	multiple: true,
	action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
	onChange(info) {
		const { status } = info.file;
		if (status !== 'uploading') {
			console.log(info.file, info.fileList);
		}
		if (status === 'done') {
			message.success(`${info.file.name} file uploaded successfully.`);
		} else if (status === 'error') {
			message.error(`${info.file.name} file upload failed.`);
		}
	},
	onDrop(e) {
		console.log('Dropped files', e.dataTransfer.files);
	},
};

export function LaunchCampaign() {
	const [open, setOpen] = useState(false);
	const [form] = Form.useForm();

	const [items, setItems] = useState(['jack', 'lucy']);
	const [questItems, setQuestItems] = useState(['Whats your name?', 'Whats your age?']);
	const [question, setQuestion] = useState('');
	const [name, setName] = useState('');
	const inputRef = useRef(null);
	
	const onNameChange = (event) => {
		setName(event.target.value);
	};

	const onQuestChange = (event) => {
		setQuestion(event.target.value);
	};

	const addItem = (e) => {
		e.preventDefault();
		setItems([...items, name || `New item ${index++}`]);
		setName('');
		setTimeout(() => {
			inputRef.current?.focus();
		}, 0);
	};

	const addQuestItem = (e) => {
		e.preventDefault();
		setQuestItems([...questItems, question || `New item ${index++}`]);
		setQuestion('');
		setTimeout(() => {
			inputRef.current?.focus();
		}, 0);
	};

	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};
	const onFinish = (values) => {
		console.log('Success:', values);
	};
	const onReset = () => {
		form.resetFields();
	};

	return (
		<div data-theme="cupcake">
			<div className="mb-3 flex justify-between sticky bg-white top-16 z-40 items-center pl-3 pr-3 h-12 border rounded-bl-xl rounded-br-xl">
				<p className="text-xl font-bold">Edit Campaign</p>
				<div className="flex gap-2">
					<button className="btn btn-outline btn-accent btn-sm rounded-lg">Save</button>
					<button className="btn btn-success btn-sm rounded-lg" onClick={() => form.submit()}>Launch</button>
				</div>
			</div>
			<div className="p-2">
				<Form layout="vertical" form={form} hideRequiredMark onFinish={onFinish}>
					<Row gutter={16}>
						<Col span={24}>
							<Form.Item
								name="title"
								label={<span className="text-base font-bold">Campaign Title</span>}
								rules={[
									{
										required: true,
										message: 'Please enter campaign title',
									},
								]}
							>
								<Input className="border-[#bebebe] rounded-md" placeholder="Campaign Title" />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={24}>
							<Form.Item
								name="description"
								label={<span className="text-base font-bold">Campaign Description</span>}
								rules={[
									{
										required: true,
										message: 'please enter Campaign description',
									},
								]}
							>
								<Input.TextArea rows={4} showCount minLength={500} maxLength={1000} placeholder="Campaign Description" />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								name="platforms"
								label={<span className="text-base font-bold">Required Platforms</span>}
								rules={[
									{
										required: true,
										message: 'Please select a platform',
									},
								]}
							>
								<Select mode="multiple" allowClear placeholder="select required platforms">
									<Option value="Twitter">Twitter</Option>
									<Option value="Instagram">Instagram</Option>
									<Option value="Youtube">Youtube</Option>
									<Option value="Linkedin">Linkedin</Option>
								</Select>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name="audience"
								label={<span className="text-base font-bold">Audience</span>}
								rules={[
									{
										required: true,
										message: 'Please select an audience',
									},
								]}
							>
								<Select mode="multiple" allowClear placeholder="select audience">
									<Option value="Kids">Kids</Option>
									<Option value="Adults">Adults</Option>
									<Option value="Teenagers">Teenagers</Option>
									<Option value="Older Adults">Older Adults</Option>
									<Option value="All">All</Option>
								</Select>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={24}>
							<Form.Item
								name="tags"
								label={<span className="text-base font-bold">Tags</span>}
								rules={[
									{
										required: true,
										message: 'Please add tags',
									},
								]}
							>
								<Select
									mode="multiple"
									allowClear
									placeholder="add tags and keywords"
									dropdownRender={(menu) => (
										<>
											{menu}
											<Divider
												style={{
													margin: '8px 0',
												}}
											/>
											<Space
												style={{
													padding: '0 8px 4px',
												}}
											>
												<Input
													placeholder="Please enter item"
													ref={inputRef}
													value={name}
													onChange={onNameChange}
												/>
												<Button type="text" icon={<PlusOutlined />} onClick={addItem}>
													Add item
												</Button>
											</Space>
										</>
									)}
									options={items.map((item) => ({
										label: item,
										value: item,
									}))}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={24}>
							<Form.Item
								name="questions"
								label={<span className="text-base font-bold">Add Questions</span>}
								rules={[{required: false}]}
							>
								<Select
									mode="multiple"
									size="large"
									allowClear
									placeholder="add tags and keywords"
									dropdownRender={(menu) => (
										<>
											{menu}
											<Divider
												style={{
													margin: '8px 0',
												}}
											/>
											<Space
												style={{
													padding: '0 8px 4px',
												}}
											>
												<Input
													placeholder="Please enter item"
													ref={inputRef}
													value={question}
													onChange={onQuestChange}
												/>
												<Button type="text" icon={<PlusOutlined />} onClick={addQuestItem}>
													Add Question
												</Button>
											</Space>
										</>
									)}
									options={questItems.map((item) => ({
										label: item,
										value: item,
									}))}
								/>
							</Form.Item>
						</Col>
					</Row>
					
							<div className="flex justify-center p-2 h-full">
								<Dragger {...props} className="h-full">
									<p className="ant-upload-drag-icon">
										<InboxOutlined />
									</p>
									<p className="ant-upload-text">Click or drag file to this area to upload</p>
									<p className="ant-upload-hint">
										Support for a single or bulk upload. Strictly prohibited from uploading company data or other
										banned files.
									</p>
								</Dragger>
							</div>
						
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item>
								<button className="btn btn-error" onClick={onReset}>Clear All Fields</button>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</div>
		</div>
	);
}