import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BoxCard } from "../../../components/Layouts/BoxCard";
import CircleWithNum from "../../../components/custom/CircleWithNum";
import { getDashboardBalanceApi } from "../../../utils/api";

interface BalanceData {
    sms: number;
}

const Index = () => {
    const [balanceData, setBalanceData] = useState<BalanceData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();

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
        <div className="panel mt-6">
            <BoxCard headerName="Credits">
                <div className="flex items-center gap-5 mb-6">
                    <CircleWithNum
                        title="SMS Credits"
                        number={balanceData?.sms || 0}
                    />
                </div>

                {loading ? (
                    <div className="p-6 bg-gray-100 rounded-lg animate-pulse">
                        <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
                        <div className="h-24 bg-gray-300 rounded"></div>
                    </div>
                ) : error ? (
                    <div className="p-6 bg-red-50 text-red-500 rounded-lg">
                        <p className="font-medium">{error}</p>
                        <p className="mt-2">Please try again later or contact support.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="text-4xl">💬</div>
                                <div>
                                    <p className="text-xl md:text-xl lg:text-2xl font-bold text-gray-800 mt-2">
                                        {balanceData?.sms.toLocaleString()}
                                    </p>
                                    <p className="text-lg font-medium text-gray-600">SMS Credits Available</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">About SMS Credits</h3>
                            <p className="text-gray-600 mb-3">
                                SMS credits are used for sending notifications and alerts to users. Each SMS sent consumes one credit.
                            </p>
                            <p className="text-gray-600">
                                Monitor your SMS credit balance regularly to ensure uninterrupted service. Contact the administrator to purchase additional credits when running low.
                            </p>
                        </div>
                    </div>
                )}
            </BoxCard>
        </div>
    );
};

export default Index;
