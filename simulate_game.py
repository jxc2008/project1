from game_logic import *

game = Game()
game.add_player("brian")
game.add_player("pranav")
game.add_player("joseph")
game.start_game()
while game.timer > 0:
    game.prompt_user()