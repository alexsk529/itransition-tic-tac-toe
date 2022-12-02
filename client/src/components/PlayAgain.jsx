import Button from "@mui/material/Button";

export const PlayAgain = ({socket}) => {
    return (
        <Button
            variant="contained"
            color="warning"
            onClick={()=> socket.emit('play-again')}
        >
            Play Again
        </Button>
    )
}