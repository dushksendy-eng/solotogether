const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth',     require('./routes/authRoutes'));
app.use('/api/plans',    require('./routes/planRoutes'));
app.use('/api/match',    require('./routes/matchRoutes'));
app.use('/api/posts',    require('./routes/postRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));

app.get('/', (req, res) => res.send('SoloTogether API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));