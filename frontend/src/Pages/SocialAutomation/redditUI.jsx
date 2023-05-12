import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, DatePicker, Image, Button, Badge, Dropdown } from 'antd';
import { ExpandableParagraph } from './expandParagraph';
import {
    CalendarOutlined,
    ClockCircleOutlined,
    SettingOutlined,
    LikeOutlined,
    CommentOutlined
} from '@ant-design/icons';

const joinedSubreddits = [
    { name: 'r/javascript', avatar: 'https://i.imgur.com/ItxnpSl.png' },
    { name: 'r/reactjs', avatar: 'https://i.imgur.com/5z5mfs2.png' },
    { name: 'r/webdev', avatar: 'https://i.imgur.com/xW8Yn6a.png' },
    { name: 'r/frontend', avatar: 'https://i.imgur.com/Bl32lKj.png' },
    { name: 'r/frontend', avatar: 'https://i.imgur.com/Bl32lKj.png' },
    { name: 'r/frontend', avatar: 'https://i.imgur.com/Bl32lKj.png' },
];

const items = [
    {
        label: <div className="flex gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                width="15" height="15"
                viewBox="0 0 50 50">
                <path d="M 25 2 C 12.317 2 2 12.318 2 25 C 2 37.682 12.317 48 25 48 C 26.9 48 28.744719 47.764125 30.511719 47.328125 C 30.077719 46.767125 29.691328 46.170109 29.361328 45.537109 C 27.953328 45.836109 26.496 46 25 46 C 13.421 46 4 36.58 4 25 C 4 13.42 13.421 4 25 4 C 36.579 4 46 13.42 46 25 C 46 26.496 45.836109 27.953328 45.537109 29.361328 C 46.170109 29.691328 46.767125 30.078719 47.328125 30.511719 C 47.764125 28.744719 48 26.9 48 25 C 48 12.318 37.683 2 25 2 z M 24.984375 6.9863281 A 1.0001 1.0001 0 0 0 24 8 L 24 22.175781 A 3 3 0 0 0 22.294922 26.291016 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 23.707031 27.707031 A 3 3 0 0 0 25 28 A 3 3 0 0 0 26 22.171875 L 26 8 A 1.0001 1.0001 0 0 0 24.984375 6.9863281 z M 40 30 C 34.5 30 30 34.5 30 40 C 30 45.5 34.5 50 40 50 C 45.5 50 50 45.5 50 40 C 50 34.5 45.5 30 40 30 z M 40 32 C 44.4 32 48 35.6 48 40 C 48 44.4 44.4 48 40 48 C 35.6 48 32 44.4 32 40 C 32 35.6 35.6 32 40 32 z M 35.099609 39 C 34.499609 39 34.099609 39.4 34.099609 40 C 34.099609 40.6 34.499609 41 35.099609 41 L 44.900391 41 C 45.500391 41 45.900391 40.6 45.900391 40 C 45.900391 39.4 45.5 39 45 39 L 35.099609 39 z"></path>
            </svg>
            Unschedule post
        </div>,
        key: '0',
    },
    {
        label: <div className="flex gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                width="15" height="15"
                viewBox="0 0 24 24">
                <path d="M 22 2 L 2 9.2714844 L 14.728516 22 L 22 2 z M 18.65625 5.34375 L 13.921875 18.365234 L 10.578125 15.021484 L 15.636719 8.3632812 L 8.9785156 13.421875 L 5.6347656 10.078125 L 18.65625 5.34375 z"></path>
            </svg>
            Publish now
        </div>,
        key: '1',
    },
    {
        label: <div className="flex gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                width="15" height="15"
                viewBox="0 0 50 50">
                <path d="M 13 0 C 7.976563 0 4.878906 0.496094 3 1.03125 C 2.058594 1.296875 1.421875 1.585938 1 1.8125 C 0.863281 1.886719 0.789063 1.964844 0.6875 2.03125 C 0.664063 2.046875 0.617188 2.046875 0.59375 2.0625 C 0.488281 2.117188 0.390625 2.191406 0.3125 2.28125 C 0.300781 2.28125 0.292969 2.28125 0.28125 2.28125 L 0.25 2.34375 C 0.214844 2.371094 0.183594 2.402344 0.15625 2.4375 L 0 2.5625 L 0 2.8125 C -0.00390625 2.855469 -0.00390625 2.894531 0 2.9375 L 0 49 C -0.00390625 49.359375 0.183594 49.695313 0.496094 49.878906 C 0.808594 50.058594 1.191406 50.058594 1.503906 49.878906 C 1.816406 49.695313 2.003906 49.359375 2 49 L 2 30.65625 C 2.417969 30.488281 3.046875 30.253906 4.1875 29.96875 C 6.09375 29.488281 9.015625 29 13 29 C 16.902344 29 19.796875 29.960938 23.3125 30.96875 C 26.828125 31.976563 30.921875 33 37 33 C 44.023438 33 49.5 29.875 49.5 29.875 L 50 29.59375 L 50 2.3125 L 48.53125 3.125 C 47.710938 3.570313 43.011719 6 37 6 C 32.222656 6 28.890625 4.59375 25.375 3.09375 C 21.859375 1.59375 18.160156 0 13 0 Z M 13 2 C 17.753906 2 21.078125 3.40625 24.59375 4.90625 C 28.109375 6.40625 31.824219 8 37 8 C 42.382813 8 46.113281 6.40625 48 5.5 L 48 28.34375 C 47.316406 28.710938 42.949219 31 37 31 C 31.148438 31 27.3125 30.023438 23.84375 29.03125 C 20.375 28.039063 17.230469 27 13 27 C 8.851563 27 5.78125 27.511719 3.71875 28.03125 C 2.605469 28.3125 2.53125 28.414063 2 28.625 L 2 3.53125 C 2.285156 3.382813 2.773438 3.191406 3.5625 2.96875 C 5.203125 2.503906 8.109375 2 13 2 Z"></path>
            </svg>
            Mark as published
        </div>,
        key: '2',
    },
    {
        label: <div className="flex gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg"
                x="0px" y="0px"
                width="15" height="20" viewBox="0,0,256,256">
                <defs><clipPath id="clip-1_11167_gr1"><path d="M0,256v-256h256l0,152.3748c-13.87632,-11.76349 -33.53191,-23.58156 -56.32,-23.58156c-42.90704,0 -74.20394,41.89746 -77.73746,46.44056l-2.01915,3.02873l-4.5431,6.05746l4.5431,6.05746l2.01915,3.02873c3.53352,4.5431 34.83042,46.44056 77.73746,46.44056c22.89841,0 42.49015,-11.93277 56.32,-23.7524v39.90564z" id="overlayBgMask" fill="none"></path></clipPath></defs><g transform="translate(15.36,15.36) scale(0.88,0.88)"><g clip-path="url(#clip-1)" fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(5.12,5.12)" fill="#000000"><path d="M7,4c-2.74609,0 -5,2.25391 -5,5v24c0,2.74609 2.25391,5 5,5h4.09375c0.13672,1.20313 0.12109,2.31641 -0.1875,3.25c-0.37891,1.14844 -1.08594,2.11328 -2.40625,2.90625c-0.37109,0.23438 -0.54297,0.68359 -0.42969,1.10547c0.11328,0.42188 0.49219,0.72266 0.92969,0.73828c4.24219,0 9.10547,-2.21484 11.5625,-8h22.4375c2.74609,0 5,-2.25391 5,-5v-24c0,-2.74609 -2.25391,-5 -5,-5zM7,6h36c1.65625,0 3,1.34375 3,3v24c0,1.65625 -1.34375,3 -3,3h-23c-0.41797,0 -0.79297,0.26172 -0.9375,0.65625c-1.55469,4.24219 -4.33203,6.26172 -7.21875,7c0.39063,-0.55859 0.76172,-1.14844 0.96875,-1.78125c0.51953,-1.57812 0.47656,-3.30469 0.15625,-5.0625c-0.08984,-0.46484 -0.49219,-0.80469 -0.96875,-0.8125h-5c-1.65625,0 -3,-1.34375 -3,-3v-24c0,-1.65625 1.34375,-3 3,-3z"></path></g></g><g fill="#000000" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" ><g transform="translate(123.96169,138.88901) scale(5.04789,5.04789)" id="overlay"><g id="Слой_2" font-family="Inter, apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;Segoe UI&quot;, &quot;Fira Sans&quot;, Roboto, Oxygen, Ubuntu, &quot;Droid Sans&quot;, Arial, sans-serif" font-weight="400" font-size="16" text-anchor="start" visibility="hidden"></g><g id="Android_x5F_4" font-family="Inter, apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;Segoe UI&quot;, &quot;Fira Sans&quot;, Roboto, Oxygen, Ubuntu, &quot;Droid Sans&quot;, Arial, sans-serif" font-weight="400" font-size="16" text-anchor="start" visibility="hidden"></g><g id="Android_x5F_5" font-family="Inter, apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;Segoe UI&quot;, &quot;Fira Sans&quot;, Roboto, Oxygen, Ubuntu, &quot;Droid Sans&quot;, Arial, sans-serif" font-weight="400" font-size="16" text-anchor="start" visibility="hidden"></g><g id="Windows_x5F_8" font-family="Inter, apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;Segoe UI&quot;, &quot;Fira Sans&quot;, Roboto, Oxygen, Ubuntu, &quot;Droid Sans&quot;, Arial, sans-serif" font-weight="400" font-size="16" text-anchor="start" visibility="hidden"></g><g id="Windows_x5F_10" font-family="Inter, apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;Segoe UI&quot;, &quot;Fira Sans&quot;, Roboto, Oxygen, Ubuntu, &quot;Droid Sans&quot;, Arial, sans-serif" font-weight="400" font-size="16" text-anchor="start" visibility="hidden"></g><g id="Color" font-family="Inter, apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;Segoe UI&quot;, &quot;Fira Sans&quot;, Roboto, Oxygen, Ubuntu, &quot;Droid Sans&quot;, Arial, sans-serif" font-weight="400" font-size="16" text-anchor="start" visibility="hidden"></g><g id="IOS" font-family="Inter, apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;Segoe UI&quot;, &quot;Fira Sans&quot;, Roboto, Oxygen, Ubuntu, &quot;Droid Sans&quot;, Arial, sans-serif" font-weight="400" font-size="16" text-anchor="start" visibility="hidden"></g><g id="IOS_copy"><path d="M15,18c-7.6,0 -13.6,-8.1 -13.8,-8.4l-0.4,-0.6l0.4,-0.6c0.2,-0.3 6.2,-8.4 13.8,-8.4c7.6,0 13.6,8.1 13.8,8.4l0.4,0.6l-0.4,0.6c-0.2,0.3 -6.2,8.4 -13.8,8.4zM3.3,9c1.5,1.8 6.2,7 11.7,7c5.5,0 10.3,-5.2 11.7,-7c-1.4,-1.8 -6.2,-7 -11.7,-7c-5.5,0 -10.3,5.2 -11.7,7zM15,15c-3.3,0 -6,-2.7 -6,-6c0,-3.3 2.7,-6 6,-6c3.3,0 6,2.7 6,6c0,3.3 -2.7,6 -6,6zM15,5c-2.2,0 -4,1.8 -4,4c0,2.2 1.8,4 4,4c2.2,0 4,-1.8 4,-4c0,-2.2 -1.8,-4 -4,-4zM13,9c0,1.1 0.9,2 2,2c1.1,0 2,-0.9 2,-2c0,-1.1 -0.9,-2 -2,-2c-1.1,0 -2,0.9 -2,2z"></path></g></g></g></g>
            </svg>
            Comments Watch
        </div>,
        key: '3',
    },
    {
        label: <div className="flex gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg"
                x="0px" y="0px"
                width="15" height="15"
                viewBox="0 0 50 50">
                <path d="M 4 4 L 4 46 L 46 46 L 46 44 L 6 44 L 6 4 L 4 4 z M 13 6 A 1 1 0 0 0 12 7 A 1 1 0 0 0 13 8 A 1 1 0 0 0 14 7 A 1 1 0 0 0 13 6 z M 23 6 A 1 1 0 0 0 22 7 A 1 1 0 0 0 23 8 A 1 1 0 0 0 24 7 A 1 1 0 0 0 23 6 z M 33 6 A 1 1 0 0 0 32 7 A 1 1 0 0 0 33 8 A 1 1 0 0 0 34 7 A 1 1 0 0 0 33 6 z M 43 6 A 1 1 0 0 0 42 7 A 1 1 0 0 0 43 8 A 1 1 0 0 0 44 7 A 1 1 0 0 0 43 6 z M 44.980469 13.990234 A 1.0001 1.0001 0 0 0 44.292969 14.292969 L 33 25.585938 L 23.707031 16.292969 A 1.0001 1.0001 0 0 0 22.292969 16.292969 L 8.2929688 30.292969 A 1.0001 1.0001 0 1 0 9.7070312 31.707031 L 23 18.414062 L 32.292969 27.707031 A 1.0001 1.0001 0 0 0 33.707031 27.707031 L 45.707031 15.707031 A 1.0001 1.0001 0 0 0 44.980469 13.990234 z M 13 16 A 1 1 0 0 0 12 17 A 1 1 0 0 0 13 18 A 1 1 0 0 0 14 17 A 1 1 0 0 0 13 16 z M 33 16 A 1 1 0 0 0 32 17 A 1 1 0 0 0 33 18 A 1 1 0 0 0 34 17 A 1 1 0 0 0 33 16 z M 23 26 A 1 1 0 0 0 22 27 A 1 1 0 0 0 23 28 A 1 1 0 0 0 24 27 A 1 1 0 0 0 23 26 z M 43 26 A 1 1 0 0 0 42 27 A 1 1 0 0 0 43 28 A 1 1 0 0 0 44 27 A 1 1 0 0 0 43 26 z M 13 36 A 1 1 0 0 0 12 37 A 1 1 0 0 0 13 38 A 1 1 0 0 0 14 37 A 1 1 0 0 0 13 36 z M 23 36 A 1 1 0 0 0 22 37 A 1 1 0 0 0 23 38 A 1 1 0 0 0 24 37 A 1 1 0 0 0 23 36 z M 33 36 A 1 1 0 0 0 32 37 A 1 1 0 0 0 33 38 A 1 1 0 0 0 34 37 A 1 1 0 0 0 33 36 z M 43 36 A 1 1 0 0 0 42 37 A 1 1 0 0 0 43 38 A 1 1 0 0 0 44 37 A 1 1 0 0 0 43 36 z"></path>
            </svg>
            View Analytics
        </div>,
        key: '4',
    },
    {
        type: 'divider',
    },
    {
        label: <div className="flex gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" 
                x="0px" y="0px" 
                width="15" height="15" 
                viewBox="0,0,256,256">
                <g fill="#f10b0b" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" ><g transform="scale(5.12,5.12)"><path d="M21,0c-1.64453,0 -3,1.35547 -3,3v2h-7.8125c-0.125,-0.02344 -0.25,-0.02344 -0.375,0h-1.8125c-0.03125,0 -0.0625,0 -0.09375,0c-0.55078,0.02734 -0.98047,0.49609 -0.95312,1.04688c0.02734,0.55078 0.49609,0.98047 1.04688,0.95313h1.09375l3.59375,40.5c0.125,1.39844 1.31641,2.5 2.71875,2.5h19.1875c1.40234,0 2.59375,-1.10156 2.71875,-2.5l3.59375,-40.5h1.09375c0.35938,0.00391 0.69531,-0.18359 0.87891,-0.49609c0.17969,-0.3125 0.17969,-0.69531 0,-1.00781c-0.18359,-0.3125 -0.51953,-0.5 -0.87891,-0.49609h-10v-2c0,-1.64453 -1.35547,-3 -3,-3zM21,2h8c0.5625,0 1,0.4375 1,1v2h-10v-2c0,-0.5625 0.4375,-1 1,-1zM11.09375,7h27.8125l-3.59375,40.34375c-0.03125,0.34766 -0.40234,0.65625 -0.71875,0.65625h-19.1875c-0.31641,0 -0.6875,-0.30859 -0.71875,-0.65625zM18.90625,9.96875c-0.04297,0.00781 -0.08594,0.01953 -0.125,0.03125c-0.46484,0.10547 -0.79297,0.52344 -0.78125,1v33c-0.00391,0.35938 0.18359,0.69531 0.49609,0.87891c0.3125,0.17969 0.69531,0.17969 1.00781,0c0.3125,-0.18359 0.5,-0.51953 0.49609,-0.87891v-33c0.01172,-0.28906 -0.10547,-0.56641 -0.3125,-0.76172c-0.21094,-0.19922 -0.49609,-0.29687 -0.78125,-0.26953zM24.90625,9.96875c-0.04297,0.00781 -0.08594,0.01953 -0.125,0.03125c-0.46484,0.10547 -0.79297,0.52344 -0.78125,1v33c-0.00391,0.35938 0.18359,0.69531 0.49609,0.87891c0.3125,0.17969 0.69531,0.17969 1.00781,0c0.3125,-0.18359 0.5,-0.51953 0.49609,-0.87891v-33c0.01172,-0.28906 -0.10547,-0.56641 -0.3125,-0.76172c-0.21094,-0.19922 -0.49609,-0.29687 -0.78125,-0.26953zM30.90625,9.96875c-0.04297,0.00781 -0.08594,0.01953 -0.125,0.03125c-0.46484,0.10547 -0.79297,0.52344 -0.78125,1v33c-0.00391,0.35938 0.18359,0.69531 0.49609,0.87891c0.3125,0.17969 0.69531,0.17969 1.00781,0c0.3125,-0.18359 0.5,-0.51953 0.49609,-0.87891v-33c0.01172,-0.28906 -0.10547,-0.56641 -0.3125,-0.76172c-0.21094,-0.19922 -0.49609,-0.29687 -0.78125,-0.26953z"></path></g></g>
            </svg>
            <p className='text-red-600'>Delete Post</p>
        </div>,
        key: '5',
    },
];

