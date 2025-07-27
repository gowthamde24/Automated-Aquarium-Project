
// src/app/about/page.tsx

'use client';

import Image from 'next/image';
import { allAbouts, About } from 'contentlayer/generated';
import { getMDXComponent } from 'next-contentlayer/hooks';

// A reusable component for each User Story card
const UserStoryCard = ({ title, iconSrc, children }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-800/50 rounded-lg shadow-lg border border-gray-700 h-full">
      <div className="flex-shrink-0">
        <Image
          src={iconSrc}
          alt={`${title} icon`}
          width={60}
          height={60}
          className="invert"
        />
      </div>
      <div className="mt-4 text-center">
        <h2 className="text-xl font-bold text-cyan-400">{title}</h2>
        <div className="prose prose-invert max-w-none mt-2 text-gray-300 text-left">
            {children}
        </div>
      </div>
    </div>
  );
};

// The main content component that renders the MDX content
function AboutContent({ code }: { code: string }) {
  const Content = getMDXComponent(code);
  return <Content />;
}

export default function AboutPage() {
  const posts = allAbouts.sort((a, b) => a.title.localeCompare(b.title));

  const userStories = [
    {
      title: "User Story 1: Monitor Water Parameters",
      icon: "/window.svg",
      content: posts[0] ? <AboutContent code={posts[0].body.code} /> : <p>Content not found.</p>,
    },
    {
      title: "User Story 2: Feed Fish Automatically",
      icon: "/share.svg",
      content: posts[1] ? <AboutContent code={posts[1].body.code} /> : <p>Content not found.</p>,
    },
    {
      title: "User Story 3: Manual Override",
      icon: "/main-icon.svg",
      content: <p>As a user, I want to manually control feeding and lighting via the mobile app, so that I can act during unexpected situations or when I want to interact with my aquarium.</p>,
    },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Image Banner Section */}
      <div className="relative w-full h-72 sm:h-96">
        <Image
          src="/aquarium-banner.avif" // Make sure you have this image in your /public folder
          alt="A beautiful automated aquarium"
          layout="fill"
          objectFit="cover"
          className="brightness-50" // Darkens the image to make text pop
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl sm:text-6xl font-bold drop-shadow-lg">
            Project User Stories
          </h1>
          <p className="text-lg sm:text-xl mt-4 max-w-3xl drop-shadow-md">
            Key features designed from a user's perspective to ensure a seamless and reliable automated aquarium experience.
          </p>
        </div>
      </div>

      {/* Grid layout for the user story cards */}
      <div className="w-full max-w-6xl p-4 sm:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {userStories.map((story) => (
          <UserStoryCard key={story.title} title={story.title} iconSrc={story.icon}>
            {story.content}
          </UserStoryCard>
        ))}
      </div>
    </div>
  );
}
