const request = require('supertest');
const app = require('../server');

describe('test / path', () => {
	test('should return json from GET method', () => {
		return request(app).get('/').expect(200);
	});
});
