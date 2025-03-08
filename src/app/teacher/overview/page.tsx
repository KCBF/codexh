import React from 'react';
import ClassSummayCard from '../_components/ClassSumaryCard';
import UserRow from '../_components/UserRow';
import {
  CircleChevronLeftIcon,
  CircleChevronRightIcon,
  CirclePlus,
  Crown,
  EyeIcon,
  MapPin,
  SquarePen,
} from 'lucide-react';
import Image from 'next/image';
import {
  students,
  summaryItems,
  TopTopicSearchItems,
} from '@/constants/constants';

import TopicSummaryCard from '../_components/TopicSummaryCard';
const page = () => {
  return (
    <div className="mt-10 flex flex-col gap-10">
      <div className="grid grid-cols-4 gap-3">
        {summaryItems.map((item, index) => (
          <ClassSummayCard
            key={index}
            direction={item.direction}
            percent={item.percent}
            name={item.name}
            iconUrl={item.iconUrl}
            bigNumber={item.bigNumer}
            bg={item.bg}
          />
        ))}
      </div>
      <div className="flex flex-row gap-10  max-h-[950px] ">
        <div className="bg-white rounded-[16px]  flex-[1] p-4 gap-[32px] flex flex-col shadow-md max-h-full overflow-y-scroll overflow-x-hidden">
          <div className="flex flex-row items-center justify-between w-full">
            <p className="text-[24px] font-bold">Students</p>
            <Image src={'/filter-search.svg'} width={24} height={24} alt="" />
          </div>
          <div className="flex flex-1 flex-col gap-[32px]">
            {students.map((item, index) => (
              <UserRow
                url={item.url}
                userName={item.name}
                level={item.level}
                key={index}
              />
            ))}
          </div>
        </div>
        <div className="bg-white rounded-[16px] flex-[2] p-8 flex flex-col shadow-md">
          <div className="flex flex-row gap-[40px]">
            <div className="flex flex-col items-center">
              <Image
                src={
                  'https://img.freepik.com/free-psd/3d-illustration-with-online-avatar_23-2151303097.jpg?semt=ais_hybrid'
                }
                width={160}
                height={160}
                alt=""
                className="rounded-[200px]"
              />
              <p className="text-[28px] font-semibold">Daisy Bui</p>
              <div className="flex flex-row items-center gap-2 text-[#656565] text-[16px]">
                <MapPin />
                <p>Ho Chi Minh, Viet Nam</p>
              </div>
            </div>
            <div className="w-full flex flex-col gap-[16px]">
              <div className="flex flex-col gap-[8px] items-start">
                <p className="uppercase font-semibold text-[16px] text-white bg-gradient-to-r from-[#F2D147] to-[#FF7A1A] rounded-3xl px-4">
                  Level 6
                </p>
                <p className="text-[#A6A6A6] text-[16px]">
                  Started in 9 Feb, 2025
                </p>
              </div>

              <div className="flex flex-row justify-between w-full">
                <p className="text-[16px] font-medium">Target Level</p>
                <div className="flex flex-row text-[#F99C34] font-semibold gap-2">
                  <Crown />
                  <p>Lv.10</p>
                </div>
              </div>
              <div className="flex flex-row justify-between w-full">
                <p className="text-[16px] font-medium">ETADate</p>
                <p className="text-[#A6A6A6] font-medium">30 Apr, 2025</p>
              </div>
              <div className="flex flex-col gap-[16px]">
                <p className="text-[16px] font-medium">Vocabulary Strengths</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-[16px] font-semibold p-1 px-4 text-[#5E89ED] border border-[#5E89ED] w-max rounded-[100px]">
                    Friends
                  </div>
                  <div className="text-[16px] font-semibold p-1 px-4 text-[#52C470] border border-[#52C470] w-max rounded-[100px]">
                    Education
                  </div>
                  <div className="text-[16px] font-semibold p-1 px-4 text-[#BF9BDE] border border-[#BF9BDE] w-max rounded-[100px]">
                    Medicine
                  </div>
                  <div className="text-[16px] font-semibold p-1 px-4 text-[#EF6EA5] border border-[#EF6EA5] w-max rounded-[100px]">
                    IELTS 6.0
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Dashed line divider */}
          <div className="border border-dashed border-[#757575] mt-8" />
          <div className="flex flex-row justify-between mt-8 items-end">
            <div className="bg-white  w-max rounded-[16px] px-10 py-4 flex flex-col items-center ">
              <Image
                src={'/asset/image copy.png'}
                height={94}
                width={73}
                alt=""
              />
              <p className="font-bold text-[20px]">2400 XP</p>
              <p className="text-[#656565]">Point</p>
            </div>
            <div className="bg-white  w-max rounded-[16px] px-10 py-4 flex flex-col items-center">
              <Image
                src={'/asset/image copy 2.png'}
                height={94}
                width={73}
                alt=""
              />
              <p className="font-bold text-[20px]">2/40</p>
              <p className="text-[#656565]">Class</p>
            </div>
            <div className="bg-white  w-max rounded-[16px] px-10 py-4 items-center flex flex-col">
              <Image
                src={'/asset/image copy 3.png'}
                height={94}
                width={73}
                alt=""
              />
              <p className="font-bold text-[20px]">100/20K</p>
              <p className="text-[#656565]">City</p>
            </div>
          </div>
          {/* Notes */}
          <div className="flex flex-col mt-8 gap-8">
            <div className="flex flex-row items-center w-full justify-between">
              <p className="font-bold text-[24px]">Follow-up Notes</p>
              <div className="flex flex-row items-center gap-2 text-[#A3A3A3]">
                <CircleChevronLeftIcon />
                <CircleChevronRightIcon />
              </div>
            </div>
            <ul className="flex flex-row items-center gap-[24px] text-[18px] font-medium text-[#757575]">
              <li>
                <a href="#">Today</a>
              </li>
              <li>
                <a href="#">This week</a>
              </li>
              <li>
                <a href="#">This month</a>
              </li>
            </ul>
            <div className="flex flex-row gap-8 items-center">
              <div className="bg-[#F99C34] rounded-[8px] p-4 w-[200px] gap-[32px] flex flex-col">
                <p className="text-[16px] font-medium">
                  Recommended: Practice using these verbs in different tenses
                  (past, present, future).
                </p>
                <div className="flex flex-row items-center justify-between ">
                  <p className="text-white">30 Jan, 2025</p>
                  <SquarePen />
                </div>
              </div>
              <div className="bg-[#5E89ED] rounded-[8px] p-4 w-[200px] gap-[32px] flex flex-col">
                <p className="text-[16px] font-medium">
                  Recommended: Practice using these verbs in different tenses
                  (past, present, future).
                </p>
                <div className="flex flex-row items-center justify-between ">
                  <p className="text-white">30 Jan, 2025</p>
                  <SquarePen />
                </div>
              </div>
              <div className="flex flex-col text-[#757575] items-center border border-dashed border-[#757575] p-4 rounded-[8px] cursor-pointer ">
                <CirclePlus />
                <p className="text-[12px] font-semibold">New Notes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[32px]">
        <p className="text-[40px] font-bold">Top Topic Searches</p>
        <div className="grid grid-cols-4 gap-3">
          {TopTopicSearchItems.map((item, index) => (
            <TopicSummaryCard
              url={item.url}
              number={item.number}
              title={item.title}
              key={index}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-row gap-10">
        {/* Student activity */}
        <div className="bg-white shadow-md rounded-[16px] h-[640px] flex-[2] p-4 px-8 gap-8 flex flex-col">
          <p className="text-[40px] font-bold">Student Activity</p>
          <div className="overflow-y-scroll flex flex-col gap-8">
            <div className="flex flex-col gap-[32px]">
              <p className="text-[24px] font-bold">Today</p>
              <div className="flex flex-row gap-4 items-center">
                <Image
                  src={
                    'https://img.freepik.com/free-psd/3d-rendering-hair-style-avatar-design_23-2151869123.jpg'
                  }
                  width={72}
                  height={72}
                  alt=""
                  className="rounded-[100px]"
                />
                <div>
                  <p>
                    <span className="font-bold text-[18px]">Daisy Bui </span>
                    assigned{' '}
                    <span className="font-bold text-[18px]">
                      new IELTS
                    </span>{' '}
                    Class homework
                  </p>
                  <p className="text-[#656565] font-medium">20 minutes ago</p>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <Image
                  src={
                    'https://img.freepik.com/free-psd/3d-rendering-hair-style-avatar-design_23-2151869123.jpg'
                  }
                  width={72}
                  height={72}
                  alt=""
                  className="rounded-[100px]"
                />{' '}
                <div>
                  <p>
                    <span className="font-bold text-[18px]">Vivian Tran</span>{' '}
                    already submitted homework in
                    <span className="font-bold text-[18px]">
                      {' '}
                      Grammer Class
                    </span>
                  </p>
                  <p className="text-[#656565] font-medium">1 hour agao</p>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <Image
                  src={
                    'https://img.freepik.com/free-psd/3d-rendering-hair-style-avatar-design_23-2151869123.jpg'
                  }
                  width={72}
                  height={72}
                  alt=""
                  className="rounded-[100px]"
                />{' '}
                <div>
                  <p>
                    <span className="font-bold text-[18px]">
                      Pham Hoang Duong
                    </span>{' '}
                    won <span className="font-bold text-[18px]">Speaking</span>{' '}
                    challenge
                  </p>
                  <p className="text-[#656565] font-medium">3 hours ago</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[32px]">
              <p className="text-[24px] font-bold">9 Feb, 2025</p>
              <div className="flex flex-row gap-4 items-center">
                <Image
                  src={
                    'https://img.freepik.com/free-psd/3d-rendering-hair-style-avatar-design_23-2151869123.jpg'
                  }
                  width={72}
                  height={72}
                  alt=""
                  className="rounded-[100px]"
                />{' '}
                <div>
                  <p>
                    <span className="font-bold text-[18px]">Huyen Vo</span>{' '}
                    saved Business English in her folder
                  </p>
                  <p className="text-[#656565] font-medium">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Notice board */}
        <div className="items-center bg-white shadow-md rounded-[16px] h-[640px] flex-[1] py-4 px-8 gap-4 flex flex-col">
          <p className="text-[24px] font-bold">Notice Board</p>
          <div className="flex flex-row gap-4 w-full">
            <div className="bg-[#A6A6A6] rounded-[4px] h-[48px] w-[48px]" />
            <div className="w-full">
              <p className="text-[18px] font-semibold">Spelling Competition</p>
              <div className="flex flex-row justify-between items-end w-full">
                <p className="text-[16px] font-medium text-[#A3A3A3]">
                  3 Mar, 2025
                </p>
                <div className="items-center flex flex-row gap-2">
                  <EyeIcon size={24} color="#BF9BDE" />
                  <span className="text-[#757575] font-medium text-[16px]">
                    100
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4 w-full">
            <div className="bg-[#A6A6A6] rounded-[4px] h-[48px] w-[48px]" />
            <div className="w-full">
              <p className="text-[18px] font-semibold">Linguistic Hackathon</p>
              <div className="flex flex-row justify-between items-end w-full">
                <p className="text-[16px] font-medium text-[#A3A3A3]">
                  3 Mar, 2025
                </p>
                <div className="items-center flex flex-row gap-2">
                  <EyeIcon size={24} color="#BF9BDE" />
                  <span className="text-[#757575] font-medium text-[16px]">
                    100
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4 w-full">
            <div className="bg-[#A6A6A6] rounded-[4px] h-[48px] w-[48px]" />
            <div className="w-full">
              <p className="text-[18px] font-semibold">IELTS Development</p>
              <div className="flex flex-row justify-between items-end w-full">
                <p className="text-[16px] font-medium text-[#A3A3A3]">
                  3 Mar, 2025
                </p>
                <div className="items-center flex flex-row gap-2">
                  <EyeIcon size={24} color="#BF9BDE" />
                  <span className="text-[#757575] font-medium text-[16px]">
                    100
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4 w-full">
            <div className="bg-[#A6A6A6] rounded-[4px] h-[48px] w-[48px]" />
            <div className="w-full">
              <p className="text-[18px] font-semibold">New Website Policy</p>
              <div className="flex flex-row justify-between items-end w-full">
                <p className="text-[16px] font-medium text-[#A3A3A3]">
                  3 Mar, 2025
                </p>
                <div className="items-center flex flex-row gap-2">
                  <EyeIcon size={24} color="#BF9BDE" />
                  <span className="text-[#757575] font-medium text-[16px]">
                    100
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button className="w-max text-white uppercase mt-auto mb-8 font-semibold text-[12px] px-8 py-4 rounded-3xl bg-[#FF7A1A]">
            See all events
          </button>
        </div>
      </div>
      <div className="h-[50px]" />
    </div>
  );
};

export default page;
