const fastify = require ('fastify')
const crypto = require('crypto')

const server = fastify()

const courses = [
    {id: "1", title: 'Curso de Node.js'},
    {id: "2", title: 'Curso de React'},
    {id: "3", title: 'Curso de React Native'}
]

server.get('/courses', () => {
    return { courses }
})

server.get('/courses/:id', (request, replay) => {
    const courseId = request.params.id
    
    const course = courses.find(course => course.id === courseId)

    if (course) {
        return { course }
    }

    return replay.status(404).send()

})

server.post('/courses', (request, reply) => {

    const courseId = crypto.randomUUID()

    courses.push({id: courseId, title: 'Nuevo curso'})

    return reply.status(201).send({courseId})
})

server.listen({ port:3333 }).then(() => {
    console.log("HTTP server running!!!")
})