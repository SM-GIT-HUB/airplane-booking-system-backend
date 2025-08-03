const { Logger } = require('../config')

class CrudRepository {
    constructor(model)
    {
        this.model = model;
    }

    async create(data)
    {
        const response = await this.model.create(data);
        return response;
    }

    async destroy(data)
    {
        try {
            const response = await this.model.destroy({
                where: {
                    id: data
                }
            })

            return response;
        }
        catch(err) {
            Logger.error("Something went wrong in crud-repository destroy:", err.message);
            throw err;
        }
    }

    async get(data)
    {
        try {
            const response = await this.model.findByPk(data);
            return response;
        }
        catch(err) {
            Logger.error("Something went wrong in crud-repository get:", err.message);
            throw err;
        }
    }

    async getAll()
    {
        try {
            const response = await this.model.findAll();
            return response;
        }
        catch(err) {
            Logger.error("Something went wrong in crud-repository getAll:", err.message);
            throw err;
        }
    }

    async update(id, data)
    {
        try {
            const response = await this.model.update(data, {
                where: {
                    id: id
                }
            })

            return response;
        }
        catch(err) {
            Logger.error("Something went wrong in crud-repository update:", err.message);
            throw err;
        }
    }
}

module.exports = CrudRepository