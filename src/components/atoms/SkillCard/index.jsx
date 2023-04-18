import React from 'react'

const SkillCard = (props) => {
    return (
        <img src={props.img}
            style={{
                maxWidth: 200,
                maxHeight: 200,
                borderRadius: 12,
            }} />
    )
}

export default SkillCard;