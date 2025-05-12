import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryParams } from "use-query-params";
import Activities from "../../components/Dashboard/Activites/Activites";
import AppOpenCountChart from "../../components/Dashboard/AppUsage/AppUsageCount";
import AssessmentChart from "../../components/Dashboard/Assessment/AssessmentChart";
import CadreWiseSubscribers from "../../components/Dashboard/CadreWiseSubscriber/CadreWiseSubscribers";
import Header from "../../components/Dashboard/Header/Header";
import LeaderboardChart from "../../components/Dashboard/Leaderboard/LeaderboardChart";
import ManageTb from "../../components/Dashboard/ManageTb/Index";
import ModuleUsageChart from "../../components/Dashboard/ModuleUsage/ModuleUsageChart";
import QueryToCoe from "../../components/Dashboard/QueryToCoe/QueryToCoe";
import QuestionHitCounts from "../../components/Dashboard/QuestionHitCount/QuestionHitCounts";
import SubCountWithMap from "../../components/Dashboard/SubCountWithMap/SubCountWithMap";
import UsageCounts from "../../components/Dashboard/UsageCounts/UsageCounts";
import { IRootState } from "../../store";
import { getAuthUser } from "../../store/reducer/auth.reducer";
import { cleanDashboardData, fetchAllDashboardData } from "../../store/reducer/dashboard.reducer";
import { clearAllBlockList, cleartAllDistrictList, cleartAllStateList, getAllDistrictList, getAllStateList } from "../../store/reducer/masterTable.reducer";

const Index = () => {
    const { authUser } = useSelector((state: IRootState) => state.auth);
    const { dashboardData, loader } = useSelector((state: IRootState) => state.dashboard);

    const [query, originalSetQuery] = useQueryParams({
        state: "", district: "", block: "", fromDate: "", toDate: ""
    });
    const [queryResolved, setQueryResolved] = useState(false);


    useEffect(() => {
        if (authUser) {
            const defaultState = authUser?.district?.[0]?.stateId || authUser?.state?.[0]?._id;
            const defaultDistrict = authUser?.district?.[0]?._id;

            if (!query.state && authUser?.roleType === "state_level") {
                originalSetQuery({ ...query, state: defaultState });
            }

            if (!query.district && authUser?.roleType === "district_level") {
                originalSetQuery({ ...query, state: defaultState, district: defaultDistrict });
            }
            setQueryResolved(true);
        }
    }, [query.state, query.district, authUser]);


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllStateList());
        dispatch(getAllDistrictList(""));
        dispatch(getAuthUser());
        return () => {
            dispatch(cleanDashboardData());
            dispatch(cleartAllStateList());
            dispatch(cleartAllDistrictList());
            dispatch(clearAllBlockList());
        };
    }, []);

    const [isQueryValid, setIsQueryValid] = useState(false);
    useEffect(() => {
        const areAllQueryValuesValid = () => {
            if (authUser?.roleType === "state_level") {
                return (
                    query.state !== ""
                );
            } else if (authUser?.roleType === "district_level") {
                return (
                    query.state !== "" &&
                    query.district !== ""
                );
            } else {
                return (
                    query.state !== "" &&
                    query.district !== "" &&
                    query.block !== ""
                );
            }
        };
        setIsQueryValid(areAllQueryValuesValid());
    }, [query]);

    const hasFetched = useRef(false);
    const [initialLoad, setInitialLoad] = useState(false);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (dashboardData?.totalVisitor && !hasFetched.current) {
            hasFetched.current = true;
            setInitialLoad(true); // Mark initial load complete
            dispatch(fetchAllDashboardData(window.location.search));

            intervalId = setInterval(() => {
                dispatch(fetchAllDashboardData(window.location.search));
            }, 1800000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [loader.dashboardVisitorCount]);

    useEffect(() => {
        if (initialLoad) {
            dispatch(fetchAllDashboardData(window.location.search));
        }
    }, [query, queryResolved, isQueryValid]);

    return (
        <div className="mx-auto lg:max-w-[85vw] p-4">
            <Header values={query}
                setValues={originalSetQuery} />
            <Activities />
            <UsageCounts />
            <SubCountWithMap query={query}
                setQuery={originalSetQuery} />
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
                <CadreWiseSubscribers />
                <ModuleUsageChart />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
                <QuestionHitCounts />
                <ManageTb />
            </div>
            <QueryToCoe />
            <AssessmentChart />
            <LeaderboardChart />
            <AppOpenCountChart />
        </div>
    );
};

export default Index;
