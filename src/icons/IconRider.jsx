const widthIcon = {
    riderCall: "54px",
    riderHeader: "44px",
  };

export function IconRider({ children, width = "riderHeader" }) {
    return (
      <svg
        fill="#ff004d"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={widthIcon[width]}
        height="auto"
        viewBox="0 0 533.954 533.955"
        xmlSpace="preserve"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
  
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
  
        <g id="SVGRepo_iconCarrier">
          {" "}
          <g>
            {" "}
            <path d="M456.402,383.113v115.342h-0.78l-7.43,3.771c-3.511,1.773-56.867,28.017-149.441,31.362V365.273 c0-26.894-26.445-46.398-45.366-56.932c4.492,0.349,9.008,0.585,13.589,0.585c46.24,0,88.23-18.483,119.048-48.397 C428.066,285.277,456.402,330.902,456.402,383.113z M285.842,365.273v168.563c-2.217,0.024-4.333,0.118-6.591,0.118 c-53.543,0-118.597-7.819-193.457-31.197l-7.953-2.494l-0.29-1.797V383.113c0-52.211,28.345-97.836,70.38-122.584 c22.934,22.266,52.059,38.178,84.512,44.875l-2.311,6.04C230.682,311.651,285.842,333.202,285.842,365.273z M209.909,403.528 l-45.817-38.515l-8.311,9.883l41.225,34.644v72.306h12.912v-78.317H209.909z M121.735,144.344 c0-62.38,39.463-115.254,94.682-135.791C217.572,3.656,221.943,0,227.189,0h79.571c5.237,0,9.587,3.632,10.758,8.502 c55.229,20.543,94.696,73.45,94.696,135.842c0,80.215-65.019,145.236-145.24,145.236 C186.771,289.581,121.735,224.559,121.735,144.344z M242.389,38.003c0,13.565,11.035,24.598,24.598,24.598 c13.56,0,24.595-11.032,24.595-24.598V22.189h-49.192V38.003z M149.22,114.648c0,36.274,29.397,95.37,65.684,95.37h104.15 c36.28,0,65.687-59.096,65.687-95.37s-29.406-35.987-65.687-35.987h-104.15C178.623,78.667,149.22,78.379,149.22,114.648z M311.819,87.544h-22.248l-47.147,108.123h21.953L311.819,87.544z M299.075,195.667l47.44-108.123h-22.254l-47.145,108.123H299.075 z" />{" "}
          </g>{" "}
        </g>
        {children}
      </svg>
    );
  }