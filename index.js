const express = require('express')
const userRouter = require('./routes/user.routes')

const PORT = process.env.PORT || 8080

const app = express()

// middleware

const logger = (req, res, next) => {
    console.log('Hello middleware');
    next();
}

app.use(logger);
app.use(express.json())
app.use('/api', userRouter)

app.listen(PORT, () => console.log(`server started on post ${PORT}`))