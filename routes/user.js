const express = require('express')
const router = express.Router()
const User = require('../models/index')

// ===============creating a new user ==============
router.post('/userSave', (req,res)=>{
    if(!req.body){
        return res.status(400).send('Request not found')
    }
    let user = new User(req.body)
    user.save().then(doc=>{
        console.log(doc)
        if(!doc || doc.length === 0){
            return res.status(500).send(doc)
        }
        res.status(201).send(doc)
        
    }).catch(err=>{
        res.status(500).json(err)
    })
})

// ===================reading the data from the database==============
router.get('/userGet', async(req, res)=>{
    if(!req.query.email){
        return res.status(400).send('email not found')
    }
    await User.findOne({email:req.query.email}).then(doc=> {
        res.json(doc)
    }).catch(err=>{
        res.status(500).json(err)
    })

})

// ==================updating the user==============
router.put('/userPut',async(req, res)=>{
     if(!req.query.email){
        return res.status(400).send('email not found')
    }
    await User.findOneAndUpdate({email:req.query.email}, req.body, {new:true}).then(doc=> {
        res.json(doc)
    }).catch(err=>{
        res.status(500).json(err)
    })
})

// ===========Deleting the user===============
router.delete("/userDelete", async (req, res) => {
  if (!req.query.email) {
    return res.status(400).send("email not found");
  }
  await User.findOneAndDelete({ email: req.query.email })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router
