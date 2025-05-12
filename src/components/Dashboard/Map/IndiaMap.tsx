import rasterizeHTML from "rasterizehtml";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import INDIA_TOPO_JSON from "../../../states_topo_json/INDIA_TOPO_JSON.json";
import { IRootState } from "../../../store";
import { stateCenters, stateMap } from "../../../utils/globle";
import IconDownload from "../../Icon/IconDownload";


const IndiaMap = ({ query, setQuery }: any) => {
    const [stateGeoJSON, setStateGeoJSON] = useState<any>(null);
    const { dashboardData } = useSelector((state: IRootState) => state.dashboard);
    const { stateList, districtList } = useSelector((state: IRootState) => state.master);
    const { authUser } = useSelector((state: IRootState) => state.auth);
    const [tooltip, setTooltip] = useState<{ content: string; x: number; y: number } | null>(null);
    const [mapConfig, setMapConfig] = useState<{
        center: [number, number],
        scale: number;
    }>({
        center: [77.632540, 24.982626],
        scale: 900,
    });
    const getColorForSubscriberCount = (count: number) => {
        const thresholds = query?.state ? [1000, 100, 0] : [10000, 1000, 0];
        const colors = ["#0D47A1", "#64B5F6", "#BBDEFB", "#ECEFF1"];
        for (let i = 0; i < thresholds.length; i++) {
            if (count > thresholds[i]) return colors[i];
        }
        return colors[colors.length - 1];
    };
    const stateSubscriberMap = useMemo(() => {
        return dashboardData?.stateWiseCount?.reduce((acc: any, item: any) => {
            const stateName = item?.StateName?.toUpperCase().replace(/\s+/g, "");
            acc[stateName] = item?.TotalSubscriberCount;
            return acc;
        }, {});
    }, [dashboardData]);
    const districtSubscriberMap = useMemo(() => {
        return dashboardData?.stateWiseCount?.reduce((acc: any, item: any) => {
            const districtName = item?.DistrictName?.toUpperCase();
            acc[districtName] = item?.TotalSubscriberCount;
            return acc;
        }, {});
    }, [dashboardData]);
    const handleStateClick = (geo: any) => {
        const stateName = geo.properties.ST_NM.replace(/\s+/g, "").toUpperCase();
        if (stateCenters[stateName]) {
            const { center, scale } = stateCenters[stateName];
            setMapConfig({ center, scale });
        } else {
            let coordinates = [];
            if (geo.geometry.type === "Polygon") {
                coordinates = geo.geometry.coordinates[0];
            } else if (geo.geometry.type === "MultiPolygon") {
                coordinates = geo.geometry.coordinates[0][0];
            }
            if (coordinates.length) {
                const longitudes = coordinates.map(([lng]: any) => lng);
                const latitudes = coordinates.map(([, lat]: any) => lat);
                const centerLongitude =
                    (Math.min(...longitudes) + Math.max(...longitudes)) / 2;
                const centerLatitude =
                    (Math.min(...latitudes) + Math.max(...latitudes)) / 2;
                setMapConfig({
                    center: [centerLongitude, centerLatitude],
                    scale: 3500,
                });
            }
        }
        const stateData = stateMap[stateName];
        if (authUser?.roleType === "country_level" || authUser?.isAllState) {
            if (stateData) {
                setStateGeoJSON(stateData);
                setTooltip(null);
                setQuery({
                    state: geo?.properties?.state,
                    district: null,
                    block: null
                });
            }
        } else if (authUser?.roleType === "state_level" && !authUser?.isAllState) {
            if (stateList?.find((e: any) => geo?.properties?.state === e?._id)) {
                if (stateData) {
                    setStateGeoJSON(stateData);
                    setTooltip(null);
                    setQuery({
                        state: geo?.properties?.state,
                        district: null,
                        block: null
                    });
                }
            } else {
                setMapConfig({
                    center: [77.632540, 24.982626],
                    scale: 900,
                });
                setStateGeoJSON(null);
            }
        } else {
            if (districtList?.find((e: any) => geo?.properties?.state === e?.stateId)) {
                if (stateData) {
                    setStateGeoJSON(stateData);
                    setTooltip(null);
                    setQuery({
                        state: geo?.properties?.state,
                        district: null,
                        block: null
                    });
                }
            } else {
                setMapConfig({
                    center: [77.632540, 24.982626],
                    scale: 900,
                });
                setStateGeoJSON(null);
            }
        }
    };
    const handleMouseEnter = (geo: any, event: React.MouseEvent) => {
        if (stateGeoJSON) {
            const districtName = geo.properties.D_NAME?.toUpperCase();
            const districtCount = districtSubscriberMap[districtName] || 0;
            const content = `${districtName}: ${districtCount} Users`;
            setTooltip({
                content,
                x: event.clientX,
                y: event.clientY,
            });
        } else {
            const stateName = geo.properties.ST_NM?.toUpperCase().replace(/\s+/g, "");
            const stateCount = stateSubscriberMap[stateName] || 0;
            const content = `${stateName}: ${stateCount} Users`;
            setTooltip({
                content,
                x: event.clientX,
                y: event.clientY,
            });
        }
    };
    const handleMouseLeave = () => {
        setTooltip(null);
    };
    const state = stateList?.find((v) => v?._id === query?.state);
    const districtt = districtList?.find((v) => v?._id === query?.district);
    useEffect(() => {
        if (state?.title) {
            const stateName = state?.title.toUpperCase().replace(/\s+/g, "");

            if (stateCenters[stateName]) {
                const { center, scale } = stateCenters[stateName];
                setMapConfig({ center, scale });
            }

            const stateData = stateMap[stateName];
            if (stateData) {
                setStateGeoJSON(stateData);
            } else {
                console.warn("State GeoJSON not found.");
            }
        } else {
            setMapConfig({ center: [77.632540, 24.982626], scale: 900 });
            setStateGeoJSON(null);
        }
    }, [query, stateGeoJSON, stateList]);
    const [downloadFlag, setDownloadFlag] = useState(false);
    const handleDownload = async () => {
        setDownloadFlag(true); // Set the download flag to true
        const dateSuffix = new Date().toLocaleDateString().replace(/\//g, "_");
        const element = document.getElementById("map-content");
        if (!element) return;

        const originalVisibility = element.style.visibility;
        element.style.visibility = "visible";

        try {
            await new Promise((resolve) => setTimeout(resolve, 100));

            const htmlContent = `
                <html>
                    <head>
                        ${document.head.innerHTML}
                    </head>
                    <body>
                        ${element.outerHTML}
                    </body>
                </html>
            `;

            const canvas = document.createElement("canvas");
            const rect = element.getBoundingClientRect();
            const scale = window.devicePixelRatio * 1.5 || 1.5;

            canvas.width = rect.width * scale;
            canvas.height = rect.height * scale;

            await rasterizeHTML.drawHTML(htmlContent, canvas);
            const imageUrl = canvas.toDataURL("image/png");

            // Trigger download
            const link = document.createElement("a");
            link.href = imageUrl;
            link.download = `${districtt?.title.toUpperCase() || state?.title?.toUpperCase() || "India"}_map_${dateSuffix}.png`;
            link.click();
        } catch (error) {
            console.error("Error:", error);
        } finally {
            element.style.visibility = originalVisibility;
            setDownloadFlag(false); // Reset the download flag
        }
    };

    return (
        <div
            className="relative w-full flex justify-center items-center border-t-2 xl:border-l-2 xl:border-t-0 border-blue-100">
            {tooltip && !districtt && (
                <div
                    className="fixed bg-blue-100 text-blue-900 p-2 rounded-lg shadow-lg pointer-events-none z-[99999]"
                    style={{
                        top: tooltip.y + 10,
                        left: tooltip.x + 10,
                        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        fontSize: "0.875rem",
                    }}
                >
                    {tooltip.content}
                </div>
            )}
            <>
                {!stateGeoJSON && (
                    <div className="absolute top-2 right-[-25px] transform hover:translate-x-[-2px] transition-transform ">
                        <div className="bg-indigo-400 py-1 px-2 shadow-lg text-white text-xs font-bold rounded-l-lg z-[30] sm:text-sm md:text-md lg:text-lg">
                            International Users: {dashboardData?.internationalLevelSubscriber || 0}
                        </div>
                    </div>
                )}
                <div className="absolute top-10 right-[-25px] transform hover:translate-x-[-2px] transition-transform lg:top-14 md:top-10 sm:top-10">
                    <div className="bg-indigo-400 py-1 px-2 shadow-lg text-white text-xs font-bold rounded-l-lg z-[30] sm:text-sm md:text-md lg:text-lg">
                        {stateGeoJSON ? (districtt ? "District" : "State") : "National"} Users: {dashboardData?.nationalLevelSubscriber || 0}
                    </div>
                </div>
            </>
            {stateGeoJSON &&
                <>
                    <div className="absolute top-0 right-[-25px] p-2 bg-blue-400 shadow-lg text-white font-bold rounded-l-lg z-[29]">
                        {districtt?.title.toUpperCase() || state?.title?.toUpperCase() || "State"}</div>
                </>
            }
            <button
                className="p-2 z-[29] absolute top-1 left-1 rounded-full transition-colors hover:bg-gray-100"
                onClick={handleDownload}
                style={{
                    color: "#818CF8",
                }}
            >
                <IconDownload className="w-8 h-8" />
            </button>

            <ComposableMap
                projection="geoMercator"
                id="map-content"
                projectionConfig={{ scale: mapConfig.scale, center: mapConfig.center }}
            >
                {downloadFlag &&
                    <>
                        <text x="20"
                            y="70"
                            fontSize="30"
                            fontFamily="'Nunito','Raleway', sans-serif"
                            fill="#0D47A1"
                            fontWeight="700"
                            letterSpacing="0.5"
                            filter="url(#dropShadow)">{districtt?.title.toUpperCase() || state?.title?.toUpperCase() || "India"}</text>
                        <text x="20"
                            y="100"
                            fontSize="20"
                            fontFamily="'Nunito','Raleway', sans-serif"
                            fill="#1E88E5"
                            fontWeight="500"
                            letterSpacing="0.3"
                            opacity="0.9">Users: {dashboardData?.totalSubscriberCount || "Count"}</text>
                    </>
                }
                {!stateGeoJSON ?
                    <g transform="translate(10, 480)">
                        <rect width="160"
                            height="117"
                            fill="white"
                            stroke="#E2E8F0"
                            strokeWidth="1.5"
                            rx="8"
                            ry="8"
                            filter="drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))" />

                        <text x="15"
                            y="25"
                            fontSize="13"
                            fontFamily="system-ui"
                            fill="#1A202C"
                            fontWeight="600">User Distribution</text>

                        <g transform="translate(15, 40)">
                            <rect width="12"
                                height="12"
                                fill="#0D47A1"
                                rx="2"
                                ry="2" />
                            <text x="20"
                                y="9.5"
                                fontSize="11"
                                fontFamily="system-ui"
                                fill="#4A5568">10,000+ Users</text>
                        </g>

                        <g transform="translate(15, 60)">
                            <rect width="12"
                                height="12"
                                fill="#64B5F6"
                                rx="2"
                                ry="2" />
                            <text x="20"
                                y="9.5"
                                fontSize="11"
                                fontFamily="system-ui"
                                fill="#4A5568">1,001 - 10,000 Users</text>
                        </g>

                        <g transform="translate(15, 80)">
                            <rect width="12"
                                height="12"
                                fill="#BBDEFB"
                                rx="2"
                                ry="2" />
                            <text x="20"
                                y="9.5"
                                fontSize="11"
                                fontFamily="system-ui"
                                fill="#4A5568">1 - 1,000 Users</text>
                        </g>

                        <g transform="translate(15, 100)">
                            <rect width="12"
                                height="12"
                                fill="#ECEFF1"
                                rx="2"
                                ry="2" />
                            <text x="20"
                                y="9.5"
                                fontSize="11"
                                fontFamily="system-ui"
                                fill="#4A5568">No Users</text>
                        </g>
                    </g> : <g transform="translate(10, 480)">
                        <rect width="160"
                            height="117"
                            fill="white"
                            stroke="#E2E8F0"
                            strokeWidth="1.5"
                            rx="8"
                            ry="8"
                            filter="drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))" />

                        <text x="15"
                            y="25"
                            fontSize="13"
                            fontFamily="system-ui"
                            fill="#1A202C"
                            fontWeight="600">User Distribution</text>

                        <g transform="translate(15, 40)">
                            <rect width="12"
                                height="12"
                                fill="#0D47A1"
                                rx="2"
                                ry="2" />
                            <text x="20"
                                y="9.5"
                                fontSize="11"
                                fontFamily="system-ui"
                                fill="#4A5568">1,000+ Users</text>
                        </g>

                        <g transform="translate(15, 60)">
                            <rect width="12"
                                height="12"
                                fill="#64B5F6"
                                rx="2"
                                ry="2" />
                            <text x="20"
                                y="9.5"
                                fontSize="11"
                                fontFamily="system-ui"
                                fill="#4A5568">101 - 1,000 Users</text>
                        </g>

                        <g transform="translate(15, 80)">
                            <rect width="12"
                                height="12"
                                fill="#BBDEFB"
                                rx="2"
                                ry="2" />
                            <text x="20"
                                y="9.5"
                                fontSize="11"
                                fontFamily="system-ui"
                                fill="#4A5568">1 - 100 Users</text>
                        </g>

                        <g transform="translate(15, 100)">
                            <rect width="12"
                                height="12"
                                fill="#ECEFF1"
                                rx="2"
                                ry="2" />
                            <text x="20"
                                y="9.5"
                                fontSize="11"
                                fontFamily="system-ui"
                                fill="#4A5568">No Users</text>
                        </g>
                    </g>}

                {stateGeoJSON ? (
                    <Geographies geography={stateGeoJSON}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const districtName = geo?.properties?.D_NAME?.toUpperCase();
                                const fillColor = getColorForSubscriberCount(districtSubscriberMap?.[districtName] ?? 0);
                                const isSelected = districtName === districtt?.title?.toUpperCase();
                                return (
                                    <Geography
                                        onClick={() => {
                                            if (authUser?.roleType === "country_level" || authUser?.isAllState || authUser?.roleType === "state_level" || authUser?.isAllDistrict) {
                                                setQuery({
                                                    district: geo?.properties?.district,
                                                    block: null
                                                });
                                            } else {
                                                if (districtList?.find((e: any) => geo?.properties?.district === e?._id)) {
                                                    setQuery({
                                                        district: geo?.properties?.district,
                                                        block: null
                                                    });
                                                }
                                            }
                                        }}
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onMouseEnter={(event) => handleMouseEnter(geo, event)}
                                        onMouseLeave={handleMouseLeave}
                                        style={{
                                            default: {
                                                fill: isSelected ? "#64B5F6" : fillColor
                                                , stroke: "#fff", strokeWidth: 0.3
                                            },
                                            hover: { fill: "#CFD8DC" },
                                            pressed: { fill: "#FF5722" },

                                        }}
                                    />
                                );
                            }
                            )
                        }
                    </Geographies>
                ) : (
                    <Geographies geography={INDIA_TOPO_JSON}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const stateName = geo?.properties?.ST_NM?.toUpperCase()?.replace(/\s+/g, "");
                                const fillColor = getColorForSubscriberCount(stateSubscriberMap?.[stateName] ?? 0);
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onClick={() => handleStateClick(geo)}
                                        onMouseEnter={(event) => handleMouseEnter(geo, event)}
                                        onMouseLeave={handleMouseLeave}
                                        style={{
                                            default: { fill: fillColor, stroke: "#607D8B", strokeWidth: 0.2 },
                                            hover: { fill: "#E3F2FD" },
                                            pressed: { fill: "#E3F2FD" },
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>
                )}
                {!stateGeoJSON && Object.entries(stateCenters).map(([state, { center }]) => (
                    <Marker key={state}
                        coordinates={center}>
                        {!downloadFlag ?
                            <circle r={2.5}
                                fill="#fff" />
                            :
                            <text fill="#000033"
                                fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                                fontWeight="bold"
                                x={-6}
                                y={3}
                                style={{
                                    textAnchor: "start",
                                }}
                                fontSize="8px">{stateSubscriberMap?.[state.toUpperCase().replace(/\s+/g, "")] || null}</text>
                        }
                    </Marker>
                ))}
            </ComposableMap>
        </div>
    );
};
export default React.memo(IndiaMap);
