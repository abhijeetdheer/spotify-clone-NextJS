import { Box, Flex, Input, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { useSWRConfig } from 'swr'
import NextImage from 'next/image'
import { auth } from '../lib/mutation'

const AuthForm: FC<{mode : string}> =({mode}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter()

    const handelSubmit = async (e) =>{
        e.preventDefault()
        setIsLoading(true)

        // @ts-ignore
        // @ts-ignore
        await auth( mode, {email,password})
        setIsLoading(false)
        router.push('/')
    }

    return(
        <Box height="100vh" width="100vw" bg="black" color="white">
            <Flex justify="center" align="center" height="100px" borderBottom="white 1px solid">
                <NextImage src="/spotify.svg" height={60} width={120}></NextImage>
            </Flex>
            <Flex justify="center" align="center" height="calc(100vh - 100px)">
                <Box padding="50px" bg="gray.900" borderRadius={"6px"}>
                    <form onSubmit={handelSubmit}>
                        <Input placeholder="email" type="email" onChange={(e)=>setEmail(e.target.value)}></Input>
                        <Input placeholder="password" type="password" onChange={(e)=>setPassword(e.target.value)}></Input>
                        <Button type="submit" bg="green.500" isLoading={isLoading} sx={{'&:hover':{bg:'green.300',},}}>
                            {mode}
                        </Button>
                    </form>
                </Box>
            </Flex>
        </Box>
    )
}

export default AuthForm