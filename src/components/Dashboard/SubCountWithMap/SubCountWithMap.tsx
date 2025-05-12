import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store";
import Loader from "../../custom/Loader";
import NoDataAvailable from "../../custom/NoDataAvailable";
import Heading from "../Heading";
import IndiaMap from "../Map/IndiaMap";

const SubCountWithMap = ({ query, setQuery }: any) => {
    const stateWiseCount = useSelector((state: IRootState) => state.dashboard?.dashboardData?.stateWiseCount);
    const loader = useSelector((state: IRootState) => state.dashboard?.loader);

    const stateWiseCountList = useMemo(() => {
        return stateWiseCount?.map((state: any, index: number) => (
            <div
                key={state.StateName}
                className={"flex justify-between items-center p-3 sm:p-4 bg-white rounded-lg shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-300"}
            >
                <div className="flex flex-col flex-1 mr-2">
                    <span className="text-base md:text-lg font-semibold text-gray-800">
                        {state?.StateName || state?.DistrictName || state?.BlockName}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500">
                        Users Today:{" "}
                        <span className="font-medium text-blue-600">{state?.TodaysSubscriber}</span>
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500">
                        Users Total:{" "}
                        <span className="font-medium text-blue-600">{state?.TotalSubscriberCount}</span>
                    </span>
                </div>
                <div className="relative w-12 h-12 sm:w-14 sm:h-14">
                    <svg
                        className="w-full h-full transform -rotate-90"
                        viewBox="0 0 50 50"
                    >
                        <circle
                            cx="25"
                            cy="25"
                            r="20"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="4"
                        />
                        <circle
                            cx="25"
                            cy="25"
                            r="20"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="4"
                            strokeDasharray="126"
                            strokeDashoffset={126 - (126 * state.Percentage) / 100}
                        />
                        <defs>
                            <linearGradient id="gradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%">
                                <stop offset="0%"
                                    stopColor="#3b82f6" />
                                <stop offset="100%"
                                    stopColor="#60a5fa" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-700">
                        {state.Percentage}%
                    </span>
                </div>
            </div>
        ));
    }, [stateWiseCount, loader.dashboardMapCount]);
    return (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg h-full">
            {loader.dashboardMapCount ? (
                <div className="flex items-center justify-center min-h-[50vh]">
                    <Loader
                    />
                </div>
            ) : (
                <div className="flex flex-col xl:flex-row justify-between gap-6">
                    <div className="flex flex-col bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg shadow-lg p-6 min-w-[40%] xl:w-2/5 min-h-[400px] max-h-[70vh]">
                        <Heading className="text-blue-800 mb-6"
                            title="Users Count" />
                        <div className="scroll-container flex flex-col gap-4 overflow-y-auto pr-2">
                            {stateWiseCountList && stateWiseCountList?.length > 0 ? (
                                stateWiseCountList
                            ) : (
                                <div className="flex items-center justify-center h-full overflow-hidden text-gray-500 min-h-[50vh]">
                                    <NoDataAvailable />
                                </div>
                            )}
                        </div>
                    </div>
                    <IndiaMap query={query}
                        setQuery={setQuery} />
                </div>
            )}
        </div>
    );
};

export default React.memo(SubCountWithMap);
