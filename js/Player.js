class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    //added C41
    this.rank = 0;
    this.carnumber=0;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance,
      //new property C41
      rank:this.rank,
      carnumber:this.carnumber
    });
  }

  //Getting finished players info from db- C41
  //it is called in play() in game.js
  getFinishedPlayers(){
    var finishedPlayersRef = database.ref('finishedPlayers');
    finishedPlayersRef.on("value",(data)=>{
        finishedPlayers = data.val();
    });
}

//updating finished player at end in the db- C41
//it is called in play() if the player reaches distance>4000
static updateFinishedPlayers(){
  database.ref('/').update({
      finishedPlayers: finishedPlayers + 1
  });
  this.rank += 1;
}

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }

  
}
