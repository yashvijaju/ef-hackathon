import styles from "@/styles/calm.module.css";
import { Slider, Button, Box, Typography } from "@mui/material"
import { styled } from '@mui/material/styles';
import { FastRewind, FastForward, PlayArrow, Pause } from '@mui/icons-material';
import { useState, useEffect } from "react"


export default function Audio() {
    const [duration, setduration] = useState(0); // seconds
    const [position, setPosition] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    function formatDuration(value) {
        const minute = Math.floor(value / 60);
        const secondLeft = Math.floor(value - minute * 60);
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }

    useEffect(() => {
        const audio = document.getElementById("audioplayer");
        setduration(audio.duration)
        
        isPlaying ? audio.play() : audio.pause();

        audio.ontimeupdate = () => {
            setPosition(audio.currentTime);
        }
    }, [isPlaying])

    return(
        <div>
            <audio id="audioplayer">
                <source src="/audio.mp3" type="audio/mpeg"/>
            </audio>
            <div style={{marginTop: '20px'}}>
                <Slider
                    aria-label="time-indicator"
                    size="small"
                    value={position}
                    min={0}
                    step={1}
                    max={duration}
                    onChange={(_, value) => {
                        setPosition(value);
                        const audio = document.getElementById("audioplayer");
                        audio.currentTime = value;
                    }}
                    sx={{
                        color: '#00008B',
                        height: 4,
                        '& .MuiSlider-thumb': {
                        width: 8,
                        height: 8,
                        transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                        '&::before': {
                            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                        },
                        '&:hover, &.Mui-focusVisible': {
                            boxShadow: '0px 0px 0px 8px rgb(0 0 0 / 16%)',
                        },
                        '&.Mui-active': {
                            width: 20,
                            height: 20,
                        },
                        },
                        '& .MuiSlider-rail': {
                        opacity: 0.28,
                        },
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mt: -2,
                    }}
                >
                    <TinyText>{formatDuration(position)}</TinyText>
                    <TinyText>{formatDuration(duration)}</TinyText>
                </Box>
            </div>
            <div style={{marginTop: '10px'}}>
                <Button className={styles.fast_buttons}>
                    <FastRewind />
                </Button>
                <Button variant="contained" className={styles.play_button} onClick={()=>{setIsPlaying((prev) => !prev)}}>
                    {isPlaying ? <Pause /> : <PlayArrow />}
                </Button>
                <Button className={styles.fast_buttons}>
                    <FastForward />
                </Button>
            </div>
        </div>
    )
}
  
const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});