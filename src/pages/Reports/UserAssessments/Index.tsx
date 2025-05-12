import { useEffect, useState } from "react";
import { ArrayParam, useQueryParams } from "use-query-params";
import OldAssessments from "./OldAssessments";
import ProactiveAssessments from "./ProactiveAssessments";
import UserAssessments from "./UserAssessments";

const Index = () => {
    const [query, setQuery] = useQueryParams({
        view: "user",
        page: "1", limit: "25", sortBy: "", sortOrder: "", country: "", stateIds: ArrayParam, assessmentTitle: "", title: "",
        districtIds: ArrayParam, blockIds: ArrayParam, healthFacilityIds: ArrayParam, userCadreId: ArrayParam, fromDate: "", toDate: "", assessmentId: ArrayParam, userIds: ArrayParam, userEmail: ""
    });

    const [hoveredTab, setHoveredTab] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setQuery({ view: "user" });
        setMounted(true);
    }, []);

    const tabs = [
        {
            id: "user",
            label: "User Assessments",
            gradient: "from-blue-400 via-indigo-300 to-purple-400",
        },
        {
            id: "pro",
            label: "Proactive Assessments",
            gradient: "from-purple-400 via-fuchsia-300 to-pink-400",
        },
        {
            id: "old",
            label: "Old Assessments",
            gradient: "from-yellow-400 via-amber-300 to-orange-400",
        }
    ];

    const toggleView = (view: string) => {
        setQuery({
            view,
            page: "1",
            limit: "25",
            sortOrder: null,
            sortBy: null,
            stateIds: null,
            country: null,
            userCadreId: null,
            districtIds: null,
            blockIds: null,
            healthFacilityIds: null,
            fromDate: null, toDate: null, assessmentId: null, userIds: null, userEmail: null, assessmentTitle: null, title: null
        });
    };

    const renderComponent = () => {
        switch (query.view) {
            case "user":
                return <UserAssessments />;
            case "pro":
                return <ProactiveAssessments />;
            case "old":
                return <OldAssessments />;
            default:
                return <UserAssessments />;
        }
    };

    return (
        <div className="relative">
            <nav className="relative mb-3 w-1/2">
                <div className="flex gap-3">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => toggleView(tab.id)}
                            onMouseEnter={() => setHoveredTab(tab.id)}
                            onMouseLeave={() => setHoveredTab(null)}
                            className={`
                                        relative flex-1 px-6 py-2 rounded-lg
                                        transition-all duration-300 ease-out
                                        group overflow-hidden
                                        ${query.view === tab.id
                                    ? "bg-white shadow-md transform -translate-y-0.5"
                                    : "hover:bg-white/80 hover:shadow hover:-translate-y-0.5"
                                }
                                    `}
                        >
                            <div className={`
                                        absolute inset-0 opacity-10 bg-gradient-to-r ${tab.gradient}
                                        before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent
                                        before:via-white/20 before:to-transparent before:translate-x-[-100%]
                                        ${query.view === tab.id ? "before:animate-shimmer" : ""}
                                    `} />

                            <div className={`
                                        relative flex items-center justify-center gap-3
                                        transition-all duration-300
                                        ${query.view === tab.id ? "transform scale-102" : ""}
                                    `}>
                                <span className={`
                      font-medium text-lg tracking-wider
                      transition-all duration-300
                      ${hoveredTab === tab.id
                                        ? `bg-gradient-to-r ${tab.gradient} bg-clip-text text-transparent font-bold`
                                        : hoveredTab === tab.id
                                            ? "text-gray-800"
                                            : "text-gray-600"
                                    }
                    `}>
                                    {tab.label}
                                </span>
                            </div>

                            {query.view === tab.id && (
                                <div className={`
                                            absolute bottom-0 left-0 w-full h-0.5
                                            bg-gradient-to-r ${tab.gradient}
                                            rounded-full transform origin-left
                                            animate-slide-in
                                        `} />
                            )}
                        </button>
                    ))}
                </div>
            </nav>
            {renderComponent()}
        </div>
    );
};

export default Index;
