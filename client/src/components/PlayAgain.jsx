import Button from "@mui/material/Button";

export const PlayAgain = () => {
    return (
        <Button
            variant="contained"
            color="warning"
            onClick={()=> window.location.reload()}
        >
            Play Again
        </Button>
    )
}