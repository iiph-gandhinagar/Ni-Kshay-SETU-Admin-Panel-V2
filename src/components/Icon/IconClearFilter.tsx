import type { SVGProps } from "react";

export const IconClearFilters = (props: SVGProps<SVGSVGElement>) => {
    return (<svg xmlns="http://www.w3.org/2000/svg"
        width="3rem"
        height="2em"
        viewBox="0 0 48 48"
        {...props}><path fill="black"
            d="M29 23H19L7 9h34z"></path><path fill="black"
                d="m29 38l-10 6V23h10zM41.5 9h-35C5.7 9 5 8.3 5 7.5S5.7 6 6.5 6h35c.8 0 1.5.7 1.5 1.5S42.3 9 41.5 9"></path><circle cx={38}
                    cy={38}
                    r={10}
                    fill="#f44336"></circle><path fill="#fff"
                        d="M32 36h12v4H32z"></path></svg>);
};
