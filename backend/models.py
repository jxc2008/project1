from pymongo import MongoClient

uri = "mongodb+srv://oyggpt:Oygminecraft!@hi-lo-backend.misq6.mongodb.net/?retryWrites=true&w=majority&appName=Hi-Lo-Backend"

client = MongoClient('mongodb://localhost:27017/')
db = client['quant_trading_game']

rooms_collection = db['rooms']