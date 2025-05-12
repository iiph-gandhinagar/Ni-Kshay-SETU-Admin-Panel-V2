import ApexCharts from "apexcharts"; // Ensure ApexCharts is imported
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store";
import { PrimaryBtn } from "../../buttons/primaryBtn";
import NoDataAvailable from "../../custom/NoDataAvailable";
import IconDownload from "../../Icon/IconDownload";
import Heading from "../Heading";
import { ShimmerPlaceholder } from "../ShimmerPlaceholder";

const ManageTb = () => {
    const { dashboardData, loader } = useSelector((state: IRootState) => state.dashboard);
    const data = dashboardData?.manageTb;

    const categories = ["Actions"];
    const series = [
        {
            name: "Open",
            data: [data?.find(item => item._id === "Open")?.count || 0],
        },
        {
            name: "Submit",
            data: [data?.find(item => item._id === "Submit")?.count || 0],
        },
        {
            name: "Download",
            data: [data?.find(item => item._id === "Download")?.count || 0],
        },
    ];

    const formatDateForId = () => new Date().toLocaleDateString().replace(/\//g, "_");
    const totalCounts = dashboardData?.manageTb?.reduce((acc, item) => acc + item.count, 0); // Sum total count

    const chartOptions: ApexCharts.ApexOptions = {
        chart: {
            id: "manageTBData" + formatDateForId(),
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
        title: {
            text: `Total usages: ${totalCounts}`,
            align: "left",
            style: {
                fontSize: "14px",
                color: "#333"
            }
        },
        legend: {
            position: "bottom",
            fontSize: "12px",
            fontFamily: "'Nunito','Raleway', sans-serif", // Font family for the legend
            fontWeight: "bold",
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "50%",
                dataLabels: {
                    position: "center", // Display data labels on top of the bars
                },
            },
        },
        dataLabels: {
            enabled: true, // Enable data labels
            style: {
                fontSize: "12px",
                fontFamily: "'Nunito','Raleway', sans-serif",
                fontWeight: "bold",
                colors: ["#000"], // Set the color of the data labels
            },
            formatter: (val: number) => val, // Display the count value directly
        },
        xaxis: {
            categories: categories,
        },
        yaxis: {
            title: {
                text: "Count",
                style: {
                    fontSize: "12px",
                    fontWeight: 100,
                },
            },
        },
        tooltip: {
            y: {
                formatter: (value: number) => `${value} counts`,
            },
            x: {
                formatter: () => "Actions",
            },
        },
        colors: ["#A090FF", "#FFCA73", "#24D6CE"],
    };

    const downloadPNG = () => {
        const chartInstance = ApexCharts.getChartByID("manageTBData" + formatDateForId());
        if (chartInstance) {
            chartInstance.updateOptions({
                title: {
                    text: "ManageTB India",
                    align: "left",
                    style: {
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#333"
                    }
                },
                subtitle: {
                    text: `Total Users: ${totalCounts}`, // Add your subtitle here
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
                        text: `Total usages: ${totalCounts}`,
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

    return (
        <div className="mt-6 bg-white p-2 sm:p-4 md:p-5 lg:p-6 rounded-lg shadow-md w-full">
            <div className="flex justify-between items-center mb-4">
                <Heading className="text-gray-800"
                    title="ManageTB India" />
                <PrimaryBtn
                    title=""
                    rightIcon={<IconDownload />}
                    className="px-4 py-2 rounded-md bg-[#5584AC] text-white hover:bg-[#446989] transition-colors duration-200"
                    onClick={downloadPNG}
                />
            </div>
            {(!data || data.length === 0) && !loader.dashboardManageTBCount ? (
                <div className="flex items-center justify-center h-full text-center text-gray-500">
                    <NoDataAvailable />
                </div>
            ) : (
                <>
                    {loader.dashboardManageTBCount ? (
                        <div className="p-4 rounded-md shadow">
                            <ShimmerPlaceholder height="2rem"
                                width="60%" />
                            <ShimmerPlaceholder height="2rem"
                                width="70%" />
                            <ShimmerPlaceholder height="2rem"
                                width="80%" />
                            <ShimmerPlaceholder height="2rem"
                                width="90%" />
                            <ShimmerPlaceholder height="2rem"
                                width="100%" />
                        </div>
                    ) : (
                        <Chart
                            options={chartOptions}
                            series={series}
                            type="bar"
                            height={430}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default ManageTb;
