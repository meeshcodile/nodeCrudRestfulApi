const express = require('express')
const router = express.Router()

// ======accessing info by using the param method======
// router.get('/:name',(req, res)=>{
//     res.send(`hello my name is ${req.params.name}`)
// })

// ============error page=======
router.get('/error', (req, res)=>{
    throw new Error('this is crazy')
})

// ==========accessing info using the query method
router.get('/user', (req, res)=>{
    if(req.query.name){
        res.send(`hello world my name is ${req.query.name}`)
    }else{
        res.send('this is the home page')
    }
})



module.exports = router