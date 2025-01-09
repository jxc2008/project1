from flask import Flask, request, jsonify
from flask_cors import CORS
from bson.objectid import ObjectId
from models import rooms_collection

import schedule

import string

import json

from game_logic import *

import time
from datetime import datetime, timedelta, timezone

def generate_room_code(length=6):
    return ''.join(random.choices(string.ascii_uppercase, k=length))

def serialize_game(game):
    return {
        "players": [
            {
                "username": player.get_name(),
                "status": player.get_status(),
                "last_active": player.get_last_active()
            }
            for player in game.players
        ],
        "player_count": game.player_count,
        "current_round": game.current_round
    }


def deserialize_game(game_data):
    game = Game()

    for player_data in game_data.get("players", []):
        player = Player(
            name=player_data.get("username", "Unknown"),
            status=player_data.get("status", "active"),
            last_active=(
                datetime.fromisoformat(player_data["last_active"])
                if player_data.get("last_active")
                else None
            )
        )

        game.player_join(player)

    game.player_count = game_data.get("player_count", 0)
    game.current_round = game_data.get("current_round", 0)
    return game


app = Flask(__name__)
CORS(app)

@app.route('/create-room', methods=['POST'])
def create_room():
    data = request.json
    name = data.get('room_name')
    password = data.get('password')
    is_private = data.get('isPrivate', False)

    username = data.get("username")

    if rooms_collection.find_one({"name": name}):
        return jsonify({"message": "Room with this name already exists"}), 400
    
    room_code = generate_room_code()
    while rooms_collection.find_one({"room_code": room_code}):
        room_code = generate_room_code()
    
    game = Game()

    #initiate first player
    new_player = Player(username)
    new_player.status = "active"
    game.player_join(new_player)

    room = {
        "name": name,
        "password": password if password else None,
        "game": serialize_game(game),
        "maxPlayers": 10,
        "isPrivate": is_private,
        "room_code": room_code
    }

    try:
        result = rooms_collection.insert_one(room)
        return jsonify({
            "message": "Room created successfully",
            "roomId": str(result.inserted_id),
            "roomCode": room_code,
            "num_players": 1,
            "player_list": [username]
        }), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    
@app.route('/rooms', methods=['GET'])
def get_rooms():
    try:
        rooms = list(rooms_collection.find(
            {},
            {
                "_id": 1,
                "name": 1,
                "game.players": 1,
                "game.player_count": 1,
                "maxPlayers": 1,
                "isPrivate": 1,
                "room_code": 1
            }
        ))

        formatted_rooms = []
        for room in rooms:
            
            game = deserialize_game(room.get("game", {}))

            formatted_room = {
                "_id": str(room["_id"]),
                "name": room["name"],
                "players": [player.to_dict() for player in game.players],  # Serialize players to dict
                "player_count": game.player_count,
                "maxPlayers": room.get("maxPlayers", 10),
                "isPrivate": room.get("isPrivate", False),
                "room_code": room.get("room_code")
            }
            formatted_rooms.append(formatted_room)
            
        return jsonify(formatted_rooms), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    
@app.route('/join-room', methods=['POST'])
def join_room():
    data = request.json
    room_id = data.get('roomId')
    username = data.get('username')
    password = data.get('password')
    room_code = data.get('roomCode')

    try:
        if room_id:
            room = rooms_collection.find_one({"_id": ObjectId(room_id)})
        elif room_code:
            room = rooms_collection.find_one({"room_code": room_code})
        else:
            return jsonify({"message": "Room ID or Room Code is required"}), 400

        if not room:
            return jsonify({"message": "Room not found"}), 404

        if room.get('isPrivate') and room.get('password') != password:
            return jsonify({"message": "Invalid password"}), 401
        
        room["game"] = deserialize_game(room.get("game", {}))
        num_players = len(room["game"].players)
        print(num_players)

        # Check if room is full
        if num_players >= room.get('maxPlayers', 10):
            print('room_full')
            return jsonify({"message": "Room is full"}), 400

        # Check if username is already taken in this room
        username_list = []
        name_taken = False
        for player in room["game"].players:
            if username == player.get_name():
                name_taken = True
                break
            username_list.append(player.get_name())
        if name_taken:
            return jsonify({"message": "Username taken"}), 400
    
        #initiate new player
        new_player = Player(username)
        new_player.status = "active"
        room["game"].player_join(new_player)

        rooms_collection.update_one(
            {"_id": room["_id"]}, 
            {"$set": {"game": serialize_game(room["game"])}}
        )

        return jsonify({
            "message": "Room created successfully",
            "roomId": str(room["_id"]),
            "num_players": num_players + 1,
            "player_list": username_list
        }), 201

    except Exception as e:
        return jsonify({"message": str(e)}), 500
    

@app.route('/disconnect', methods=['POST'])
def player_disconnect():
    data = json.loads(request.get_data(as_text=True))
    room_id = data.get('roomId')
    username = data.get("username")

    if not room_id or not username:
        return jsonify({"message": "Room ID and Username are required"}), 400
    
    try:
        room = rooms_collection.find_one({"_id": ObjectId(room_id)})
        if not room:
            return jsonify({"message": "Room not found"}), 404
        
        game = deserialize_game(room.get("game", {}))

        game.players = [player for player in game.players if player.name != username]
        game.player_count = len(game.players)


        if game.player_count == 0:
            # Delete room if no players remain
            rooms_collection.delete_one({"_id": ObjectId(room_id)})
            return jsonify({"message": "Player removed and room deleted"}), 200
        else:
            # Update room with new game state if players remain
            rooms_collection.update_one(
                {"_id": ObjectId(room_id)},
                {"$set": {"game": serialize_game(game)}}
            )
            return jsonify({"message": "Player removed"}), 200
            
            
    except Exception as e:
        return jsonify({"message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)