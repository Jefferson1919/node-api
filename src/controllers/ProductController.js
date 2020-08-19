const mongoose = require('mongoose');
const Produtc = mongoose.model('Product');

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;
        const products = await Produtc.paginate({}, { page, limit: 10 });

        return res.json(products);
    },

    async show(req, res) {
        const product = await Produtc.findById(req.params.id);

        return res.json(product);
    },

    async store(req, res) {
        const product = await Produtc.create(req.body);

        return res.json(product);
    },
    
    async update(req, res) {
        //await mongoose.connect(req, { useFindAndModify: false});
        //o new ele retorna o product já atualizado
        const product = await Produtc.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.json(product);
    },

    async destroy(req, res) {
        await Produtc.findOneAndRemove(req.params.id);
        return res.send();
    }
};