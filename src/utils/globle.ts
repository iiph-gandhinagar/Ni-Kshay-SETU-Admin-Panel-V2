import TAMILNADU from "../states_topo_json//TAMIL NADU.topo.json";
import ANDAMANNICOBAR from "../states_topo_json/ANDAMAN & NICOBAR.topo.json";
import ANDHRAPRADESH from "../states_topo_json/ANDHRA PRADESH.topo.json";
import ARUNACHALPRADESH from "../states_topo_json/ARUNACHAL PRADESH.topo.json";
import ASSAM from "../states_topo_json/ASSAM.topo.json";
import BIHAR from "../states_topo_json/BIHAR.topo.json";
import CHANDIGARH from "../states_topo_json/CHANDIGARH.topo.json";
import CHHATTISGARH from "../states_topo_json/CHHATTISGARH.topo.json";
import DADRAANDNAGARHAVELI from "../states_topo_json/DADRA AND NAGAR HAVELI.topo.json";
import DAMANANDDIU from "../states_topo_json/DAMAN & DIU.topo.json";
import DELHI from "../states_topo_json/DELHI.topo.json";
import GOA from "../states_topo_json/GOA.topo.json";
import GUJARAT from "../states_topo_json/GUJARAT.topo.json";
import HARYANA from "../states_topo_json/HARYANA.topo.json";
import HIMACHALPRADESH from "../states_topo_json/HIMACHAL PRADESH.topo.json";
import JAMMUANDKASHMIR from "../states_topo_json/JAMMU AND KASHMIR.topo.json";
import JHARKHAND from "../states_topo_json/JHARKHAND.topo.json";
import KARNATAKA from "../states_topo_json/KARNATAKA.topo.json";
import KERALA from "../states_topo_json/KERALA.topo.json";
import MADHYAPRADESH from "../states_topo_json/MADHYA PRADESH.topo.json";
import MAHARASHTRA from "../states_topo_json/MAHARASHTRA.topo.json";
import MANIPUR from "../states_topo_json/MANIPUR.topo.json";
import MEGHALAYA from "../states_topo_json/MEGHALAYA.topo.json";
import MIZORAM from "../states_topo_json/MIZORAM.topo.json";
import NAGALAND from "../states_topo_json/NAGALAND.topo.json";
import ORISSA from "../states_topo_json/ODISHA.topo.json";
import PUDUCHERRY from "../states_topo_json/PUDUCHERRY.topo.json";
import PUNJAB from "../states_topo_json/PUNJAB.topo.json";
import RAJASTHAN from "../states_topo_json/RAJASTHAN.topo.json";
import SIKKIM from "../states_topo_json/SIKKIM.topo.json";
import TELANGANA from "../states_topo_json/TELANGANA.topo.json";
import TRIPURA from "../states_topo_json/TRIPURA.topo.json";
import UTTARPRADESH from "../states_topo_json/UTTAR PRADESH.topo.json";
import UTTARAKHAND from "../states_topo_json/UTTARAKHAND.topo.json";
import WESTBENGAL from "../states_topo_json/WEST BENGAL.topo.json";

