import { useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store";
import { PrimaryBtn } from "../../buttons/primaryBtn";
import NoDataAvailable from "../../custom/NoDataAvailable";
import IconDownload from "../../Icon/IconDownload";
import Heading from "../Heading";
import { ShimmerPlaceholder } from "../ShimmerPlaceholder";

const QueryToCoe = () => {
    const { dashboardData, loader } = useSelector((state: IRootState) => state.dashboard);
    const [isLast30Days, setIsLast30Days] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleData = () => setIsLast30Days((prev) => !prev);

    const currentDrtbCounts = isLast30Days ? dashboardData?.drtbCountsLast30Days : dashboardData?.drtbCounts || [];
    const drtbPieChartData = {
        labels: currentDrtbCounts
            ?.filter((item: any) => item?._id?.statusCategory)
            .map((item: any) => item._id.statusCategory) || [],
        series: currentDrtbCounts
            ?.filter((item: any) => typeof item?.count === "number")
            .map((item: any) => item.count) || [],
    };

    const currentCoeCounts = isLast30Days ? dashboardData?.coeCountsLast30Days : dashboardData?.coeCounts || [];
    const coePieChartData = {
        labels: currentCoeCounts
            ?.filter((item: any) => item?._id?.statusCategory)
            .map((item: any) => item._id.statusCategory) || [],
        series: currentCoeCounts
            ?.filter((item: any) => typeof item?.count === "number")
            .map((item: any) => item.count) || [],
    };

    const currentNodalData = isLast30Days ? dashboardData?.nodalLast30Days : dashboardData?.nodal || {};
    const nodalPieChartData = {
        labels: ["Open Queries", "Closed Queries Responded", "Closed Queries Pending", "Resolved Queries", "Raised Queries"],
        series: [
            currentNodalData?.openQueries?.reduce((sum: number, q: any) => sum + (q?.openQueries || 0), 0) || 0,
            currentNodalData?.closedQueries?.reduce((sum: number, q: any) => sum + (q?.closedQueriesResponded || 0), 0) || 0,
            currentNodalData?.closedQueries?.reduce((sum: number, q: any) => sum + (q?.closedQueriesPending || 0), 0) || 0,
            currentNodalData?.resolvedQuery?.reduce((sum: number, q: any) => sum + (q?.closedQueries || 0), 0) || 0,
            currentNodalData?.raisedQuery?.reduce((sum: number, q: any) => sum + (q?.openQueries || 0), 0) || 0,
        ],
    };
    const handleDownload = (chart: string) => {
        const dateSuffix = new Date().toLocaleDateString().replace(/\//g, "_");
        let title: string;
        let chartInstance: any;
        switch (chart) {
            case "chartDrtb":
                chartInstance = ApexCharts.getChartByID("DRTBStatus" + dateSuffix);
                title = "District DRTB Status" as string;
                break;
            case "chartCoe":
                chartInstance = ApexCharts.getChartByID("COEStatus" + dateSuffix);
                title = "COE Status";
                break;
            case "chartNodal":
                chartInstance = ApexCharts.getChartByID("NodalQueries" + dateSuffix);
                title = "Nodal DRTB Status";
                break;
            default:
                chartInstance = ApexCharts.getChartByID("moduleUsage" + dateSuffix) as any;
                title = "" as string;
                break;
        }
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
                    text: title,
                    align: "left",
                    style: {
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#333",
                    },
                },
                subtitle: {
                    text: `Total: ${totalVisibleCount}`,
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
    const isChartDataEmpty = (labels: any[], series: any[]) => !labels.length || !series.length;
    const isNodalDataEmpty = (series: any[]) => series?.every((item: number) => item === 0);

    return (
        <div className="mt-6 bg-white p-2 sm:p-4 md:p-5 lg:p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <Heading className="text-gray-800"
                    title="Query2COE" />
                <div className="flex space-x-2 items-center">
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
                    <div className="hidden sm:flex space-x-2 items-center">
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
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loader.dashboardQuery2coeCount ? (
                    <>
                        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                            <ShimmerPlaceholder height="1.5rem"
                                width="50%" />
                            <ShimmerPlaceholder height="2rem"
                                width="80%" />
                            <ShimmerPlaceholder height="1rem"
                                width="70%" />
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                            <ShimmerPlaceholder height="1.5rem"
                                width="50%" />
                            <ShimmerPlaceholder height="2rem"
                                width="80%" />
                            <ShimmerPlaceholder height="1rem"
                                width="70%" />
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                            <ShimmerPlaceholder height="1.5rem"
                                width="50%" />
                            <ShimmerPlaceholder height="2rem"
                                width="80%" />
                            <ShimmerPlaceholder height="1rem"
                                width="70%" />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="p-4 bg-white rounded-lg shadow-md">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">District DRTB Status</h3>
                                <PrimaryBtn
                                    title=""
                                    rightIcon={<IconDownload />}
                                    onClick={() => handleDownload("chartDrtb")}
                                    className="px-4 py-2 rounded-md bg-[#5584AC] text-white hover:bg-[#446989] transition-colors duration-200"
                                />
                            </div>
                            {isChartDataEmpty(drtbPieChartData.labels, drtbPieChartData.series) ? (
                                <NoDataAvailable isSmall={true} />
                            ) : (
                                <Chart
                                    options={{
                                        chart: {
                                            id: "DRTBStatus" + new Date().toLocaleDateString().replace(/\//g, "_"),
                                            type: "pie",
                                            toolbar: { show: false }, // No toolbar
                                        },
                                        labels: drtbPieChartData.labels,
                                        colors: [
                                            "rgba(0, 208, 198, 0.95)",
                                            "rgba(144, 125, 255, 0.95)",
                                            "rgba(134, 216, 98, 0.95)",
                                            "rgba(255, 199, 107, 0.95)",
                                            "rgba(241, 143, 143, 0.95)"
                                        ],
                                        legend: {
                                            position: "bottom", offsetY: 10, fontSize: "12px",
                                            fontFamily: "'Nunito','Raleway', sans-serif", // Font family for the legend
                                            fontWeight: "bold", // Font family for the legend
                                        },
                                    }}
                                    series={drtbPieChartData.series}
                                    type="pie"
                                    height={300}
                                />
                            )}
                        </div>
                        <div className="p-4 bg-white rounded-lg shadow-md">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Nodal DRTB Status</h3>
                                <PrimaryBtn
                                    title=""
                                    rightIcon={<IconDownload />}
                                    onClick={() => handleDownload("chartNodal")}
                                    className="px-4 py-2 rounded-md bg-[#5584AC] text-white hover:bg-[#446989] transition-colors duration-200"
                                />
                            </div>
                            {isNodalDataEmpty(nodalPieChartData.series) ? (
                                <NoDataAvailable isSmall={true} />
                            ) : (
                                <Chart
                                    options={{
                                        chart: {
                                            id: "NodalQueries" + new Date().toLocaleDateString().replace(/\//g, "_"),
                                            type: "pie",
                                            toolbar: { show: false }, // No toolbar
                                        },
                                        labels: nodalPieChartData.labels,
                                        colors: [
                                            "rgba(0, 208, 198, 0.95)",
                                            "rgba(144, 125, 255, 0.95)",
                                            "rgba(134, 216, 98, 0.95)",
                                            "rgba(255, 199, 107, 0.95)",
                                            "rgba(241, 143, 143, 0.95)"
                                        ], legend: {
                                            position: "bottom", offsetY: 10, fontSize: "12px",
                                            fontFamily: "'Nunito','Raleway', sans-serif", // Font family for the legend
                                            fontWeight: "bold",
                                        },
                                    }}
                                    series={nodalPieChartData.series}
                                    type="pie"
                                    height={350}
                                />
                            )}
                        </div>
                        <div className="p-4 bg-white rounded-lg shadow-md">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">COE Status</h3>
                                <PrimaryBtn
                                    title=""
                                    rightIcon={<IconDownload />}
                                    onClick={() => handleDownload("chartCoe")}
                                    className="px-4 py-2 rounded-md bg-[#5584AC] text-white hover:bg-[#446989] transition-colors duration-200"
                                />
                            </div>
                            {isChartDataEmpty(coePieChartData.labels, coePieChartData.series) ? (
                                <NoDataAvailable isSmall={true} />
                            ) : (
                                <Chart
                                    options={{
                                        chart: {
                                            id: "COEStatus" + new Date().toLocaleDateString().replace(/\//g, "_"),
                                            type: "pie",
                                            toolbar: { show: false }, // No toolbar
                                        },
                                        labels: coePieChartData.labels,
                                        colors: [
                                            "rgba(0, 208, 198, 0.95)",
                                            "rgba(144, 125, 255, 0.95)",
                                            "rgba(134, 216, 98, 0.95)",
                                            "rgba(255, 199, 107, 0.95)",
                                            "rgba(241, 143, 143, 0.95)"
                                        ], legend: {
                                            position: "bottom", offsetY: 10, fontSize: "12px",
                                            fontFamily: "'Nunito','Raleway', sans-serif", // Font family for the legend
                                            fontWeight: "bold",
                                        },
                                    }}
                                    series={coePieChartData.series}
                                    type="pie"
                                    height={300}
                                />
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default QueryToCoe;
