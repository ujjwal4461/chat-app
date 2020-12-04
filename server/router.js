const router = require('express').Router();

router.get('/',(req,res)=>{
    console.log('get /')
    res.send('server is running');
    res.end();
})

module.exports = router;