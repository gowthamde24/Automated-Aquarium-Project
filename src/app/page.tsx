'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// --- Reusable UI Components (Shared by both prototypes) ---

const SensorCard = ({ label, value, unit, iconSrc, isDesktop = false }) => (
  <div className={`flex flex-col gap-2 items-center justify-center bg-gray-800/60 text-white p-4 border border-blue-500/50 rounded-lg w-full shadow-md backdrop-blur-sm ${isDesktop ? 'p-6 gap-4' : ''}`}>
    <Image
      className="invert"
      src={iconSrc}
      alt={`${label} icon`}
      width={isDesktop ? 60 : 48}
      height={isDesktop ? 60 : 48}
      priority
    />
    <h3 className={`font-semibold text-gray-300 ${isDesktop ? 'text-xl' : 'text-lg'}`}>{label}</h3>
    <p className={`font-bold text-cyan-400 ${isDesktop ? 'text-4xl' : 'text-3xl'}`}>
      {value.toFixed(1)} <span className={`text-gray-400 ${isDesktop ? 'text-2xl' : 'text-xl'}`}>{unit}</span>
    </p>
  </div>
);

const ActionButton = ({ label, onClick, iconSrc, active = false }) => {
    const baseClasses = "flex items-center justify-center gap-3 font-bold py-3 px-6 rounded-lg w-full transition-colors duration-300 shadow-md text-sm";
    const activeClasses = "bg-yellow-400 hover:bg-yellow-500 text-gray-900";
    const inactiveClasses = "bg-green-600 hover:bg-green-700 text-white";

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
        >
            <Image
            className={active ? '' : 'invert'}
            src={iconSrc}
            alt={`${label} icon`}
            width={20}
            height={20}
            />
            {label}
        </button>
    );
};

const StatusDisplay = ({ status, message, isDesktop = false }) => {
  const bgColor = status === 'normal' ? 'bg-green-500/20' : 'bg-red-500/20';
  const textColor = status === 'normal' ? 'text-green-300' : 'text-red-300';
  const borderColor = status === 'normal' ? 'border-green-500/50' : 'border-red-500/50';

  return (
    <div className={`p-3 border ${borderColor} rounded-lg w-full text-center ${bgColor} ${isDesktop ? 'p-4' : ''}`}>
      <p className={`font-semibold ${textColor} ${isDesktop ? 'text-lg' : ''}`}>{message}</p>
    </div>
  );
};


// --- Prototype 1: Desktop Website Dashboard ---
const DesktopDashboard = ({ sensorData, handlers }) => {
    const { temperature, ph, status, statusMessage, feedMessage, isLightOn } = sensorData;
    const { handleManualFeed, handleToggleLight } = handlers;

    return (
        <div className={`w-full max-w-5xl mx-auto p-8 transition-all duration-500 ${isLightOn ? 'bg-blue-900/20' : 'bg-gray-900/50'} rounded-2xl shadow-2xl border border-gray-700`}>
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-cyan-300">Automated Aquarium Dashboard</h1>
                <p className="text-lg text-gray-400 mt-2">Full-featured system monitoring and control</p>
            </header>
            <main className="flex flex-col gap-8">
                <StatusDisplay status={status} message={statusMessage} isDesktop={true} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <SensorCard label="Temperature" value={temperature} unit="°C" iconSrc="/window.svg" isDesktop={true} />
                    <SensorCard label="pH Level" value={ph} unit="" iconSrc="/globe.svg" isDesktop={true} />
                </div>
                <div className="flex flex-col items-center gap-4 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
                    <h2 className="text-2xl font-semibold mb-4">Manual Controls</h2>
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <ActionButton label="Feed Fish Now" onClick={handleManualFeed} iconSrc="/share.svg" />
                        <ActionButton 
                            label={isLightOn ? 'Turn Lights Off' : 'Turn Lights On'}
                            onClick={handleToggleLight}
                            iconSrc="/main-icon.svg"
                            active={isLightOn}
                        />
                    </div>
                    {feedMessage && <p className="text-green-400 mt-4">{feedMessage}</p>}
                </div>
            </main>
        </div>
    );
};


