import React from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

const AvatarGroup = () => {
  return (
    <div className="flex flex-row-reverse justify-end -space-x-3 space-x-reverse">
      {' '}
      <Avatar className="h-[30.43px] w-[30.43px]">
        <AvatarImage src="https://img.freepik.com/free-psd/3d-rendering-hair-style-avatar-design_23-2151869153.jpg" />
      </Avatar>
      <Avatar className="h-[30.43px] w-[30.43px]">
        <AvatarImage src="https://getillustrations.b-cdn.net//photos/pack/3d-avatar-male_lg.png" />
      </Avatar>
      <Avatar className="h-[30.43px] w-[30.43px]">
        <AvatarImage src="https://i.pinimg.com/736x/38/1d/6e/381d6edab2cb8693e04e9e5923c20ec6.jpg" />
      </Avatar>
    </div>
  );
};

export default AvatarGroup;
