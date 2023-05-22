import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-paramts.js'

// CommonJS => require
// ESModule => import/export - 'Por padrão o node não suporta'
// Para diferenciar os carquivo nativos do node dos não nativo é necessario usar node:AAA

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res) // middleware

    const route = routes.find(route => {
        return route.method == method && route.path.test(url)
    })

    if(route){
        const routeParams = req.url.match(route.path)

        //console.log(extractQueryParams(routeParams.groups.query))

        req.params = { ...routeParams.groups}

        return route.handler(req, res)
    }

    res.writeHead(401).end()
})

server.listen(3333);