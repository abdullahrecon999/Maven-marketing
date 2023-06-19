import React, { useState, useEffect } from 'react'
import { NavBar } from "../../Components/brandComponents/navbar";
import { useQuery } from "react-query";
import axios from 'axios';
import { RedditOutlined } from '@ant-design/icons';
import { Brush, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, RadialBarChart, RadialBar } from 'recharts';
import HeatmapGrid from 'react-heatmap-grid';
import moment from 'moment';
import 'moment-timezone';
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

const loadDashboard = async () => {
    console.log("Loading Dashboard");
    return axios.get("http://localhost:3000/automate/reddit")
        .then(response => {
            if (response.status !== 200) {
                console.log("Error while fetching data");
                throw new Error("Error while fetching data");
            }
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.log(error);
            throw new Error("Error while fetching data");
        });
};

function abbreviateNumber(value) {
    let newValue = value;
    const suffixes = ["", "k", "M", "B", "T"];

    // Check if the number is greater than or equal to 1000
    if (value >= 1000) {
        // Determine the appropriate suffix to use
        const suffixNum = Math.floor((("" + value).length - 1) / 3);
        // Abbreviate the number by dividing it by the corresponding factor
        newValue = parseFloat((value / Math.pow(1000, suffixNum)).toFixed(1)) + suffixes[suffixNum];
    }
    // Return the abbreviated value
    return newValue;
}

const loadPostsbySubreddit = async (subredditData) => {
    console.log("Loading Posts by Subreddit");
    const resp = await axios.post('http://localhost:3000/automate/reddit/v2/getAnalyticsPosts', { subreddits: subredditData }, { withCredentials: true });
    console.log(resp.data);
    return resp.data;
};

const Heatmap = ({ data }) => {
    if (!data || data.length === 0) {
        // If data is empty or not available, render a placeholder or loading message
        return (
            <div>Loading...</div>
        );
    }
    const heatmapData = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const hourLabels = Array.from({ length: 24 }, (_, i) => `${i}h`);
    let dataMap = data.response;
    console.log("HEAT MAPPPPP");

    for (const day in dataMap) {
        for (const hour in dataMap[day]) {
            const utcMoment = moment.utc().day(day).hour(hour);
            const karachiMoment = utcMoment.tz('Asia/Karachi');
            const hourKarachi = karachiMoment.hour();
            heatmapData[day][hourKarachi] = dataMap[day][hour];
        }
    }

    return (
        <HeatmapGrid
            data={heatmapData}
            xLabels={hourLabels}
            yLabels={weekdayLabels}
            squares
            cellStyle={(background, value, min, max, data, x, y) => ({
                background: `rgb(0, 151, 230, ${1 - (max - value) / (max - min)})`,
                fontSize: "11px",
                color: "#444",
                border: "solid 1px #ccc",
            })}
            onClick={(x, y) => console.log(`Clicked on (${x}, ${y})`)}
        />
    );
}

const StackedBarChart = ({ data }) => {
    if (!data || data.length === 0) {
        // If data is empty or not available, render a placeholder or loading message
        return (
            <div>Loading...</div>
        );
    }

    return (
        <ResponsiveContainer width={500} height={300}>
            <BarChart data={data.response}>
                <XAxis dataKey="subreddit" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="numPosts" stackId="stack" fill="#8884d8" />
                <Bar dataKey="numComments" stackId="stack" fill="#82ca9d" />
                <Bar dataKey="numUpvotes" stackId="stack" fill="#ffc658" />
            </BarChart>
        </ResponsiveContainer>
    );
};

