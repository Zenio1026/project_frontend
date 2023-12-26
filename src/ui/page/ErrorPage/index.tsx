import TopNavBar from "../../component/TopNavBar.tsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
import {useNavigate, useRouteError} from "react-router-dom";

export default function ErrorPage() {
    const navigate = useNavigate();
    const error = useRouteError();
    console.error(error);

    const handleButtonChange = () => {
        navigate("/")
    }

    const handleHelpButtonChange = () => {
        window.location.href = "mailto:zenio1026@gmail.com";
    }

    return (
        <Box sx={{height: "100vh", background: 'snow', minHeight: '100%', overflow: 'auto'}}>
            <TopNavBar/>


            <img
                src="https://gmedia.playstation.com/is/image/SIEPDC/astrobot-404-page-standard-hero-desktop-tablet-01-en-14nov18?$4000px$"
                alt="Error"
                style={{width: "100%"}}
            />

            <Box
                sx={{
                    position: "relative",
                    top: "-20%",
                    left: "24%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "16px",
                    fontFamily: "Arial",
                    textAlign: "left",
                    color: "white",
                    maxWidth: "40%",
                    padding: "0 20px",
                }}
            >
                <h1>Error</h1>
                <h2>Looks like you're lost</h2>
                <p>
                    Uh-oh, looks like you're in uncharted territory.
                    Before we send Astro Bot on a rescue mission, try searching again or set a
                    course back to the Home page to find what you're looking for.
                </p>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    marginTop: "-200px",
                }}
            >
                <div style={{textAlign: "center", maxWidth: "400px"}}>
                    <img
                        src="https://gmedia.playstation.com/is/image/SIEPDC/404-three-column-gamefinder-02-us-12Jul14?$1200px--t$"
                        style={{width: "70%"}}
                    />
                    <Typography sx={{color: 'rgb(0,104,189)'}}>
                        FIND FUN
                    </Typography>
                    <Typography sx={{fontSize: '24px'}}>
                        Browser game
                    </Typography><br/>
                    <Typography>
                        From action adventure to family games,
                        check out the latest games and finding something fun!
                    </Typography><br/>
                    <Button
                        variant="contained"
                        onClick={handleButtonChange}
                        sx={{
                            textTransform: 'none',
                            borderRadius: '18px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            '&:hover': {boxShadow: 'inset 0 0 0 2px white, 0 0 0 2px rgb(25,118,210)'}
                        }}
                    >
                        Home page
                    </Button>
                </div>

                <div style={{textAlign: "center", maxWidth: "400px"}}>
                    <img
                        src="https://gmedia.playstation.com/is/image/SIEPDC/404-three-column-support-02-us-12Jul14?$1200px--t$"
                        style={{width: "70%"}}
                    />
                    <Typography sx={{color: 'rgb(0,104,189)'}}>
                        PROBLEMS
                    </Typography>
                    <Typography sx={{fontSize: '24px'}}>
                        Get Help
                    </Typography><br/>
                    <Typography>
                        Got a question about your account or an issue with an accessory?
                        Get the support you need.
                    </Typography><br/>
                    <Button
                        variant="contained"
                        onClick={handleHelpButtonChange}
                        sx={{
                            textTransform: 'none',
                            borderRadius: '18px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            '&:hover': {boxShadow: 'inset 0 0 0 2px white, 0 0 0 2px rgb(25,118,210)'}
                        }}
                    >
                        Get Help
                    </Button>
                </div>
            </Box>

        </Box>
    );
}