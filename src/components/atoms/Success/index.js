import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Success = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
            <CheckCircleIcon
                fontSize="large"
                style={{ color: '#128f3e' }} />
        </div>

    )
};

export default Success;