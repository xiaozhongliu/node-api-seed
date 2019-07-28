const Redis = require('ioredis')

const cluster = new Redis.Cluster([{
    port: 6379,
    host: 'redis-cluster.data',
}])

async function main() {
    /**
     * INCR in high speed with consistency check
     */
    let executed = 0
    let WActual = 0
    let RActual = 0
    let WError = 0
    let RError = 0
    await cluster.set('foo', 0)

    setInterval(async () => {
        const actual = await cluster.get('foo')
        const lost = executed - parseInt(actual)
        const lostInfo = lost > 0 ? `| ${lost} lost` : ''
        console.log(`${RActual} R (${RError} err) | ${WActual} W (${WError} err) ${lostInfo}`)
    }, 1000)

    while (true) {
        // INRC
        try {
            await cluster.incr('foo')
            WActual++
        } catch (error) {
            WError++
        }
        // GET
        try {
            await cluster.get('foo')
            RActual++
        } catch (error) {
            RError++
        }
        executed++
    }


    // /**
    //  * SET in high speed
    //  */
    // for (let i = 0; i < 50000; i++) {
    //     const res = await cluster.set(`foo${i}`, i)
    //     console.log(res, i)
    // }

    // for (let i = 0; i < 50000; i++) {
    //     const res = await cluster.get(`foo${i}`)
    //     if (!res === i) console.log(res, i)
    // }

    // console.log('done')


    // console.log('masters', JSON.stringify(cluster.nodes('master')))
    // console.log('slaves', JSON.stringify(cluster.nodes('slave')))
}
main()
