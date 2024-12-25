import random
import time


class Game:
    def __init__(self):
        self.player_count = 0
        self.current_round = 0
        self.timer = 0
        self.dices = None
        self.coin = None
        self.high_low = None
        self.players = []
        self.current_bid = 0
        self.current_ask = 21
        self.bid_player = None
        self.ask_player = None
        self.hit_player = None
        self.lift_player = None
        self.market_active = True
        self.round_active = False
    
    def player_join(self, player):
        self.players.append(player)
        self.player_count += 1
    
    def player_leave(self, player):
        self.players.remove(player)
        self.player_count -= 1
    
    def start_game(self):
        #start the game
        if not self.market_active:
            print("The market is currently closed. Cannot start a new round.")
            return
        
        if self.round_active:
            print("A round is already running. Cannot start a new round until the current one ends.")
            return
        
        self.round_active = True #Mark the round as active
        self.player_count = len(self.players)

        #initialize the game
        self.timer = time.time() #current time, will continuously update to check if elapsed time from this time is 5 minutes
        
        self.market_active = True #opens market

        #more than 8 players will be 3 dice and less than 8 is 2 dice
        #initalize dice to a list of 2 or 3 dice
        self.dices = [Dice() for i in range(2 if len(self.players) < 8 else 3)]

        #initialize if the round is high or low
        self.coin = Coin()
        self.current_round += 1
        self.start_round()
        while self.market_active:
            current_time = time.time()
            
            # Check if 5 minutes have passed
            if current_time - self.timer > 300:  # 300 seconds = 5 minutes
                self.end_round()
                break  # End the current round and exit the loop
            
            # Placeholder for other game logic
            self.prompt_user()
    
    def start_round(self):
        #start the round
        high_low_player = random.choice(self.players)
        high_low_player.high_low = self.coin.flip()

        #roll the dice
        dice_rolls = [dice.roll() for dice in self.dices]

        #selects players that receive the dice rolls
        dice_players = [random.choice(self.players) for i in range(len(dice_rolls))]

        #assign the dice rolls to the players
        for i, dice_player in enumerate(dice_players):
            dice_player.price = dice_rolls[i]
        
        #assign the contract to the players
        for player in self.players:
            #if the player is not the high_low player or the player that received the dice roll
            if player not in set(dice_players) and player != high_low_player:
                #randomize between "bid", "long", "short"
                action = random.choice(["long", "short"])
                player.contract = Action(action, random.randint(1, 5))
        
        #start the timer
        self.timer = time.time()
        
    #tracker function
    #function will receive action and player name and it will print it
    #def tracker(self, player_name, player_action_count):
        #print("Player " + player + "has " + action)
    
    def end_round(self):
        #ends the current round
        print("Your 5 minutes are up! Ending the current round.")
        self.current_round += 1
        self.current_bid = 0
        self.current_ask = 21
        self.bid_player = None
        self.ask_player = None
        self.hit_player = None
        self.lift_player = None
        self.timer = time.time() #resetting the timer
        self.round_active = False #ending the round
    
    #simulate players doing stuff function
    def make_the_market(self):
        print("Make your post!")
        input_text = input()  # Example: "daniel bid 10"
        
        # Split the input into parts
        parts = input_text.split()
        
        if len(parts) != 3:
            print("Invalid input format. Please use: <name> <action> <number>")
            return
        
        name, action, number = parts[0], parts[1], parts[2]
        
        # Validate player name
        player = next((p for p in self.players if p.name.lower() == name.lower()), None)
        if not player:
            print(f"Player '{name}' not found.")
            return
        
        # Validate action
        if action not in ["bid", "ask"]:
            print(f"Invalid action '{action}'. Action must be 'bid' or 'ask'.")
            return
        
        # Validate number
        try:
            number = int(number)
            if not (1 <= number <= 20):
                print("Number must be an integer between 1 and 20.")
                return
        except ValueError:
            print("Invalid number provided. Must be an integer between 1 and 20.")
            return
        
        if action == "bid":
            if number <= self.current_bid:
                print(f"Bid must be greater than the market's bid ({self.current_bid}).")
                return
            self.current_bid = number
            self.bid_player = player  # Store the actual player object
            print(f"Market's bid updated to {self.current_bid} by player {player.name}.")
        
        elif action == "ask":
            if number >= self.current_ask:
                print(f"Ask must be less than the market's ask ({self.current_ask}).")
                return
            self.current_ask = number
            self.ask_player = player  # Store the actual player object
            print(f"Market's ask updated to {self.current_ask} by player {player.name}.")

        
    def take_the_market(self):
        print("Market Interaction: Use '<name> hit' to sell at the current bid or '<name> lift' to buy at the current ask.")
        input_text = input("Enter your command: ").strip()
        
        # Split the input into parts
        parts = input_text.split()
        
        if len(parts) != 2:
            print("Invalid format. Please use '<name> hit' or '<name> lift'.")
            return
        
        name, action = parts[0], parts[1].lower()
        
        # Validate the player name
        player = next((p for p in self.players if p.name.lower() == name.lower()), None)
        if not player:
            print(f"Player '{name}' not found.")
            return
        
        # Validate action
        if action not in ["hit", "lift"]:
            print("Invalid action. Please use 'hit' or 'lift'.")
            return
        
        # Handle 'hit' action (sell at current bid)
        if action == "hit":
            if self.current_bid == 0:
                print("No valid bid available to hit.")
                return
            
            if self.bid_player is not None:
                self.hit_player = player  # Track the player hitting the bid
                self.hit_player.sell_count += 1 # Increments hit_player's sell_count by 1
                self.bid_player.buy_count += 1 # Increments bid_player's buy_count by 1
                print(f"{self.hit_player.name} sold to {self.bid_player.name} at the bid price of ${self.current_bid}.")
                self.current_bid = 0  # Reset the bid after transaction
                self.bid_player = None  # Clear the bid player
                self.hit_player = None  # Clear the hit player
            else:
                print("Bidder not found. Transaction failed.")
        
        # Handle 'lift' action (buy at current ask)
        elif action == "lift":
            if self.current_ask == 0 or self.current_ask == 21:
                print("No valid ask available to lift.")
                return
            
            if self.ask_player is not None:
                self.lift_player = player  # Track the player lifting the ask
                self.lift_player.buy_count += 1 # Increments lift_player's buy_count by 1
                self.ask_player.sell_count += 1 # Increments ask_player's sell_count by 1
                print(f"{self.lift_player.name} bought from {self.ask_player.name} at the ask price of ${self.current_ask}.")
                self.current_ask = 21  # Reset ask after transaction
                self.ask_player = None  # Clear the ask player
                self.lift_player = None  # Clear the lift player
            else:
                print("Asker not found. Transaction failed.")



        
    def prompt_user(self):
        if not self.market_active:
            print("The market is currently closed. Please wait for the next round.")
            return
        
        if not self.round_active:
            print("No active round. Please start a new round to interact with the market.")
            return
    
        print("Enter your command: Use 'make' to post a bid/ask, or 'take' to hit the bid/lift the ask.")
        input_text = input().strip()
        
        if not input_text:
            print("No input provided. Please try again.")
            return
        
        # Extract the first word
        first_word = input_text.split()[0].lower()
        
        if first_word in ["make"]:
            # Call make_the_market if the first word is 'make'
            self.make_the_market()
        elif first_word in ["take"]:
            # Call take_the_market if the first word is 'take'
            self.take_the_market()
        else:
            print("Invalid input. Please start with 'make' or 'take'.")
            
    def get_buy_count(self, player_name):
        """
        Returns the buy_count of a player given their name.
        """
        # Search for the player by name
        player = next((p for p in self.players if p.name.lower() == player_name.lower()), None)
        
        if player:
            return player.buy_count
        else:
            print(f"Player '{player_name}' not found.")
            return None


        

            
        
    #no arguments
    #print out the text (enter player name, enter player action) example: daniel bid 10
    #input()
    #will get name, action, and number from inputted string
    #it will store that in the player's record and it will call tracker
    #it will increment action count
    
    #basically how we simulate the game in the console is
    #in the code, we create game object Game()
    #game.start()
    #the console will ask for input
    #you will player actions
    #after 5 minutes the program will calculate total losses
    
    #add player function
    def add_player(self, name):
        new_player = Player(name)
        self.players.append(new_player)
    #player name as string
    #make new player object and add it to self.players
    #print out "player name has joined the game"

class Coin:
    def __init__(self):
        self.value = None

    #flip the coin if its heads its "high" if its tails its "low"
    def flip(self):
        self.value = random.choice(["high", "low"])
        return self.value

    def get_value(self):
        return self.value


class Dice:
    def __init__(self):
        self.value = None

    def roll(self):
        self.value = random.randint(1,20)
        return self.value

    def get_value(self):
        return self.value


class Player:
    def __init__(self, name):
        self.name = name
        self.high_low = None
        self.price = None
        self.contract = Action(None, None)
        self.buy_count = 0
        self.sell_count = 0
        self.record = [] #list of action objects
        self.net_worth = 0
        
    def get_name(self):
        return self.name
    
    def get_sell_count(self):
        return self.sell_count

class Action:
    def __init__(self, type_of_action, number):
        #bid, ask
        self.type_of_action = None
        #price of the action
        self.number = None
    
    def get_action(self):
        return self.type_of_action
    
    def get_price(self):
        return self.number
    
    def set_action(self, action):
        self.type_of_action = action
    
    def set_price(self, price):
        self.number = price
        