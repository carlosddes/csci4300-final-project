'use client';

import Image from 'next/image';

export default function Illustration() {
  return (
    <div className="hidden md:flex w-full md:w-[400px] bg-gradient-to-br from-purple-200 to-pink-200 items-center justify-center">
      <Image
        src="/splashart.png"
        alt="Illustration"
        width={300}
        height={300}
        className="object-contain"
        priority
      />
    </div>
  );
}
