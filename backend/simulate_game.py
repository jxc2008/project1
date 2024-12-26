from backend.game_logic import *

# Initialize the game
game = Game()

# Add players
game.add_player("brian")
game.add_player("pranav")
game.add_player("joseph")
game.add_player("mom")
game.add_player("dad")
game.add_player("esther")

# Start the game
game.start_game()

# Main Game Loop
while game.market_active:
    if game.round_active:
        # Round is running, allow user interaction
        game.prompt_user()
    else:
        # Round is over, ask if the user wants to restart or exit
        command = input("The round has ended. Enter 'start' to begin a new round or 'exit' to close the market: ").strip().lower()
        if command == "start":
            game.start_game()  # Start a new round
        elif command == "exit":
            game.market_active = False  # Stop the market
            print("The market is now closed.")
        else:
            print("Invalid command. Please enter 'start' or 'exit'.")