const StackedBarChart2 = ({ data }) => {
    if (!data || data.length === 0) {
        // If data is empty or not available, render a placeholder or loading message
        return (
            <div>Loading...</div>
        );
    }

    return (
        <ResponsiveContainer width={500} height={300}>
            <BarChart data={data.response}>
                <XAxis dataKey="subreddit" />
                <YAxis s tickFormatter={abbreviateNumber} />
                <Tooltip />
                <Legend />
                <Brush dataKey="subreddit" height={30} stroke="#8884d8" />
                <Bar dataKey="numMembers" stackId="stack" fill="#8884d8" />
                <Bar dataKey="numOnlineMembers" stackId="stack" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
};

const SubredditPostsChart = ({ data }) => {
    if (!data || data.length === 0) {
        // If data is empty or not available, render a placeholder or loading message
        return (
            <div>Loading...</div>
        );
    }

    return (
        <ResponsiveContainer width={400} height={200}>
            <BarChart data={data.response}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend className='text-red' />
                <Bar dataKey="totalPosts" fill='#FF4500' />
            </BarChart>
        </ResponsiveContainer>
    );
};

const getSubredditData = async (profile, subreddits) => {
    const resp = await axios.post('http://localhost:3000/automate/reddit/v2/getAnalyticsReddits', { subreddits: subreddits, profile: profile }, { withCredentials: true });
    console.log(resp.data);
    return resp.data;
};

const getAvgData = async (profile, subreddits) => {
    const resp = await axios.post('http://localhost:3000/automate/reddit/v2/getAnalyticsAvg', { subreddits: subreddits, profile: profile }, { withCredentials: true });
    console.log(resp.data);
    return resp.data;
};

const getSubredditInfo = async (profile, subreddits) => {
    const resp = await axios.post('http://localhost:3000/automate/reddit/v2/getAnalyticsSubreddits', { subreddits: subreddits }, { withCredentials: true });
    console.log(resp.data);
    return resp.data;
};

const getHeatMapData = async (profile, subreddits) => {
    const resp = await axios.post('http://localhost:3000/automate/reddit/v2/getHeatmap', { subreddits: subreddits, profile: profile }, { withCredentials: true });
    console.log(resp.data);
    return resp.data;
};

const styles = StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      padding: '20mm',
    },
    header: {
      marginBottom: '20mm',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      textTransform: 'uppercase',
      marginBottom: '10mm',
    },
    section: {
      marginBottom: '10mm',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: '5mm',
      textTransform: 'uppercase',
    },
    sectionText: {
      fontSize: 14,
      marginBottom: '3mm',
    },
    card: {
      border: '1px solid #ccc',
      borderRadius: '4px',
      padding: '5mm',
      marginBottom: '5mm',
    },
    chartContainer: {
      height: 200,
      marginBottom: '5mm',
    },
  });

