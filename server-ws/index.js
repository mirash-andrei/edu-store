import { Server } from 'socket.io'

const server = new Server(3000, {
    cors: {
        origin: '*',
    },
})

let basket = {};

server.on('connection', (clientSocket) => {
    clientSocket.emit('pong', {
        allClear: true,
        id: 0,
        count: 0
    })
    basket = {};

    clientSocket.on('add-to-basket', (payload) => {
        console.log('add-to-basket', payload)
        if(!basket[payload.id])
            basket[payload.id] = 0;

        basket[payload.id] = Number(basket[payload.id]) + Number(payload.count)
        if(basket[payload.id] <= 0)
            delete basket[payload.id];

        console.log(Object.entries(basket))

        clientSocket.emit('pong', {
            allClear: false,
            id: payload.id,
            count: basket[payload.id]
        })
    })

    clientSocket.on('change-count', (payload) => {
        console.log('change-count', payload)

        basket[payload.id] = Number(payload.count)
        if(basket[payload.id] <= 0)
            delete basket[payload.id];

        console.log(Object.entries(basket))

        clientSocket.emit('pong', {
            allClear: false,
            id: payload.id,
            count: basket[payload.id]
        })
    })

    clientSocket.on('clear-basket', () => {
        console.log('clear-basket')
        basket = {}

        clientSocket.emit('pong', {
            allClear: true,
            id: 0,
            count: 0
        })
    })
})


console.log('WS Server is up')