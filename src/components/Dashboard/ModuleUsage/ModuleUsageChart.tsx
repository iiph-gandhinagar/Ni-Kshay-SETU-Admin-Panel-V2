import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store";
import { PrimaryBtn } from "../../buttons/primaryBtn";
import NoDataAvailable from "../../custom/NoDataAvailable";
import IconDownload from "../../Icon/IconDownload";
import Heading from "../Heading";
import { ShimmerPlaceholder } from "../ShimmerPlaceholder";

const ModuleUsageChart: React.FC = () => {
    const dispatch = useDispatch();
    const { dashboardData, loader } = useSelector((state: IRootState) => state.dashboard);
    const [isLast30Days, setIsLast30Days] = useState(false);
    const [series, setSeries] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);

    useEffect(() => {
        if (!dashboardData) return;
        const usageData = isLast30Days
            ? dashboardData.moduleUsageLast30Days
            : dashboardData.moduleUsage;
        if (usageData) {
            setSeries(usageData.map((item: any) => item.ActivityCount));
            setLabels(usageData.map((item: any) => `${item.ModuleName} (${item?.ActivityCount})`));
        }
    }, [isLast30Days, dashboardData]);
const toggleData = () => {
        setIsLast30Days(!isLast30Days);
    };
    const downloadPNG = () => {
        const chartInstance = ApexCharts.getChartByID("moduleUsage" + new Date().toLocaleDateString().replace(/\//g, "_")) as any;
        if (!chartInstance) {
            console.error("Chart instance not found");
            return;
        }
        setTimeout(() => {
            const chartGlobals = chartInstance?.w?.globals;
            if (!chartGlobals) {
                console.error("Chart globals not found");
                return;
            }
            const totalVisibleCount = chartGlobals.series.reduce((acc: number, seriesData: any, seriesIndex: number) => {
                return acc + seriesData;
            }, 0);
            chartInstance.updateOptions({
                title: {
                    text: "Module Usage",
                    align: "left",
                    style: {
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#333",
                    },
                },
                subtitle: {
                    text: `Total Usage Counts: ${totalVisibleCount}`,
                    align: "left",
                    style: {
                        fontSize: "12px",
                        color: "#333",
                    },
                },
            });
            setTimeout(async () => {
                try {
                    await chartInstance.exports.exportToPng();
                } catch (error) {
                    console.error("Error exporting chart to PNG:", error);
                } finally {
                    chartInstance.updateOptions({
                        title: {
                            text: "",
                        },
                        subtitle: {
                            text: "",
                        },
                    });
                }
            }, 300);
        }, 100);
    };
    const chartOptions: ApexCharts.ApexOptions = {
        chart: {
            type: "pie",
            id: "moduleUsage" + new Date().toLocaleDateString().replace(/\//g, "_"),
            toolbar: {
                show: false,
                tools: {
                    download: true,
                    selection: false,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false,
                },
            },
            dropShadow: {
                enabled: true,
                top: 5,
                left: 0,
                blur: 5,
                color: "#000",
                opacity: 0.1, // Slightly lighter shadow for a modern effect
            },
        },
        stroke: {
            width: 0.3,
        },
        labels,
        legend: {
            position: "bottom",
            fontSize: "12px",
            fontFamily: "'Nunito','Raleway', sans-serif", // Font family for the legend
            fontWeight: "bold",
        },
        dataLabels: {
            enabled: true,
            formatter: (val: number) => `${val.toFixed(1)}%`,
            dropShadow: {
                enabled: false,
            },
        },
        plotOptions: {
            pie: {
                expandOnClick: true,
                dataLabels: {
                    offset: 0,
                },
                customScale: 1,
            },
        },
        colors: [
            "#3B82F6", // Light blue
            "#34D399", // Soft green
            "#60A5FA", // Soft blue
            "#F3A847", // Light orange
            "#A78BFA", // Light purple
            "#81D4FA", // Light cyan
            "#F9A8D4", // Light pink
            "#D4E157", // Light lime green
            "#FF9F7F", // Soft coral
            "#4FD1C5", // Turquoise
            "#7DD3FC", // Sky blue
            "#FCD34D", // Soft yellow
            "#C084FC", // Lavender
            "#86EFAC", // Mint green
            "#FB923C", // Peach
            "#94A3B8", // Slate gray
            "#E879F9", // Bright pink
            "#67E8F9", // Cyan
            "#BEF264", // Lime
            "#FDA4AF"  // Rose
        ],
    };

    const [dropdownOpen, setDropdownOpen] = useState(false);
    return (
        <div className="mt-6 bg-white p-2 sm:p-4 md:p-5 lg:p-6 rounded-lg shadow-md w-full">
            <div className="flex justify-between items-center mb-4">
                {/* Heading */}
                <Heading className="text-gray-800"
                    title="Module Usage" />
                {/* Dropdown for Small Screens */}
                <div className="block sm:hidden md:hidden lg:block xl:hidden relative">
                    <button
                        className="px-4 py-2 rounded-md bg-[#5584AC] text-white hover:bg-[#446989] flex items-center transition-colors duration-200"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        Options
                        <svg
                            className="ml-2 w-4 h-4 transform transition-transform duration-200"
                            style={{ transform: dropdownOpen ? "rotate(0deg)" : "rotate(-90deg)" }}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 transition-opacity duration-200">
                            <button
                                className="block px-4 py-2 w-full text-left text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                                onClick={() => {
                                    setDropdownOpen(false);
                                    downloadPNG();
                                }}
                            >
                                Download Chart
                            </button>
                            {!window.location.search &&
                                <>
                                    <button
                                        className={`block px-4 py-2 w-full text-left ${!isLast30Days ? "text-blue-500" : "text-gray-800"} hover:bg-gray-100 transition-colors duration-200`}
                                        onClick={() => {
                                            setDropdownOpen(false);
                                            toggleData();
                                        }}
                                    >
                                        Overall
                                    </button>
                                    <button
                                        className={`block px-4 py-2 w-full text-left ${isLast30Days ? "text-blue-500" : "text-gray-800"} hover:bg-gray-100 transition-colors duration-200`}
                                        onClick={() => {
                                            setDropdownOpen(false);
                                            toggleData();
                                        }}
                                    >
                                        Last 30 Days
                                    </button>
                                </>
                            }
                        </div>
                    )}
                </div>

                {/* Buttons for Larger Screens */}
                <div className="hidden sm:flex md:flex lg:hidden xl:flex space-x-2 items-center">
                    <PrimaryBtn
                        title=""
                        rightIcon={<IconDownload />}
                        className="px-4 py-2 rounded-md bg-[#5584AC] text-white hover:bg-[#446989] transition-colors duration-200"
                        onClick={() => {
                            downloadPNG();
                        }}
                    />
                    {!window.location.search &&
                        <>
                            <PrimaryBtn
                                title="Overall"
                                className={`px-4 py-2 rounded-md ${!isLast30Days ? "bg-[#5584AC] text-white hover:bg-[#446989]" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-colors duration-200`}
                                onClick={() => toggleData()}
                            />
                            <PrimaryBtn
                                title="Last 30 Days"
                                className={`px-4 py-2 rounded-md ${isLast30Days ? "bg-[#5584AC] text-white hover:bg-[#446989]" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-colors duration-200`}
                                onClick={() => toggleData()}
                            />
                        </>}
                </div>
            </div>
            {!loader.dashboardModuleUsageCount ? (
                series.length > 0 ? (
                    <Chart
                        options={chartOptions}
                        series={series}
                        type="pie"
                        height={400}
                    />) : (
                    <div className="flex items-center justify-center h-full text-center text-gray-500">
                        <NoDataAvailable />
                    </div>
                )

            ) : (
                <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
                    {/* Shimmer effect for chart */}
                    <ShimmerPlaceholder height="300px"
                        width="100%" />
                    <ShimmerPlaceholder height="1.5rem"
                        width="50%" />
                    <ShimmerPlaceholder height="2rem"
                        width="60%" />
                </div>)}
        </div>
    );
};

export default ModuleUsageChart;
