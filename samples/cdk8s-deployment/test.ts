import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/orbits').then(() => {
    console.log('connected');
});
