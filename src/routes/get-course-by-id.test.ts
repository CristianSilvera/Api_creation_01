import { expect, test } from 'vitest'
import request from 'supertest'
import { server } from '../app.ts'
import { faker } from '@faker-js/faker'
import { makeCourse } from '../tests/factories/make-aourse.ts'


test('get course by id', async () => {
    await server.ready()

    const course = await makeCourse()

    const response = await request(server.server)
    .get(`/courses/${course.id}`)

    
    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
        course: {
            id: expect.any(String),
            title: expect.any(String),
            // description: expect.anything(),
            description: null,
        
        }
    })

})