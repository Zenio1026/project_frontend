import {LinearProgress} from "@mui/material";
import "./loading.css"

export default function Loading() {
    return (
        <>
            <LinearProgress sx={{height: 4}}/>

            <div className="contain">
                <div className="icon triangle">
                    <img
                        src="http://kapilnemo.free.fr/codepen/playstation-loading/1.png"
                        alt="ps-triangle"
                        // style={{ width: "150px", height: "150px"}}
                    />
                </div>
                <div className="icon circle">
                    <img
                        src="http://kapilnemo.free.fr/codepen/playstation-loading/2.png"
                        alt="ps-circle"
                    />
                </div>
                <div className="icon cross">
                    <img
                        src="http://kapilnemo.free.fr/codepen/playstation-loading/3.png"
                        alt="ps-cross"
                    />
                </div>
                <div className="icon box">
                    <img
                        src="http://kapilnemo.free.fr/codepen/playstation-loading/4.png"
                        alt="ps-box"
                    />
                </div>
            </div>
        </>
    )
}

// e.PNG
// https://pngimg.com/uploads/letter_e/letter_e_PNG13.png