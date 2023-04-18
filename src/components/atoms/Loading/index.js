import React from "react";
import { ThreeCircles } from 'react-loader-spinner'

const Loading = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
            <ThreeCircles
                height="50"
                width="50"
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
            />
        </div>
    )
};

export default Loading;