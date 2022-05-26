import React from 'react';
import './style.scss';
import {
  CalendarOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
  CarryOutOutlined,
} from '@ant-design/icons';
import { Line } from 'react-chartjs-2';
import { DatePicker, Select } from 'antd';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Filler,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import UnderRightContent from '../UnderRightContent';
ChartJS.register(
  ArcElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
);
const data = function () {
  var canvas = document.createElement('canvas');
  var chart = canvas.getContext('2d');
  if (chart !== null) {
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'daCap',
          data: [2700, 4200, 3500, 4000, 4700, 3700],
          fill: true,
          backgroundColor: 'transparent',
          borderColor: '#5185F7',
          pointStyle: 'circle',
          pointRadius: 6,
          pointBorderWidth: 3,
          pointBorderColor: '#fff',
          pointBackgroundColor: '#5185F7',
        },
        {
          label: 'suDung',
          data: [2000, 2100, 3000, 2000, 1900, 1000],
          fill: true,
          backgroundColor: 'transparent',
          borderColor: '#35C75A',
          pointStyle: 'circle',
          pointRadius: 6,
          pointBorderWidth: 3,
          pointBorderColor: '#fff',
          pointBackgroundColor: '#35C75A',
        },
        {
          label: 'boQua',
          data: [0, 1000, 700, 2100, 2400, 2300],
          fill: true,
          borderColor: '#F86D6D',
          backgroundColor: 'transparent',
          pointStyle: 'circle',
          pointRadius: 6,
          pointBorderWidth: 3,
          pointBorderColor: '#fff',
          pointBackgroundColor: '#F86D6D',
        },
      ],
    };
  }
};
const options = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      yAlign: 'bottom',
      padding: {
        left: 30,
        right: 30,
        top: 5,
        bottom: 5,
      },
      backgroundColor: function (tooltipItem: any) {
        if(tooltipItem && tooltipItem.tooltipItems[0]){
          return tooltipItem.tooltipItems[0].dataset.borderColor ;
        }
        return '#5185F7'
      },
      displayColors: false,
      callbacks: {
        title: function (tooltipItem: any) {
          return;
        },
        label: function (tooltipItem: any) {
          return tooltipItem.dataset.data[tooltipItem['dataIndex']];
        },
      },
    },
  },
  legend: {
    display: false,
  },
  elements: {
    line: {
      tension: 0.5,
    },
  },
  scale: {
    yAxes: [
      {
        type: 'linear',
        position: 'bottom',
        ticks: {
          max: 100,
          min: 0,
          stepSize: 1,
        },
      },
    ],
  },
};
const { Option } = Select;

