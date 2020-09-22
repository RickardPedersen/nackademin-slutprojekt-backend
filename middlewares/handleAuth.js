const jwt = require('jsonwebtoken')

module.exports = {
    user: async (req, res, next) => {
        if (!req.headers.authorization) { return res.sendStatus(403) }
    
        const token = req.headers.authorization.replace("Bearer ", "")
        if (token === 'null') { return res.sendStatus(401) }
    
        try {
            const payload = jwt.verify(token, process.env.SECRET)
            req.user = {
                ...payload,
                isAdmin() { return this.role === 'admin' }
            } 
            next()
        } catch (error) {
            res.sendStatus(401)
        }
    },
    admin: async (req, res, next) => {
        if (!req.headers.authorization) { return res.sendStatus(403) }
    
        const token = req.headers.authorization.replace("Bearer ", "")
        if (token === 'null') { return res.sendStatus(401) }
    
        try {
            const payload = jwt.verify(token, process.env.SECRET)
            req.user = {
                ...payload,
                isAdmin() { return this.role === 'admin' }
            }
            if (req.user.role === 'admin') {
                next()
            } else {
                throw new Error('Not Admin')
            }
        } catch (error) {
            res.sendStatus(401)
        }
    }
}
