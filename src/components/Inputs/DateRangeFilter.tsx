import { useEffect, useRef, useState } from "react";
import IconCalendar from "../Icon/IconCalendar";

type DateRangeFilterProps = {
    query: { fromDate?: string | null; toDate?: string | null };
    setQuery: (query: { fromDate?: string | null; toDate?: string | null }) => void;
};

export const DateRangeFilter = ({ query, setQuery }: DateRangeFilterProps) => {
    const [fromDate, setFromDate] = useState(query.fromDate || "");
    const [toDate, setToDate] = useState(query.toDate || "");
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState("");
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFromDate(value);
        setError(toDate && value > toDate ? "From Date cannot be later than To Date" : "");
    };

    const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setToDate(value);
        setError(fromDate && value < fromDate ? "To Date cannot be earlier than From Date" : "");
    };

    const handleApply = () => {
        if (!error) {
            setQuery({ fromDate, toDate });
            setIsOpen(false);
        }
    };

    const handleClear = () => {
        if (!fromDate && !toDate) {
            setIsOpen(false);
        } else {
            setFromDate("");
            setToDate("");
            setQuery({ fromDate: null, toDate: null });
            setError("");
        }
    };

    return (
        <div className="relative"
            ref={ref}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-5 py-2.5 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 active:scale-95 transition-all shadow-md"
            >
                Select Date Range
            </button>

            {isOpen && (
                <div
                    className="absolute z-30 top-14 left-0 bg-white p-6 rounded-2xl shadow-xl border border-gray-300 w-80 transition-all scale-95 animate-fadeIn"
                >
                    {/* Close Icon */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute scale-[200%] top-2 right-3 text-gray-500 hover:text-gray-700 transition"
                    >
                        ×
                    </button>

                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">From Date</label>
                            <div className="relative">
                                <IconCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="date"
                                    value={fromDate}
                                    onChange={handleFromDateChange}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">To Date</label>
                            <div className="relative">
                                <IconCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="date"
                                    value={toDate}
                                    onChange={handleToDateChange}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                        <div className="flex justify-between mt-3">
                            <button
                                onClick={handleClear}
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 active:scale-95 transition-all shadow"
                            >
                                {!fromDate && !toDate ? "Close" : "Clear"}
                            </button>
                            <button
                                onClick={handleApply}
                                className={`px-4 py-2 rounded-lg shadow-md transition-all active:scale-95 ${error ? "bg-gray-400 cursor-not-allowed" : "bg-[#5584AC] text-white hover:bg-[#446989]"
                                    }`}
                                disabled={!!error}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
