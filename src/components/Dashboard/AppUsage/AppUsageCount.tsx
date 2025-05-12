import { Modal } from "@mantine/core";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store";
import { getDashboardAppOpenedCount } from "../../../store/reducer/dashboard.reducer";
import { PrimaryBtn } from "../../buttons/primaryBtn";
import NoDataAvailable from "../../custom/NoDataAvailable";
import IconDownload from "../../Icon/IconDownload";
import IconInfoCircle from "../../Icon/IconInfoCircle";
import Heading from "../Heading";
import { ShimmerPlaceholder } from "../ShimmerPlaceholder";

const AppOpenCountChart: React.FC = () => {
    const { dashboardData, loader } = useSelector((state: IRootState) => state.dashboard);
    const [isWeekly, setIsWeekly] = useState(false);
    const [chartData, setChartData] = useState<{ categories: string[]; series: any[] }>({
        categories: [],
        series: [],
    });
    useEffect(() => {
        if (!dashboardData) return;

        const appOpenData = isWeekly
            ? dashboardData?.appOpened4WeeksCount
            : dashboardData?.appOpened4MonthCount;
        if (appOpenData) {
            const sortedData = [...appOpenData].sort((a, b) => {
                const getStartDate = (dateRange: string) => {
                    const [startDate] = dateRange.split("/");
                    const [month, day] = startDate.split("-");
                    const monthInt = parseInt(month);
                    const year = monthInt >= 10 ? 2022 : 2023;
                    return new Date(year, monthInt - 1, parseInt(day));
                };

                return getStartDate(a.date).getTime() - getStartDate(b.date).getTime();
            });

            // Use sortedData for both categories and series
            const categories = sortedData.map((item: any) => item.date);
            const series = [
                {
                    name: "3-5",
                    data: sortedData.map((item: any) => item.range3To5), // Use sortedData here
                },
                {
                    name: "5-7",
                    data: sortedData.map((item: any) => item.range5To7), // Use sortedData here
                },
                {
                    name: "7-9",
                    data: sortedData.map((item: any) => item.range7To9), // Use sortedData here
                },
                {
                    name: ">10",
                    data: sortedData.map((item: any) => item.rangeGte10), // Use sortedData here
                },
            ];

            setChartData({ categories, series });
        }
    }, [isWeekly, dashboardData]);

    const toggleData = () => {
        setIsWeekly(!isWeekly);
    };
    const downloadPNG = () => {
        const chartInstance = ApexCharts.getChartByID("appOpenCount" + new Date().toLocaleDateString().replace(/\//g, "_")) as any;
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
                if (chartGlobals.collapsedSeriesIndices?.includes(seriesIndex)) {
                    return acc;
                }
                return acc + (seriesData?.reduce?.((sum: number, value: number) => sum + value, 0) || 0);
            }, 0);
            chartInstance.updateOptions({
                title: {
                    text: "App Open Count",
                    align: "left",
                    style: {
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#333",
                    },
                },
                subtitle: {
                    text: `Total Counts: ${totalVisibleCount}`,
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
            id: "appOpenCount" + new Date().toLocaleDateString().replace(/\//g, "_"),
            type: "line",
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
            zoom: { enabled: false, },
        },
        stroke: {
            curve: "smooth",
        },
        xaxis: {
            categories: chartData.categories,
            title: {
                text: "Date Range",
                style: {
                    fontFamily: "'Nunito','Raleway', sans-serif",
                }
            },
        },
        yaxis: {
            title: {
                text: "Count",
                style: {
                    fontFamily: "'Nunito','Raleway', sans-serif",
                }
            },
        },
        tooltip: {
            shared: true,
            intersect: false,
        },
        legend: {
            position: "right",
            fontSize: "12px",
            fontFamily: "'Nunito','Raleway', sans-serif", // Font family for the legend
            fontWeight: "bold", // Bold text
            offsetY: 40,
        },
        colors: ["#FFA500", "#007BFF", "#800080", "#32CD32"],
        responsive: [
            {
                breakpoint: 450,
                options: {
                    legend: {
                        position: "bottom",
                        offsetY: 10,
                        fontFamily: "'Nunito','Raleway', sans-serif", // Font family for the legend
                        fontSize: "12px",
                        fontWeight: "bold", // Bold text
                    },
                    chart: {
                        height: 400,
                    },
                },
            },
            {
                breakpoint: 768,
                options: {
                    legend: {
                        position: "bottom",
                        fontFamily: "'Nunito','Raleway', sans-serif", // Font family for the legend
                        fontSize: "12px",
                        fontWeight: "bold", // Bold text
                    },
                    chart: {
                        height: 400,
                    },
                },
            },
            {
                breakpoint: 1024,
                options: {
                    chart: {
                        height: 400,
                    },
                },
            },
            {
                options: {
                    chart: {
                        height: 400,
                    },
                },
            },
        ],
    };
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const openInfoModal = () => {
        setIsInfoModalOpen(true);
    };

    const closeInfoModal = () => {
        setIsInfoModalOpen(false);
    };
    useEffect(() => {
        dispatch(getDashboardAppOpenedCount(isWeekly ? "week" : "month"));
    }, [isWeekly]);
    return (
        <div className="mt-6 bg-white p-2 sm:p-4 md:p-5 lg:p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                {/* Heading */}
                <Heading className="text-gray-800"
                    title="App Open Count" />

                {/* Buttons Container */}
                <div className="flex items-center space-x-2">
                    {/* Info Button */}
                    <button
                        className="px-4 py-2 rounded-md bg-[#5584AC] text-white hover:bg-[#446989] flex items-center transition-colors duration-200"
                        onClick={openInfoModal}
                    >
                        <IconInfoCircle className="w-5 h-5 scale-125" />
                    </button>

                    {/* Dropdown for Small Screens */}
                    <div className="block sm:hidden relative">
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
                                <>
                                    <button
                                        className={`block px-4 py-2 w-full text-left ${!isWeekly ? "text-blue-500" : "text-gray-800"} hover:bg-gray-100 transition-colors duration-200`}
                                        onClick={() => {
                                            setDropdownOpen(false);
                                            toggleData();
                                        }}
                                    >
                                        Monthly
                                    </button>
                                    <button
                                        className={`block px-4 py-2 w-full text-left ${isWeekly ? "text-blue-500" : "text-gray-800"} hover:bg-gray-100 transition-colors duration-200`}
                                        onClick={() => {
                                            setDropdownOpen(false);
                                            toggleData();
                                        }}
                                    >
                                        Weekly
                                    </button>
                                </>
                            </div>
                        )}
                    </div>

                    {/* Buttons for Larger Screens */}
                    <div className="hidden sm:flex space-x-2 items-center">
                        <PrimaryBtn
                            title=""
                            rightIcon={<IconDownload />}
                            className="px-4 py-2 rounded-md bg-[#5584AC] text-white hover:bg-[#446989] transition-colors duration-200"
                            onClick={() => {
                                downloadPNG();
                            }}
                        />
                        <>
                            <PrimaryBtn
                                title="Monthly"
                                className={`px-4 py-2 rounded-md ${!isWeekly ? "bg-[#5584AC] text-white hover:bg-[#446989]" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-colors duration-200`}
                                onClick={() => toggleData()}
                            />
                            <PrimaryBtn
                                title="Weekly"
                                className={`px-4 py-2 rounded-md ${isWeekly ? "bg-[#5584AC] text-white hover:bg-[#446989]" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-colors duration-200`}
                                onClick={() => toggleData()}
                            />
                        </>
                    </div>
                </div>
            </div>

            {/* Chart or Placeholder */}
            {!loader.dashboardAppOpenedCount ? (
                chartData.series.length > 0 ? (
                    <Chart options={chartOptions}
                        series={chartData.series}
                        type="line"
                        height={350} />) : (
                    <div className="flex items-center justify-center h-full text-center text-gray-500">
                        <NoDataAvailable />
                    </div>
                )
            ) : (
                <div className="p-4 rounded-md shadow">
                    <ShimmerPlaceholder height="1.5rem"
                        width="50%" />
                    <ShimmerPlaceholder height="2rem"
                        width="80%" />
                    <ShimmerPlaceholder height="1rem"
                        width="70%" />
                </div>
            )}

            {/* Info Modal */}
            <Modal opened={isInfoModalOpen}
                onClose={closeInfoModal}>
                <div className="p-4">
                    <h3 className="text-lg font-bold mb-4">User Visit Count Ranges</h3>
                    <p>Categorize users into four ranges based on their visitCount:</p>
                    <ul className="list-disc list-inside mt-2">
                        <li><strong>3–5 visits</strong>: Number of users with 3 to 5 visits.</li>
                        <li><strong>5–7 visits</strong>: Number of users with 5 to 7 visits.</li>
                        <li><strong>7–9 visits</strong>: Number of users with 7 to 9 visits.</li>
                        <li><strong>10 or more visits</strong>: Number of users with 10 or more visits.</li>
                    </ul>
                    <button
                        className="mt-4 px-4 py-2 rounded-md bg-[#5584AC] text-white hover:bg-[#446989] transition-colors duration-200"
                        onClick={closeInfoModal}
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default AppOpenCountChart;
