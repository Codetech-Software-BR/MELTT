
import React from 'react';

interface StudentHeaderCoverProps extends React.SVGProps<SVGSVGElement> {}

const StudentHeaderCover = (props: StudentHeaderCoverProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={801}
    height={102}
    fill="none"
    {...props}
  >
    <g filter="url(#a)">
      <path
        fill="#342394"
        d="M50 50c0-11.046 8.954-20 20-20h691c11.046 0 20 8.954 20 20v81.629H50V50Z"
      />
    </g>
    <mask
      id="b"
      width={731}
      height={102}
      x={50}
      y={30}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <path
        fill="#428777"
        d="M50 50c0-11.046 8.954-20 20-20h691c11.046 0 20 8.954 20 20v81.629H50V50Z"
      />
    </mask>
    <g mask="url(#b)">
      <rect
        width={189.465}
        height={199.722}
        x={478.293}
        y={85.895}
        fill="#FB7D5B"
        rx={94.732}
      />
      <rect
        width={189.465}
        height={199.722}
        x={562.498}
        y={52.977}
        fill="#FCC43E"
        rx={94.732}
      />
    </g>
    <defs>
      <filter
        id="a"
        width={831}
        height={201.628}
        x={0}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={20} />
        <feGaussianBlur stdDeviation={25} />
        <feColorMatrix values="0 0 0 0 0.74902 0 0 0 0 0.0823529 0 0 0 0 0.423529 0 0 0 0.05 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_599_13978"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_599_13978"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)
export default StudentHeaderCover
