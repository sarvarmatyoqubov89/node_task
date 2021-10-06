const db = require('../db')
const {rows} = require("pg/lib/defaults");


class UserController{
    async createUser(req, res) {
        const {name, surname} = req.body
        const newPerson = await db.query('INSERT INTO person (name, surname) values ($1, $2) RETURNING *', [name, surname])
        res.json(newPerson.rows[0])
    }
    async getUsers(req, res) {
        const users = await db.query('SELECT * FROM person')
        res.json(users.rows)
    }
    async getOneUser(req, res) {
        try {
            const {id} = req.params
            if (!id){
                res.status(400).json({message: 'Id not found'})
            }
            const user = await db.query('SELECT * FROM person where id = $1', [id]);
            return res.json(user.rows[0])
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async updateUser(req, res) {
        const {id, name, surname} = req.body
        const user = await db.query(
            'UPDATE person set name = $1, surname = $2 where id = $3 RETURNING *',
            [name, surname, id]
        )
        res.json(user.rows[0])
    }
    async deleteUser(req, res) {
        const id = req.params.id
        const user = await db.query('DELETE FROM person where id = $1', [id])
        res.json(user.rows[0])
    }
}

module.exports = new UserController()