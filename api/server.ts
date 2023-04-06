import  app  from './app/index'
import process from 'process'


const port = process.env.API_SERVER_PORT || '3000'

// start server en puerto definido
;(function () {
    try {
        app.listen(port, function () {
            console.log(`API server started on port ${port}`)
        })
    } catch (err) {
        console.log('ERROR:', err)
    }
})()