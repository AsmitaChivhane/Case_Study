const mongoose = require("mongoose");
const Admin = require('../model/admin');
const user_admin = require('../model/admin_user');

const expect=require('chai').expect;
const request=require('supertest');

const server = require('../adminServer');
const connection=require('../database/DBconnection');
// requiring mocha and chai
const chai = require('chai');
const chaiHttp = require('chai-http');
const { response } = require("express");
const should = chai.should();
chai.use(chaiHttp);
let token="";

 describe('Admin API',()=>{
   describe('GET /TrainDetails', () => {
     it('it should GET all the passengers details', function() {
      chai.request(server)
           .get('/api/TrainDetails')
           .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                //res.body.length.should.be.eq(3);
                //res.text.should.be.eq("Testing here!!")
            // done();
           });
    });
    it('it should NOT GET all the Train details', (done) => {
      chai.request(server)
          .get('/api/TrainDetail')
          .end((err, res) => {
                res.should.have.status(404);
            done();
          });
   });
 });
});

describe("Admin registration",()=>{
  it("POST Admin registration successful",(done)=>{
          const response =request(server).post("/api/adminRegister")
          .send({
              email:"asasaad@gmail.com",
              password:"hu1vxccx",
          }).then(response=>{
              expect(response.statusCode).to.be.equal(200);                
              done()
          })
          .catch((err)=>{
              console.log(err);
              throw(err);
          }) 
   })
})
//url ---->/api/user/registration is given wrong
describe("user",()=>{
  it("POST admin registration not successful",(done)=>{
          const response =request(server).post("/api/adminRegisters")
          .send({
              email:"asasaad@gmail.com",
              password:"hu1vxccx",
          }).then(response=>{
            console.log("status code :"+response.status)
              expect(response.statusCode).to.be.equal(404);                
              done()
          })
          .catch((err)=>{
              console.log(err);
              throw(err);
          }) 
   })
})
describe("Admin registration",()=>{
    it("POST Admin registration successful",(done)=>{
            const response =request(server).post("/api/adminlogin")
            .send({
                email:"asasaad@gmail.com",
                password:"hu1vxccx", 
            }).then(response=>{
                expect(response.statusCode).to.be.equal(200);                
                done()
            })
            .catch((err)=>{
                console.log(err);
                throw(err);
            }) 
     })
  })
  //url ---->/api/user/registration is given wrong
  describe("Admin registration",()=>{
    it("POST admin registration not successful",(done)=>{
            const response =request(server).post("/api/adminlogins")
            .send({
                email:"asasaad@gmail.com",
                password:"hu1vxccx",
            }).then(response=>{
              console.log("status code :"+response.status)
                expect(response.statusCode).to.be.equal(404);                
                done()
            })
            .catch((err)=>{
                console.log(err);
                throw(err);
            }) 
     })
  })

describe("when the password Wrong",()=>{
    it("password mismatch should give 404 status code",(done)=>{
            const response =request(server).post("/api/users/signin")
            .send({
                password:"asdfghjklza"
            }).then(response=>{
                expect(response.statusCode).to.be.equal(404);                
                done()
            })
            .catch((err)=>{
                console.log(err);
                throw(err);
            }) 
     })
})

describe("when email and password is given wrong",()=>{
    it("Invalid email and password and status code set to 404",(done)=>{
            const response =request(server).post("/api/adminlogin")
            .send({
                email:"abcadas@gmail.com",
                password:"abdcas1234",
            }).then(response=>{
                expect(response.statusCode).to.be.equal(401); 
                this.token=response.body.token                
                done()
            })
            .catch((err)=>{
                console.log(err);
                throw(err);
            }) 
     });
})

