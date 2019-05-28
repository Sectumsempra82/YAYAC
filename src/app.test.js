import request from 'supertest';
import app from './app';

describe('Test the paths', () => {
    test('It should response the GET method for the root path', (done) => {
        request(app).get('/').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    test('It should response the GET method for the /Academies/List path', (done) => {
        request(app).get('/Academies/List').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    test('It should response the GET method for the /Academies/AddAcademy path', (done) => {
        request(app).get('/Academies/AddAcademy').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});

// NEED TO SEPARATE THE DB FROM APP.JS TO TEST THIS

// describe('Test the apis', () => {
//     test('It should response the GET method for /api/getList', (done) => {
//         return request(app).get('/api/getList').expect(200)
//         });
// });



