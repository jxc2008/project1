const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const playerSchema = new mongoose.Schema({
  name: String,
  id: 0,
})

const gameRoomSchema = new mongoose.Schema({
  name: String,
  password: String,
  players: [String],
  maxPlayers: {type: Number, default: 10 },
  isPrivate: {type: Boolean, default: false},
})

const GameRoom = mongoose.model("GameRoom", gameRoomSchema);

app.post('/create-room', async (req, res) => {
  const { name, password, isPrivate, player } = req.body;

  const newRoom = new GameRoom({
    name,
    password: password || null,
    players: [player], 
    isPrivate,
  });

  // Save the room to the database
  try {
    await newRoom.save();
    res.status(201).json({ message: 'Room created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

});

app.get('/rooms', async (req, rest) => {

  // Get all rooms from the database
  try {
    const rooms = await GameRoom.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

})

app.post('/join-room', async (req, res) => {
  const { roomId, username, password } = req.body;

  // Find the room in the database
  try {
    const room = await GameRoom.findById(roomId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }


  //error checking
  if (!room) {
    res.status(404).json({ message: 'Room not found' });
  }

  if (room.isPrivate && room.password !== password) {
    res.status(401).json({ message: 'Invalid password' });
  }

  if (room.players.length >= room.maxPlayers) {
    res.status(400).json({ message: 'Room is full' });
  }

  if (room.players.includes(username)) {
    return res.status(400).json({ message: 'Username already taken in this room' });
  }


  //joins
  room.players.push(username);
  try {
    await room.save();
    res.status(200).json({ message: 'Joined room successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
  app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
  });

})

