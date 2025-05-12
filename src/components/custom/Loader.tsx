const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[300px] w-full relative overflow-hidden bg-transparent">
            {/* Background Animation */}
            <div className="absolute inset-0"
                aria-hidden="true">
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute top-1/4 left-1/3 w-48 h-48 bg-blue-200/40 rounded-full blur-2xl animate-blob" />
                    <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-purple-200/40 rounded-full blur-2xl animate-blob delay-200" />
                    <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-teal-200/40 rounded-full blur-2xl animate-blob delay-400" />
                </div>
            </div>

            {/* Spinning Loader Content */}
            <div className="relative w-48 h-48">
                {/* Center Ring */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative w-24 h-24 border-[6px] border-gradient-blue rounded-full animate-spin-faster">
                        <div className="absolute inset-0 border-t-[6px] border-blue-400 rounded-full opacity-50" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Custom CSS for animations
const style = document.createElement("style");
style.textContent = `
    @keyframes spin-faster {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes orbit-faster {
      0%, 100% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
      50% { transform: rotate(180deg) translateX(40px) rotate(-180deg); }
    }

    @keyframes blob {
      0%, 100% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(-20px, 30px) scale(1.2); }
      50% { transform: translate(20px, -30px) scale(0.9); }
      75% { transform: translate(-20px, -30px) scale(1.1); }
    }

    .animate-spin-faster {
      animation: spin-faster 1s linear infinite;
    }

    .animate-orbit-faster {
      animation: orbit-faster 1s linear infinite;
    }

    .animate-blob {
      animation: blob 8s ease-in-out infinite;
    }

    .bg-gradient-blue {
      background: linear-gradient(to bottom right, #a7c9ff, #e2edff);
    }
  `;
document.head.appendChild(style);

export default Loader;
