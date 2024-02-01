import express from 'express';

const app = express();
const port = 5000;

app.get('/api', (req, res) => {
    res.send('Hello World with TypeScript!');
});

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
