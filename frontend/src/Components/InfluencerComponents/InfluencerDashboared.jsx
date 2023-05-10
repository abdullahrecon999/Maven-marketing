import React, { useContext } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";

function DashboardCard({ title, subtitle, buttonText }) {
  const theme = useTheme();

  return (
    <Card sx={{ display: "flex", margin: 1 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h8">
            {title}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            {subtitle}
          </Typography>
          <Button>{buttonText}</Button>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 121 }}
        image="/static/images/cards/live-from-space.jpg"
        alt="Live from space album cover"
      />
    </Card>
  );
}

function PayoutCard({ title, subtitle, buttonText, amount }) {
  const theme = useTheme();

  return (
    <Card sx={{ display: "flex", margin: 1 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h8">
            {title}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            {subtitle}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            available {amount}
          </Typography>
          <Button>{buttonText}</Button>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 121 }}
        image="/static/images/cards/live-from-space.jpg"
        alt="Live from space album cover"
      />
    </Card>
  );
}

const CardDate = () => {
  return (
    <div className="flex border rounded-xl space-x-2 px-2 py-1 ">
      <h2 className="text-xs font-railway text-grey">
        <CalendarMonthIcon></CalendarMonthIcon>11/11/11
      </h2>
    </div>
  );
};

// const CampaignCard = ()=>{
//     return(<div className="flex flex-col border rounded-xl w-[100%] mt-2 h-[95%] md:w-[230px] shadow-xl hover:translate-y-1 hover:shadow-2xl">

//               <div className='flex p-3   space-x-4'>
//                 <CampaignIcon className=' text-4xl text-green'/>
//                 <div className='flex flex-col '>
//                   <h1 className="font-railway text-base text-black">Campaign Name</h1>
//                   <h1 className= "font-railwat text-sm text-grey">Work with brand Name</h1>
//                 </div>
//               </div>
//               <img src={image} alt="asjkshd" className="object-cover h-[54%] w-[100%] opacity-50 hover:opacity-100  "></img>
//               {/* <div className='flex flex-col mt-1 '>
//                 <h4 className='text-xxs font-railway text-grey'>Category</h4>
//                 <h1 className='font-Andika text-white px-2 py-1 mr-1 mb-2 rounded-full text-xs w-[80px] bg-green text-center'>twitter</h1>
//               </div> */}

//               <div className='flex-start flex justify-between mx-3 pt-3 '>

//                   <CardDate></CardDate>
//                   <AttachMoneyIcon className= "text-lg text-green"></AttachMoneyIcon>
//               </div>

//      </div>)
// }

const CampaignCarasoul = () => {
  return (
    <div className=" overflow-x-auto flex flex-1 space-x-4 bg-orange-500 w-[100%] "></div>
  );
};

const InfluencerDashboaredCampaign = ({ onViewClick }) => {
  return (
    <div className="flex flex-col  border mx-4 my-2 rounded-xl">
      <div className="flex justify-between p-4">
        <h1 className="text-black font-railway">
          Campaigns You Might Be Interested In
        </h1>
        <Button variant="outlined" onClick={() => onViewClick(1)}>
          {" "}
          View All
        </Button>
      </div>
      <hr></hr>
    </div>
  );
};

const InfluencerDashboared = ({ onCampaignViewClick }) => {
  const [data, setdata] = React.useState({});
  const navigate = useNavigate();
  const [query, setQuery] = React.useState("");
  React.useEffect(() => {
    async function getData() {
      const user = JSON.parse(localStorage.getItem("user"));

      const data = await axios.get(
        "http://localhost:3000/influencer/getmyContracts/" + user["_id"]
      );
      setdata(data.data.data);
    }
    getData();
  }, []);
  // const {data, isLoading, isError, isSuccess} = useQuery(["getMyContracts"], ()=>{

  //   return axios.get("http://localhost:3000/influencer/getmyContracts/")
  // })

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    console.log(data[0]);
    const temp = data.filter((contract) => {
      return (
        contract.campaignId.title.toLowerCase().includes(query.toLowerCase()) ||
        contract.amount.toString().includes(query.toLowerCase()) ||
        contract.campaignId.description
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        contract.campaignId.platform
          .toString()
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        contract.campaignId.country
          .toString()
          .toLowerCase()
          .includes(query.toLowerCase())
      );
    });
    setdata(temp);
  };
  return (
    <>
      <div className="overflow-y-auto h-96 p-10 rounded-xl  bg-white border ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
        <div className="flex flex-col md:flex-row justify-between py-2">
          <h1 className="font-semibold text-gray-800 mb-2">
            Campaing that you have open contracts
          </h1>
          <div>
            <Input.Search
              onChange={(e) => handleQueryChange(e)}
              placeholder="Search contracts"
              allowClear={true}
              onSearch={() => handleSearch()}
              onClear
            ></Input.Search>
          </div>
        </div>

        {Object.keys(data).length !== 0 ? (
          <div className="max-h-96 ">
            {data.map((item) => {
              return (
                <>
                  <div className="border w-full rounded-xl h-20 p-2 bg-white flex items-center mb-1 ">
                    <div className="avatar">
                      <div className="w-14 rounded">
                        <img src={item.campaignId.bannerImg} alt="src" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm  font-bold text-gray-900">
                        {item.campaignId.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        <time dateTime="2020-01-07"></time>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <label
                        onClick={() => {
                          console.log("clicked");
                          console.log(item);
                          navigate("/contract/1234");
                        }}
                        htmlFor="campaignModal"
                        className="badge badge-accent text-white btn hover:bg-green"
                      >
                        View
                      </label>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        ) : (
          <div className=" flex h-[70%] py-16  justify-center item-center">
            <h1 className="text-4xl text-gray-300">
              {" "}
              You have no current campaigns
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default InfluencerDashboared;
