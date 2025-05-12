import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store";
import { PrimaryBtn } from "../../buttons/primaryBtn";
import NoDataAvailable from "../../custom/NoDataAvailable";
import IconDownload from "../../Icon/IconDownload";
import Heading from "../Heading";
import { ShimmerPlaceholder } from "../ShimmerPlaceholder";

const QuestionHitCounts: React.FC = () => {
    const [isLast30Days, setIsLast30Days] = useState(false);
    const { dashboardData, loader } = useSelector((state: IRootState) => state.dashboard);
    const toggleData = () => {
        setIsLast30Days(!isLast30Days);
    };
    const prepareDownloadData = () => {
        const data = isLast30Days ? dashboardData?.chatbotLast30Days : dashboardData?.chatbot;
        return data?.map((item) => ({
            question: item.question,
            hits: item.count
        }));
    };
    const wrapInQuotes = (value: string) => {
        value = value.trim();
        if (/[,";\n\t]/.test(value)) {
            return `"${value.replace(/"/g, "\"\"").replace(/;/g, ";;").replace(/\t/g, " ")}"`;
        }
        return value;
    };
    const downloadCSV = () => {
        const data = prepareDownloadData();
        const header = ["Question", "Hits"];
        const rows = data?.map((item) => [wrapInQuotes(item.question), item.hits]);

        let csvContent = "data:text/csv;charset=utf-8," + header.join(",") + "\n";
        rows?.forEach((row) => {
            csvContent += row.join(",") + "\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", new Date().toISOString().replace(/:/g, "-") + "question_hits.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const getColor = (hits: number) => {
        if (hits >= 200) return "bg-[#8CDA6A]";
        if (hits >= 150) return "bg-[#FFCA73]";
        return "bg-[#F29595]";
    };
    const [dropdownOpen, setDropdownOpen] = useState(false);
    return (
        <div className="mt-6 bg-white p-2 sm:p-4 md:p-5 lg:p-6 rounded-lg shadow-md w-full">
            <div className="flex justify-between items-center mb-4">
                <Heading className="text-gray-800 truncate"
                    title="Top Chatbot Queries" />
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
                                    downloadCSV();
                                }}
                            >
                                Download CSV
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
                <div className="hidden sm:flex md:flex lg:hidden xl:flex space-x-2 items-center justify-end min-w-[298px]">
                    <PrimaryBtn
                        title="CSV"
                        rightIcon={<IconDownload />}
                        className="px-4 py-2 rounded-md bg-[#5584AC] text-white hover:bg-[#446989] transition-colors duration-200"
                        onClick={downloadCSV}
                    />
                    {!window.location.search &&
                        <>
                            <PrimaryBtn
                                title="Overall"
                                className={`px-4 py-2 rounded-md ${!isLast30Days ? "bg-[#5584AC] text-white hover:bg-[#446989]" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-colors duration-200`}
                                onClick={toggleData}
                            />
                            <PrimaryBtn
                                title="Last 30 Days"
                                className={`px-4 py-2 rounded-md ${isLast30Days ? "bg-[#5584AC] text-white hover:bg-[#446989]" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition-colors duration-200`}
                                onClick={toggleData}
                            />
                        </>}
                </div>
            </div>
            <div className="min-h-[400px]">
                <div className=" bg-white shadow-md rounded-lg">
                    <div className="flex bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <div className="w-2/3 font-bold text-gray-700">Question</div>
                        <div className="w-1/3 font-bold text-gray-700 text-center">Hits</div>
                    </div>
                    <div className="overflow-y-auto h-[400px] scroll-container">
                        {loader.dashboardChatbotCount ? (
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
                            prepareDownloadData()?.length === 0 ? (
                                <NoDataAvailable />
                            ) : (
                                prepareDownloadData()?.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                                    >
                                        <div className="w-2/3 text-gray-800 text-sm sm:text-base">
                                            {item.question}
                                        </div>
                                        <div
                                            className={`w-1/3 flex-grow-0 text-center text-sm sm:text-base ${getColor(item.hits)} rounded-md py-1`}>
                                            {item.hits}
                                        </div>
                                    </div>
                                ))
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionHitCounts;
