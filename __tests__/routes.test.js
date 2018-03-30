const request = require('supertest');
const app = require('../server');

describe('test / path', () => {
	test('should return json from GET method', () => {
		return request(app).get('/')
			.expect('Content-Type', /json/)
			.expect(200);
	});
});

describe('test users routes', () => {
	test('should return status 200 from POST method', () => {
		return request(app).post('/users/signup')
			.expect('Content-Type', /json/)
			.expect(200);
	});
});
