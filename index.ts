import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/', (req: any, res: any) => {
    res.send('Hello, Kinergy!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
