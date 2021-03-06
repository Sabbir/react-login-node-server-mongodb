const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const user = new User({
      fullname:req.body.fullname,
      username: req.body.username,
      company: req.body.company,
      password: bcrypt.hashSync(req.body.password, 8)
    });
  
    user.save((err, user) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
        return;
      }
  
      if (req.body.roles) {
        Role.find(
          {
            name: { $in: req.body.roles }
          },
          (err, roles) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            console.log(req.body.roles);
            user.roles = roles.map(role => role._id);
            console.log(user.roles);
            user.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
  
              res.send({ message: "User was registered successfully!" });
            });
          }
        );
      } else {
        Role.findOne({ name: "user" }, (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          user.roles = [role._id];
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
  
            res.send({ message: "User registered successfully!" });
          });
        });
      }
    });
  };

  exports.signin = (req, res) => {
    User.findOne({
      username: req.body.username
    })
      .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
  
        var authorities = [];
        
        for (let i = 0; i < user.roles.length; i++) {
          authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
          
          console.log(user.roles[i]._id);
        }
        var dat=[];
        if(user.roles[user.roles.length-1].name=="admin"){
           User.find({
            company:user.company,
            roles:{$ne:user.roles}
            
           }
          )
          .exec((err,data)=>{
          if(!data){
            dat.push("No candidates assign to this company" );
            dat.push("0");
          } 
          else{
           for (let i = 0; i < data.length; i++){
             
             if(data[i].roles[0]!=user.roles[0]._id)
                dat.push(data[i]);
             }
           console.log(dat);
           }
           res.status(200).send({
            id: user._id,
            fullname:user.fullname,
            username: user.username,
            company: user.company,
            roles: authorities,
            data: dat,
            accessToken: token
            });
          }); 
        }
        else{
        res.status(200).send({
          id: user._id,
          fullname:user.fullname,
          username: user.username,
          company: user.company,
          roles: authorities,
          accessToken: token
        });
      }
      });
};