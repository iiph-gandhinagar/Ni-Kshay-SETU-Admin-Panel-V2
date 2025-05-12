import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store";
import { PrimaryBtn } from "../../buttons/primaryBtn";
import NoDataAvailable from "../../custom/NoDataAvailable";
import IconDownload from "../../Icon/IconDownload";
import Heading from "../Heading";
import { ShimmerPlaceholder } from "../ShimmerPlaceholder";

const CadreWiseSubscribers: React.FC = () => {
    const dispatch = useDispatch();
    const [isLast30Days, setIsLast30Days] = useState(false);
    const [series, setSeries] = useState<any>([]);
    const [labels, setLabels] = useState<any>([]);
    const { dashboardData, loader } = useSelector((state: IRootState) => state.dashboard);

    useEffect(() => {
        const data = isLast30Days ? dashboardData?.cadreWiseSubscribersLast30Days : dashboardData?.cadreWiseSubscribers;
        if (data) {
            setSeries(data.map((item) => item.Percentage));
            setLabels(data.map((item) => `${item.CadreName} (${item?.CadreType}) - ${item.Percentage.toFixed(2)}%`));
        }
    }, [isLast30Days, dashboardData]);
    const toggleData = () => {
        setIsLast30Days(!isLast30Days);
    };

    const downloadPNG = () => {
        const chartInstance = ApexCharts.getChartByID("cadreWiseSubscribersChart" + new Date().toLocaleDateString().replace(/\//g, "_"));
        if (chartInstance) {
            chartInstance.updateOptions({
                title: {
                    text: "Cadre wise Users",
                    align: "left",
                    style: {
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#333"
                    }
                },
                subtitle: {
                    text: `Total Users: ${!isLast30Days ? totalCadreCount : last30DaysCount}`, // Add your subtitle here
                    align: "left",
                    style: {
                        fontSize: "12px",
                        color: "#333",
                    },
                },
            });
            setTimeout(async () => {
                await chartInstance.exports.exportToPng();
                chartInstance.updateOptions({
                    title: {
                        text: `Total Users: ${!isLast30Days ? totalCadreCount : last30DaysCount}`,
                        align: "left",
                        style: {
                            fontSize: "14px",
                            color: "#333"
                        }
                    },
                    subtitle: {
                        text: ""
                    }
                });
            }, 300);
        }
        else {
            console.error("Chart instance not found");
        }
    };

    const totalCadreCount = dashboardData?.cadreWiseSubscribers?.reduce((acc, item) => acc + item.TotalCadreCount, 0); // Sum total count
    const last30DaysCount = dashboardData?.cadreWiseSubscribersLast30Days?.reduce((acc, item) => acc + item.TotalCadreCount, 0); // Sum total count


    const chartOptions: ApexCharts.ApexOptions = {
        chart: {
            type: "polarArea",
            id: "cadreWiseSubscribersChart" + new Date().toLocaleDateString().replace(/\//g, "_"),
            toolbar: {
                show: false,
            },
        },
        title: {
            text: `Total Users: ${!isLast30Days ? totalCadreCount : last30DaysCount}`,
            align: "left",
            style: {
                fontSize: "14px",
                color: "#333"
            }
        },
        labels,
        stroke: {
            colors: ["#fff"],
        },
        fill: {
            opacity: 0.9,
        },
        colors: [
            "rgba(0, 208, 198, 0.95)",
            "rgba(144, 125, 255, 0.95)",
            "rgba(134, 216, 98, 0.95)",
            "rgba(255, 199, 107, 0.95)",
            "rgba(241, 143, 143, 0.95)",
        ],
        legend: {
            position: "bottom",
            fontSize: "12px",
            fontFamily: "'Nunito', 'Raleway', sans-serif",
            fontWeight: "bold",
            itemMargin: { vertical: 2, horizontal: 3 },
            formatter: (seriesName, opts) => labels[opts.seriesIndex],
        },
        plotOptions: {
            polarArea: {
                rings: {
                    strokeWidth: 1,
                    strokeColor: "#e9e9e9",
                },
                spokes: {
                    strokeWidth: 1,
                    connectorColors: "#e9e9e9",
                },
            },
        },
        yaxis: {
            show: false,
        },
        tooltip: {
            enabled: true,
            y: {
                formatter: (value, { seriesIndex }) => {
                    return `${labels[seriesIndex]}: ${value.toLocaleString()}`;
                }
            },
            x: {
                show: false,
            },
            custom: ({ series, seriesIndex, w }) => {
                const color = w.config.colors[seriesIndex];
                return `<div style="
                    padding: 8px;
                    font-size: 12px;
                    font-family: 'Nunito', sans-serif;
                    background: ${color};
                    color: #fff;
                    border-radius: 5px;
                    text-align: center;
                    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
                ">
                    ${labels[seriesIndex]}
                </div>`;
            },
            style: {
                fontSize: "12px",
                fontFamily: "'Nunito', sans-serif",
            },
            theme: "dark",
        },
    };


    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="mt-6 bg-white p-2 sm:p-4 md:p-5 lg:p-6 rounded-lg shadow-md w-full">
            <div className="flex justify-between items-center mb-4">
                {/* Heading */}
                <Heading className="text-gray-800"
                    title="Cadre wise Users" />
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
                            {!window.location.search && (
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
                            )}
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
                    {!window.location.search && (
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
                        </>
                    )}
                </div>
            </div>
            {loader.dashboardCadreWiseCount ? (
                <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
                    {/* Shimmer effect for chart */}
                    <ShimmerPlaceholder height="300px"
                        width="100%" />
                    <ShimmerPlaceholder height="1.5rem"
                        width="50%" />
                    <ShimmerPlaceholder height="2rem"
                        width="60%" />
                </div>
            ) : !series?.length || series?.every((item: any) => item === 0) ? (
                <div className="flex items-center justify-center h-full text-center text-gray-500">
                    <NoDataAvailable />
                </div>
            ) : (
                <div className="h-[400px]">
                    <ReactApexChart
                        options={chartOptions}
                        series={series}
                        type="polarArea"
                        height="100%"
                    />
                </div>
            )}
        </div>
    );
};

export default CadreWiseSubscribers;
