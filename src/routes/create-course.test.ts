import { expect, test } from 'vitest'
import request from 'supertest'
import { server } from '../app'
import { faker } from '@faker-js/faker'


test('crear un curso con éxito', async () => {
    await server.ready()

    const response = await request(server.server)
    .post('/courses')
    .set('Content-Type', 'application/json')
    .send({ title: faker.lorem.words(4)})
    
    expect(response.status).toEqual(201)
    expect(response.body).toEqual({
        courseId: expect.any(String),
    })

})