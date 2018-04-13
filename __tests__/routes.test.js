const request = require('supertest');
const app = require('../server');

describe('test / path', () => {
	test('should return json from GET method', () => {
		return request(app)
			.get('/')
			.expect('Content-Type', /json/)
			.expect(200);
	});
});

describe('test users routes', done => {
	test('should return status 200 from POST method', () => {
		return request(app)
			.post('/users/signup')
			.field('email', 'test@example.com')
			.field('password', 'password')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				if(err)
					return done(err);

				console.log(res);

			});
	});
});
