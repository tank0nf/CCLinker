import React, { useState } from 'react';

export default function YouTubeDecoy({ passphrase, originalUrl }: { passphrase: string; originalUrl: string }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm === passphrase) {
      window.location.href = originalUrl;
    } else {
      window.location.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerm)}`;
    }
  };

  const handleVideoClick = (videoId: string) => {
    window.location.href = `https://www.youtube.com/watch?v=${videoId}`;
  };

  const trendingVideos = [
    {
      id: 'dQw4w9WgXcQ',
      title: 'Never Gonna Give You Up',
      channel: 'Rick Astley',
      views: '1.2B views',
      thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      duration: '3:32',
      channelAvatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZTZFGPAoJoA_4Oj_RXZfEoNVRuGgq7wVHr7_XaY=s176-c-k-c0x00ffffff-no-rj',
      uploadedAt: '14 years ago',
    },
    {
      id: 'jNQXAC9IVRw',
      title: 'Me at the zoo',
      channel: 'jawed',
      views: '258M views',
      thumbnail: 'https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg',
      duration: '0:18',
      channelAvatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZRTjwWQZwwZ8OFWDfwm-yR4vGD3_Kyt1yGgFesj=s176-c-k-c0x00ffffff-no-rj',
      uploadedAt: '19 years ago',
    },
    {
      id: '9bZkp7q19f0',
      title: 'PSY - GANGNAM STYLE(강남스타일)',
      channel: 'officialpsy',
      views: '4.9B views',
      thumbnail: 'https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg',
      duration: '4:12',
      channelAvatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZQHFsAUm8LFg0nqnHAYiYGHYqpWEz7gfKXUGOvw=s176-c-k-c0x00ffffff-no-rj',
      uploadedAt: '11 years ago',
    },
    {
      id: 'kJQP7kiw5Fk',
      title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
      channel: 'Luis Fonsi',
      views: '8.2B views',
      thumbnail: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg',
      duration: '4:41',
      channelAvatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZQAMUzK_5oUTqHHrKO8v6U1XZM8FxYaEhZiTwBE=s176-c-k-c0x00ffffff-no-rj',
      uploadedAt: '6 years ago',
    },
    {
      id: 'JGwWNGJdvx8',
      title: 'Ed Sheeran - Shape of You',
      channel: 'Ed Sheeran',
      views: '5.9B views',
      thumbnail: 'https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg',
      duration: '4:23',
      channelAvatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZQEy3EzZfY6Kdf1-JYGOYUzqxVxQwCaNJL7nALq=s176-c-k-c0x00ffffff-no-rj',
      uploadedAt: '6 years ago',
    },
    {
      id: 'OPf0YbXqDm0',
      title: 'Mark Ronson - Uptown Funk ft. Bruno Mars',
      channel: 'Mark Ronson',
      views: '4.8B views',
      thumbnail: 'https://i.ytimg.com/vi/OPf0YbXqDm0/hqdefault.jpg',
      duration: '4:31',
      channelAvatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZSBZGpHzxrEHGN5iUlXE0JFoFEILjZzQG2mX9NY=s176-c-k-c0x00ffffff-no-rj',
      uploadedAt: '9 years ago',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-[#0f0f0f] border-b border-[#272727] z-50">
        <div className="flex items-center p-2">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-[#272727] rounded-full">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
            </button>
            <div className="flex items-center gap-1 text-xl">
              <svg viewBox="0 0 90 20" className="w-20 h-5 fill-current"><path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" fill="#FF0000"/><path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white"/></svg>
              <span className="font-bold">YouTube</span>
            </div>
          </div>
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
            <div className="flex">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                className="w-full px-4 py-2 bg-[#121212] border border-[#303030] rounded-l-full text-white focus:outline-none focus:border-blue-500"
              />
              <button type="submit" className="px-6 bg-[#222222] border border-l-0 border-[#303030] rounded-r-full hover:bg-[#272727]">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
              </button>
            </div>
          </form>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-[#272727] rounded-full">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2zm3-7H3v12h14v-6.39l4 1.83V8.56l-4 1.83V6m1-1v3.83L22 7v8l-4-1.83V19H2V5h16z"/></svg>
            </button>
            <button className="p-2 hover:bg-[#272727] rounded-full">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M10 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm10-2.65V19H4v-1.65l2-1.88v-5.15C6 6.4 9.42 3.28 13 3.28c3.58 0 7 3.13 7 7.04v5.15l2 1.88zm-2 .65l-2-1.88v-5.47C16 7.09 14.91 5 13 5c-1.91 0-3 2.09-3 4.65v5.47l-2 1.88V17h10v-.35z"/></svg>
            </button>
            <button className="w-8 h-8 rounded-full overflow-hidden">
              <img src="https://i.pravatar.cc/32" alt="Profile" className="w-full h-full object-cover" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-16 px-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-60 fixed left-0 top-16 bottom-0 bg-[#0f0f0f] overflow-y-auto hidden lg:block">
            <div className="p-3">
              <div className="flex items-center gap-6 px-3 py-2 rounded-lg hover:bg-[#272727] cursor-pointer">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M4 10v11h6v-6h4v6h6V10l-8-7-8 7zm16 8h-4v-6H8v6H4v-7.8l8-7 8 7.8V18z"/></svg>
                <span>Home</span>
              </div>
              <div className="flex items-center gap-6 px-3 py-2 rounded-lg hover:bg-[#272727] cursor-pointer">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zm-.23 5.86l-8.5 4.5c-1.34.71-3.01.2-3.72-1.14-.71-1.34-.2-3.01 1.14-3.72l2.04-1.08v-1.21l-.69-.28-1.11-.46c-.99-.41-1.65-1.35-1.7-2.41-.05-1.06.52-2.06 1.46-2.56l8.5-4.5c1.34-.71 3.01-.2 3.72 1.14.71 1.34.2 3.01-1.14 3.72L15.5 9.26v1.21l1.8.74c.99.41 1.65 1.35 1.7 2.41.05 1.06-.52 2.06-1.46 2.56z"/></svg>
                <span>Shorts</span>
              </div>
              <div className="flex items-center gap-6 px-3 py-2 rounded-lg hover:bg-[#272727] cursor-pointer">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M20 7H4V6h16v1zm2 2v12H2V9h20zm-2 2H4v8h16v-8zm-8 1.5l6 3-6 3v-6z"/></svg>
                <span>Subscriptions</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 ml-0 lg:ml-60">
            <h2 className="text-2xl font-bold mb-6">Trending</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {trendingVideos.map((video) => (
                <div
                  key={video.id}
                  className="cursor-pointer group"
                  onClick={() => handleVideoClick(video.id)}
                >
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full aspect-video object-cover rounded-xl"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 text-xs rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="mt-3 flex gap-3">
                    <img
                      src={video.channelAvatar}
                      alt={video.channel}
                      className="w-9 h-9 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold line-clamp-2 group-hover:text-blue-400">
                        {video.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">{video.channel}</p>
                      <p className="text-sm text-gray-400">
                        {video.views} • {video.uploadedAt}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}