export const stateMap: any = {
    ANDHRAPRADESH,
    ARUNACHALPRADESH,
    ASSAM,
    BIHAR,
    CHHATTISGARH,
    GOA,
    GUJARAT,
    HARYANA,
    HIMACHALPRADESH,
    JHARKHAND,
    KARNATAKA,
    KERALA,
    MADHYAPRADESH,
    MAHARASHTRA,
    MANIPUR,
    MEGHALAYA,
    MIZORAM,
    NAGALAND,
    ORISSA,
    PUNJAB,
    RAJASTHAN,
    SIKKIM,
    TAMILNADU,
    TELANGANA,
    TRIPURA,
    UTTARPRADESH,
    UTTARAKHAND,
    WESTBENGAL,
    "ANDAMAN&NICOBARISLANDS": ANDAMANNICOBAR,
    CHANDIGARH,
    DADRAANDNAGARHAVELI,
    DAMANANDDIU,
    DELHI,
    PUDUCHERRY,
    JAMMUANDKASHMIR
};
export const stateCenters: Record<string, { center: [number, number]; scale: number }> = {
    ANDHRAPRADESH: { center: [79.8886, 16.2488], scale: 3500 },
    ARUNACHALPRADESH: { center: [95.313568, 28.236906], scale: 3500 },
    ASSAM: { center: [92.9376, 26.2006], scale: 3500 },
    BIHAR: { center: [85.3131, 25.0961], scale: 3500 },
    CHHATTISGARH: { center: [81.8661, 21.2787], scale: 3500 },
    GOA: { center: [74.124, 15.2993], scale: 10000 },
    GUJARAT: { center: [71.6470, 23.0733], scale: 3500 },
    HARYANA: { center: [76.0856, 29.0588], scale: 3500 },
    HIMACHALPRADESH: { center: [77.301549, 32.280014], scale: 3500 },
    JHARKHAND: { center: [85.2799, 23.6102], scale: 3500 },
    KARNATAKA: { center: [75.9238, 14.4663], scale: 3500 },
    KERALA: { center: [76.2711, 10.8505], scale: 3500 },
    MADHYAPRADESH: { center: [78.5661, 23.6102], scale: 3500 },
    MAHARASHTRA: { center: [75.7139, 19.7515], scale: 3500 },
    MANIPUR: { center: [93.9063, 24.6637], scale: 5500 },
    MEGHALAYA: { center: [91.3662, 25.467], scale: 5500 },
    MIZORAM: { center: [92.9376, 23.1645], scale: 5500 },
    NAGALAND: { center: [94.5624, 26.1584], scale: 3500 },
    ORISSA: { center: [85.0985, 20.9517], scale: 3500 },
    PUNJAB: { center: [75.3854, 30.8937], scale: 3500 },
    RAJASTHAN: { center: [73.8478, 27.0238], scale: 3500 },
    SIKKIM: { center: [88.5122, 27.533], scale: 10000 },
    TAMILNADU: { center: [78.6569, 11.1271], scale: 3500 },
    TELANGANA: { center: [79.0193, 17.9783], scale: 3500 },
    TRIPURA: { center: [91.9882, 23.9408], scale: 5500 },
    UTTARPRADESH: { center: [80.9462, 27.0238], scale: 3500 },
    UTTARAKHAND: { center: [79.0193, 30.0668], scale: 3500 },
    WESTBENGAL: { center: [87.8590, 23.6032], scale: 3500 },
    "ANDAMAN&NICOBARISLANDS": { center: [92.7603, 9.1679], scale: 3500 },
    CHANDIGARH: { center: [76.7794, 30.7333], scale: 3500 },
    DADRAANDNAGARHAVELI: { center: [73.0169, 20.2666], scale: 3500 },
    DAMANANDDIU: { center: [72.8501, 20.4283], scale: 3500 },
    DELHI: { center: [77.1025, 28.7041], scale: 20000 },
    PUDUCHERRY: { center: [79.8083, 11.9416], scale: 3500 },
    JAMMUANDKASHMIR: { center: [75.9806, 33.7782], scale: 3500 },
};
export const language = [{ label: "Hindi", value: "hi" }, { label: "Gujarati", value: "gu" }, { label: "Marathi", value: "mr" }, { label: "Tamil", value: "ta" }, { label: "Telugu", value: "te" }, { label: "Kannada", value: "kn" }, { label: "punjabi", value: "pa" }];
export const typeOfMaterials = [
    { label: "Folder", value: "folder" },
    { label: "PDF", value: "pdfs" },
    { label: "Videos", value: "videos" },
    { label: "Presentation", value: "ppt" },
    { label: "Document", value: "document" },
    { label: "Images", value: "images" },
    { label: "Pdf Office Orders", value: "pdf_office_orders" }
];
export const countryCode = [
    {
        "name": "Afghanistan",
        "dial_code": "+93",
        "code": "AF"
    },
    {
        "name": "India",
        "dial_code": "+91",
        "code": "IN"
    },
    {
        "name": "Argentina",
        "dial_code": "+54",
        "code": "AR"
    },
    {
        "name": "Australia",
        "dial_code": "+61",
        "code": "AU"
    },
    {
        "name": "Austria",
        "dial_code": "+43",
        "code": "AT"
    },
    {
        "name": "Indonesia",
        "dial_code": "+62",
        "code": "ID"
    },
    {
        "name": "Pakistan",
        "dial_code": "+92",
        "code": "PK"
    },
    {
        "name": "Azerbaijan",
        "dial_code": "+994",
        "code": "AZ"
    },
    {
        "name": "Bangladesh",
        "dial_code": "+880",
        "code": "BD"
    },
    {
        "name": "Bhutan",
        "dial_code": "+975",
        "code": "BT"
    },
    {
        "name": "Brazil",
        "dial_code": "+55",
        "code": "BR"
    },
    {
        "name": "Canada",
        "dial_code": "+1",
        "code": "CA"
    },
    {
        "name": "France",
        "dial_code": "+33",
        "code": "FR"
    },
    {
        "name": "Germany",
        "dial_code": "+49",
        "code": "DE"
    },
    {
        "name": "Ghana",
        "dial_code": "+233",
        "code": "GH"
    },
    {
        "name": "Guyana",
        "dial_code": "+595",
        "code": "GY"
    },
    {
        "name": "Nigeria",
        "dial_code": "+234",
        "code": "NG"
    },
    {
        "name": "Oman",
        "dial_code": "+968",
        "code": "OM"
    },
    {
        "name": "Philippines",
        "dial_code": "+63",
        "code": "PH"
    },
    {
        "name": "Poland",
        "dial_code": "+48",
        "code": "PL"
    },
    {
        "name": "Portugal",
        "dial_code": "+351",
        "code": "PT"
    },
    {
        "name": "Russia",
        "dial_code": "+7",
        "code": "RU"
    },
    {
        "name": "Sao Tome and Principe",
        "dial_code": "+239",
        "code": "ST"
    },
    {
        "name": "Saudi Arabia",
        "dial_code": "+966",
        "code": "SA"
    },
    {
        "name": "Serbia",
        "dial_code": "+381",
        "code": "RS"
    },
    {
        "name": "Singapore",
        "dial_code": "+65",
        "code": "SG"
    },
    {
        "name": "Solomon Islands",
        "dial_code": "+677",
        "code": "SB"
    },
    {
        "name": "Somalia",
        "dial_code": "+252",
        "code": "SO"
    },
    {
        "name": "South Africa",
        "dial_code": "+27",
        "code": "ZA"
    },
    {
        "name": "Sri Lanka",
        "dial_code": "+94",
        "code": "LK"
    },
    {
        "name": "Thailand",
        "dial_code": "+66",
        "code": "TH"
    },
    {
        "name": "United Arab Emirates",
        "dial_code": "+971",
        "code": "AE"
    },
    {
        "name": "United Kingdom",
        "dial_code": "+44",
        "code": "GB"
    },
    {
        "name": "United States",
        "dial_code": "+1",
        "code": "US"
    },
    {
        "name": "Vietnam",
        "dial_code": "+84",
        "code": "VN"
    }
];

