import React, { useState } from "react";
import { Image, List } from 'antd';

export const InfluencerListing = () => {

    const [value, setValue] = useState(1);
    const onChange = (e) => {
        console.log('radio checked', e);
        setValue(e);
    };

    return (

        <div className="p-5">

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
                            src="https://izea-marketplace-prod.imgix.net/iuktzfb9vnorhmchzbn0naxh5s1i?ixlib=rails-4.2.0&auto=format%2C%20compress%2C%20enhance&fit=crop&crop=faces&bg=ffffff&w=1200"
                        />
                    </div>
                    <div className="row-span-1 lg:col-span-1 col-span-2 overflow-hidden h-full">
                        <Image
                            style={{ objectFit: 'cover', height: '190px', width: '100%' }}
                            src="https://izea-marketplace-prod.imgix.net/9hagiplm5wqj2jaxtqhibfdzjbht?ixlib=rails-4.2.0&auto=format%2C%20compress%2C%20enhance&fit=crop&crop=faces&bg=ffffff&w=1200"
                        />
                    </div>
                    <div className="row-span-1 lg:col-span-1 col-span-2 h-full overflow-hidden rounded-tr-xl">
                        <Image
                            style={{ objectFit: 'cover', height: '210px', width: '100%', }}
                            src="https://izea-marketplace-prod.imgix.net/c4zgx5ag1p2frhsdyv0cbdj5215t?ixlib=rails-4.2.0&auto=format%2C%20compress%2C%20enhance&fit=crop&crop=faces&bg=ffffff&w=1200"
                        />
                    </div>
                    <div className="hidden lg:block row-span-1 col-span-2 overflow-hidden h-full rounded-br-xl">
                        <Image
                            style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                            src="https://izea-marketplace-prod.imgix.net/jfaxigr070xtfcf3w5q3mojb9n5m?ixlib=rails-4.2.0&auto=format%2C%20compress%2C%20enhance&fit=crop&crop=faces&bg=ffffff&w=1200"
                        />
                    </div>
                </div>
            </div>

            <div className="flex mt-3 justify-between h-full gap-5">
                <div>
                    <div className="flex-col mb-6">
                        <p className="font-semibold text-3xl font-sans mb-1">Product Promotion from Inspirational Speaker @MichellCClark</p>
                        <div className="flex items-center mb-1">
                            <p className="text-sm text-cyan-600	font-semibold">Influencer Marketing</p>
                            <p className="ml-1 mr-1 text-slate-300">|</p>
                            <p className="text-sm text-cyan-600	font-semibold">Instagram</p>
                        </div>
                        <p className="text-base font-medium text-[#495057]">I'll promote your product on my Instagram! I post motivational messages, life as an entrepreneur, and my daily life with my wife!</p>
                    </div>

                    <div className="flex-col mt-3">
                        <div className="flex w-full justify-between pr-4 mb-3">
                            <p className="text-lg text-[#212529] font-medium">About @MichellCClark</p>
                            <div className="flex gap-1 items-center">
                                {/* Analytics icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                    color={"#3f96b6"}
                                    width="16" height="16"
                                    viewBox="0 0 24 24">
                                    <path d="M 19.5 4 C 18.119 4 17 5.119 17 6.5 L 17 17.5 C 17 18.881 18.119 20 19.5 20 C 20.881 20 22 18.881 22 17.5 L 22 6.5 C 22 5.119 20.881 4 19.5 4 z M 12.5 8 C 11.119 8 10 9.119 10 10.5 L 10 17.5 C 10 18.881 11.119 20 12.5 20 C 13.881 20 15 18.881 15 17.5 L 15 10.5 C 15 9.119 13.881 8 12.5 8 z M 5.5 12 C 4.119 12 3 13.119 3 14.5 L 3 17.5 C 3 18.881 4.119 20 5.5 20 C 6.881 20 8 18.881 8 17.5 L 8 14.5 C 8 13.119 6.881 12 5.5 12 z"></path>
                                </svg>
                                <a className="link text-[#3f96b6] font-medium link-hover">See more Analytics</a>
                            </div>
                        </div>
                        <div className="flex gap-3 px-3">
                            <div className="flex-col border rounded-xl p-6 items-center w-full">
                                <p className="text-xs text-[#6c757d] font-medium mb-2">FOLLOWERS</p>
                                <p className="text-2xl font-semibold">1.2M</p>
                            </div>
                            <div className="flex-col border rounded-xl p-6 items-center w-full">
                                <p className="text-xs text-[#6c757d] font-medium mb-2">DEMOGRAPHICS</p>
                                <p className="text-2xl font-semibold">1.2M</p>
                            </div>
                            <div className="flex-col border rounded-xl p-6 items-center w-full">
                                <p className="text-xs text-[#6c757d] font-medium mb-2">FOLLOWERS</p>
                                <p className="text-2xl font-semibold">1.2M</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-col pt-5">
                        <div className="flex-col w-full mb-3">
                            <p className="text-lg text-[#212529] font-medium">Deals</p>
                            <p className="text-sm text-[#495057]" >The specific deliverables available from this Seller.</p>
                        </div>

                        <div className="flex-col p-1">

                            <div className="transition ease-in-out delay-20 hover:shadow-xl hover:bg-[#dff1f7] rounded-xl flex h-60 lg:h-40 w-full bg-[#eff5f7] mb-3 cursor-pointer" data-key="1" onClick={() => onChange("1")}>
                                <div className={`h-full w-3 border rounded-tl-xl rounded-bl-xl ${(value == 1) ? 'bg-[#3f96b6]' : 'bg-[#686868]'} `} />
                                <div className="flex-col h-full w-full p-4">
                                    <div className="flex-col w-full">
                                        <p className="text-xl text-[#262a2e] font-medium">One Instagram Photo</p>
                                        <div className="flex w-full gap-5 mb-3">
                                            <div className="flex gap-1 items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                    width="15" height="15"
                                                    viewBox="0 0 50 50">
                                                    <path d="M 12 0 C 10.90625 0 10 0.90625 10 2 L 10 4 L 4 4 C 3.476563 4 2.945313 4.191406 2.570313 4.570313 C 2.191406 4.945313 2 5.476563 2 6 L 2 46 C 2 46.523438 2.191406 47.054688 2.570313 47.433594 C 2.945313 47.808594 3.476563 48 4 48 L 46 48 C 46.523438 48 47.054688 47.808594 47.433594 47.433594 C 47.808594 47.054688 48 46.523438 48 46 L 48 6 C 48 5.476563 47.808594 4.945313 47.433594 4.570313 C 47.054688 4.191406 46.523438 4 46 4 L 40 4 L 40 2 C 40 0.90625 39.09375 0 38 0 L 36 0 C 34.90625 0 34 0.90625 34 2 L 34 4 L 16 4 L 16 2 C 16 0.90625 15.09375 0 14 0 Z M 12 2 L 14 2 L 14 8 L 12 8 Z M 36 2 L 38 2 L 38 8 L 36 8 Z M 4 6 L 10 6 L 10 8 C 10 9.09375 10.90625 10 12 10 L 14 10 C 15.09375 10 16 9.09375 16 8 L 16 6 L 34 6 L 34 8 C 34 9.09375 34.90625 10 36 10 L 38 10 C 39.09375 10 40 9.09375 40 8 L 40 6 L 46 6 L 46 13 L 4 13 Z M 4 15 L 46 15 L 46 46 L 4 46 Z M 10 19 L 10 42 L 40 42 L 40 19 Z M 12 21 L 17 21 L 17 26 L 12 26 Z M 19 21 L 24 21 L 24 26 L 19 26 Z M 26 21 L 31 21 L 31 26 L 26 26 Z M 33 21 L 38 21 L 38 26 L 33 26 Z M 12 28 L 17 28 L 17 33 L 12 33 Z M 19 28 L 24 28 L 24 33 L 19 33 Z M 26 28 L 31 28 L 31 33 L 26 33 Z M 33 28 L 38 28 L 38 33 L 33 33 Z M 12 35 L 17 35 L 17 40 L 12 40 Z M 19 35 L 24 35 L 24 40 L 19 40 Z M 26 35 L 31 35 L 31 40 L 26 40 Z M 33 35 L 38 35 L 38 40 L 33 40 Z"></path>
                                                </svg>
                                                <p className="text-sm text-[#8e949b]">15 days Delivery</p>
                                            </div>
                                            <div className="flex gap-1 items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                    width="15" height="15"
                                                    viewBox="0 0 30 30">
                                                    <path d="M 15 3 A 1.0001 1.0001 0 1 0 15 5 C 20.534534 5 25 9.4654664 25 15 C 25 20.534534 20.534534 25 15 25 C 9.4654664 25 5 20.534534 5 15 C 5 12.650241 5.8085376 10.496834 7.1601562 8.7929688 L 9 11 L 11 4 L 4 5 L 5.8671875 7.2402344 C 4.086665 9.3350655 3 12.041787 3 15 C 3 21.615466 8.3845336 27 15 27 C 21.615466 27 27 21.615466 27 15 C 27 8.3845336 21.615466 3 15 3 z"></path>
                                                </svg>
                                                <p className="text-sm text-[#8e949b]">2 Revisions</p>
                                            </div>
                                        </div>
                                        <p className="text-[#6a6e72]">My audience tends to be males around 18-24. I'll highlight your product in an Instagram post on @zari.khan111. My followers like my posts about Media and Entertainment as well as Media and Entertainment. I've worked with a range of companies, including Instagram and TikTok.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="transition ease-in-out delay-20 hover:shadow-xl hover:bg-[#dff1f7] rounded-xl flex h-60 lg:h-40 w-full bg-[#eff5f7] mb-3 cursor-pointer" onClick={() => onChange("2")}>
                                <div className={`h-full w-3 border rounded-tl-xl rounded-bl-xl ${(value == 2) ? 'bg-[#3f96b6]' : 'bg-[#686868]'} `} />
                                <div className="flex-col h-full w-full p-4">
                                    <div className="flex-col w-full">
                                        <p className="text-xl text-[#262a2e] font-medium">One Instagram Photo</p>
                                        <div className="flex w-full gap-5 mb-3">
                                            <div className="flex gap-1 items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                    width="15" height="15"
                                                    viewBox="0 0 50 50">
                                                    <path d="M 12 0 C 10.90625 0 10 0.90625 10 2 L 10 4 L 4 4 C 3.476563 4 2.945313 4.191406 2.570313 4.570313 C 2.191406 4.945313 2 5.476563 2 6 L 2 46 C 2 46.523438 2.191406 47.054688 2.570313 47.433594 C 2.945313 47.808594 3.476563 48 4 48 L 46 48 C 46.523438 48 47.054688 47.808594 47.433594 47.433594 C 47.808594 47.054688 48 46.523438 48 46 L 48 6 C 48 5.476563 47.808594 4.945313 47.433594 4.570313 C 47.054688 4.191406 46.523438 4 46 4 L 40 4 L 40 2 C 40 0.90625 39.09375 0 38 0 L 36 0 C 34.90625 0 34 0.90625 34 2 L 34 4 L 16 4 L 16 2 C 16 0.90625 15.09375 0 14 0 Z M 12 2 L 14 2 L 14 8 L 12 8 Z M 36 2 L 38 2 L 38 8 L 36 8 Z M 4 6 L 10 6 L 10 8 C 10 9.09375 10.90625 10 12 10 L 14 10 C 15.09375 10 16 9.09375 16 8 L 16 6 L 34 6 L 34 8 C 34 9.09375 34.90625 10 36 10 L 38 10 C 39.09375 10 40 9.09375 40 8 L 40 6 L 46 6 L 46 13 L 4 13 Z M 4 15 L 46 15 L 46 46 L 4 46 Z M 10 19 L 10 42 L 40 42 L 40 19 Z M 12 21 L 17 21 L 17 26 L 12 26 Z M 19 21 L 24 21 L 24 26 L 19 26 Z M 26 21 L 31 21 L 31 26 L 26 26 Z M 33 21 L 38 21 L 38 26 L 33 26 Z M 12 28 L 17 28 L 17 33 L 12 33 Z M 19 28 L 24 28 L 24 33 L 19 33 Z M 26 28 L 31 28 L 31 33 L 26 33 Z M 33 28 L 38 28 L 38 33 L 33 33 Z M 12 35 L 17 35 L 17 40 L 12 40 Z M 19 35 L 24 35 L 24 40 L 19 40 Z M 26 35 L 31 35 L 31 40 L 26 40 Z M 33 35 L 38 35 L 38 40 L 33 40 Z"></path>
                                                </svg>
                                                <p className="text-sm text-[#8e949b]">15 days Delivery</p>
                                            </div>
                                            <div className="flex gap-1 items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                    width="15" height="15"
                                                    viewBox="0 0 30 30">
                                                    <path d="M 15 3 A 1.0001 1.0001 0 1 0 15 5 C 20.534534 5 25 9.4654664 25 15 C 25 20.534534 20.534534 25 15 25 C 9.4654664 25 5 20.534534 5 15 C 5 12.650241 5.8085376 10.496834 7.1601562 8.7929688 L 9 11 L 11 4 L 4 5 L 5.8671875 7.2402344 C 4.086665 9.3350655 3 12.041787 3 15 C 3 21.615466 8.3845336 27 15 27 C 21.615466 27 27 21.615466 27 15 C 27 8.3845336 21.615466 3 15 3 z"></path>
                                                </svg>
                                                <p className="text-sm text-[#8e949b]">2 Revisions</p>
                                            </div>
                                        </div>
                                        <p className="text-[#6a6e72]">My audience tends to be males around 18-24. I'll highlight your product in an Instagram post on @zari.khan111. My followers like my posts about Media and Entertainment as well as Media and Entertainment. I've worked with a range of companies, including Instagram and TikTok.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="transition ease-in-out delay-20 hover:shadow-xl hover:bg-[#dff1f7] rounded-xl flex h-60 lg:h-40 w-full bg-[#eff5f7] mb-3 cursor-pointer" onClick={() => onChange("3")}>
                                <div className={`h-full w-3 border rounded-tl-xl rounded-bl-xl ${(value == 3) ? 'bg-[#3f96b6]' : 'bg-[#686868]'} `} />
                                <div className="flex-col h-full w-full p-4">
                                    <div className="flex-col w-full">
                                        <p className="text-xl text-[#262a2e] font-medium">One Instagram Photo</p>
                                        <div className="flex w-full gap-5 mb-3">
                                            <div className="flex gap-1 items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                    width="15" height="15"
                                                    viewBox="0 0 50 50">
                                                    <path d="M 12 0 C 10.90625 0 10 0.90625 10 2 L 10 4 L 4 4 C 3.476563 4 2.945313 4.191406 2.570313 4.570313 C 2.191406 4.945313 2 5.476563 2 6 L 2 46 C 2 46.523438 2.191406 47.054688 2.570313 47.433594 C 2.945313 47.808594 3.476563 48 4 48 L 46 48 C 46.523438 48 47.054688 47.808594 47.433594 47.433594 C 47.808594 47.054688 48 46.523438 48 46 L 48 6 C 48 5.476563 47.808594 4.945313 47.433594 4.570313 C 47.054688 4.191406 46.523438 4 46 4 L 40 4 L 40 2 C 40 0.90625 39.09375 0 38 0 L 36 0 C 34.90625 0 34 0.90625 34 2 L 34 4 L 16 4 L 16 2 C 16 0.90625 15.09375 0 14 0 Z M 12 2 L 14 2 L 14 8 L 12 8 Z M 36 2 L 38 2 L 38 8 L 36 8 Z M 4 6 L 10 6 L 10 8 C 10 9.09375 10.90625 10 12 10 L 14 10 C 15.09375 10 16 9.09375 16 8 L 16 6 L 34 6 L 34 8 C 34 9.09375 34.90625 10 36 10 L 38 10 C 39.09375 10 40 9.09375 40 8 L 40 6 L 46 6 L 46 13 L 4 13 Z M 4 15 L 46 15 L 46 46 L 4 46 Z M 10 19 L 10 42 L 40 42 L 40 19 Z M 12 21 L 17 21 L 17 26 L 12 26 Z M 19 21 L 24 21 L 24 26 L 19 26 Z M 26 21 L 31 21 L 31 26 L 26 26 Z M 33 21 L 38 21 L 38 26 L 33 26 Z M 12 28 L 17 28 L 17 33 L 12 33 Z M 19 28 L 24 28 L 24 33 L 19 33 Z M 26 28 L 31 28 L 31 33 L 26 33 Z M 33 28 L 38 28 L 38 33 L 33 33 Z M 12 35 L 17 35 L 17 40 L 12 40 Z M 19 35 L 24 35 L 24 40 L 19 40 Z M 26 35 L 31 35 L 31 40 L 26 40 Z M 33 35 L 38 35 L 38 40 L 33 40 Z"></path>
                                                </svg>
                                                <p className="text-sm text-[#8e949b]">15 days Delivery</p>
                                            </div>
                                            <div className="flex gap-1 items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                    width="15" height="15"
                                                    viewBox="0 0 30 30">
                                                    <path d="M 15 3 A 1.0001 1.0001 0 1 0 15 5 C 20.534534 5 25 9.4654664 25 15 C 25 20.534534 20.534534 25 15 25 C 9.4654664 25 5 20.534534 5 15 C 5 12.650241 5.8085376 10.496834 7.1601562 8.7929688 L 9 11 L 11 4 L 4 5 L 5.8671875 7.2402344 C 4.086665 9.3350655 3 12.041787 3 15 C 3 21.615466 8.3845336 27 15 27 C 21.615466 27 27 21.615466 27 15 C 27 8.3845336 21.615466 3 15 3 z"></path>
                                                </svg>
                                                <p className="text-sm text-[#8e949b]">2 Revisions</p>
                                            </div>
                                        </div>
                                        <p className="text-[#6a6e72]">My audience tends to be males around 18-24. I'll highlight your product in an Instagram post on @zari.khan111. My followers like my posts about Media and Entertainment as well as Media and Entertainment. I've worked with a range of companies, including Instagram and TikTok.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex-col w-full mb-3">
                            <p className="text-lg text-[#212529] font-medium">Seller Requests</p>
                            <p className="text-sm text-[#495057]" >Preview of any questions the Seller may need answered prior to completing your Listing.</p>
                        </div>
                        <div className="p-2">
                            <List
                                header={<p className="text-xl font-semibold">Questions</p>}
                                bordered
                                dataSource={[
                                    'Racing car sprays burning fuel into crowd.',
                                    'Australian walks 100km after outback crash.',
                                    'Los Angeles battles huge wildfires.',
                                ]}
                                renderItem={(item) => (
                                    <List.Item>
                                        <div className="flex gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="svg-icon-lg flex-shrink-0 me-2">
                                                <path d="M18.106 3.754H2.13001C1.81915 3.75506 1.52136 3.87915 1.30174 4.09914C1.08212 4.31914 0.958535 4.61714 0.958008 4.928V15.312C0.958535 15.6229 1.08212 15.9209 1.30174 16.1409C1.52136 16.3609 1.81915 16.4849 2.13001 16.486H18.106C18.4169 16.4849 18.7147 16.3609 18.9343 16.1409C19.1539 15.9209 19.2775 15.6229 19.278 15.312V4.928C19.278 4.61698 19.1546 4.31867 18.9349 4.09856C18.7151 3.87845 18.417 3.75453 18.106 3.754ZM18.338 15.312C18.3388 15.3426 18.3332 15.373 18.3215 15.4012C18.3097 15.4295 18.2922 15.455 18.27 15.476C18.2257 15.52 18.1664 15.5458 18.104 15.548H2.12801C2.09691 15.5478 2.06616 15.5414 2.03763 15.529C2.0091 15.5166 1.98337 15.4986 1.96201 15.476C1.9398 15.455 1.92227 15.4295 1.91056 15.4012C1.89884 15.373 1.8932 15.3426 1.89401 15.312V4.928C1.89425 4.86652 1.91868 4.80761 1.96201 4.764C2.00583 4.71926 2.0654 4.69342 2.12801 4.692H18.104C18.1667 4.69321 18.2263 4.71908 18.27 4.764C18.2918 4.78533 18.3091 4.81086 18.3208 4.83904C18.3325 4.86723 18.3383 4.89749 18.338 4.928V15.312Z" fill="black"></path>
                                                <path d="M4.554 6.422C4.34059 6.22609 4.0617 6.11695 3.772 6.116H3V6.898H3.782C3.88809 6.898 3.98983 6.94014 4.06484 7.01516C4.13986 7.09017 4.182 7.19191 4.182 7.298V12.762C4.182 12.8681 4.13986 12.9698 4.06484 13.0448C3.98983 13.1199 3.88809 13.162 3.782 13.162H3V13.944H3.782C4.0717 13.943 4.35059 13.8339 4.564 13.638C4.7768 13.8336 5.05496 13.9427 5.344 13.944H6.128V13.154H5.336C5.22991 13.154 5.12817 13.1119 5.05316 13.0368C4.97814 12.9618 4.936 12.8601 4.936 12.754V7.29C4.936 7.18391 4.97814 7.08217 5.05316 7.00716C5.12817 6.93214 5.22991 6.89 5.336 6.89H6.118V6.116H5.336C5.0463 6.11695 4.76741 6.22609 4.554 6.422Z" fill="black"></path>
                                            </svg>
                                            {item}
                                        </div>

                                    </List.Item>
                                )}
                            />
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
                                <p className="font-medium">One Instagram Post</p>
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
                                <div className="flex justify-between">
                                    <p className="font-medium">Total Delivery time</p>
                                    <p className="font-medium"><b>5</b> Days</p>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button className="btn btn-success btn-wide mt-3">Send Request</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};