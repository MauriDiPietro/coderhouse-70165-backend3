export const info = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API News',
            version: '1.0.0',
            description: 'API News - Node, Express, MongoDB'
        },
        servers: [
            {
                url: 'http://localhost:8080'
            },
            // {
            //     url: 'http://localhost:8080'
            // }
        ]
    },
    apis: ['./src/docs/*.yml']
}