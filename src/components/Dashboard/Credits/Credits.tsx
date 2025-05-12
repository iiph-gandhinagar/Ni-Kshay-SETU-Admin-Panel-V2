import { useEffect, useState } from "react";
import { getDashboardBalanceApi } from "../../../utils/api";
import NoDataAvailable from "../../custom/NoDataAvailable";
import Heading from "../Heading";
import { ShimmerPlaceholder } from "../ShimmerPlaceholder";

interface BalanceData {
    sms: number;
}

const Credits = () => {
    const [balanceData, setBalanceData] = useState<BalanceData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBalanceData = async () => {
            try {
                setLoading(true);
                const response = await getDashboardBalanceApi();
                const responseData = response.data as {
                    status: boolean;
                    message: string;
                    data: {
                        balance: BalanceData;
                        status: string;
                    };
                };

                if (responseData.status) {
                    setBalanceData(responseData.data.balance);
                } else {
                    setError(responseData.message || "Failed to fetch balance data");
                }
            } catch (error) {
                console.error("Error fetching balance data:", error);
                setError("Failed to fetch balance data");
            } finally {
                setLoading(false);
            }
        };

        fetchBalanceData();
    }, []);

    return (
        <div className="mt-6 bg-white p-2 sm:p-4 md:p-5 lg:p-6 rounded-lg shadow-md w-full">
            <div className="flex justify-between items-center mb-4">
                <Heading className="text-gray-800"
                    title="Credits" />
            </div>

            {loading ? (
                <div className="p-4 rounded-md shadow">
                    <ShimmerPlaceholder height="2rem"
                        width="60%" />
                    <ShimmerPlaceholder height="2rem"
                        width="70%" />
                </div>
            ) : error ? (
                <div className="text-red-500 p-4">{error}</div>
            ) : !balanceData ? (
                <div className="flex items-center justify-center h-full text-center text-gray-500">
                    <NoDataAvailable />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="text-4xl">💬</div>
                            <div>
                                <p className="text-xl md:text-xl lg:text-2xl font-bold text-gray-800 mt-2">
                                    {balanceData.sms.toLocaleString()}
                                </p>
                                <p className="text-lg font-medium text-gray-600">SMS Credits Available</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Credits;