export const staticAssessmentData2024 = [
    { date: "Jan 2024", subscriber_count: 295 },
    { date: "Feb 2024", subscriber_count: 51 },
    { date: "Mar 2024", subscriber_count: 27 },
    { date: "Apr 2024", subscriber_count: 41 },
    { date: "May 2024", subscriber_count: 32 },
    { date: "Jun 2024", subscriber_count: 32 },
    { date: "Jul 2024", subscriber_count: 546 },
    { date: "Aug 2024", subscriber_count: 108 },
    { date: "Sep 2024", subscriber_count: 114 },
    { date: "Oct 2024", subscriber_count: 296 },
    { date: "Nov 2024", subscriber_count: 9 },
    { date: "Dec 2024", subscriber_count: 19 },
];

export const staticVisitData2024 = [
    { date: "Jan 2024", subscriber_count: 35390 },
    { date: "Feb 2024", subscriber_count: 27015 },
    { date: "Mar 2024", subscriber_count: 23900 },
    { date: "Apr 2024", subscriber_count: 24061 },
    { date: "May 2024", subscriber_count: 23154 },
    { date: "Jun 2024", subscriber_count: 20758 },
    { date: "Jul 2024", subscriber_count: 95382 },
    { date: "Aug 2024", subscriber_count: 23573 },
    { date: "Sep 2024", subscriber_count: 16551 },
    { date: "Oct 2024", subscriber_count: 26898 },
    { date: "Nov 2024", subscriber_count: 13660 },
    { date: "Dec 2024", subscriber_count: 13331 },
];
