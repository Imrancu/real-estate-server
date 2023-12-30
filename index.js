import express from 'express';

const app = express();

app.listen(3000, () => {
    console.log('My server is running at port 3000');
})