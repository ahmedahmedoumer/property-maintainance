import Card from '../components/UI/Card';
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { getAllAdvertisments } from '../APIs/advertismentAPIs';
import Header from '../components/Layout/Header';
import RightSidebar from '../components/Layout/RightSidebar';
import { Activity, Bullseye, Download, Eye } from 'react-bootstrap-icons';
import Graph from '../components/UI/Graph';

const MainDashboardPage = () => {
  const [advertisments, setAdvertisments] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = useCallback(async () => {
      const advertisments = await getAllAdvertisments({ setError, setIsLoading });
      setAdvertisments(advertisments);
    }, [])
    useEffect(() => {
      fetchData();
    }, [fetchData]);
  return (
    <div className='flex justify-between'>
      <div className='flex flex-col w-full py-3 px-10'>
        <Header dashboardLayout={true}/>
        <div className="flex flex-col mt-5">
          <h2 className='font-semibold text-xl'>Welcome Back, Baby!</h2>
          <p className='my-5 text-gray-500'>Manager</p>
          <div className='cards grid grid-cols-11 gap-2'>
            <Card className='col-start-1 col-span-5 bg-blue-500'>
              <div className='h-full flex flex-col justify-between z-10 relative'>
                <div className='w-full flex justify-between'>
                  <span className='bg-black/30 flex items-center w-fit rounded-md p-2'><Bullseye className='mr-2'/> Number of active users</span>
                  <button className='bg-black/30 hover:bg-black/50 flex rounded-md p-2 items-center'><Eye className='mr-2'/>View all</button>
                </div>
                <div>
                  <h1 className='text-6xl font-bold'>56</h1>
                  <span>Some text here</span>
                </div>
              </div>
            </Card>
            <Card className='col-start-6 col-span-3 bg-rose-500'>
              <div className='h-full flex flex-col justify-between z-10 relative'>
                <span className='bg-black/30 flex items-center w-fit rounded-md p-2'><Bullseye className='mr-2'/> Number of active service providers</span>
                <div>
                  <h1 className='text-6xl font-bold'>124</h1>
                  <span>Some text here</span>
                </div>
              </div>
            </Card>
            <Card className='col-start-9 col-span-3 bg-purple-500'>
              <div className='h-full flex flex-col justify-between z-10 relative'>
                <span className='bg-black/30 flex items-center w-fit rounded-md p-2'><Bullseye className='mr-2'/> Completed transactions</span>
                <div>
                  <h1 className='text-6xl font-bold'>24</h1>
                  <span>Some text here</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className='rounded-lg border mt-24 w-full p-5'>
          <div className='flex justify-between items-center w-full mb-16'>
            <h1 className='font-bold text-xl'>Profit Report</h1>
            <div className='space-x-2 flex'>
              <button className='border rounded-md px-3 py-3 flex hover:bg-gray-100'>12 Months</button>
              <button className='rounded-md px-3 py-3 flex hover:bg-gray-100'>6 Months</button>
              <button className='rounded-md px-3 py-3 flex hover:bg-gray-100'>30 Days</button>
              <button className='rounded-md px-3 py-3 flex hover:bg-gray-100'>7 Days</button>
            </div>
            <button className='border rounded-md px-3 py-3 flex items-center hover:bg-gray-100'><Download className='mr-2'/> Export PDF</button>
          </div>
          {/* THE GRAPH HERE */}
          <Graph/>
        </div>
      </div>
      <RightSidebar posts={advertisments} error={error} isLoading={isLoading}/>
    </div>
  )
}

export default MainDashboardPage;