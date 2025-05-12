import { useEffect, useState } from "react";
import { useQueryParams } from "use-query-params";
import KbaseCourseReport from "./KbaseCourseReport";
import KbaseReport from "./KbaseReport";

const Index = () => {
    const [query, setQuery] = useQueryParams({
        view: "report",
        page: "1",
        limit: "50",
        sortBy: "",
        sortOrder: "",
        courseTitle: "",
        cadreTitle: "",
        phoneNo: "",
        cadreType: "",
    });

    const [hoveredTab, setHoveredTab] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const tabs = [
        {
            id: "report",
            label: "Kbase Report",
            gradient: "from-blue-500 via-indigo-400 to-violet-500",
        },
        {
            id: "course",
            label: "Kbase Course Report",
            gradient: "from-violet-500 via-purple-400 to-fuchsia-500",
        }
    ];

    const toggleView = (view: string) => {
        setQuery({
            view,
            page: "1",
            limit: "50",
            sortBy: null,
            sortOrder: null,
            courseTitle: null,
            cadreTitle: null,
            phoneNo: null,
            cadreType: null
        });
    };

    const renderComponent = () => {
        switch (query.view) {
            case "course":
                return <KbaseCourseReport />;
            case "report":
            default:
                return <KbaseReport />;
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