// --- Prototype 2: Mobile App ---
const MobileDashboard = ({ sensorData, handlers }) => {
    const { temperature, ph, status, statusMessage, feedMessage, isLightOn } = sensorData;
    const { handleManualFeed, handleToggleLight } = handlers;

    return (
        <div className="w-full max-w-sm h-[700px] max-h-[90vh] bg-black rounded-[40px] shadow-2xl p-3 border-4 border-gray-600">
            <div className={`w-full h-full rounded-[30px] overflow-hidden flex flex-col transition-all duration-500 ${isLightOn ? 'bg-blue-900/40' : 'bg-gray-900'}`}>
                <header className="text-center p-4 bg-gray-800/50 border-b border-gray-700">
                    <h1 className="text-2xl font-bold text-cyan-300">My Aquarium</h1>
                </header>
                <main className="flex-grow flex flex-col gap-4 p-4 overflow-y-auto">
                    <StatusDisplay status={status} message={statusMessage} />
                    <div className="grid grid-cols-2 gap-4">
                        <SensorCard label="Temperature" value={temperature} unit="°C" iconSrc="/window.svg" />
                        <SensorCard label="pH Level" value={ph} unit="" iconSrc="/globe.svg" />
                    </div>
                    <div className="flex flex-col gap-2 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                        <h2 className="text-lg font-semibold text-center mb-2">Manual Controls</h2>
                        <div className="flex flex-col gap-3">
                            <ActionButton label="Feed Fish Now" onClick={handleManualFeed} iconSrc="/share.svg" />
                            <ActionButton 
                                label={isLightOn ? 'Turn Lights Off' : 'Turn Lights On'}
                                onClick={handleToggleLight}
                                iconSrc="/main-icon.svg"
                                active={isLightOn}
                            />
                        </div>
                        {feedMessage && <p className="text-green-400 mt-2 text-center text-sm">{feedMessage}</p>}
                    </div>
                </main>
                <footer className="flex justify-around p-2 bg-gray-800/50 border-t border-gray-700 mt-auto">
                    <div className="flex flex-col items-center text-cyan-400"><Image className="invert" src="/in-work.svg" alt="home" width={24} height={24}/><span className="text-xs">Home</span></div>
                    <div className="flex flex-col items-center text-gray-500"><Image className="invert opacity-50" src="/contact.webp" alt="settings" width={24} height={24}/><span className="text-xs">Settings</span></div>
                </footer>
            </div>
        </div>
    );
};


// --- Main Page to Toggle Between Prototypes ---
export default function PrototypesPage() {
    const [view, setView] = useState('desktop'); // 'desktop' or 'mobile'

    // Shared state and logic for both prototypes
    const [temperature, setTemperature] = useState(25.0);
    const [ph, setPh] = useState(7.0);
    const [status, setStatus] = useState('normal');
    const [statusMessage, setStatusMessage] = useState('System operating normally.');
    const [feedMessage, setFeedMessage] = useState('');
    const [isLightOn, setIsLightOn] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTemperature(prev => prev + (Math.random() - 0.5) * 0.2);
            setPh(prev => prev + (Math.random() - 0.5) * 0.1);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (temperature > 28.0) { setStatus('alert'); setStatusMessage('Alert: Temp is too high!'); }
        else if (temperature < 22.0) { setStatus('alert'); setStatusMessage('Alert: Temp is too low!'); }
        else if (ph > 7.8) { setStatus('alert'); setStatusMessage('Alert: pH is too high!'); }
        else if (ph < 6.5) { setStatus('alert'); setStatusMessage('Alert: pH is too low!'); }
        else { setStatus('normal'); setStatusMessage('System is operating normally.'); }
    }, [temperature, ph]);

    const handleManualFeed = () => {
        setFeedMessage('Fish fed successfully!');
        setTimeout(() => setFeedMessage(''), 3000);
    };
    
    const handleToggleLight = () => setIsLightOn(prev => !prev);

    const sensorData = { temperature, ph, status, statusMessage, feedMessage, isLightOn };
    const handlers = { handleManualFeed, handleToggleLight };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-800 p-4 text-white">
            {/* View Toggler */}
            <div className="mb-8 p-1 bg-gray-700 rounded-full flex gap-2">
                <button 
                    onClick={() => setView('desktop')} 
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${view === 'desktop' ? 'bg-cyan-500 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
                >
                    Website View
                </button>
                <button 
                    onClick={() => setView('mobile')}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${view === 'mobile' ? 'bg-cyan-500 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
                >
                    Mobile App View
                </button>
            </div>

            {/* Conditionally render the selected prototype */}
            {view === 'desktop' ? (
                <DesktopDashboard sensorData={sensorData} handlers={handlers} />
            ) : (
                <MobileDashboard sensorData={sensorData} handlers={handlers} />
            )}
        </div>
    );
}

