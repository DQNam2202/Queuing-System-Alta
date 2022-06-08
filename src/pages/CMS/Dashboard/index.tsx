import React, { useEffect } from 'react';
import './style.scss';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
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
import AdminRightContent from '../AdminRightContent';
// type
import IService from '../../../db/types/service.type';
import IDevice from '../../../db/types/device.type';
import IProgression from '../../../db/types/progression.type';
// service
import ServiceServices from '../../../db/services/service.services';
import DeviceServices from '../../../db/services/device.services';
import ProgressionServices from '../../../db/services/progression.services';
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
    let gradient = chart.createLinearGradient(0, 0, 0, 450);

    gradient.addColorStop(0, 'rgba(206, 221, 255,1)');
    gradient.addColorStop(0.5, 'rgba(206, 221, 255,0.7)');
    gradient.addColorStop(1, 'rgba(206, 221, 255,0.3)');
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Chanllenge',
          data: [33, 100, 85, 100, 70, 100],
          fill: true,
          backgroundColor: gradient,
          borderColor: '#5185F7',
          pointStyle: 'circle',
          pointRadius: 6,
          pointBorderWidth: 3,
          pointBorderColor: '#fff',
          pointBackgroundColor: '#5185F7',
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
      backgroundColor: '#5185F7',
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
  const [services, setServices] = React.useState<IService[]>([]);
  const [devices, setDevices] = React.useState<IDevice[]>([]);
  const [progression, setProgression] = React.useState<IProgression[]>([]);
  const [countItem, setCountItem] = React.useState<any>({});
  const [dateSelected, setDateSelected] = React.useState<any>(new Date());
  const [filter, setFilter] = React.useState<any>('day');
  useEffect(() => {
    (async () => {
      const dataService = await ServiceServices.getService();
      const dataDevice = await DeviceServices.getDevice();
      const dataProgression = await ProgressionServices.getProgression();
      setServices(dataService);
      setDevices(dataDevice);
      setProgression(dataProgression);
      let count = dataProgression.reduce(
        (acc: any, cur: any) => {
          let item = { ...acc };
          item.daCap++;
          if (cur.trangThai === 'pending') {
            item.trangThai++;
          }
          if (cur.trangThai === 'used') {
            item.dangSuDung++;
          }
          if (cur.trangThai === 'removed') {
            item.huyBo++;
          }
          return item;
        },
        {
          daCap: 0,
          daSuDung: 0,
          dangCho: 0,
          huyBo: 0,
        },
      );
      setCountItem(count);
    })();
  }, [services, devices, progression]);
  const handleChangeDate = (date: any) => {
    setDateSelected(date);
  };

  const handleFilterChange = (value: any) => {
    setFilter(value);
  };
  const renderDataSetMoney = () => {
    var canvas = document.createElement('canvas');
    var chart = canvas.getContext('2d');
    let gradient = chart?.createLinearGradient(0, 0, 0, 450);

    gradient?.addColorStop(0, 'rgba(206, 221, 255,1)');
    gradient?.addColorStop(0.5, 'rgba(206, 221, 255,0.7)');
    gradient?.addColorStop(1, 'rgba(206, 221, 255,0.3)');
    // Variable
    let date = dateSelected;
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    const days = new Date(year, month, 0).getDate();
    let listDays = Array.from({ length: days }, (_, i) => i + 1);
    let listMonths = Array.from({ length: 12 }, (_, i) => i + 1);
    //Cacluator money earn incoming
    let labels: any[] = [];
    let data = [33, 53, 85, 41, 44, 65];
    switch (filter) {
      case 'day':
        // Caclulator day by day
        var temp = listDays.reduce((curr: number[], next) => {
          let ProgressOfDay = progression.filter(progress => {
            let temp = progress.thoiGianCap as any;
            return (
              new Date(temp.toDate()).getDate() === next &&
              new Date(temp.toDate()).getMonth() + 1 === month &&
              new Date(temp.toDate()).getFullYear() === year
            );
          });
          curr.push(ProgressOfDay.length);
          return [...curr];
        }, []);
        labels = [...listDays];
        data = [...temp];
        console.log(temp);
        break;
      case 'week':
        //day of week start of month
        let weekArray = [];
        for (let i = 0; i < 4; i++) {
          let obj = {
            startDay: new Date(year, month - 1, 7 * i + 1),
            endDay: new Date(year, month - 1, 7 * i + 7),
          };
          weekArray.push(obj);
        }
        // Caclulator week
        var temp = weekArray.reduce((curr: number[], next) => {
          let numberOfDay = progression.filter(progress => {
            let temp = progress.thoiGianCap as any;
            if (
              next.startDay <= new Date(temp.toDate()) &&
              next.endDay >= new Date(temp.toDate())
            ) {
              return true;
            }
            return false;
          });
          curr.push(numberOfDay.length);
          return [...curr];
        }, []);
        labels = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'];
        data = [...temp];
        break;
      case 'month':
        //day of week start of month
        // Caclulator week
        var temp = listMonths.reduce((curr: number[], next) => {
          let numberOfDay = progression.filter(progress => {
            let temp = progress.thoiGianCap as any;
            if (
              next === new Date(temp.toDate()).getMonth() + 1 &&
              year === new Date(temp.toDate()).getFullYear()
            ) {
              return true;
            }
            return false;
          });
          curr.push(numberOfDay.length);
          return [...curr];
        }, []);
        labels = [...listMonths];
        data = [...temp];
        break;
      default:
        break;
    }

    return {
      labels: labels,
      datasets: [
        {
          label: 'Số đã cấp (lượt)',
          data: data,
          fill: true,
          backgroundColor: gradient,
          borderColor: '#5185F7',
          pointStyle: 'circle',
          pointRadius: 6,
          pointBorderWidth: 3,
          pointBorderColor: '#fff',
          pointBackgroundColor: '#5185F7',
        },
      ],
    };
  };
  return (
    <div className='flex w-full'>
      <div className='pt-5 dashboard__main w-2/3'>
        <h2 className='mb-6 text-primary font-semibold text-lg'>Dashboard</h2>
        <h2 className='mb-6 text-primary font-bold text-xl'>Biểu đồ cấp số</h2>
        <div className='content w-full'>
          <div className='list flex items-center justify-between w-full gap-x-1 gap-y-1 xl:flex-wrap xl:justify-center xl:gap-y-2'>
            <div className='item flex flex-col items-start gap-y-1 px-3 py-2 rounded-xl w-1/4 xl:w-[48%] md:w-full'>
              <div className='header flex items-center gap-x-3 '>
                <div className='iconBox h-10 w-10 flex items-center justify-center bg-[#6695FB] rounded-full bg-opacity-10'>
                  <CalendarOutlined className='text-[#6695FB] text-xl' />
                </div>
                <div className='limit-2 font-bold text-xs w-[90px]'>
                  Số thứ tự đã cấp
                </div>
              </div>
              <div className='flex items-center justify-between w-full'>
                <span className='font-bold text-3xl text-gray-600'>
                  {countItem?.daCap}
                </span>{' '}
                <span className='flex items-center text-[10px] bg-primary bg-opacity-10  rounded-xl text-bold text-primary px-1 py-1'>
                  <ArrowUpOutlined /> 32,41%
                </span>
              </div>
            </div>
            <div className='item flex flex-col items-start gap-y-1 px-3 py-2  rounded-xl w-1/4 xl:w-[48%] md:w-full'>
              <div className='header flex items-center gap-x-3'>
                <div className='iconBox h-10 w-10 flex items-center justify-center bg-[#35C75A] rounded-full bg-opacity-10'>
                  <CarryOutOutlined className='text-[#35C75A] text-xl' />
                </div>
                <div className='limit-2 font-bold text-xs w-[90px]'>
                  Số thứ tự đã sử dụng
                </div>
              </div>
              <div className='flex items-center justify-between w-full'>
                <span className='font-bold text-3xl text-gray-600'>
                  {countItem?.daSuDung}
                </span>{' '}
                <span className='flex items-center text-[10px] bg-red-500 bg-opacity-10  rounded-xl text-bold text-red-500 px-1 py-1'>
                  <ArrowDownOutlined /> 32,41%
                </span>
              </div>
            </div>
            <div className='item flex flex-col items-start gap-y-1 px-3 py-2  rounded-xl w-1/4 xl:w-[48%] md:w-full'>
              <div className='header flex items-center gap-x-3'>
                <div className='iconBox h-10 w-10 flex items-center justify-center bg-primary rounded-full bg-opacity-10'>
                  <img src='./images/svgs/icon-user-phone.svg' alt='svg' />
                </div>
                <div className='limit-2 font-bold text-xs w-[90px]'>
                  Số thứ tự đang chờ
                </div>
              </div>
              <div className='flex items-center justify-between w-full'>
                <span className='font-bold text-3xl text-gray-600'>
                  {countItem?.dangCho}
                </span>{' '}
                <span className='flex items-center text-[10px] bg-red-500 bg-opacity-10  rounded-xl text-bold text-red-500 px-1 py-1'>
                  <ArrowDownOutlined /> 32,41%
                </span>
              </div>
            </div>
            <div className='item flex flex-col items-start gap-y-1 px-3 py-2  rounded-xl w-1/4 xl:w-[48%] md:w-full'>
              <div className='header flex items-center gap-x-3'>
                <div className='iconBox h-10 w-10 flex items-center justify-center bg-red-500 rounded-full bg-opacity-10'>
                  <img src='./images/svgs/icon-book-mark.svg' alt='svg' />
                </div>
                <div className='limit-2 font-bold text-xs w-[90px]'>
                  Số thứ tự đã bỏ qua
                </div>
              </div>
              <div className='flex items-center justify-between w-full'>
                <span className='font-bold text-3xl text-gray-600'>
                  {countItem?.huyBo}
                </span>{' '}
                <span className='flex items-center text-[10px] bg-primary bg-opacity-10  rounded-xl text-bold text-primary px-1 py-1'>
                  <ArrowUpOutlined /> 32,41%
                </span>
              </div>
            </div>
          </div>
          <div className='chart w-full mt-5 h-full p-[15px]'>
            <div className='flex justify-between items-center w-full'>
              <h3 className='font-bold text-sm'>Statistical table</h3>
              <div className='selectBox flex justify-center items-center gap-x-3'>
                <span className='font-bold text-sm'>View by</span>
                <Select
                  defaultValue={'Day'}
                  className='text-gray-500'
                  suffixIcon={
                    <CaretDownOutlined
                      className='text-primary'
                      onChange={handleFilterChange}
                    />
                  }
                >
                  <Option value='Day'>Day</Option>
                  <Option value='Week'>Week</Option>
                  <Option value='Year'>Year</Option>
                </Select>
                {/* <select className="rounded-2xl cursor-pointer focus:outline-none w-[100px] outline-none border-gray-200 border-1 px-[12px] py-[5px] ">
                <option value="day">Day</option>
                <option value="month">Month</option>
              </select> */}
              </div>
            </div>
            {/* Chart  */}
            {progression && (
              <Line
                data={renderDataSetMoney() as any}
                options={options as any}
              />
            )}
          </div>
        </div>
      </div>
      <AdminRightContent
        services={services}
        devices={devices}
        progressions={progression}
        handleChangeDate={handleChangeDate}
      />
    </div>
  );
}

export default Dashboard;
