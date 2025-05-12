const NoDataAvailable = (props: any) => {
  const { isSmall } = props;
  if (isSmall) {
    return (
      <div className="flex flex-col items-center justify-center h-[210px] rounded-lg w-full relative overflow-hidden bg-transparent">
        {/* Animated background patterns */}
        <div className="absolute inset-0"
          aria-hidden="true">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-1/4 left-1/3 w-36 h-36 bg-blue-100/40 rounded-full blur-2xl animate-blob" />
            <div className="absolute top-1/3 right-1/3 w-36 h-36 bg-purple-100/40 rounded-full blur-2xl animate-blob delay-200" />
            <div className="absolute bottom-1/3 left-1/2 w-36 h-36 bg-teal-100/40 rounded-full blur-2xl animate-blob delay-400" />
          </div>
          <div className="absolute inset-0 bg-grid-blue-50/30 mask-gradient" />
        </div>

        {/* Papers and magnifying glass */}
        <div className="relative w-48 h-48 animate-float-smooth">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute w-24 h-32 bg-white/90 rounded-xl rotate-6 transform translate-x-3 translate-y-3 shadow-sm" />
            <div className="absolute w-24 h-32 bg-white/95 rounded-xl -rotate-3 transform translate-x-2 translate-y-2 shadow-md" />
            <div className="relative w-24 h-32 bg-white rounded-xl shadow-lg animate-wave-gentle">
              <div className="absolute inset-0 bg-noise opacity-30" />
              <div className="relative p-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 animate-pulse" />
                  <div className="space-y-1 flex-1">
                    <div className="h-1.5 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full w-4/5" />
                    <div className="h-1.5 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full w-3/5" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="h-1 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full" />
                  <div className="h-1 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full w-11/12" />
                  <div className="h-1 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full w-4/5" />
                </div>
              </div>
              <div className="absolute -right-4 -top-4 animate-hover">
                <div className="relative">
                  <div className="w-8 h-8 border-[3px] border-blue-500 rounded-full bg-white shadow-lg">
                    <div className="absolute inset-1 border-2 border-blue-200 rounded-full opacity-50" />
                    <div className="absolute inset-2 border border-blue-100 rounded-full opacity-30" />
                  </div>
                  <div className="absolute w-5 h-3 bg-blue-500 -bottom-1.5 -right-0.5 rotate-45 rounded-r shadow-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none"
          aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1.5 h-1.5 rounded-full animate-float-particle opacity-40
                ${["bg-blue-400", "bg-purple-400", "bg-teal-400"][i % 3]}`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center min-h-[350px] rounded-lg w-full relative overflow-hidden bg-transparent">
        {/* Animated background patterns */}
        <div className="absolute inset-0"
          aria-hidden="true">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl animate-blob" />
            <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-purple-100/40 rounded-full blur-3xl animate-blob delay-200" />
            <div className="absolute bottom-1/3 left-1/2 w-72 h-72 bg-teal-100/40 rounded-full blur-3xl animate-blob delay-400" />
          </div>
          <div className="absolute inset-0 bg-grid-blue-50/30 mask-gradient" />
        </div>

        {/* Main content container */}
        <div className="relative w-80 h-80 animate-float-smooth">
          {/* Stacked papers effect */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute w-48 h-56 bg-white/90 rounded-xl rotate-6 transform translate-x-4 translate-y-4 shadow-sm" />
            <div className="absolute w-48 h-56 bg-white/95 rounded-xl -rotate-3 transform translate-x-2 translate-y-2 shadow-md" />

            {/* Main paper */}
            <div className="relative w-48 h-56 bg-white rounded-xl shadow-lg animate-wave-gentle">
              {/* Paper texture */}
              <div className="absolute inset-0 bg-noise opacity-30" />

              {/* Paper content */}
              <div className="relative p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 animate-pulse" />
                  <div className="space-y-2 flex-1">
                    <div className="h-2.5 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full w-4/5" />
                    <div className="h-2.5 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full w-3/5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="h-2 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full" />
                  <div className="h-2 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full w-11/12" />
                  <div className="h-2 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full w-4/5" />
                </div>
              </div>

              {/* Magnifying glass */}
              <div className="absolute -right-6 -top-6 animate-hover">
                <div className="relative">
                  <div className="w-12 h-12 border-[5px] border-blue-500 rounded-full bg-white shadow-lg">
                    <div className="absolute inset-1 border-2 border-blue-200 rounded-full opacity-50" />
                    <div className="absolute inset-2 border border-blue-100 rounded-full opacity-30" />
                  </div>
                  <div className="absolute w-7 h-5 bg-blue-500 -bottom-3 -right-1 rotate-45 rounded-r shadow-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none"
          aria-hidden="true">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full animate-float-particle opacity-40
              ${["bg-blue-400", "bg-purple-400", "bg-teal-400"][i % 3]}`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }
};

// Slower, smoother animations
const style = document.createElement("style");
style.textContent = `
    @keyframes float-smooth {
      0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
      50% { transform: translate3d(0, -20px, 0) rotate(3deg); }
    }

    @keyframes wave-gentle {
      0%, 100% { transform: rotate(-2deg) scale(1); }
      50% { transform: rotate(2deg) scale(1.02); }
    }

    @keyframes hover {
      0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
      50% { transform: translate3d(-8px, -8px, 0) rotate(-8deg); }
    }

    @keyframes blob {
      0%, 100% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(30px, -40px) scale(1.2); }
      50% { transform: translate(-30px, 30px) scale(0.9); }
      75% { transform: translate(30px, 40px) scale(1.1); }
    }

    @keyframes float-particle {
      0%, 100% { transform: translate3d(0, 0, 0); }
      50% { transform: translate3d(30px, -30px, 0); }
    }

    .animate-float-smooth {
      animation: float-smooth 8s ease-in-out infinite; /* Slower animation */
    }

    .animate-wave-gentle {
      animation: wave-gentle 8s ease-in-out infinite; /* Slower animation */
    }

    .animate-hover {
      animation: hover 6s ease-in-out infinite; /* Slower animation */
    }

    .animate-blob {
      animation: blob 12s ease-in-out infinite; /* Slower animation */
    }

    .animate-float-particle {
      animation: float-particle 10s ease-in-out infinite; /* Slower animation */
    }

    .bg-grid-blue-50 {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23ECF4FF'%3E%3Cpath d='M0 .5H31.5V32'/%3E%3C/svg%3E");
    }

    .mask-gradient {
      mask-image: linear-gradient(to bottom, transparent, black, transparent);
    }

    .bg-noise {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E");
    }

    .delay-200 {
      animation-delay: 200ms;
    }

    .delay-400 {
      animation-delay: 400ms;
    }
  `;
document.head.appendChild(style);

export default NoDataAvailable;
