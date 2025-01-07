from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['quant_trading_game']

rooms_collection = db['rooms']