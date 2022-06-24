import prisma from '../../lib/prisma'
import { validateRoute } from '../../lib/auth'

export default validateRoute(async (req, res, user) => {
    const playlists = await prisma.playlist.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            name: 'asc',
        },
    })
    //console.log(playlists)
    res.json(playlists)
})