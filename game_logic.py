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
        self.players = None
    
    def player_join(self, player):
        self.players.append(player)
        self.player_count += 1
    
    def player_leave(self, player):
        self.players.remove(player)
        self.player_count -= 1
    
    def start_game(self, players):
        #start the game
        self.players = players
        self.player_count = len(players)

        #initialize the game
        self.timer = time.time() #current time, will continuously update to check if elapsed time from this time is 5 minutes

        #more than 8 players will be 3 dice and less than 8 is 2 dice
        #initalize dice to a list of 2 or 3 dice
        self.dices = [Dice() for i in range(2 if len(self.players) < 8 else 3)]

        #initialize if the round is high or low
        self.coin = Coin()
        self.high_low = self.coin.flip()

        self.current_round += 1
        self.start_round()
    
    def start_round(self):
        #start the round
        high_low_player = random.choice(self.players)
        high_low_player.high_low = self.high_low

        #roll the dice
        dice_rolls = [dice.roll() for dice in self.dices]

        #selects players that receive the dice rolls
        dice_players = [random.choice(self.players) for i in range(len(self.players))]

        #assign the dice rolls to the players
        for i, dice_player in enumerate(dice_players):
            dice_player.price = dice_rolls[i]
        
        #assign the contract to the players
        for player in self.players:
            #if the player is not the high_low player or the player that received the dice roll
            if player not in set(dice_players) and player != high_low_player:
                #randomize between "bid", "long", "short"
                action = random.choice(["bid", "long", "short"])
                player.contract = Action(action, random.randint(1, 5))
        
        #start the timer
        self.timer = time.time()
    

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
        self.record = [] #list of action objects
        self.net_worth = 0

class Action:
    def __init__(self, type_of_action, number):
        #bid, long, short
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

