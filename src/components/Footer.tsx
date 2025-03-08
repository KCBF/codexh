import React from 'react';
import Image from 'next/image';
const Footer = () => {
  return (
    <div className="flex flex-col w-full px-[80px] py-[120px] gap-[50px]">
      <div className="flex gap-[100px]">
        <div className=" gap-[20px] flex flex-col justify-between">
          <p className="text-[56px] text-[white] font-bold">LOGO</p>
          <div className="border border-white border-solid rounded-[4px] w-[480] flex">
            <input
              type="text"
              placeholder="Enter your email"
              className="bg-transparent flex-1 p-[10px]"
            />
            <button className="border bg-white text-black p-[10px] border-solid">
              Subscribe
            </button>
          </div>
          <p className="text-[14px] text-[#808080]">
            We’ll send you a nice “Newsletter” every two weeks. No spam.
          </p>
          <div>
            <p className="text-[16px] font-bold text-[#808080]">Contact us</p>
            <p className="text-[14px] text-[#808080]">1900 6067</p>
            <p className="text-[14px] text-[#808080]">support@vocake.vn</p>
          </div>
          <div className="flex gap-20">
            <div>
              <p className="text-[14px] text-[#808080] font-extrabold">
                HCM Head Office
              </p>
              <p className="text-[14px] text-[#808080] font-extrabold">...</p>
            </div>
            <div>
              <p className="text-[14px] text-[#808080] font-extrabold">
                Ha Noi City Office
              </p>
              <p className="text-[14px] text-[#808080] font-extrabold">...</p>
            </div>
          </div>
          <div className="flex w-full flex-row gap-10">
            <Image src="/asset/Apple.png" alt="" height={40} width={120} />
            <Image src="/asset/ChPlay.png" alt="" height={40} width={120} />
          </div>
        </div>

        <div className="flex-1 gap-[20px] flex flex-col">
          <p>Products</p>
          <div className="flex justify-start flex-wrap gap-[30px] h-[242px]">
            <div className="w-[200px] shrink-0 h-max">
              <p className="text-[#808080]">VoCake Assessment</p>
              <p className="text-[#808080]">...</p>
            </div>
            <div className="w-[200px] shrink-0 h-max">
              <p className="text-[#808080]">VoCake Deck</p>
              <p className="text-[#808080]">...</p>
            </div>
            <div className="w-[200px] shrink-0 h-max">
              <p className="text-[#808080]">VoCake Practice</p>
              <p className="text-[#808080]">...</p>
            </div>
            <div className="w-[200px] shrink-0 h-max">
              <p className="text-[#808080]">VoCake Tutor</p>
              <p className="text-[#808080]">...</p>
            </div>
            <div className="w-[200px] shrink-0 h-max">
              <p className="text-[#808080]">Others</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-6">
              <p className="text-[16px] font-bold">People</p>
              <div className="text-[12px]">
                <p>Educators</p>
                <p>Schools & Districts</p>
                <p>Tutors</p>
                <p>Higher Ed</p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-[16px] font-bold">Solutions</p>
              <div className="text-[12px]">
                <p>Use Cases</p>
                <p>Efficiency</p>
                <p>Integrations</p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-[16px] font-bold">Resources</p>
              <div className="text-[12px]">
                <p>Topic Library</p>
                <p>Blog</p>
                <p>FAQs</p>
                <p>Help Center</p>
                <p>Plan & Pricing</p>
                <p>Product Updates</p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-[16px] font-bold">Company</p>
              <div className="text-[12px]">
                <p>About Us</p>
                <p>Careers</p>
                <p>Security Reporting Program</p>
                <p>Contact</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border border-t-[0.1px] border-t-white" />
      <div className="flex flex-row justify-between">
        <p className="text-[rgba(255,255,255,0.75)] ">
          © 2025 VoCake Learning. All rights reserved.
        </p>
        <div className="flex flex-row gap-5 items-center">
          <Image
            src={'/asset/Instagram.png'}
            alt="Instagram"
            width={40}
            height={40}
          />
          <Image
            src={'/asset/Facebook.png'}
            alt="Instagram"
            width={40}
            height={40}
          />
          <Image
            src={'/asset/Twitter.png'}
            alt="Instagram"
            width={40}
            height={40}
          />
          <Image
            src={'/asset/LinkedIn.png'}
            alt="Instagram"
            width={40}
            height={40}
          />
          <Image
            src={'/asset/Youtube.png'}
            alt="Instagram"
            width={40}
            height={40}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
