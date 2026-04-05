import { expect, test } from 'vitest'
import request from 'supertest'
import { server } from '../app.ts'
import { makeCourse } from '../tests/factories/make-course.ts'


test('return 404 for non existing courses', async () => {
    await server.ready()

    const course = await makeCourse()

    const response = await request(server.server)
    .get(`/courses/a5be141f-c115-478d-be92-1299edfc5df9"`)

    
    expect(response.status).toEqual(400)
   
})