function Dashboard() {
  return (
    <div className='flex w-full'>
      <div className='pt-5 dashboard__under w-full'>
        <h2 className='mb-6 text-primary font-bold text-lg'>Dashboard</h2>
        <div className="filter-control flex justify-end items-center gap-x-3 px-3 mb-3 w-[90%]">
        <div className='date-controls'>
              <DatePicker
                className='rounded-lg w-[150px] h-11 text-primary-gray-400'
                format={'DD/MM/YYYY'}
              />
              <CaretRightOutlined className='' />
              <DatePicker
                className='rounded-lg w-[150px] h-11 text-primary-gray-400'
                format={'DD/MM/YYYY'}
              />
            </div>
            </div>
        <div className='content w-full'>
          <div className='list flex items-center justify-start w-full  gap-x-12 gap-y-12 xl:flex-wrap xl:justify-center xl:gap-y-2 flex-wrap'>
          <div className='relative h-[170px] item flex flex-col items-start gap-y-1 px-3 py-2 rounded-xl w-1/4 xl:w-[48%] md:w-full'>
              <div className='h-3/4 w-full flex justify-center items-center font-bold text-4xl text-[#F983BF]'>1237</div>{' '}
              <div className='bg-[#F983BF] py-1 h-1/4 absolute bottom-0 left-0 text-white text-center text-sm limit-2 font-bold w-full rounded-bl-md rounded-br-md'>
                <div className="h-full w-full flex justify-center items-center">
                <div className='iconBox h-8 w-8 bg-[#F983BF] rounded-full bg-opacity-10'>
                  <CalendarOutlined className='text-[#fff] text-lg' />
                </div>
                  <span className="">Số thứ tự đang được cấp</span>
                </div>
              </div>
            </div>
            <div className='relative h-[170px] item flex flex-col items-start gap-y-1 px-3 py-2 rounded-xl w-1/4 xl:w-[48%] md:w-full'>
              <div className='h-3/4 w-full flex items-center justify-center  font-bold text-4xl text-[#9CCC65]'>
               420
              </div>
              <div className='py-1 h-1/4 absolute bottom-0 left-0 text-white text-center text-sm limit-2 font-bold w-full bg-[#9CCC65] rounded-bl-md rounded-br-md'>
                <div className="h-full w-full flex justify-center items-center">
                <div className='iconBox h-8 w-8 bg-[#9CCC65] rounded-full bg-opacity-10'>
                  <CarryOutOutlined className='text-[#fff] text-xl' />
                </div>
                <span>Số thứ tự đã hoàn thành</span>
                </div>
              </div>
            </div>
            <div className='relative h-[170px] item flex flex-col items-start gap-y-1 px-3 py-2 rounded-xl w-1/4 xl:w-[48%] md:w-full'>
              <div className='h-3/4 flex items-center justify-center flex-col  font-bold w-full text-red-500 text-4xl'>
                6
              </div>
              <div className='bg-red-500 py-1 h-1/4 absolute bottom-0 left-0 text-white text-center text-sm limit-2 font-bold w-full rounded-bl-md rounded-br-md'>
                <div className="h-full w-full flex justify-center items-center">
                <div className='iconBox h-8 w-8 flex items-center justify-center bg-red-500 rounded-full'>
                <img src='../../images/svg-icon/i-user-phone.svg' alt='svg' />
                </div>
                <span>Dịch vụ đang cung cấp</span>
                </div>
              </div>
            </div>
            <div className='relative h-[170px] item flex flex-col items-start gap-y-1 px-3 py-2 rounded-xl w-1/4 xl:w-[48%] md:w-full'>
              <div className='h-3/4 flex items-center justify-center flex-col w-full font-bold text-4xl text-[#6695FB]'>
                2961
              </div>
              <div className='py-1 h-1/4 absolute bottom-0 left-0 text-white text-center text-sm limit-2 font-bold w-full bg-[#6695FB] rounded-bl-md rounded-br-md'>
                <div className="h-full w-full flex justify-center items-center">
                <div className='iconBox h-8 w-8 flex items-center justify-center '>
                <img src='../../images/svg-icon/i-computer.svg' alt='svg' />
                </div>
                  Thiết bị đang hoạt động
                </div>
              </div>
            </div>
            <div className='relative h-[170px] item flex flex-col items-start gap-y-1 px-3 py-2 rounded-xl w-1/4 xl:w-[48%] md:w-full'>
              <div className='h-3/4 flex items-center justify-center flex-col w-full font-bold text-4xl text-primary '>
                456
              </div>
              <div className='bg-[#FFAC6A] py-1 h-1/4 absolute bottom-0 left-0 text-white text-center text-sm limit-2 font-bold w-full rounded-bl-md rounded-br-md'>
                <div className="h-full w-full flex justify-center items-center">
                <div className='iconBox h-10 w-10 flex items-center justify-center bg-primary rounded-full bg-opacity-10'>
                 <img src='../images/svg-icon/i-book-mark.svg' alt='svg' />
                </div>
                <span>Đánh giá từ khách hàng</span>
                </div>
              </div>
            </div>
            <div className='relative h-[170px] item flex flex-col items-start gap-y-1 px-3 py-2 rounded-xl w-1/4 xl:w-[48%] md:w-full'>
              <div className='h-3/4 flex items-center justify-center flex-col w-full font-bold text-4xl text-[#A5A6F6] '>
                1213
              </div>
              <div className='bg-[#A5A6F6] py-1 h-1/4 absolute bottom-0 left-0 text-white text-center text-sm limit-2 font-bold w-full rounded-bl-md rounded-br-md'>
                <div className="h-full w-full flex justify-center items-center">
                <div className='iconBox h-10 w-10 flex items-center justify-center'>
                 <img src='../images/svg-icon/i-rating.svg' alt='svg' />
                </div>
                <span>Phản hồi từ khách hàng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
