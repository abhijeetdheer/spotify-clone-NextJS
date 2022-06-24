import {
    ButtonGroup,
    Box,
    IconButton,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderTrack,
    RangeSliderThumb,
    Center,
    Flex,
    Text,
} from "@chakra-ui/react";
import ReactHowler from 'react-howler'
import { useEffect, useRef, useState } from 'react'
import {
    MdShuffle,
    MdSkipPrevious,
    MdSkipNext,
    MdOutlinePlayCircleFilled,
    MdOutlinePauseCircleFilled,
    MdOutlineRepeat,
} from 'react-icons/md'
import { useStoreActions } from 'easy-peasy'
import { formatTime } from '../lib/formatters'

const Player = ({songs, activeSong}) =>{
    const [playing, setPlaying] = useState(true)
    const [index,setIndex] = useState(
        songs.findIndex((s) => s.id === activeSong.id)
    )
    const [seek,setSeek] = useState(0.0)
    const [isSeeking,setIsSeeking] = useState(false)
    const [repeat,setRepeat] = useState(false)
    const [duration,setDuration] = useState(0.0)
    const [shuffle, setShuffle] = useState(false)
    const soundRef = useRef(null)
    const repeatRef= useRef(repeat)
    const setActiveSong = useStoreActions((state: any) => state.changeActiveSong)

    useEffect(()=>{
        let timerId

        if(playing && !isSeeking) {
            const f = () => {
                setSeek(soundRef.current.seek())
                timerId = requestAnimationFrame(f)
            }

            timerId = requestAnimationFrame(f)
            return () => cancelAnimationFrame(timerId)
        }

        cancelAnimationFrame(timerId)
    },[playing,isSeeking])

    useEffect (() => {
        repeatRef.current = repeat
    },[repeat])
    useEffect(()=>{
        setActiveSong(songs[index])
    },[index,setActiveSong,songs])

    const setPlayState = (value) => {
        setPlaying(value)
    }
    const onShuffle = () =>{
        setShuffle((state) => !state )
    }
    const onRepeat = () =>{
        setRepeat((state) => !state )
    }
    const prevSong = () =>{
        setIndex((state) =>{
            return state ? state - 1 : songs.length -1
        })
    }
    const nextSong = () =>{
        setIndex((state) => {
            if (shuffle) {
                const next = Math.floor(Math.random() * songs.length)

                if (next === state) {
                    return nextSong()
                }
                return next
            }

            return state === songs.length - 1 ? 0 : state + 1
        })
    }

    const onEnd = () =>{
        if(repeatRef.current){
            soundRef.current.seek(0)
        }
        else{
            nextSong()
        }
    }

    const onLoad = () =>{
        const songDuration = soundRef.current.duration()
        setDuration(songDuration)
    }

    const onSeek = (e) => {
        setSeek(parseFloat(e[0]))
        soundRef.current.seek(e[0])
    }


    return (
        <Box>
            <Box>
                <ReactHowler
                playing={playing}
                src={activeSong?.url}
                ref={soundRef}
                onLoad={onLoad}
                onEnd={onEnd}
                />
            </Box>
            <Center>
                <ButtonGroup>
                    <IconButton aria-label="shuffle"
                                outline="none"
                                variant="link"
                                fontSize="24px"
                                color={shuffle ? 'white' : 'gray.600'}
                                onClick={onShuffle}
                                icon={<MdShuffle/>} />
                    <IconButton aria-label="skip"
                                outline="none"
                                variant="link"
                                fontSize="24px"
                                onClick={prevSong}
                                icon={<MdSkipPrevious/>} />
                    {playing ? (
                        <IconButton aria-label="pause"
                                    outline="none"
                                    variant="link"
                                    fontSize="24px"
                                    color="white"
                                    icon={<MdOutlinePauseCircleFilled/>}
                                    onClick={() => setPlayState(false)}
                        />
                    ): (
                        <IconButton aria-label="play"
                                    outline="none"
                                    variant="link"
                                    fontSize="24px"
                                    color="white"
                                    onClick={() => setPlayState(true)}
                                    icon={<MdOutlinePlayCircleFilled/>} />
                    )}
                    <IconButton aria-label="next"
                                outline="none"
                                variant="link"
                                fontSize="24px"
                                onClick={nextSong}
                                icon={<MdSkipNext/>} />
                    <IconButton aria-label="repeat"
                                outline="none"
                                variant="link"
                                fontSize="24px"
                                color={repeat ? 'white' : 'gray.600'}
                                onClick={onRepeat}
                                icon={<MdOutlineRepeat/>} />
                </ButtonGroup>
            </Center>
            <Box color="gray.600">
                <Flex justify="center" align="center">
                    <Box width="10%">
                        <Text fontSize="xs">{formatTime(seek)}</Text>
                    </Box>
                    <Box width="80%">
                        <RangeSlider aria-label={['min','max']}
                                     step={0.1}
                                     min={0}
                                     max={duration ? (duration.toFixed(2) as unknown as number) : 0}
                                    id="player-range"
                                     onChange={onSeek}
                                     value={[seek]}
                                     onChangeStart={() => setIsSeeking(true)}
                                     onChangeEnd={() => setIsSeeking(false)}
                        >

                            <RangeSliderTrack bg="gray.800">
                                <RangeSliderFilledTrack bg="gray.600">
                                </RangeSliderFilledTrack>
                                <RangeSliderThumb index={0} />
                            </RangeSliderTrack>
                        </RangeSlider>
                    </Box>
                    <Box width="10%" textAlign="right">
                        <Text fontSize="xs" >{formatTime(duration)}</Text>
                    </Box>
                </Flex>
            </Box>
        </Box>
    )
}

export default Player