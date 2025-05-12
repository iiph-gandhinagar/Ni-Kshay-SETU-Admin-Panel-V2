import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store";
import { PrimaryBtn } from "../../buttons/primaryBtn";
import NoDataAvailable from "../../custom/NoDataAvailable";
import IconDownload from "../../Icon/IconDownload";
import Heading from "../Heading";
import { ShimmerPlaceholder } from "../ShimmerPlaceholder";

interface AssessmentResponse {
    _id: string | {
        year: number;
        month: number;
    };
    totalSubmitted: number;
}
const AssessmentChart: React.FC = () => {
    const { dashboardData, loader } = useSelector((state: IRootState) => state.dashboard);
    const [seriesData, setSeriesData] = useState<any[]>([]);
    const [categoriesData, setCategoriesData] = useState<string[]>([]);
    const [isLast30Days, setIsLast30Days] = useState<boolean>(false);
    const downloadPNG = () => {
        const chartInstance = ApexCharts.getChartByID("assessmentSubmission" + new Date().toLocaleDateString().replace(/\//g, "_")) as any;
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
                    // Skip hidden series
                    return acc;
                }
                return acc + (seriesData?.reduce?.((sum: number, value: number) => sum + value, 0) || 0);
            }, 0);
            chartInstance.updateOptions({
                title: {
                    text: "Knowledge Quiz",
                    align: "left",
                    style: {
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#333",
                    },
                },
                subtitle: {
                    text: `Total Submissions: ${totalVisibleCount}`,
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
    const processChartData = (
        assessmentData: AssessmentResponse[],
        proAssessmentData: AssessmentResponse[]
    ) => {
        const parseDate = (id: any): Date | null => {
            if (!id) return null;

            if (typeof id === "string") {
                const parts = id.split("-");
                if (parts.length === 2) {
                    const [yearStr, monthStr] = parts;
                    if (yearStr.length === 4) {
                        const year = Number(yearStr);
                        const month = Number(monthStr);
                        if (isNaN(year) || isNaN(month)) {
                            return null;
                        }
                        return new Date(year, month - 1, 1);
                    }
                }
                if (parts.length === 3) {
                    if (parts[0].length === 4) {
                        const [yearStr, monthStr, dayStr] = parts;
                        const year = Number(yearStr);
                        const month = Number(monthStr);
                        const day = Number(dayStr);
                        if (isNaN(year) || isNaN(month) || isNaN(day)) {
                            return null;
                        }
                        return new Date(year, month - 1, day);
                    } else {
                        const [dayStr, monthStr, yearStr] = parts;
                        const day = Number(dayStr);
                        const month = Number(monthStr);
                        const year = Number(yearStr);
                        if (isNaN(day) || isNaN(month) || isNaN(year)) {
                            return null;
                        }
                        return new Date(year, month - 1, day);
                    }
                }
                return null;
            }
            if (typeof id === "object" && id.year && id.month) {
                const year = Number(id.year);
                const month = Number(id.month);
                if (isNaN(year) || isNaN(month)) {
                    return null;
                }
                return new Date(year, month - 1, 1);
            }

            return null;
        };
        const allData = [...assessmentData, ...proAssessmentData]
            .map((item) => {
                const date = parseDate(item._id);
                if (!date) {
                    return null;
                }
                return {
                    date,
                    label: date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "2-digit",
                    }),
                    totalSubmitted: item.totalSubmitted || 0,
                };
            })
            .filter((item): item is { date: Date; label: string; totalSubmitted: number } => item !== null);
        const uniqueData = allData
            .filter(
                (value, index, self) =>
                    self.findIndex((v) => v.label === value.label) === index
            )
            .sort((a, b) => a.date.getTime() - b.date.getTime());
        const sortedLabels = uniqueData.map((item) => item.label);
        const formattedAssessmentSeries = sortedLabels.map((label) =>
            assessmentData.find((item) => {
                const parsedDate = parseDate(item._id);
                if (!parsedDate) return false;
                return parsedDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "2-digit",
                }) === label;
            })?.totalSubmitted || 0
        );

        const formattedProAssessmentSeries = sortedLabels.map((label) =>
            proAssessmentData.find((item) => {
                const parsedDate = parseDate(item._id);
                if (!parsedDate) return false;
                return parsedDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "2-digit",
                }) === label;
            })?.totalSubmitted || 0
        );
        setCategoriesData(sortedLabels);
        setSeriesData([
            { name: "Assessment Responses", data: formattedAssessmentSeries },
            { name: "Pro-active Assessment Responses", data: formattedProAssessmentSeries },
        ]);
    };
    const toggleData = () => {
        setIsLast30Days(!isLast30Days);
        processChartData(
            isLast30Days ? dashboardData?.assessmentResponse ?? [] : dashboardData?.assessmentResponseLast30Days ?? [],
            isLast30Days ? dashboardData?.proassessmentResponse ?? [] : dashboardData?.proassessmentResponseLast30Days ?? []
        );
    };
    const chartOptions: any = {
        chart: {
            id: "assessmentSubmission" + new Date().toLocaleDateString().replace(/\//g, "_"),
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
        xaxis: {
            categories: categoriesData,
            title: {
                text: "Months",
                style: {
                    fontFamily: "'Nunito','Raleway', sans-serif",
                    fontSize: "16px",
                    color: "#4A5568"
                }
            },
        },
        yaxis: {
            title: {
                text: "Submissions",
                style: {
                    fontFamily: "'Nunito','Raleway', sans-serif",
                    fontSize: "16px",
                    color: "#4A5568"
                }
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
            width: 3,
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "light",
                type: "vertical",
                shadeIntensity: 0.5,
                gradientToColors: ["#00C9FF"],
                inverseColors: false,
                opacityFrom: 0.7,
                opacityTo: 0.3,
                stops: [0, 100],
            },
        },
        colors: ["#00C9FF"],
    };
    const chartSeries = seriesData;
    useEffect(() => {
        processChartData(
            dashboardData?.assessmentResponse || [],
            dashboardData?.proassessmentResponse || []
        );
    }, [loader.dashboardAssessmentGraphCount, loader.dashboardProAssessmentGraphCount]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    return (
        <div className="mt-6 bg-white p-2 sm:p-4 md:p-5 lg:p-6 rounded-lg shadow-md">
            <div className="flex justify-between sm:flex-row sm:justify-between items-center mb-4">
                {/* Heading */}
                <Heading className="text-gray-800"
                    title="Knowledge Quiz" />
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
                <div className="hidden sm:flex space-x-2 items-center">
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
            {!loader.dashboardAssessmentGraphCount && !loader.dashboardProAssessmentGraphCount ? (
                seriesData.length > 0 ? (
                    <Chart options={{
                        ...chartOptions,
                        colors: ["#00C9FF", "#FF5733"],
                    }}
                        series={chartSeries}
                        type="area"
                        height={350} />
                ) : (
                    <div className="flex items-center justify-center h-full text-center text-gray-500">
                        <NoDataAvailable />
                    </div>
                )
            ) : (
                <>
                    <div className="p-4 rounded-md shadow">
                        <ShimmerPlaceholder height="1.5rem"
                            width="50%" />
                        <ShimmerPlaceholder height="2rem"
                            width="80%" />
                        <ShimmerPlaceholder height="1rem"
                            width="70%" />
                    </div>
                </>
            )}
        </div>
    );
};

export default AssessmentChart;
