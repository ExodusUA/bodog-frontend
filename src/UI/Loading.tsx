import React from 'react'

interface Props {
    w: string,
    h: string
}

function Loading({ w, h }: Props) {
    return (
        <div className={`w-[${w}px] h-[${h}px]`}>
            <svg xmlns="http://www.w3.org/2000/svg" style={{margin: 'auto', background: 'rgba(255, 255, 255, 0)', display: 'block'}} width={w} height={h} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" fill="none" stroke="#e80000" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                </circle>
            </svg>
        </div>
    )
}

export default Loading