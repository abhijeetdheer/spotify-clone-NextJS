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
    const [index,setIndex] = useState(0)
    const [seek,setSeek] = useState(0.0)
    const [repeat,setRepeat] = useState(false)
    const [duration,setDuration] = useState(0.0)
    const [shuffle, setShuffle] = useState(false)

    const setPlayState = (value) => {
        setPlaying(value)
    }
    const onShuffle = () =>{
        setShuffle((state) => !state )
    }
    const onRepeat = () =>{
        setRepeat((state) => !state )
    }

    return (
        <Box>
            <Box>
                <ReactHowler
                playing={playing}
                src={activeSong?.url}/>
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
                                    icon={<MdOutlinePlayCircleFilled/>} />
                    )}
                    <IconButton aria-label="next"
                                outline="none"
                                variant="link"
                                fontSize="24px"
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
                        <Text fontSize="xs">1:21</Text>
                    </Box>
                    <Box width="80%">
                        <RangeSlider aria-label={['min','max']}
                                     step={0.1}
                                     min={0}
                                     max={300}
                                    id="player-range">
                            <RangeSliderTrack bg="gray.800">
                                <RangeSliderFilledTrack bg="gray.600">
                                </RangeSliderFilledTrack>
                                <RangeSliderThumb index={0} />
                            </RangeSliderTrack>
                        </RangeSlider>
                    </Box>
                    <Box width="10%" textAlign="right">
                        <Text fontSize="xs" >3:10</Text>
                    </Box>
                </Flex>
            </Box>
        </Box>
    )
}

export default Player