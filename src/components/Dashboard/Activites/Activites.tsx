
import rasterizeHTML from "rasterizehtml";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IRootState } from "../../../store";
import { getDashboardAssessmentCount, getDashboardSubscriberCount, getDashboardVisitorCount, setAllLoaders } from "../../../store/reducer/dashboard.reducer";
import { getQueryParam, hasPermission } from "../../../utils/functions";
import { PrimaryBtn } from "../../buttons/primaryBtn";
import Loader from "../../custom/Loader";
import NoDataAvailable from "../../custom/NoDataAvailable";
import IconDownload from "../../Icon/IconDownload";
import IconEye from "../../Icon/IconEye";
import IconTxtFile from "../../Icon/IconTxtFile";
import IconUsers from "../../Icon/IconUsers";
import Heading from "../Heading";

const Activities = () => {
    const { dashboardData, loader } = useSelector((state: IRootState) => state.dashboard);
    const [filter, setFilter] = useState("total");
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const [animatedSubscribers, setAnimatedSubscribers] = useState(0);
    const [animatedVisitors, setAnimatedVisitors] = useState(0);
    const [animatedAssessments, setAnimatedAssessments] = useState(0);
    const { authUser } = useSelector((state: IRootState) => state?.auth);
    const navigate = useNavigate();
    const noFilterApplied = () => {
        const fromDate = getQueryParam("fromDate");
        const toDate = getQueryParam("toDate");
        const state = getQueryParam("state");
        return fromDate == null && toDate == null && state == null;
    };
    const [downloadFlag, setDownloadFlag] = useState(false);
    const getLast12Months = useMemo(() => {
        const months = [];
        const date = new Date();
        // Start from current month and go back 11 months
        date.setMonth(date.getMonth()); // Adjust to include current month
        for (let i = 0; i < 12; i++) {
            months.push(date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short"
            }));
            date.setMonth(date.getMonth() - 1);
        }
        return months.reverse(); // Reverse once at the end
    }, []);
    const preprocessData = useCallback((dashboardData?: any,) => {
        if (filter === "today" && noFilterApplied()) {
            const allHours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
            const hoursData = new Array(24).fill(0);
            dashboardData?.forEach((item: any) => {
                const hour = parseInt(item._id, 10);
                if (!isNaN(hour) && hour >= 0 && hour < 24) {
                    hoursData[hour] = item.count;
                }
            });
            return { categories: allHours, series: hoursData };
        }
        if (!noFilterApplied()) {
            const filteredData = dashboardData?.map((item: any) => {
                const isSpecificDay = item._id?.length === 10; // Check if it's a specific day format
                // Parse the date based on format
                const date = isSpecificDay
                    ? item._id // DD-MMM-YYYY
                    : new Date(item._id + "-01")?.toLocaleDateString("en-US", { month: "short", year: "numeric" }) || new Date(); // MMM-YYYY

                return {
                    date,
                    count: item.count,
                };
            }) || [];

            return {
                categories: filteredData.slice(-12).map((item: any) => item.date),
                series: filteredData.slice(-12).map((item: any) => item.count),
            };
        }
        if (filter === "total" && noFilterApplied()) {
            const dataMap = new Map();
            getLast12Months.forEach(month => dataMap.set(month, 0));
            dashboardData?.forEach((item: any) => {
                const date = new Date(item._id);
                const formattedDate = date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short"
                });
                dataMap.set(formattedDate, (dataMap.get(formattedDate) || 0) + item.count);
            });

            return {
                categories: getLast12Months,
                series: getLast12Months.map(month => dataMap.get(month))
            };
        }
    }, [filter, getLast12Months]);
    const totalSubscribersData = preprocessData(dashboardData?.totalSubscriber);
    const totalVisitorData = preprocessData(dashboardData?.totalVisitor);
    const totalAssessmentData = preprocessData(dashboardData?.totalAssessment);
    const todaysSubscriberData = preprocessData(dashboardData?.todaysSubscriber);
    const todaysVisitorData = preprocessData(dashboardData?.todaysVisitor);
    const todaysAssessmentData = preprocessData(dashboardData?.todaysAssessment);

    const generateChartOptions = (categories: string[], id: string, color: {
        primary: string,
        secondary: string,
    }): any => ({
        chart: {
            id: id,
            type: "area",
            height: 150,
            toolbar: {
                show: false,
            },
            zoom: { enabled: false, },
            animations: {
                enabled: true,
                easing: "easeinout",
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150,
                },
            },
        },
        stroke: {
            curve: "smooth",
            width: 2,
            colors: [color.primary]
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [50, 100],
                colorStops: [
                    { offset: 0, color: color.primary, opacity: 0.4 },
                    { offset: 100, color: color.primary, opacity: 0.1 }
                ]
            }
        },
        grid: {
            show: true,
            borderColor: "#f3f4f6",
            strokeDashArray: 4,
            xaxis: {
                lines: {
                    show: true,
                },
            },
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories,
            labels: {
                style: {
                    colors: "#9CA3AF",
                    fontSize: "10px",
                },
                formatter: (value: string, timestamp: number, index: number) => {
                    if (index === categories?.length - 1) {
                        return value;
                    }
                    return value;
                },
            },
            axisBorder: { show: false },
            axisTicks: { show: false },
            tickAmount: 12,
            forcedTickRotation: 0, // Add this to ensure exact tick count
            tickPlacement: "on",
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#9CA3AF",
                    fontSize: "12px",
                },
            },
            show: downloadFlag,
        },
        tooltip: {
            x: { format: filter === "today" ? "HH:00" : "MMM yyyy" },
            y: {
                formatter: (value: any) => `${value.toLocaleString()}`,
            },
        },
        colors: [color.primary],
        responsive: [
            {
                breakpoint: 1024,
                options: {
                    chart: {
                        height: 200,
                    },
                    xaxis: {
                        categories,
                        labels: {
                            style: {
                                colors: "#9CA3AF",
                                fontSize: "12px",
                            },
                        },
                    },
                },
            },
            {
                breakpoint: 1100,
                options: {
                    chart: {
                        height: 200,
                    },
                    xaxis: {
                        categories,
                        labels: {
                            style: {
                                colors: "#9CA3AF",
                                fontSize: "8px",
                            },
                        },
                    },
                },
            },
            {
                breakpoint: 768,
                options: {
                    chart: {
                        height: 200,
                    },
                    xaxis: {
                        categories,
                        labels: {
                            style: {
                                colors: "#9CA3AF",
                                fontSize: "12px",
                            },
                        },
                    },
                },
            },
            {
                options: {
                    chart: {
                        height: 200,
                        xaxis: {
                            categories,
                            labels: {
                                style: {
                                    colors: "#9CA3AF",
                                    fontSize: "12px",
                                },
                            },
                        },
                    },
                },
            },
        ],
    });
    const getChartData = (dataType: string) => {
        switch (dataType) {
            case "totalSubscriber":
                return filter === "total" ? totalSubscribersData?.series : todaysSubscriberData?.series;
            case "totalVisitor":
                return filter === "total" ? totalVisitorData?.series : todaysVisitorData?.series;
            case "totalAssessment":
                return filter === "total" ? totalAssessmentData?.series : todaysAssessmentData?.series;
            default:
                return [];
        }
    };

    const totalSubscribersOptions = useMemo(() => generateChartOptions(totalSubscribersData?.categories, "Users" + new Date().toLocaleDateString().replace(/\//g, "_"), { primary: "#FF4560", secondary: "#FF456015" }), [totalSubscribersData]);
    const totalVisitorOptions = useMemo(() => generateChartOptions(totalVisitorData?.categories, "Visits" + new Date().toLocaleDateString().replace(/\//g, "_"), { primary: "#00E396", secondary: "#00E39615" }), [totalVisitorData]);
    const totalAssessmentOptions = useMemo(() => generateChartOptions(totalAssessmentData?.categories, "AssessmentsCompleted" + new Date().toLocaleDateString().replace(/\//g, "_"), { primary: "#775DD0", secondary: "#775DD015" }), [totalAssessmentData]);
    const totalSubscribers = dashboardData?.totalSubscriberCount || 0;
    const totalVisitors = (dashboardData?.totalVisitorCount ?? 0);
    const totalAssessments = (dashboardData?.totalCompletedAssessment ?? 0);
    const todaysSubscriberCount = dashboardData?.todaysSubscriberCount || 0;
    const todaysVisitorCount = dashboardData?.todaysVisitorCount || 0;
    const todaysCompletedAssessment = dashboardData?.todaysCompletedAssessment || 0;

    const animateCount = (target: number, setCount: React.Dispatch<React.SetStateAction<number>>) => {
        let start = 0;
        const duration = 500;
        const increment = target / (duration / 50);

        const interval = setInterval(() => {
            start += increment;
            if (start >= target) {
                clearInterval(interval);
                setCount(target);
            } else {
                setCount(Math.floor(start));
            }
        }, 50);

        return () => clearInterval(interval);
    };

    useEffect(() => {
        if (filter === "total") {
            const clearSubscribers = animateCount(totalSubscribers, setAnimatedSubscribers);
            const clearVisitors = animateCount(totalVisitors, setAnimatedVisitors);
            const clearAssessments = animateCount(totalAssessments, setAnimatedAssessments);
            return () => {
                clearSubscribers();
                clearVisitors();
                clearAssessments();
            };
        } else {
            const clearSubscribers = animateCount(todaysSubscriberCount, setAnimatedSubscribers);
            const clearVisitors = animateCount(todaysVisitorCount, setAnimatedVisitors);
            const clearAssessments = animateCount(todaysCompletedAssessment, setAnimatedAssessments);
            return () => {
                clearSubscribers();
                clearVisitors();
                clearAssessments();
            };
        }
    }, [totalSubscribers, totalVisitors, totalAssessments, filter]);

    const handleDownload = async (id: string) => {
        const dateSuffix = new Date().toLocaleDateString().replace(/\//g, "_");
        const chart: HTMLElement | null = document.getElementById(id);
        setDownloadFlag(true);
        if (!chart) {
            console.error("Chart element not found");
            setDownloadFlag(false);
            return;
        }
        try {
            await new Promise((resolve) => setTimeout(resolve, 100));
            const rect = chart.getBoundingClientRect();
            const desiredScale = 2;
            const scaledWidth = rect.width * desiredScale;
            const scaledHeight = rect.height * desiredScale;

            const htmlContent = `
            <html>
              <head>
                ${document.head.innerHTML}
                <style>
                  html, body {
                    margin: 0;
                    padding: 0;
                    background-color: white;
                  }
                  body {
                    width: ${scaledWidth}px;
                    height: ${scaledHeight}px;
                  }
                  .chart-wrapper {
                    transform: scale(${desiredScale});
                    transform-origin: top left;
                    width: ${rect.width + 10}px;
                    height: ${rect.height}px;
                  }
                </style>
              </head>
              <body>
                <div class="chart-wrapper">
                  ${chart.outerHTML}
                </div>
              </body>
            </html>
          `;
            const canvas = document.createElement("canvas");
            const dpr = window.devicePixelRatio || 1;
            canvas.width = scaledWidth * dpr;
            canvas.height = scaledHeight * dpr;
            const context = canvas.getContext("2d");
            if (context) {
                context.scale(dpr, dpr);
            }
            await rasterizeHTML.drawHTML(htmlContent, canvas);
            const imageUrl = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = imageUrl;
            link.download = `${id}-${dateSuffix}.png`;
            link.click();
        } catch (error) {
            console.error("Error during image download:", error);
        } finally {
            setDownloadFlag(false);
        }
    };




    const dispatch = useDispatch();
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        if (filter === "today" && !window.location.search) {
            searchParams.set("type", "today");
            const updatedSearch = searchParams.toString();
            dispatch(getDashboardVisitorCount(`?${updatedSearch}`));
            dispatch(getDashboardSubscriberCount(`?${updatedSearch}`));
            dispatch(getDashboardAssessmentCount(`?${updatedSearch}`));
        } else {
            searchParams.set("type", "total");
            const updatedSearch = searchParams.toString();
            dispatch(getDashboardVisitorCount(`?${updatedSearch}`));
            dispatch(getDashboardSubscriberCount(`?${updatedSearch}`));
            dispatch(getDashboardAssessmentCount(`?${updatedSearch}`));
        }
    }, [filter, window.location.search]);
    useEffect(() => {
        dispatch(setAllLoaders());
    }, []);
    return (
        <div className="mt-6 bg-white p-2 sm:p-4 md:p-5 lg:p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <Heading title="Activites" />
                <div className="flex gap-2">
                    {!window.location.search && (
                        <>
                            <PrimaryBtn
                                title="Total"
                                className={`px-4 py-2 rounded-md ${filter === "total" ? "bg-[#5584AC] text-white hover:bg-[#446989]" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-colors duration-200`}
                                onClick={() => setFilter("total")}
                            />
                            <PrimaryBtn
                                title="Today"
                                className={`px-4 py-2 rounded-md ${filter === "today" ? "bg-[#5584AC] text-white hover:bg-[#446989]" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-colors duration-200`}
                                onClick={() => setFilter("today")}
                            />
                        </>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap gap-6">
                <>
                    {[
                        {
                            title: "Users",
                            key: "totalSubscriber",
                            id: "totalSubscriber",
                            animatedValue: animatedSubscribers,
                            totalValue: totalSubscribers,
                            todayValue: todaysSubscriberCount,
                            options: totalSubscribersOptions,
                            permissionKey: "admin.subscriber.index",
                            navigatePath: "/report/subscriber",
                            colors: { primary: "#FF4560", secondary: "#FF456015" },
                            rename: true,
                            icon: <IconUsers className="w-8 h-8" />,
                            loader: loader.dashboardSubscriberCount
                        },
                        {
                            title: "Visits",
                            key: "totalVisitor",
                            id: "totalVisitor",
                            animatedValue: animatedVisitors,
                            totalValue: totalVisitors,
                            todayValue: todaysVisitorCount,
                            options: totalVisitorOptions,
                            permissionKey: "admin.subscriber-activity.index",
                            navigatePath: "/reports/subscriber_activity",
                            colors: { primary: "#00E396", secondary: "#00E39615" },
                            icon: <IconEye className="w-8 h-8" />,
                            loader: loader.dashboardVisitorCount
                        },
                        {
                            title: "Assessments",
                            key: "totalAssessment",
                            id: "totalAssessment",
                            animatedValue: animatedAssessments,
                            totalValue: totalAssessments,
                            todayValue: todaysCompletedAssessment,
                            options: totalAssessmentOptions,
                            permissionKey: "admin.user-assessment.index",
                            navigatePath: "/reports/user_assessments",
                            colors: { primary: "#775DD0", secondary: "#775DD015" },
                            icon: <IconTxtFile className="w-8 h-8" />,
                            loader: loader.dashboardAssessmentCount
                        },
                    ].map((card, index) => (
                        card.loader ?
                            <div key={index}
                                className="shadow-md flex-grow flex-1 rounded-xl min-w-[300px] flex flex-col items-center justify-center p-4 border border-gray-200">
                                <Loader />
                            </div> : <div
                                id={card.id}
                                key={index}
                                className="bg-white shadow-md flex-grow flex-1 rounded-xl min-w-[300px] lg:min-w-[350px] md:min-w-[350px] sm:min-w-[350px] flex flex-col p-4 border border-gray-200 transition-transform transform-gpu scale-100 hover:scale-[1.02]"
                                ref={chartContainerRef}
                            >
                                {/* Top Section */}
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-4">
                                        {/* Icon */}
                                        <div
                                            className="p-3 rounded-lg"
                                            style={{ backgroundColor: card.colors.secondary }}
                                        >
                                            {React.cloneElement(card.icon, { className: "w-8 h-8 text-gray-900" })}
                                        </div>

                                        {/* Title & Value */}
                                        <div
                                            className="cursor-pointer"
                                            onClick={() => {
                                                if (
                                                    hasPermission(
                                                        authUser?.role?.permission,
                                                        [card.permissionKey],
                                                        authUser?.role?.name || ""
                                                    )
                                                ) {
                                                    const searchParams = new URLSearchParams(window.location.search);
                                                    if (searchParams.has("state") && card.rename) {
                                                        const stateValue = searchParams.get("state");
                                                        searchParams.delete("state");
                                                        searchParams.append("stateId", stateValue!);
                                                    }
                                                    if (searchParams.has("district") && card.rename) {
                                                        const districtValue = searchParams.get("district");
                                                        searchParams.delete("district");
                                                        searchParams.append("districtId", districtValue!);
                                                    }
                                                    if (filter === "today") {
                                                        searchParams.append("fromDate", new Date().toISOString().slice(0, 10));
                                                        searchParams.append("toDate", new Date().toISOString().slice(0, 10));
                                                    }
                                                    searchParams.append("page", "1");
                                                    searchParams.append("limit", "15");
                                                    navigate(`${card.navigatePath}?${searchParams}`);
                                                }
                                            }}
                                        >
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {filter === "total" ? `Total ${card.title}` : `Today's ${card.title}`}
                                            </h3>
                                            <p className="text-2xl font-bold text-gray-900 mt-1">
                                                {card.animatedValue.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Download Button */}
                                    {!downloadFlag && <button
                                        className="p-2 rounded-full hover:bg-gray-100 transition"
                                        onClick={() => handleDownload(card.id)}
                                        style={{ color: card.colors.primary }}
                                    >
                                        <IconDownload className="w-6 h-6" />
                                    </button>}
                                </div>

                                {/* Chart Section */}
                                {filter === "total" && card.totalValue === 0 ? (
                                    <NoDataAvailable isSmall={true} />
                                ) : filter === "today" && card.todayValue === 0 ? (
                                    <NoDataAvailable isSmall={true} />
                                ) : (
                                    <div className="relative min-h-[200px]">
                                        <Chart
                                            options={{
                                                ...card.options,
                                                chart: {
                                                    ...card.options.chart,
                                                    height: "100%",
                                                    width: "100%",
                                                    parentHeightOffset: 0,
                                                    toolbar: {
                                                        show: false
                                                    }
                                                },
                                                grid: {
                                                    padding: {
                                                        bottom: 0
                                                    }
                                                }
                                            }}
                                            series={[{ name: card.title, data: getChartData(card.key) }]}
                                            type="area"
                                            height="100%"
                                            width="100%"
                                        />
                                    </div>
                                )}
                            </div>
                    ))}
                </>
            </div>
        </div>
    );
};

export default Activities;
