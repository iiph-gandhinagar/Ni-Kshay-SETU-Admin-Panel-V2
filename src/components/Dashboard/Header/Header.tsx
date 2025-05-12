import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IRootState } from "../../../store";
import { getAuthUserSuccess } from "../../../store/reducer/auth.reducer";
import { getAllBlockList, getAllDistrictList } from "../../../store/reducer/masterTable.reducer";
import { PrimaryBtn } from "../../buttons/primaryBtn";
import IconCaretDown from "../../Icon/IconCaretDown";
import IconLogout from "../../Icon/IconLogout";
import IconMenu from "../../Icon/IconMenu";
import IconUser from "../../Icon/IconUser";
import { SelectInput } from "../../Inputs/SelectInput";

interface FilterValues {
    state?: string | null;
    district?: string | null;
    block?: string | null;
    fromDate?: any;
    toDate?: any;
}
type DebounceFunction = (...args: any[]) => void;

const Header = ({ values, setValues }: { values: FilterValues; setValues: (values: FilterValues) => void }) => {
    const [filterPopup, setFilterPopup] = useState(false);
    const [menuPopup, setMenuPopup] = useState(false);
    const [pendingValues, setPendingValues] = useState(values);
    const [profilePopup, setProfilePopup] = useState(false);
    const dispatch = useDispatch();
    const { stateList, districtList, blockList } = useSelector((state: IRootState) => state.master);
    const { authUser } = useSelector((state: IRootState) => state.auth);
    const popupRef = useRef<HTMLDivElement>(null);
    const popupRefSmall = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const debounce = (func: (...args: any[]) => void, delay: number): DebounceFunction => {
        let timeout: NodeJS.Timeout;
        return (...args: any[]) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    };
    useEffect(() => {
        if (authUser && pendingValues.state) {
            dispatch(getAllDistrictList(`?stateId=${pendingValues.state}`));
        }
    }, [authUser, pendingValues.state, dispatch]);


    useEffect(() => {
        const fetchBlocks = debounce((districtId: string | undefined) => {
            if (districtId) {
                dispatch(getAllBlockList(`?districtId=${districtId}`));
            }
        }, 300);
        fetchBlocks(pendingValues?.district);
    }, [pendingValues?.district, dispatch]);

    const handleSubmit = () => {
        setValues(pendingValues);
        setFilterPopup(false);
    };
    const handleClickOutside = (event: MouseEvent) => {
        const clickedOutsideFilter =
            popupRef.current && !popupRef.current.contains(event.target as Node);
        const clickedOutsideMenu =
            popupRefSmall.current && !popupRefSmall.current.contains(event.target as Node);

        if (clickedOutsideFilter && clickedOutsideMenu) {
            setFilterPopup(false);
            setMenuPopup(false);
            setProfilePopup(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const [isQueryValid, setIsQueryValid] = useState(false);
    useEffect(() => {
        const areAllQueryValuesValid = () => {
            return Object.values(values).some((value) => value !== null && value !== undefined && value !== "");
        };
        setIsQueryValid(areAllQueryValuesValid());
    }, [values]);
    useEffect(() => {
        setPendingValues(values);
    }, [values, filterPopup]);
    const [isImageError, setIsImageError] = useState(false);

    return (
        <div className="sticky top-0 z-30 flex justify-between items-center bg-white shadow-md px-6 py-3 mb-4 rounded-lg gap-4">
            <div className="flex justify-between items-center w-full gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Admin Panel Dashboard</h1>
                <button
                    onClick={() => {
                        window.open("https://analytics.google.com/analytics/web/?authuser=2#/p349237802/reports/intelligenthome", "_blank");
                    }}
                    className="bg-gray-100 text-gray-700 font-medium px-4 py-2 rounded-md hover:bg-gray-200 hidden md:block">
                    Google Analytics
                </button>
            </div>
            {/* Menu for small screens */}
            <div
                ref={popupRefSmall}
                className="md:hidden relative">
                <PrimaryBtn
                    title=""
                    rightIcon={<IconMenu className="text-[#446989] scale-[300%]" />}
                    className="rounded-full h-12 w-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200"
                    onClick={() => setMenuPopup((prev) => !prev)}
                />
                {filterPopup && (
                    <div
                        className="absolute top-[68px] right-[-24px] min-w-full sm:min-w-72 bg-white shadow-md rounded-lg p-4 z-[999]"
                    >
                        <div className="flex flex-col gap-2">
                            <SelectInput
                                menuPortalTarget={null}
                                isClearable={true}
                                id="state"
                                placeholder={"Select State"}
                                options={stateList?.map((e: any) => ({ value: e._id, label: e.title }))}
                                value={pendingValues.state}
                                onChange={(e) =>
                                    setPendingValues({
                                        state: e,
                                        district: null,
                                        block: null,
                                    })
                                }
                                className="mb-2"
                            />
                            {pendingValues?.state && <SelectInput
                                menuPortalTarget={null}
                                isClearable={true}
                                id="district"
                                placeholder="Select District"
                                options={districtList?.map((e: any) => ({ value: e._id, label: e.title }))}
                                value={pendingValues.district}
                                onChange={(e) => setPendingValues({ ...pendingValues, district: e, block: null })}
                                className="mb-2"
                            />}
                            {pendingValues?.district && pendingValues?.state && <SelectInput
                                menuPortalTarget={null}
                                isClearable={true}
                                id="block"
                                placeholder="Select Block"
                                options={blockList?.map((e) => ({ value: e._id, label: e.title }))}
                                value={pendingValues.block}
                                onChange={(e) => setPendingValues({ ...pendingValues, block: e })}
                                className="mb-2"
                            />}
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <label className="block text-gray-600 mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        value={pendingValues?.fromDate}
                                        onChange={(e) => setPendingValues({ ...pendingValues, fromDate: e.target.value })}
                                        className="border border-gray-300 text-gray-700 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-gray-600 mb-1">End Date</label>
                                    <input
                                        type="date"
                                        value={pendingValues?.toDate}
                                        onChange={(e) => setPendingValues({ ...pendingValues, toDate: e.target.value })}
                                        className="border border-gray-300 text-gray-700 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between mt-3 gap-2">
                            <button
                                onClick={handleSubmit}
                                className="bg-green-500 text-white font-medium px-4 py-2 rounded-md hover:bg-green-600 w-full sm:w-auto"
                            >
                                Apply Filters
                            </button>
                            <button
                                onClick={() => {
                                    if (isQueryValid) {
                                        setPendingValues({
                                            state: null,
                                            district: null,
                                            block: null,
                                            fromDate: null,
                                            toDate: null,
                                        });
                                        setValues({
                                            state: null,
                                            district: null,
                                            block: null,
                                            fromDate: null,
                                            toDate: null,
                                        });
                                    } else {
                                        setFilterPopup(false);
                                    }
                                }}
                                className="bg-gray-100 text-gray-700 font-medium px-4 py-2 rounded-md hover:bg-gray-200 w-full sm:w-auto"
                            >
                                {isQueryValid ? "Clear" : "Close"}
                            </button>
                        </div>
                    </div>
                )}
                {menuPopup && (
                    <div className="absolute top-[68px] right-[-24px] bg-white shadow-md rounded-lg p-4 z-10 w-48">
                        <button
                            onClick={() => {
                                window.open(
                                    "https://analytics.google.com/analytics/web/?authuser=2#/p349237802/reports/intelligenthome",
                                    "_blank"
                                );
                                setMenuPopup(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                            Google Analytics
                        </button>
                        <button
                            onClick={() => setFilterPopup((prev) => !prev)}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                            Filters
                        </button>
                        <button
                            onClick={() => {
                                navigate("/profile");
                            }}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                            Profile
                        </button>
                        <button
                            onClick={() => {
                                localStorage.removeItem("token");
                                dispatch(getAuthUserSuccess(undefined));
                                window.location.reload();
                            }}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                            Logout
                        </button>
                    </div>
                )}
            </div>
            {/* Buttons for larger screens */}
            <div ref={popupRef}
                className="hidden relative md:flex gap-10 items-center">
                <PrimaryBtn
                    title="Filters"
                    className="text-white font-medium px-4 py-2 rounded-md hover:bg-[#446989] transition-colors duration-200"
                    rightIcon={<IconCaretDown className={`transform transition-transform duration-200 ${filterPopup ? "rotate-0" : "-rotate-90"}`} />}
                    onClick={() => {
                        setProfilePopup(false);
                        setFilterPopup((prev) => !prev);
                    }}
                />
                <div className="flex items-center gap-2">
                    <div className="text-gray-700 font-medium whitespace-nowrap">{authUser?.firstName} {authUser?.lastName}</div>
                    {authUser?.profileImage && !isImageError ? (
                        <div onClick={() => {
                            setFilterPopup(false);
                            setProfilePopup((prev) => !prev);
                        }}
                            className="h-12 w-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center overflow-hidden cursor-pointer">
                            <img
                                src={process.env.MEDIA_URL + authUser?.profileImage}
                                alt="Profile"
                                className="w-full h-full object-cover"
                                onError={() => setIsImageError(true)}
                            />
                        </div>
                    ) : (
                        <PrimaryBtn
                            title=""
                            rightIcon={<IconUser className="scale-[350%] text-[#446989]" />}
                            className="rounded-full h-12 w-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                                setFilterPopup(false);
                                setProfilePopup((prev) => !prev);
                            }}
                        />)}
                </div>
                {filterPopup && (
                    <div
                        className="absolute top-[68px] right-[-24px] min-w-full sm:min-w-72 bg-white shadow-md rounded-lg p-4 z-[999]"
                    >
                        <div className="flex flex-col gap-2">
                            <SelectInput
                                menuPortalTarget={null}
                                isClearable={true}
                                id="state"
                                placeholder={"Select State"}
                                options={stateList?.map((e: any) => ({ value: e._id, label: e.title }))}
                                value={pendingValues.state}
                                onChange={(e) =>
                                    setPendingValues({
                                        state: e,
                                        district: null,
                                        block: null,
                                    })
                                }
                                className="mb-2"
                            />
                            {pendingValues?.state && <SelectInput
                                menuPortalTarget={null}
                                isClearable={true}
                                id="district"
                                placeholder="Select District"
                                options={districtList?.map((e: any) => ({ value: e._id, label: e.title }))}
                                value={pendingValues.district}
                                onChange={(e) => setPendingValues({ ...pendingValues, district: e, block: null })}
                                className="mb-2"
                            />}
                            {pendingValues?.district && pendingValues?.state && <SelectInput
                                menuPortalTarget={null}
                                isClearable={true}
                                id="block"
                                placeholder="Select Block"
                                options={blockList?.map((e) => ({ value: e._id, label: e.title }))}
                                value={pendingValues.block}
                                onChange={(e) => setPendingValues({ ...pendingValues, block: e })}
                                className="mb-2"
                            />}
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <label className="block text-gray-600 mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        value={pendingValues?.fromDate}
                                        onChange={(e) => setPendingValues({ ...pendingValues, fromDate: e.target.value })}
                                        className="border border-gray-300 text-gray-700 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-gray-600 mb-1">End Date</label>
                                    <input
                                        type="date"
                                        value={pendingValues?.toDate}
                                        onChange={(e) => setPendingValues({ ...pendingValues, toDate: e.target.value })}
                                        className="border border-gray-300 text-gray-700 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between mt-3 gap-2">
                            <button
                                onClick={handleSubmit}
                                className="bg-green-500 text-white font-medium px-4 py-2 rounded-md hover:bg-green-600 w-full sm:w-auto"
                            >
                                Apply Filters
                            </button>
                            <button
                                onClick={() => {
                                    if (isQueryValid) {
                                        setPendingValues({
                                            state: null,
                                            district: null,
                                            block: null,
                                            fromDate: null,
                                            toDate: null,
                                        });
                                        setValues({
                                            state: null,
                                            district: null,
                                            block: null,
                                            fromDate: null,
                                            toDate: null,
                                        });
                                    } else {
                                        setFilterPopup(false);
                                    }
                                }}
                                className="bg-gray-100 text-gray-700 font-medium px-4 py-2 rounded-md hover:bg-gray-200 w-full sm:w-auto"
                            >
                                {isQueryValid ? "Clear" : "Close"}
                            </button>
                        </div>
                    </div>
                )}
                {profilePopup && (
                    <div className="absolute top-[68px] right-[-24px] min-w-[200px] bg-white shadow-lg rounded-lg p-4 z-[999] border border-gray-100">
                        <div className="flex flex-col gap-3">
                            <button
                                type="button"
                                className="nav-link group w-full flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
                                onClick={() => {
                                    navigate("/profile");
                                }}
                            >
                                <IconUser className="w-5 h-5 text-gray-500 group-hover:text-indigo-500 transition-colors duration-200" />
                                <span className="ml-3 text-sm text-gray-700 group-hover:text-indigo-600 transition-colors duration-200">
                                    Profile
                                </span>
                            </button>
                            <button
                                type="button"
                                className="nav-link group w-full flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    dispatch(getAuthUserSuccess(undefined));
                                    window.location.reload();
                                }}
                            >
                                <IconLogout className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors duration-200 rotate-90" />
                                <span className="ml-3 text-sm text-gray-700 group-hover:text-red-600 transition-colors duration-200">
                                    Logout
                                </span>
                            </button>
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
};

export default Header;
