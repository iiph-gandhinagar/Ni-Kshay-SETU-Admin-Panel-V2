import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store";
import { ShimmerPlaceholder } from "../ShimmerPlaceholder";

const StatsCard = ({
    icon,
    value,
    label,
    bgColor,
}: {
    icon: React.ReactNode;
    value: string | number;
    label: string;
    bgColor: string;
}) => {
    return (
        <div
            className={"flex items-center gap-4 p-6 rounded-xl shadow-md transition-transform transform hover:scale-105"}
            style={{ backgroundColor: bgColor }}
        >
            <div className="text-4xl">{icon}</div>
            <div>
                <p className="text-xl md:text-xl lg:text-2xl font-bold text-gray-800 mt-2">
                    {value}</p>
                <p className="text-lg font-medium text-gray-600">{label}</p>
            </div>
        </div>
    );
};

const UsageCounts = () => {
    const { dashboardData, loader } = useSelector((state: IRootState) => state.dashboard);
    const statsData = [
        {
            icon: "⏳",
            value: ((dashboardData?.totalMinuteSpent?.[0]?.points) || 0) + " Mins.",
            label: "Total Time Spent by Users",
            bgColor: "#FFF7E8",
        },
        {
            icon: "🤖",
            value: dashboardData?.chatbotUsage ?? 0,
            label: "Chatbot Usage Count",
            bgColor: "#FFFAE6",
        },
        {
            icon: "🩺",
            value: Array.isArray(dashboardData?.screeningTool) ? dashboardData?.screeningTool[0]?.totalCount ?? 0 : typeof dashboardData?.screeningTool === "number" ? dashboardData?.screeningTool : 0,
            label: "Screening Tool Usage Count",
            bgColor: "#F6F4FF",
        },
    ];


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-white shadow-md rounded-lg p-6 mt-6">
            {loader.dashboardGeneralCount ? (
                <>
                    <div className="p-4 rounded-md shadow">
                        <ShimmerPlaceholder height="1.5rem"
                            width="50%" />
                        <ShimmerPlaceholder height="2rem"
                            width="80%" />
                        <ShimmerPlaceholder height="1rem"
                            width="70%" />
                    </div>
                    <div className="p-4 rounded-md shadow">
                        <ShimmerPlaceholder height="1.5rem"
                            width="50%" />
                        <ShimmerPlaceholder height="2rem"
                            width="80%" />
                        <ShimmerPlaceholder height="1rem"
                            width="70%" />
                    </div>
                    <div className="p-4 rounded-md shadow">
                        <ShimmerPlaceholder height="1.5rem"
                            width="50%" />
                        <ShimmerPlaceholder height="2rem"
                            width="80%" />
                        <ShimmerPlaceholder height="1rem"
                            width="70%" />
                    </div>
                </>
            ) : (
                statsData.map((stat, index) => (
                    <StatsCard
                        key={index}
                        icon={stat.icon}
                        value={stat.value}
                        label={stat.label}
                        bgColor={stat.bgColor}
                    />
                ))
            )}
        </div>
    );
};

export default UsageCounts;
