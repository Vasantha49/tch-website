const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/members', require('./routes/members'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));