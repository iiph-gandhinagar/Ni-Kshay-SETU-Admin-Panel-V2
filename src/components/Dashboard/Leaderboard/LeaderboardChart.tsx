import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store";
import { PrimaryBtn } from "../../buttons/primaryBtn";
import NoDataAvailable from "../../custom/NoDataAvailable";
import IconDownload from "../../Icon/IconDownload";
import Heading from "../Heading";
import { ShimmerPlaceholder } from "../ShimmerPlaceholder";

interface Level {
    levelName: string;
    count: number;
}

interface LeaderboardData {
    levels: Level[];
    cadreType: string | null;
}

const LeaderboardChart: React.FC = () => {
    const dispatch = useDispatch();
    const { dashboardData, loader } = useSelector((state: IRootState) => state.dashboard);
    const [categories, setCategories] = useState<string[]>([]);
    const [series, setSeries] = useState<any[]>([]);
    const [isLast30Days, setIsLast30Days] = useState(false);
    const processLeaderboardData = (data: LeaderboardData[]) => {
        const levelsSet = new Set<string>();
        const categoriesSet = new Set<string>();
        const levelCounts: Record<string, number[]> = {};
        const levelOrder = ["Beginner", "Advanced Beginner", "Competent", "Proficient", "Expert"];
        const categoryOrder = [
            "International_Level",
            "National_Level",
            "State_Level",
            "District_Level",
            "Block_Level",
            "Health-facility_Level",
        ];

        data.forEach((item) => {
            const cadreType = item.cadreType || "Unknown Level";
            const formattedCadreType = cadreType.replace(/_/g, " ");
            categoriesSet.add(formattedCadreType);

            item.levels.forEach((level) => {
                levelsSet.add(level.levelName);
                levelCounts[level.levelName] = levelCounts[level.levelName] || [];
            });
        });
        const categoriesData = Array.from(categoriesSet).sort(
            (a, b) => categoryOrder.indexOf(a.replace(/ /g, "_")) - categoryOrder.indexOf(b.replace(/ /g, "_"))
        );
        const sortedLevels = Array.from(levelsSet).sort(
            (a, b) => levelOrder.indexOf(a) - levelOrder.indexOf(b)
        );
        sortedLevels.forEach((level) => {
            levelCounts[level] = categoriesData.map((cadreType) => {
                const originalCadreType = cadreType.replace(/ /g, "_");
                const matchedItem = data.find(
                    (item) => (item.cadreType || "Unknown Level") === originalCadreType
                );
                const levelData = matchedItem?.levels.find((lvl) => lvl.levelName === level);
                return levelData?.count || 0;
            });
        });
        setCategories(categoriesData);
        setSeries(
            sortedLevels.map((level) => ({
                name: level,
                data: levelCounts[level],
            }))
        );
    };
    useEffect(() => {
        const leaderboardData = isLast30Days
            ? dashboardData?.leaderboard30Days
            : dashboardData?.leaderboard;
        processLeaderboardData(leaderboardData || []);
    }, [dashboardData, isLast30Days]);

    const toggleData = () => {
        setIsLast30Days(!isLast30Days);
    };
    const downloadPNG = () => {
        const chartInstance = ApexCharts.getChartByID("LeaderBoardCurrentLevels" + new Date().toLocaleDateString().replace(/\//g, "_")) as any;
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
                    text: "Leaderboard",
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
    const chartOptions: any = {
        chart: {
            id: "LeaderBoardCurrentLevels" + new Date().toLocaleDateString().replace(/\//g, "_"),
            type: "bar",
            stacked: true,
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
        },
        xaxis: {
            categories,
            title: {
                text: "Cadre Types",
                style: {
                    fontFamily: "'Nunito','Raleway', sans-serif",
                }
            },
        },
        yaxis: {
            title: {
                text: "Counts",
                style: {
                    fontFamily: "'Nunito','Raleway', sans-serif",
                }
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: [
            "rgba(0, 201, 255, 0.9)",   // Bright Sky Blue
            "rgba(255, 85, 113, 0.9)", // Warm Coral Red
            "rgba(0, 200, 140, 0.9)",  // Fresh Mint Green
            "rgba(138, 100, 230, 0.9)",// Modern Lavender Purple
            "rgba(0, 125, 255, 0.9)"   // Bold Electric Blue
        ],
        legend: {
            position: "right",
            offsetY: 40,
            fontSize: "12px",
            fontFamily: "'Nunito','Raleway', sans-serif", // Font family for the legend
            fontWeight: "bold",
        },
        responsive: [
            {
                breakpoint: 450,
                options: {
                    legend: {
                        position: "bottom",
                        offsetY: 10,
                        fontSize: "12px",
                        fontFamily: "'Nunito','Raleway', sans-serif", // Font family for the legend
                        fontWeight: "bold",
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
                        fontSize: "12px",
                        fontFamily: "'Nunito','Raleway', sans-serif", // Font family for the legend
                        fontWeight: "bold",
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
    return (
        <div className="mt-6 bg-white p-2 sm:p-4 md:p-5 lg:p-6 rounded-lg shadow-md">
            <div className="flex justify-between sm:flex-row sm:justify-between items-center mb-4">
                {/* Heading */}
                <Heading className="text-gray-800"
                    title="Leaderboard" />

                {/* Responsive Buttons */}
                <div className="block sm:hidden relative">
                    {/* Dropdown Button */}
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
                    {/* Dropdown Menu */}
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

                {/* Original Three-Button Layout for Larger Screens */}
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
            {
                !loader.dashboardLeaderboardCount ? (
                    series.length > 0 && categories.length > 0 ? (
                        <Chart options={chartOptions}
                            series={series}
                            type="bar"
                            height={350} />
                    ) : (
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
                )
            }
        </div>
    );
};

export default LeaderboardChart;