const AnalyticsPDF = ({ data, posts, avgData, subredditInfo, subreddit }) => {
    
    return (
        <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Analytics Report</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subreddits Joined</Text>
          <Text style={styles.sectionText}>{data.subreddits.length}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subreddit Posts</Text>
          <View style={styles.card}>
            {posts.response.map((post) => (
              <Text style={styles.sectionText}>
                {post._id}: {post.totalPosts}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subreddit Data</Text>
          <View style={styles.card}>
            {subredditInfo.response.map((subreddit) => (
              <Text style={styles.sectionText}>
                {subreddit.subreddit}: {subreddit.numMembers}
                {' members | '}
                {subreddit.numOnlineMembers}
                {' online members'}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Average Upvotes/Post</Text>
          <Text style={styles.sectionText}>
            {avgData.response.averageUpvotesPerPost}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Average Comments/Post</Text>
          <Text style={styles.sectionText}>
            {avgData.response.averageCommentsPerPost}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Test</Text>
          <View style={styles.card}>
            {subreddit.response.map((subreddit) => (
              <Text style={styles.sectionText}>
                {subreddit.subreddit}: posts: {subreddit.numPosts} | comments:{' '}
                {subreddit.numComments} | upvotes: {subreddit.numUpvotes}
              </Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
    );
};

export function AnalyticsPage(props) {
    const { data: subreddits, isLoading, isError, isSuccess } = useQuery("subreddits", loadDashboard, { fetchPolicy: "network-only" });
    const [subredditPosts, setSubredditPosts] = useState([]);
    const [subredditData, setSubredditData] = useState([]);
    const [avgData, setAvgData] = useState([]);
    const [subredditInfo, setSubredditInfo] = useState([]);
    const [heatMapData, setHeatMapData] = useState([]);
    const [ subredditPostsLoaded, setSubredditPostsLoaded ] = useState(false);
    const [ subredditDataLoaded, setSubredditDataLoaded ] = useState(false);
    const [ avgDataLoaded, setAvgDataLoaded ] = useState(false);
    const [ subredditInfoLoaded, setSubredditInfoLoaded ] = useState(false);

    useEffect(() => {
        console.log("isSuccess: ", isSuccess);
        console.log("subreddits: ", subreddits);

        if (isSuccess && subreddits) {
            console.log(subreddits.subreddits);
            let loads = 0
            loadPostsbySubreddit(subreddits.subreddits)
                .then(data => {
                    setSubredditPosts(data);
                    setSubredditPostsLoaded(true);
                })
                .catch(error => {
                    console.log(error);
                    setSubredditPostsLoaded(false);
                });

            getSubredditData(subreddits.profile, subreddits.subreddits).then(data => {
                setSubredditData(data);
                setSubredditDataLoaded(true)
                console.log("DATATAT: ", data);
            }).catch(error => {
                console.log(error);
                setSubredditDataLoaded(false);
            });

            getAvgData(subreddits.profile, subreddits.subreddits).then(data => {
                setAvgData(data);
                setAvgDataLoaded(true)
                console.log("AVG DATA: ", data);
            }).catch(error => {
                console.log(error);
                setAvgDataLoaded(false);
            });

            getSubredditInfo(subreddits.profile, subreddits.subreddits).then(data => {
                setSubredditInfo(data);
                setSubredditInfoLoaded(true)
                console.log("SUBREDDIT INFO: ", data);
            }).catch(error => {
                console.log(error);
                setSubredditInfoLoaded(false);
            });

            getHeatMapData(subreddits.profile, subreddits.subreddits).then(data => {
                setHeatMapData(data);
                console.log("HEATMAP DATA: ", data);
            }).catch(error => {
                console.log(error);
            });
        }
    }, [isSuccess, subreddits, subreddits?.subreddits]);


    return (
        <div className='flex flex-col'>
            <div className='m-4'>
                <h1 className='text-3xl font-railway'>Analytics</h1>
            </div>

            <div className='flex w-full border-2 h-[1500px] pb-5 pt-5 justify-center items-center'>
                <div className='bg-white rounded-md border-dotted border-2 w-96 md:w-[900px] h-full shadow-2xl'>
                    {
                        isLoading ? (
                            <div className='flex justify-center items-center h-full'>
                                <h1 className='text-2xl font-railway'>Loading...</h1>
                            </div>
                        ) : (
                            isError ? (
                                <div className='flex justify-center items-center h-full'>
                                    <h1 className='text-2xl font-railway'>Error while fetching data</h1>
                                </div>
                            ) : (
                                isSuccess ? (
                                    <div className='flex flex-col justify-center items-center h-full'>
                                        <div className='flex gap-3 p-4 h-full w-full flex-wrap'>
                                            <div className="card-box">
                                                <div className="mb-2">
                                                    {
                                                        subredditPostsLoaded && subredditDataLoaded && avgDataLoaded && subredditInfoLoaded ? (
                                                            <PDFDownloadLink document={<AnalyticsPDF data={subreddits} posts={subredditPosts} subreddit={subredditData} avgData={avgData} subredditInfo={subredditInfo} />} fileName="analytics_report.pdf">
                                                                <button className="btn btn-primary">Download PDF</button>
                                                            </PDFDownloadLink>
                                                        ) : (
                                                            <button className="btn btn-primary" disabled>Download PDF</button>
                                                        )
                                                    }
                                                    {/* <PDFDownloadLink document={<AnalyticsPDF data={subreddits} posts={subredditPosts} heatMapData={heatMapData} />} fileName="analytics_report.pdf">
                                                        <button className="btn btn-primary">Download PDF</button>
                                                    </PDFDownloadLink> */}
                                                </div>
                                            </div>
                                            <div className="bg-white rounded-lg shadow-lg p-4 flex items-start w-44 border-[1px] h-36">
                                                <RedditOutlined className="text-red-500 text-3xl mr-2" />
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-800">Subreddits Joined</h3>
                                                    <p className="text-4xl font-bold text-blue-500">{subreddits.subreddits.length}</p>
                                                </div>
                                            </div>
                                            <div className="bg-white rounded-lg shadow-lg p-4 flex items-start w-fit border-[1px] h-fit">
                                                <SubredditPostsChart data={subredditPosts} />
                                            </div>
                                            <div className="bg-white rounded-lg shadow-lg p-4 flex items-start w-fit border-[1px] h-fit">
                                                <StackedBarChart data={subredditData} />
                                            </div>
                                            <div className="bg-white rounded-lg shadow-lg p-4 flex items-start w-fit border-[1px] h-fit">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-800">Average No.Upvotes/post</h3>
                                                    <p className="text-4xl font-bold text-blue-500">{avgData.response?.averageUpvotesPerPost}</p>
                                                </div>
                                            </div>
                                            <div className="bg-white rounded-lg shadow-lg p-4 flex items-start w-fit border-[1px] h-fit">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-800">Average No.Comments/post</h3>
                                                    <p className="text-4xl font-bold text-blue-500">{avgData.response?.averageCommentsPerPost}</p>
                                                </div>
                                            </div>

                                            <div className="bg-white rounded-lg shadow-lg p-4 flex items-start w-fit border-[1px] h-fit">
                                                <StackedBarChart2 data={subredditInfo} />
                                            </div>
                                            <div className="bg-white rounded-lg shadow-lg p-4 flex items-start w-full border-[1px] h-fit">
                                                <Heatmap data={heatMapData} />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='flex justify-center items-center h-full'>
                                        <h1 className='text-2xl font-railway'>Error while fetching data</h1>
                                    </div>
                                )
                            ))
                    }
                </div>
            </div>
        </div>
    )
}