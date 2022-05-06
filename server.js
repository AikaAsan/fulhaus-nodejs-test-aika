import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

const server = express();
const port = process.env.PORT || 5000;

server.use(express.json());

mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => console.log('MongoDB database connection established successfully')
);

// SCHEMA
const itemSchema = new mongoose.Schema({
    acronym: String,
    definition: String,
});

const Item = mongoose.model('Item', itemSchema);

// ROUTES
server.get('/acronym', async (req, res) => {
    const { page, limit, search } = req.query;
    const regex = new RegExp(`^.*${search}.*$`);
    try {
        const items = await Item.find({ acronym: regex });
        if (items.length > limit) {
            res.set(
                'Information',
                'There are more results. Try to use another options in request'
            );
        }
        res.status(200).json(items.slice((page - 1) * limit, page * limit));
    } catch (err) {
        res.status(500).json(err);
    }
});

server.post('/acronym', async (req, res) => {
    const item = new Item(req.body);
    try {
        await item.save();
        res.status(201).json('Item created');
    } catch (err) {
        res.status(500).json(err);
    }
});

server.patch('/acronym/:acronymId', async (req, res) => {
    const { acronymId } = req.params;
    try {
        (await Item.findByIdAndUpdate(acronymId, req.body))
            ? res.status(200).json(`acronym ${acronymId} is updated`)
            : res.status(404).json(`acronym ${acronymId} is not found`);
    } catch (err) {
        res.status(500).json(err);
    }
});

server.delete('/acronym/:acronymId', async (req, res) => {
    const { acronymId } = req.params;
    try {
        (await Item.findByIdAndDelete(acronymId))
            ? res.status(410).json(`acronym ${acronymId} is deleted`)
            : res.status(404).json(`acronym ${acronymId} is not found`);
    } catch (err) {
        res.status(500).json(err);
    }
});

server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
