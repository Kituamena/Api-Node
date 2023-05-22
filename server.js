import http from 'node:http'

// CommonJS => require
// ESModule => import/export - 'Por padrão o node não suporta'
// Para diferenciar os carquivo nativos do node dos não nativo é necessario usar node:AAA

const users = [];

const server = http.createServer((req, res) => {
    const { method, url } = req

    if(method === 'POST' && url === '/users'){
        
        users.push(
            {
                id: '1',
                name:'Kituamena Pedro',
                from:'Condominio Boa Vida'
            },
            {
                id: '1',
                name:'Kadafe Pedro',
                from:'Condominio Boa Vida'
            },
        )

        return res.end('Criado com Sucesso')
    }

    if(method === 'GET' && url === '/users'){
        return res 
            .setHeader('Content-Type', 'application/json')
            .end(JSON.stringify(users))
    }
    
    res.end('YYYYYYYY')
})

server.listen(3333);