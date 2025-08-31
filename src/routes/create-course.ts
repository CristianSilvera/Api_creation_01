import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { db } from "../database/client.ts"
import { courses } from "../database/schema.ts"
import z from 'zod'

export const createCoursesRoute: FastifyPluginAsyncZod = async (server) => {

    server.post('/courses', {
        schema: {
            tags: ['courses'],
            summary: 'Create a course',
            description: 'Esta ruta recibe un título y crea un curso nuevo en bd',
            body: z.object({
                title: z.string().min(5, 'El título necesita tener al menos 5 caractéres.'),
            }),

            response: {
                201: z.object({courseId: z.uuid()}).describe('Curso creado con éxito!')
            }

        },
    }, async (request, reply) => {
        const courseTitle = request.body.title


        const result = await db
            .insert(courses)
            .values({ title: courseTitle })
            .returning()



        return reply.status(201).send({ courseId: result[0].id })
    })


}