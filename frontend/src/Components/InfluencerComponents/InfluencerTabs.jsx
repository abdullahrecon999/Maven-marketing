import * as React from 'react';
import { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InfluencerDashboared from "../InfluencerComponents/InfluencerDashboared"
import InfluencerAllCampaigns from './InfluencerAllCampaigns';
import SocialProfile from './SocialProfile';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeFromInterestedCampaignButton = (newValue)=>{
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%'  }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs sx={{width: '100%','& .MuiTabs-flexContainer': {
            flexWrap: 'wrap',
          }}}  value={value}
           onChange={handleChange}
          
           >
          <Tab label="Dashboared" {...a11yProps(0)} />
          <Tab label="All Campaigns" {...a11yProps(1)} />
          <Tab label="Bids" {...a11yProps(2)} />
          <Tab label="Transactions" {...a11yProps(3)} />
          <Tab label="Social" {...a11yProps(4)} />
          
        </Tabs>
      </Box>
      <TabPanel sx={{mt:0}} value={value} index={0}>
        <InfluencerDashboared onCampaignViewClick={(value)=>{
          handleChangeFromInterestedCampaignButton(value)
        }}></InfluencerDashboared>
      </TabPanel>
      <Suspense fallback={<div>loading</div>}>
        <TabPanel value={value} index={1}>
          <InfluencerAllCampaigns></InfluencerAllCampaigns>
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={4}>
          <SocialProfile></SocialProfile>
        </TabPanel>
      </Suspense>
    </Box>
  );
}
