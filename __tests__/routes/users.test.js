const request = require('supertest');

module.exports = (app) => {
	describe('test users routes', () => {
		test('should return status 200 from POST method', () => {
			return request(app).post('/users/signup').expect(200);
		});
	});
};
