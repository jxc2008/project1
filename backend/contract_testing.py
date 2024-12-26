from backend.game_logic import *

# Create a game and add players
game = Game()
game.add_player("Alice")
game.add_player("Bob")
game.add_player("Chris")
game.add_player("Deven")
game.add_player("Egg")

game.start_game()

# Simulate executed trades
game.players[0].buy_count = 2  # Alice failed long contract
game.players[1].sell_count = 2  # Bob fulfilled short contract

# End the round
game.end_round()
