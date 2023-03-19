import React from 'react';
import { useState, useEffect } from 'react';
import { ListingCard } from "../../Components/brandComponents/listingCard";
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import { Button, Modal, Slider, Switch, InputNumber, Divider, Checkbox, Select, Dropdown } from 'antd';
import { useQuery } from "react-query"
import { useSearchParams } from "react-router-dom";
let formatter = Intl.NumberFormat('en', { notation: 'compact' });

const InfluencerListing = (id) => {
  window.open('/influencerlisting/'+id,'_blank')
}

export const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let search = searchParams.get('search')
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchInfluencers = async () => {
    const res = await fetch('http://localhost:3000/influencer/influencers?'+decodeURIComponent(searchParams));
    return res.json();
  };

  const [influencersData, setInfluencersData] = useState([]);
  const { data:influencer, isLoading, isSuccess, refetch } = useQuery(['influencer',search], fetchInfluencers, {onCompleted: setInfluencersData});


  useEffect(() => {
    setInfluencersData(influencer?.data ?? []);
  }, [influencer?.data]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [minNum, setMinNum] = useState(1000);
  const [maxNum, setMaxNum] = useState(10000);
  const [inputValue, setInputValue] = useState([1000, 10000]);

  const [minNumPrice, setMinNumPrice] = useState(200);
  const [maxNumPrice, setMaxNumPrice] = useState(1000);
  const [inputValuePrice, setInputValuePrice] = useState([200, 1000]);

  const countries = [
    { label: "United States", value: "United States" },
    { label: "China", value: "China" },
    { label: "Japan", value: "Japan" },
    { label: "Germany", value: "Germany" },
    { label: "India", value: "India" },
    { label: "United Kingdom", value: "United Kingdom" },
    { label: "France", value: "France" },
    { label: "Italy", value: "Italy" },
    { label: "Brazil", value: "Brazil" },
    { label: "Canada", value: "Canada" },
    { label: "Russia", value: "Russia" },
    { label: "South Korea", value: "South Korea" },
    { label: "Australia", value: "Australia" },
    { label: "Spain", value: "Spain" },
    { label: "Mexico", value: "Mexico" },
    { label: "Indonesia", value: "Indonesia" },
    { label: "Netherlands", value: "Netherlands" },
    { label: "Saudi Arabia", value: "Saudi Arabia" },
    { label: "Switzerland", value: "Switzerland" },
    { label: "Turkey", value: "Turkey" },
    { label: "Poland", value: "Poland" },
    { label: "Sweden", value: "Sweden" },
    { label: "Belgium", value: "Belgium" },
    { label: "Norway", value: "Norway" },
    { label: "Austria", value: "Austria" },
    { label: "United Arab Emirates", value: "United Arab Emirates" },
    { label: "Iran", value: "Iran" },
    { label: "Palestine", value: "Palestine" },
    { label: "Portugal", value: "Portugal" },
    { label: "South Africa", value: "South Africa" },
    { label: "Egypt", value: "Egypt" },
    { label: "Thailand", value: "Thailand" },
    { label: "Colombia", value: "Colombia" },
    { label: "Malaysia", value: "Malaysia" },
    { label: "Singapore", value: "Singapore" },
    { label: "Bangladesh", value: "Bangladesh" },
    { label: "Pakistan", value: "Pakistan" },
    { label: "Iraq", value: "Iraq" },
    { label: "Philippines", value: "Philippines" },
    { label: "Nigeria", value: "Nigeria" },
    { label: "Chile", value: "Chile" },
    { label: "Romania", value: "Romania" },
    { label: "Nepal", value: "Nepal" },
    { label: "Ukraine", value: "Ukraine" },
    { label: "Greece", value: "Greece" },
    { label: "Czech Republic", value: "Czech Republic" },
    { label: "Belarus", value: "Belarus" },
    { label: "Dominican Republic", value: "Dominican Republic" }
  ];

  const [dateSort, setDateSort] = useState(true);
  const [priceSort, setPriceSort] = useState(true);
  const [followerSort, setFollowerSort] = useState(true);

  const items = [
    {
      label: (<div onClick={()=>setDateSort(!dateSort)}>
        <div className="flex justify-between">
          <p className="select-none">Date</p>
          <div className="flex gap-1">
            <div className={`flex items-center justify-center rounded-sm border h-5 w-5 ${(!dateSort)? 'bg-yellow-200' : 'bg-white'} `}>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                width="15" height="15"
                viewBox="0 0 30 30">
                <path d="M15,8c0.256,0,0.512,0.098,0.707,0.293l10,10c0.286,0.286,0.372,0.716,0.217,1.09C25.77,19.757,25.404,20,25,20H5 c-0.404,0-0.77-0.243-0.924-0.617c-0.155-0.374-0.069-0.804,0.217-1.09l10-10C14.488,8.098,14.744,8,15,8z"></path>
              </svg>
            </div>
            <div className={`flex items-center justify-center rounded-sm border h-5 w-5 ${(dateSort)? 'bg-yellow-200' : 'bg-white'} `}>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                width="15" height="15"
                viewBox="0 0 30 30">
                <path d="M15,23c-0.256,0-0.512-0.098-0.707-0.293l-10-10c-0.286-0.286-0.372-0.716-0.217-1.09C4.23,11.243,4.596,11,5,11h20 c0.404,0,0.77,0.243,0.924,0.617c0.155,0.374,0.069,0.804-0.217,1.09l-10,10C15.512,22.902,15.256,23,15,23z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>),
      key: '0',
    },
    {
      label: (<div onClick={()=>setPriceSort(!priceSort)}>
        <div className="flex justify-between">
          <p className="select-none">Price</p>
          <div className="flex gap-1">
            <div className={`flex items-center justify-center rounded-sm border h-5 w-5 ${(!priceSort)? 'bg-yellow-200' : 'bg-white'} `}>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                width="15" height="15"
                viewBox="0 0 30 30">
                <path d="M15,8c0.256,0,0.512,0.098,0.707,0.293l10,10c0.286,0.286,0.372,0.716,0.217,1.09C25.77,19.757,25.404,20,25,20H5 c-0.404,0-0.77-0.243-0.924-0.617c-0.155-0.374-0.069-0.804,0.217-1.09l10-10C14.488,8.098,14.744,8,15,8z"></path>
              </svg>
            </div>
            <div className={`flex items-center justify-center rounded-sm border h-5 w-5 ${(priceSort)? 'bg-yellow-200' : 'bg-white'} `}>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                width="15" height="15"
                viewBox="0 0 30 30">
                <path d="M15,23c-0.256,0-0.512-0.098-0.707-0.293l-10-10c-0.286-0.286-0.372-0.716-0.217-1.09C4.23,11.243,4.596,11,5,11h20 c0.404,0,0.77,0.243,0.924,0.617c0.155,0.374,0.069,0.804-0.217,1.09l-10,10C15.512,22.902,15.256,23,15,23z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>),
      key: '1',
    },
    {
      label: (<div onClick={()=>setFollowerSort(!followerSort)}>
        <div className="flex justify-between w-40">
          <p className="select-none">Followers</p>
          <div className="flex gap-1">
            <div className={`flex items-center justify-center rounded-sm border h-5 w-5 ${(!followerSort)? 'bg-yellow-200' : 'bg-white'} `}>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                width="15" height="15"
                viewBox="0 0 30 30">
                <path d="M15,8c0.256,0,0.512,0.098,0.707,0.293l10,10c0.286,0.286,0.372,0.716,0.217,1.09C25.77,19.757,25.404,20,25,20H5 c-0.404,0-0.77-0.243-0.924-0.617c-0.155-0.374-0.069-0.804,0.217-1.09l10-10C14.488,8.098,14.744,8,15,8z"></path>
              </svg>
            </div>
            <div className={`flex items-center justify-center rounded-sm border h-5 w-5 ${(followerSort)? 'bg-yellow-200' : 'bg-white'} `}>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                width="15" height="15"
                viewBox="0 0 30 30">
                <path d="M15,23c-0.256,0-0.512-0.098-0.707-0.293l-10-10c-0.286-0.286-0.372-0.716-0.217-1.09C4.23,11.243,4.596,11,5,11h20 c0.404,0,0.77,0.243,0.924,0.617c0.155,0.374,0.069,0.804-0.217,1.09l-10,10C15.512,22.902,15.256,23,15,23z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>),
      key: '2',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <div className="flex justify-between">
          <button className="btn btn-xs rounded-md px-2 py-1 btn-error">Clear</button>
          <button onClick={() => sortRequest()} className="btn btn-xs rounded-md px-2 py-1 btn-success">Apply</button>
        </div>
      ),
    },
  ];

  const handleChangeCountry = (value) => {
    console.log(`selected ${value}`);
  };

  const onChange = (newValue) => {
    setMinNum(newValue[0]);
    setMaxNum(newValue[1]);
    setInputValue(newValue);
  };

  const onChangePrice = (newValue) => {
    setMinNumPrice(newValue[0]);
    setMaxNumPrice(newValue[1]);
    setInputValuePrice(newValue);
  };

  const onChangeTags = (checkedValues) => {
    console.log('checked = ', checkedValues);
  };

  const [categoriesList, setCategoriesList] = useState([]);
  const onChangeCategories = (checkedValues) => {
    console.log('checked = ', checkedValues);
    setCategoriesList(checkedValues);
    console.log(categoriesList)
  };

  const onChangePlatforms = (checkedValues) => {
    console.log('checked = ', checkedValues);
  };

  const filterRequest = () => {
    // get all the values from the modal and craft a searchParams object to send to the API
    const minFollowers = minNum;
    const maxFollowers = maxNum;
    setSearchParams({
      minFollowers,
      maxFollowers,
      })
    refetch();
  }

  const sortRequest = () => {
    // let str = "sort="+"hello"
    // // str.concat((followerSort) ? 'followers:asc' : 'followers:desc');
    // // str = str + dateSort ? 'createdAt:asc' : 'createdAt:desc';
    // console.log((followerSort) ? 'followers:asc' : 'followers:desc')
    // console.log(str)
    //setSearchParams("sort=followers:asc");
    setSearchParams("sort="+ (followerSort? "follower:asc":"follower:dsc") + ("," + (dateSort? "createdAt:asc":"createdAt:dsc")))
    refetch();
  }

  const platforms = [
    "Instagram",
    "Youtube",
    "Tiktok",
    "Facebook",
    "Twitter",
    "Snapchat",
    "Linkedin",
    "Pinterest"
  ]

  const categories = [
    "Influencer Marketing",
    "Email Marketing",
    "Blog Writing",
    "Photography",
    "Design",
    "Audio"
  ]

  const tags = [
    "Entertainment",
    "Technology",
    "Pets",
    "Auto",
    "Sports",
    "Fashion",
    "Health",
    "Business",
    "Comedy",
    "Finance",
    "Food",
    "Art",
    "Diy",
    "Nature",
    "Beauty",
    "Family",
    "Gaming",
    "Music",
    "Travel",
    "Photography",
    "Education",
    "News",
    "Movies",
    "Books",
    "Magazines",
    "Science"
  ];

  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenChange = (flag) => {
    setOpenMenu(flag);
  };

  return (
    <>
    {console.log(influencer)}
    <Modal
        title={<p className="text-2xl font-bold border-b-2 mb-5 pb-2">Filter</p>}
        footer={
          <div className="flex justify-between">
            <div className="btn btn-sm btn-outline btn-warning">
              Reset Filters
            </div>
            <div onClick={()=>filterRequest()} className="btn btn-sm btn-primary">
              Search
            </div>
          </div>
        }
        centered open={isModalOpen}
        onCancel={handleCancel}>

        <div className="flex-col overflow-y-auto h-96 p-1">
          <div>
            <h1 className="text-xl font-bold">Folower Count</h1>
            <Slider
              range={{ draggableTrack: true }}
              defaultValue={[1000, 8000]}
              min={1000}
              max={100000}
              step={100}
              onChange={onChange}
              value={inputValue}
              handleStyle={[{ backgroundColor: "#f5f5f5", borderColor: "#d9d9d9" }, { backgroundColor: "#f5f5f5", borderColor: "#d9d9d9" }]}
            />
            <div className="lg:flex gap-3 justify-between items-center">
              <InputNumber
                min={1000}
                max={100000}
                disabled={inputValue[0] <= 1000}
                addonBefore={<span>Min</span>}
                style={{
                  margin: '0 16px',
                  width: '100%',
                }}
                value={(inputValue[0] <= 1000) ? "<=1000" : inputValue[0]}
                onChange={(value) => {
                  setMinNum(value);
                  onChange([value, inputValue[1]])
                }}
              />
              <div className="lg:divider divider-vertical lg:w-20" />
              <InputNumber
                min={1000}
                max={100000}
                disabled={inputValue[1] >= 100000}
                addonAfter={<span>Max</span>}
                style={{
                  margin: '0 16px',
                  width: '100%',
                }}
                value={(inputValue[1] >= 100000) ? "100k+" : inputValue[1]}
                onChange={(value) => {
                  setMaxNum(value);
                  onChange([inputValue[0], value])
                }}
              />
            </div>

            <div className="divider divider-vertical "></div>

            <h1 className="text-xl font-bold">Price Range</h1>
            <Slider
              range={{ draggableTrack: true }}
              defaultValue={[200, 1000]}
              min={50}
              max={5000}
              step={50}
              onChange={onChangePrice}
              value={inputValuePrice}
              handleStyle={[{ backgroundColor: "#f5f5f5", borderColor: "#d9d9d9" }, { backgroundColor: "#f5f5f5", borderColor: "#d9d9d9" }]}
            />
            <div className="lg:flex gap-3 justify-between items-center">
              <InputNumber
                min={50}
                max={5000}
                disabled={inputValuePrice[0] <= 50}
                addonBefore={<span>Min</span>}
                style={{
                  margin: '0 16px',
                  width: '100%',
                }}
                value={(inputValuePrice[0] <= 50) ? "<=50" : inputValuePrice[0]}
                onChange={(value) => {
                  setMinNumPrice(value);
                  onChangePrice([value, inputValuePrice[1]])
                }}
              />
              <divider className="lg:divider lg:divider-vertical lg:w-20" />
              <InputNumber
                min={50}
                max={5000}
                disabled={inputValuePrice[1] >= 5000}
                addonAfter={<span>Max</span>}
                style={{
                  margin: '0 16px',
                  width: '100%',
                }}
                value={(inputValuePrice[1] >= 5000) ? "5000+" : inputValuePrice[1]}
                onChange={(value) => {
                  setMaxNumPrice(value);
                  onChangePrice([inputValuePrice[0], value])
                }}
              />
            </div>

            <div className="divider divider-vertical "></div>

            <h1 className="text-xl font-bold mb-3">Tags</h1>
            <Checkbox.Group
              style={{
                width: '100%',
              }}
              onChange={onChangeTags}
            >
              <div className="grid grid-cols-3 w-full">
                <Checkbox style={{ marginLeft: 8 }} value="Lifestyle">Lifestyle</Checkbox>

                {
                  tags.map((category, index) => {
                    return (
                      <Checkbox style={{ marginLeft: 8 }} key={index} value={category}>{category}</Checkbox>
                    )
                  })
                }

              </div>
            </Checkbox.Group>

            <div className="divider divider-vertical "></div>

            <h1 className="text-xl font-bold mb-3">Categories</h1>
            <Checkbox.Group
              style={{
                width: '100%',
              }}
              onChange={onChangeCategories}
            >
              <div className="grid grid-cols-3 w-full">

                {
                  categories.map((category, index) => {
                    return (
                      <Checkbox style={{ marginLeft: 8 }} key={index} value={category}>{category}</Checkbox>
                    )
                  })
                }

              </div>
            </Checkbox.Group>

            <div className="divider divider-vertical "></div>

            <h1 className="text-xl font-bold mb-3">Platforms</h1>
            <Checkbox.Group
              style={{
                width: '100%',
              }}
              onChange={onChangePlatforms}
            >
              <div className="grid grid-cols-3 w-full">

                {
                  platforms.map((category, index) => {
                    return (
                      <Checkbox style={{ marginLeft: 8 }} key={index} value={category}>{category}</Checkbox>
                    )
                  })
                }

              </div>
            </Checkbox.Group>

            <div className="divider divider-vertical "></div>

            <h1 className="text-xl font-bold mb-3">Countries</h1>
            <Select
              mode="multiple"
              allowClear
              style={{
                width: '100%',
              }}
              placeholder="Please select"
              onChange={handleChangeCountry}
              options={countries}
              placement={"topLeft"}
            />
            <div className="h-5"></div>
          </div>
        </div>
      </Modal>

      <div className="flex-col px-9">

        <div className="flex bg-[#fcfcf8] h-16 sticky top-16 z-[12] mb-3 align items-center shadow-[0_10px_10px_5px_rgba(255,255,255,0.9)]">
          <div className="flex justify-space-between items-center gap-2">
            <div onClick={showModal} className="flex gap-2 items-center border border-slate-200 hover:shadow-lg btn btn-ghost btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                width="15" height="15"
                viewBox="0 0 50 50">
                <path d="M 3.8125 2 C 3.335938 2.089844 2.992188 2.511719 3 3 L 3 6 C 3.003906 6.257813 3.101563 6.503906 3.28125 6.6875 L 19 23.375 L 19 41 C 19.007813 41.347656 19.199219 41.667969 19.5 41.84375 L 29.5 47.84375 C 29.804688 48.019531 30.183594 48.023438 30.492188 47.847656 C 30.796875 47.675781 30.992188 47.351563 31 47 L 31 23.375 L 46.5625 6.84375 C 46.574219 6.832031 46.582031 6.824219 46.59375 6.8125 L 46.71875 6.6875 C 46.765625 6.640625 46.808594 6.585938 46.84375 6.53125 C 46.867188 6.511719 46.886719 6.492188 46.90625 6.46875 C 46.964844 6.339844 46.996094 6.203125 47 6.0625 C 47 6.042969 47 6.019531 47 6 C 47.003906 5.949219 47.003906 5.894531 47 5.84375 L 47 3 C 47 2.449219 46.550781 2 46 2 L 4 2 C 3.96875 2 3.9375 2 3.90625 2 C 3.875 2 3.84375 2 3.8125 2 Z M 5 4 L 45 4 L 45 5.625 L 29.5625 22 L 20.4375 22 L 5 5.625 Z M 21 24 L 29 24 L 29 45.25 L 21 40.46875 Z"></path>
              </svg>
              <p className="text-sm">Filter</p>
            </div>

            <div className="flex gap-2 items-center border border-slate-200 hover:shadow-lg btn btn-ghost btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                width="15" height="15"
                viewBox="0 0 24 24">
                <path d="M16 11H18V19H16zM16 7H18V9H16zM16 3H18V5H16zM6 5H8V13H6zM6 15H8V17H6zM6 19H8V21H6z"></path><path d="M7 2L12 7 2 7zM17 22L22 17 12 17z"></path>
              </svg>
              <Dropdown
                onOpenChange={handleOpenChange}
                open={openMenu}
                menu={{
                  items,
                }}
              >
                <p onClick={(e) => e.preventDefault()} className="text-sm">Sort</p>
              </Dropdown>
            </div>

            <div className="divider divider-horizontal m-0" ></div>

            <div className="flex mt-3 pb-3 max-w-5xl gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300">
              {
                // If categoriesList is empty, show all else show the categories
                categoriesList.length === 0 ? (
                  <div className="flex gap-2 bg-green-100 items-center border rounded-xl border-slate-200 hover:shadow-lg btn-sm">
                    <p className="text-sm">Showing All Categories</p>
                  </div>
                ) : (
                  categoriesList.map((category) => (
                    <div className="flex gap-2 items-center border rounded-xl border-slate-200 hover:shadow-lg btn-sm">
                      <p className="text-sm">{category}</p>
                    </div>
                  ))
                )
              }
            </div>

          </div>
        </div>

        <div className="mb-2">
          <h1 className="font-bold">All Influencers</h1>
        </div>

        <div className="flex flex-wrap justify-between gap-3">
          {
            isLoading ? (
              <div className="flex justify-center items-center">
                <p>Loading</p>
              </div>
            ) : (
              isSuccess && (
                influencer?.data?.docs?.map((influencer) => (
                  <ListingCard
                    onclick={()=>InfluencerListing(influencer._id)}
                    avatar={influencer.photo}
                    name={influencer.name}
                    followers={formatter.format(influencer.socialMediaHandles[0]?.followers)}
                    banner={influencer.photo}
                    description={influencer.description}
                  />
                ))
              )
            )
          }
          
          <ListingCard avatar="https://www.rfa.org/english/news/china/warning-01082021091841.html/@@images/2ad7ab11-b78f-44d3-b587-618128d3dfc7.jpeg" name="Jack Musk" followers="10k" video banner="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
          <ListingCard avatar="https://www.rfa.org/english/news/china/warning-01082021091841.html/@@images/2ad7ab11-b78f-44d3-b587-618128d3dfc7.jpeg" name="Jack Musk" followers="10k" video banner="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
        </div>

        <div className="flex justify-center p-5">
          <Pagination count={influencer?.data?.totalPages} showFirstButton showLastButton />
        </div>

      </div>
    </>
  )
}