describe("when email and password is given correct",()=>{
  it("gives token with auth success message and status code set to 200",(done)=>{
          const response =request(server).post("/api/adminlogin")
          .send({
            email:"asasaad@gmail.com",
            password:"hu1vxccx",
          }).then(response=>{
              expect(response.statusCode).to.be.equal(200); 
              this.token=response.body.token                
              done()
          })
          .catch((err)=>{
              console.log(err);
              throw(err);
          }) 
   });
})
// path given is wrong 
describe("when path is given wrong",()=>{
  it("gives token with auth success message and status code set to 404",(done)=>{
          const response =request(server).post("/api/adminlogins")
          .send({
            email:"asmita@gmail.com",
            password:"asmita",
          }).then(response=>{
              expect(response.statusCode).to.be.equal(404); 
              this.token=response.body.token                
              done()
          })
          .catch((err)=>{
              console.log(err);
              throw(err);
          }) 
   });
})
//adding train details
describe("Admin Adding the trains",()=>{
    it("POST Adding trains details ",(done)=>{
            const response =request(server).post("/api/admin")
            .send({
                train_name:"NGP EXPRESS",
                from:"Nagpur",
                to:"Pune",
                fare:1200,
                arrival_time:"10:10pm",
                departure_time:"1:30PM",
                available:"Available", 
            }).then(response=>{
                expect(response.statusCode).to.be.equal(200);                
                done()
            })
            .catch((err)=>{
                console.log(err);
                throw(err);
            }) 
     })
  })
// url is given incorrect
  describe("searching the trains",()=>{
    it("POST Adding trains details ",(done)=>{
            const response =request(server).post("/api/admins")
            .send({
                train_name:"NGP EXPRESS",
                from:"Nagpur",
                to:"Pune",
                fare:1200,
                arrival_time:"10:10pm",
                departure_time:"1:30PM",
                available:"Available", 
            }).then(response=>{
                expect(response.statusCode).to.be.equal(404);                
                done()
            })
            .catch((err)=>{
                console.log(err);
                throw(err);
            }) 
     })
  })
  //passenger search a train according to source and destination
  describe("searching the trains",()=>{
    it("POST-->search the train and getting status 200 ",(done)=>{
            const response =request(server).post("/api/search")
            .send({
                from:"Nagpur",
                to:"Pune", 
            }).then(response=>{
                expect(response.statusCode).to.be.equal(200);                
                done()
            })
            .catch((err)=>{
                console.log(err);
                throw(err);
            }) 
     })
  })
  //url is incorrect for search the train
  describe("Admin Adding the trains",()=>{
    it("Do not search the train geting the status 404 ",(done)=>{
            const response =request(server).post("/api/searchs")
            .send({
                from:"Nagpur",
                to:"Pune", 
            }).then(response=>{
                expect(response.statusCode).to.be.equal(404);                
                done()
            })
            .catch((err)=>{
                console.log(err);
                throw(err);
            }) 
     })
  })
//for delete a particular passenger
describe('delete the particular train',function(){
  it('DELETE should respond 200',function(done){
    request(server).del("/api/trains/:id"+server._id).expect(200).end(done);
  })
})
//do not delete a particular passenger because this case test has wrong path/url api/trainss/:id
describe('Do not delete the particular passenger',function(){
  it('DELETE should respond 404',function(done){
    request(server).del("/api/trainss/:id"+server._id).expect(404).end(done);
  })
})
//fetching the particular train according to id
describe('fetch the particular train',function(){
  it('GET should respond 200',function(done){
    request(server).put("/api/trains/:id"+server._id).expect(200).end(done);
  })
})
//do not update a particular train because this case test has wrong path/url api/trains/:id
describe('Do not fetch the particular train',function(){
  it('GET should respond 404',function(done){
    request(server).put("/api/trainss/:id"+server._id).expect(404).end(done);
  })
})
//fetching the particular booking according to id
describe('fetch particular booking ddetails',function(){
    it('GET should respond 200',function(done){
      request(server).put("/api/booking/:id"+server._id).expect(200).end(done);
    })
  })
  //do not update a particular booking because this case test has wrong path/url api/book/:id
  describe('Do not fetch the particular booking detail',function(){
    it('GET should respond 404',function(done){
      request(server).put("/api/book/:id"+server._id).expect(404).end(done);
    })
  })