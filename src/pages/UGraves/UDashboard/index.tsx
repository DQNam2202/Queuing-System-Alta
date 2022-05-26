import React from 'react';
import './style.scss';
import {
  CalendarOutlined,
  CaretDownOutlined,
  CarryOutOutlined,
} from '@ant-design/icons';
import { Line } from 'react-chartjs-2';
import { Select } from 'antd';
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
      <div className='pt-5 dashboard__under w-2/3'>
        <h2 className='mb-6 text-primary font-bold text-lg'>Dashboard</h2>
        <div className="filter-control flex items-center gap-x-3 px-3 mb-3">
        <div className='selectBox flex items-center gap-x-2'>
                <span className='font-bold text-sm'>Theo tuần</span>
                <Select
                  defaultValue={'Chọn tuần'}
                  className='text-gray-500  w-[150px]'
                  suffixIcon={<CaretDownOutlined className='text-primary' />}
                >
                  <Option value='week1'>1</Option>
                  <Option value='week2'>2</Option>
                  <Option value='week3'>3</Option>
                  <Option value='week4'>4</Option>
                </Select>
              </div>
              <div className='selectBox flex items-center gap-x-2'>
                <span className='font-bold text-sm'>Theo tháng</span>
                <Select
                  defaultValue={'Chọn tháng'}
                  className='text-gray-500 w-[150px]'
                  suffixIcon={<CaretDownOutlined className='text-primary' />}
                >
                  {Array.from({length: 12}, (_, i) => i + 1).map((item:Number,index:Number)=>{
                    return <Option value={item} key={index.toString()}>{item.toString()}</Option>
                  })}
                </Select>
              </div>
        </div>
        <div className='content w-full'>
          <div className='list flex items-center justify-between w-full gap-x-1 gap-y-1 xl:flex-wrap xl:justify-center xl:gap-y-2'>
            <div className='relative min-h-[170px] item flex flex-col items-start gap-y-1 px-3 py-2 rounded-xl w-1/6 xl:w-[48%] md:w-full'>
              <div className='h-3/4 flex items-center justify-between flex-col w-full px-12 py-5 pb-0'>
              <div className='iconBox h-10 w-10 flex items-center justify-center bg-[#6695FB] rounded-full bg-opacity-10'>
                  <CalendarOutlined className='text-[#6695FB] text-xl' />
                </div>
                <span className='my-3 font-semibold text-2xl text-gray-600'>2961</span>{' '}
              </div>
              <div className='py-1 h-1/4 absolute bottom-0 left-0 text-white text-center text-sm limit-2 font-bold w-full bg-[#6695FB] rounded-bl-md rounded-br-md'>
                <div className="h-full w-full flex justify-center items-center">
                  Số thứ tự đã cấp
                </div>
              </div>
            </div>
            <div className='relative min-h-[170px] item flex flex-col items-start gap-y-1 px-3 py-2 rounded-xl w-1/6 xl:w-[48%] md:w-full'>
              <div className='h-3/4 flex items-center justify-between flex-col w-full px-12 py-5 pb-0'>
              <div className='iconBox h-10 w-10 flex items-center justify-center bg-[#35C75A] rounded-full bg-opacity-10'>
                  <CarryOutOutlined className='text-[#35C75A] text-xl' />
                </div>
                <span className='my-3 font-semibold text-2xl text-gray-600'>3721</span>{' '}
              </div>
              <div className='py-1 h-1/4 absolute bottom-0 left-0 text-white text-center text-sm limit-2 font-bold w-full bg-[#35C75A] rounded-bl-md rounded-br-md'>
                <div className="h-full w-full flex justify-center items-center">
                Số thứ tự đã sử dụng
                </div>
              </div>
            </div>
            <div className='relative min-h-[170px] item flex flex-col items-start gap-y-1 px-3 py-2 rounded-xl w-1/6 xl:w-[48%] md:w-full'>
              <div className='h-3/4 flex items-center justify-between flex-col w-full px-12 py-5 pb-0'>
              <div className='iconBox h-10 w-10 flex items-center justify-center bg-red-500 rounded-full bg-opacity-10'>
                <img src='./images/svgs/icon-book-mark.svg' alt='svg' />
                </div>
                <span className='my-3 font-semibold text-2xl text-gray-600'>3221</span>{' '}
              </div>
              <div className='bg-red-500 py-1 h-1/4 absolute bottom-0 left-0 text-white text-center text-sm limit-2 font-bold w-full rounded-bl-md rounded-br-md'>
                <div className="h-full w-full flex justify-center items-center">
                Số thứ tự đã bỏ qua
                </div>
              </div>
            </div>
            <div className='relative min-h-[170px] item flex flex-col items-start gap-y-1 px-3 py-2 rounded-xl w-1/6 xl:w-[48%] md:w-full'>
              <div className='h-3/4 flex items-center justify-between flex-col w-full px-12 py-5 pb-0'>
              <div className='iconBox h-10 w-10 flex items-center justify-center bg-primary rounded-full bg-opacity-10'>
                 <img src='./images/svgs/icon-user-phone.svg' alt='svg' />
                </div>
                <span className='my-3 font-semibold text-2xl text-gray-600'>6</span>{' '}
              </div>
              <div className='bg-[#FFAC6A] py-1 h-1/4 absolute bottom-0 left-0 text-white text-center text-sm limit-2 font-bold w-full rounded-bl-md rounded-br-md'>
                <div className="h-full w-full flex justify-center items-center">
                Số thứ tự đang chờ
                </div>
              </div>
            </div>
            <div className='relative min-h-[170px] item flex flex-col items-start gap-y-1 px-3 py-2 rounded-xl w-1/6 xl:w-[48%] md:w-full'>
              <div className='h-3/4 flex items-center justify-between flex-col w-full px-12 py-5 pb-0'>
              <div className='iconBox h-10 w-10 flex items-center justify-center bg-[#F983BF] rounded-full bg-opacity-10'>
                 <img src='./images/svgs/icon-computer.svg' alt='svg' />
                </div>
                <span className='my-3 font-semibold text-2xl text-gray-600'>438</span>{' '}
              </div>
              <div className='bg-[#F983BF] py-1 h-1/4 absolute bottom-0 left-0 text-white text-center text-sm limit-2 font-bold w-full rounded-bl-md rounded-br-md'>
                <div className="h-full w-full flex justify-center items-center">
                Thiết bị đang hoạt động
                </div>
              </div>
            </div>
          </div>
          <div className='chart w-full mt-5 h-full p-[15px]'>
            <h3 className='font-bold text-lg'>Bảng thống kê tháng 11/2021</h3>
            {/* Chart  */}
            <Line data={data() as any} options={options as any} />
          </div>
        </div>
      </div>
      <UnderRightContent />
    </div>
  );
}

export default Dashboard;
