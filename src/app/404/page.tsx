"use client";
import * as React from "react";
import { useCallback } from "react";

/**
 * 404 Error Page Component
 */
const ErrorPage: React.FC = () => {
  const handleReturnHome = useCallback(() => {
    // Navigate to homepage
    window.location.href = "/";
  }, []);

  return (
    <main className="flex flex-col justify-center items-center mx-auto w-full max-w-none h-screen bg-white max-md:max-w-[991px] max-sm:max-w-screen-sm">
      <section
        className="flex justify-center items-center mb-5"
        aria-labelledby="error-title"
      >
        {/* Hidden accessible title for screen readers */}
        <h1 id="error-title" className="sr-only">
          404 - Page Not Found
        </h1>

        <div>
          {/* SVG 404 Error Icon with accessibility attributes */}
          <div
            role="img"
            aria-label="404 The requested page cannot be found"
          />
        </div>
      </section>

      <section className="flex justify-center items-center mb-5">
        <button
          onClick={handleReturnHome}
          className="w-80 text-3xl font-medium tracking-normal leading-5 text-white bg-blue-800 rounded-lg border border-solid cursor-pointer border-stone-300 h-[75px] max-md:text-3xl max-md:h-[65px] max-md:w-[280px] max-sm:w-60 max-sm:text-2xl max-sm:h-[55px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 hover:bg-blue-700 transition-colors"
          aria-label="Return to Homepage"
        >
          Return to Homepage
        </button>
      </section>

      <img
        src="/404.png"
        alt="Sad face illustration"
        className="h-[207px] w-[150px] max-md:h-[180px] max-md:w-[130px] max-sm:h-[150px] max-sm:w-[110px]"
      />
    </main>
  );
};

export default ErrorPage;