import { HeaderCircle } from "components";


const CircleWithNum: React.FC<HeaderCircle> = ({
    number,
    title
}) => {
    const formatNumber = (num: any) => {
        if (num >= 1000) {
            return (num / 1000)?.toFixed(1) + "k";
        }
        return num;
    };
    return (
        <>
            <span
                className="flex flex-wrap justify-center items-center w-10 h-10 text-center rounded-full object-cover bg-primary/10 text-primary">
                {formatNumber(number)}
            </span>
            <h5 className="font-semibold text-lg">{title}</h5>
        </>
    );
};
export default CircleWithNum;
