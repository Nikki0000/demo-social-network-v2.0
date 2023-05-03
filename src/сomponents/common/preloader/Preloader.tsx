import React, { FC } from "react";
import preloader from "../../../assets/images/Spinner-1s-200px.svg";

type PropsType = {
}

let Preloader: FC = () => {
    return <div>
        <img src={preloader} />
    </div>
}

export default Preloader;