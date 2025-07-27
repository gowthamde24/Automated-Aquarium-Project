"use client";

import Image from "next/image";
import { SocialIcons } from "@/components/Social-Icons";
import { allAbouts, About } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";

function AboutContent(about: About) {
  const Content = getMDXComponent(about.body.code);
  return <Content />;
}

export default function AboutPage() {
  const posts = allAbouts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8 pb-12 sm:pb-20 gap-8 sm:gap-16 px-4 sm:px-12 md:px-32">
      {/* About the Project Section */}
            <div className="bg-[rgb(42,52,73)] w-full rounded-lg">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mt-8">
          User Story 1
        </h1>
        <div className="divide-y divide-gray-200">
          <div className="flex flex-col xl:grid xl:grid-cols-3 xl:gap-x-8 items-center p-4 sm:p-8">
            <div className="flex flex-col items-center pt-8 pb-8">
              
            </div>
            <div className="prose prose-invert max-w-none pt-8 pb-8 xl:col-span-2 text-justify">
              <AboutContent {...posts[1]} />
            </div>
          </div>
        </div>
      </div>

      {/* About Me Section */}
      <div className="bg-[rgb(42,52,73)] w-full rounded-lg">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mt-8">
          User Story 2
        </h1>
        <div className="divide-y divide-gray-200">
          <div className="flex flex-col xl:grid xl:grid-cols-3 xl:gap-x-8 items-center p-4 sm:p-8">
            <div className="flex flex-col items-center pt-8 pb-8">
              
            </div>
            <div className="prose prose-invert max-w-none pt-8 pb-8 xl:col-span-2 text-justify">
              <AboutContent {...posts[0]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
