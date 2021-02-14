const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../../app');
chai.use(chaiHttp);

let token;
let object_id;

describe('Menu Test',() =>{
    before('Get token information',(done) =>{
        chai.request(server)
        .post('/users/authenticate')
        .send({username:"nisancem",password:"cemads1"})
        .end((err,res) =>{
            token = res.body.token;
            console.log(token)
            done();
        })
    });
    describe('Get method',()=>{
        it('Get all menu',(done) =>{
            chai.request(server)
            .get('/api/menu')
            .set('x-access-token',token)
            .end((err,res) =>{
                res.should.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            })
        });
    });
    describe('Post method',() =>{
        it('Post menu',(done) =>{
            const menu = {
                "place":[
                    {
                        "placeName":"Dede Kebap",
                        "adress":"Karatas yolu",
                        "webSite":"sayedev.online",
                        "totalVisit":0,
                        "totalLike":0,
                        "point":0,
                        "orderSpeed":"2 dk"
                    }
                ]
            }
            chai.request(server)
            .post('/api/menu')
            .send(menu)
            .set('x-access-token',token)
            .end((err,res) =>{
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                object_id = res.body._id,
                done();
            })
        });
    });

    describe('Put method',() =>{
        it('Menu update',(done) =>{
            const menu = {
                "place":[
                    {
                        "placeName":"MıdıksdfdsfRestorant",
                        "adress":"Beyazesdfvler",
                        "webSite":"sayedev.online",
                        "totalVisit":3,
                        "totalLike":2,
                        "point":0,
                        "orderSpeed":"2 dk"
                    }
                ]
            }
            chai.request(server)
            .put('/api/menu/update/'+object_id)
            .set('x-access-token',token)
            .send(menu)
            .end((err,res) =>{
                res.should.have.status(200);
                expect(res.body).to.be.a('object');
                done();
            })  
        });
    });

    describe('Delete method',() =>{
        it('Menu deletion',(done) =>{
            chai.request(server)
            .delete('/api/menu/delete/'+object_id)
            .set('x-access-token',token)
            .end((err,res) =>{
                res.should.have.status(200);
                expect(res.body).to.be.a('object');
                done();
            })
        });
    });

});