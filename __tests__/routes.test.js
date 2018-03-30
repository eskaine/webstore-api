const request = require('supertest');
const app = require('../server');

//const usersTest = require('./routes/users.test');

describe('test / path', () => {
	test('should return json from GET method', () => {
		return request(app).get('/').expect(
			200, {'message': 'request received!'}
		);
	});
});

describe('test users routes', () => {
	test('should return status 200 from POST method', () => {
		return request(app).post('/users/signup').expect(200);
	});
});
