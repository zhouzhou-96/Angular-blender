import * as mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  name: String,
  traffic: String
});

const Car = mongoose.model('Car', carSchema);

export default Car;