export function RedditUI(props) {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className='h-full flex flex-col'>
            <div className='grid grid-rows-2 h-52 min-h-28 w-full'>
                <div className='row-span-1 bg-[#318be6] flex w-full h-full'>
                    <img className='h-full w-full object-cover' src='https://styles.redditmedia.com/t5_388p4/styles/bannerBackgroundImage_plntm9perxy61.png?width=4000&v=enabled&s=e0788a414b5a6e2e8bc6ad107330242229b2dcff' />
                </div>
                <div className='row-span-1 bg-white pl-44 h-20 flex'>
                    <div className='rounded-full flex justify-center items-center h-24 w-24 bg-white relative bottom-[25px]'>
                        <Avatar size={85} icon={<UserOutlined />} />
                    </div>
                    <div>
                        <div className='flex gap-2 items-center'>
                            <p className='text-2xl font-railway pl-3'>Maven Marketing</p>
                            <p className="flex justify-center items-center h-5 rounded-full pl-2 pr-2 bg-purple-800 text-zinc-50 font-railway text-sm">mod</p>
                        </div>
                        <p className='text-sm pl-3 text-stone-500'>r/MavenMarketing</p>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-8 w-full h-full'>
                <div className='col-span-2 p-3 flex flex-col'>
                    {/* Two types, simple photo, snoovatar */}
                    <div className='flex flex-col rounded-[4px] border-[#cccccc] border-[1px] bg-white items-center'>
                        <img className='h-32 w-full rounded-t-sm object-cover' src='https://styles.redditmedia.com/t5_388p4/styles/bannerBackgroundImage_plntm9perxy61.png?width=4000&v=enabled&s=e0788a414b5a6e2e8bc6ad107330242229b2dcff' />
                        <div className='flex h-10 w-full'>
                            <div className='flex flex-col justify-center items-center '>
                                <img className='rounded-full relative bottom-5' width={90} src='https://i.redd.it/snoovatar/avatars/e3c42766-d491-4e13-94e8-8ce7b97a24ba.png' />
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <p className='mt-2 text-xl font-semibold'>Maven Marketing</p>
                                <p className='text-sm font-thin text-zinc-500'>u/MavenMarketing</p>
                            </div>
                        </div>
                        <div className='flex flex-col w-full pt-7 p-2'>
                            <p className='text-md font-railway'>Communities Joined</p>

                            {joinedSubreddits.slice(0, showMore ? joinedSubreddits.length : 3).map((subreddit) => (
                                <div key={subreddit.name} className="flex items-center my-2">
                                    <Avatar size={40} src={subreddit.avatar} />
                                    <p className="ml-2 text-lg">{subreddit.name}</p>
                                    <p className="ml-auto rounded-full pl-2 pr-2 bg-purple-800 text-zinc-50 font-railway text-sm">mod</p>
                                </div>
                            ))}
                            {joinedSubreddits.length > 3 && (
                                <button
                                    className="text-blue-600 hover:text-blue-800"
                                    onClick={() => setShowMore((prev) => !prev)}
                                >
                                    {showMore ? 'View less' : 'View more'}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Community Information */}
                    <div className='flex flex-col sticky top-20 h-fit rounded-[4px] bg-white mt-5 items-center border-[1px] border-[#cccccc]'>
                        <div className='flex w-full h-10 bg-orange-500 rounded-t-[4px] pl-3 items-center'>
                            <p className='font-railway text-white'>About Community</p>
                        </div>

                        <div className='flex flex-col p-2 justify-center'>
                            <p className='text-zinc-800 text-[14px]'>Imagine a Place... where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</p>
                            <div className='flex gap-2 pt-2'>
                                <CalendarOutlined className='text-xl text-stone-500' />
                                <p className='text-stone-400'>Created May 15, 2015</p>
                            </div>
                        </div>

                        <div className='flex h-16 justify-between mt-2 border-t-[1px] border-b-[1px] p-1 w-4/5'>
                            <div className='flex flex-col'>
                                <p className='text-xl'>1.1m</p>
                                <p className='text-stone-400 text-xs'>Members</p>
                            </div>
                            <div>
                                <div className='flex gap-1 items-center'>
                                    <p className='text-[10px]'>🟢</p>
                                    <p className='text-xl'>1.3k</p>
                                </div>
                                <p className='text-stone-400 text-xs'>Online</p>
                            </div>
                            <div>
                                <p className='text-xl text-sky-600 cursor-pointer'>Link</p>
                                <p className='text-stone-400 text-xs'>Rules</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-5 col-span-6 py-10 items-center'>

                    <div className='flex rounded-[4px] w-2/3'>
                        <div className='border-[1px] rounded-[4px] bg-white h-full w-5/6 p-2 shadow-lg'> {/* Post */}
                            <div className='flex h-12'>
                                <div className='w-14 flex items-center justify-end p-2'>
                                    <Avatar size={35} icon={<UserOutlined />} />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <div className='flex justify-between'>
                                        <p className='text-[16px] text-stone-800 font-medium'>Maven Marketing</p>
                                        <p className='text-sm mt-1 font-railway text-stone-500'>Posted by u/MavenMarketing 1 hour ago</p>
                                        {/* <Button type='dashed' size="small" className='flex justify-center items-center' >
                                            <SettingOutlined />
                                        </Button> */}
                                        <Dropdown
                                            overlayStyle={{
                                                width: 200,
                                            }}
                                            menu={{
                                                items,
                                            }}
                                            placement="bottomRight"
                                            trigger={['click']}
                                        >
                                            <div className="hover:bg-gray-200 w-7 h-7 rounded-sm flex justify-center items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                    width="15" height="15"
                                                    viewBox="0 0 50 50">
                                                    <path d="M 8 20 C 4.6875 20 2 22.6875 2 26 C 2 29.3125 4.6875 32 8 32 C 11.3125 32 14 29.3125 14 26 C 14 22.6875 11.3125 20 8 20 Z M 25 20 C 21.6875 20 19 22.6875 19 26 C 19 29.3125 21.6875 32 25 32 C 28.3125 32 31 29.3125 31 26 C 31 22.6875 28.3125 20 25 20 Z M 42 20 C 38.6875 20 36 22.6875 36 26 C 36 29.3125 38.6875 32 42 32 C 45.3125 32 48 29.3125 48 26 C 48 22.6875 45.3125 20 42 20 Z"></path>
                                                </svg>
                                            </div>
                                        </Dropdown>
                                    </div>
                                    <div className='flex justify-between'>
                                        <DatePicker
                                            showTime
                                            size='small'
                                            suffixIcon={<ClockCircleOutlined style={{ fontSize: 15 }} />}
                                            style={{ border: "none", minWidth: 120, maxWidth: '35%', fontSize: 20, fontWeight: 'bolder', backgroundColor: "transparent" }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='min-h-10 mt-2 border-t-2 pt-2'>
                                <p className='text-[17px] font-railway'>Post Title Testing</p>
                            </div>

                            <div className='mt-2 mb-4'>
                                {/* <p className='text-sm text-stone-600 line-clamp-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.</p> */}
                                <ExpandableParagraph text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor." />
                            </div>

                            <div className='flex justify-center items-center max-h-96'>
                                <Image
                                    className='object-cover max-h-96'
                                    src="https://external-preview.redd.it/DS9rrnzo7xnJBWlsbzTykkCMfmvF2ipG_tRbigHoq9E.png?auto=webp&v=enabled&s=da5e68832deb70028a8c856f18cd287c17791631"
                                />
                            </div>

                        </div>
                        <div className='h-full w-1/6 pl-2'> {/* Post Analytics */}
                            {/* status, Likes, shares and comments */}
                            <div className='flex flex-col h-28 gap-2 sticky top-20 justify-start items-start'>
                                <Badge color="blue" count="Scheduled" />
                                <div className='flex gap-1 group'>
                                    <LikeOutlined className='text-red-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all duration-300' style={{ fontSize: 20 }} />
                                    <p className='group-hover:font-semibold font-light transition-all duration-300'>100k</p>
                                </div>
                                <div className='flex gap-1 group'>
                                    <CommentOutlined className='text-sky-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all duration-300' style={{ fontSize: 20 }} />
                                    <p className='group-hover:font-semibold font-light transition-all duration-300'>100k</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}