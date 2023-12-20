import TopNavBar from "../../component/TopNavBar.tsx";
import Box from "@mui/material/Box";
import Loading from "../../component/Loading.tsx";

export default function ErrorPage() {
    return(
        <Box sx={{height: "100vh", overflow: "hidden"}}>
            <TopNavBar/>
            <Loading/>
        </Box>
    )
}