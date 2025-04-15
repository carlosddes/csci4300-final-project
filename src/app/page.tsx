"use client";
import * as React from "react";
import { useRouter } from "next/navigation";

interface FeatureCardProps {
  imageUrl: string;
  altText: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  imageUrl,
  altText,
  description
}) => {
  return (
    <article className="flex flex-col items-center text-center w-[300px] max-md:mb-10">
      <img
        src={imageUrl}
        className="mb-5 h-[200px] w-[200px]"
        alt={altText}
      />
      <p className="text-3xl font-medium leading-none text-black text-opacity-50 max-sm:text-2xl">
        {description}
      </p>
    </article>
  );
};

export default function Home() {

  const router = useRouter();

  return (
    
    <section className="flex flex-col items-center p-5 mx-auto my-0 w-full bg-white max-w-[1440px] max-md:max-w-[991px] max-sm:max-w-screen-sm">
      <div className="flex flex-col items-center w-full">
        <header className="mb-10 text-center">
          <h1 className="mb-5 text-5xl font-medium leading-tight text-black max-md:text-4xl max-sm:text-3xl">
            An all-inclusive way to manage your Finances!
          </h1>
          <p className="mb-10 text-2xl font-medium leading-tight text-black text-opacity-50 max-md:text-xl max-sm:text-lg">
            A smarter, simpler way to manage every part of your financial
            life.
          </p>
          <div className="flex justify-center">
            <button
              className="px-8 py-4 text-3xl font-medium text-white bg-blue-800 rounded-lg cursor-pointer max-md:px-6 max-md:py-3 max-md:text-3xl max-sm:px-5 max-sm:py-2.5 max-sm:text-2xl"
              aria-label="Get Started for Free"
              onClick={() => router.push('/login')}
            >
              Get Started for Free
            </button>
          </div>
        </header>

        <figure className="mb-10">
          <img
            src="/splashimg1.png"
            className="w-full h-auto max-w-[500px]"
            alt="Finance Illustration"
          />
        </figure>

        <div className="flex justify-around w-full max-w-[1200px] max-md:flex-col max-md:items-center">
          <FeatureCard
            imageUrl="/splashimg2.png"
            altText="Track Balances"
            description="Track your balances, incomes & expenses"
          />

          <FeatureCard
            imageUrl="/splashimg3.png"
            altText="View Transactions"
            description="View all of your latest transactions"
          />

          <FeatureCard
            imageUrl="/splashimg4.png"
            altText="Account Growth"
            description="See your account grow over time"
          />
        </div>
      </div>
    </section>
  );
}
