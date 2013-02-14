function BackgammonView() {
  var img = new Image();
  img.src = '/images/backgammon.png';
  this.spriteSheet = img;
  
  this.s = {  'board': {'x':0, 'y':0, 'width':510, 'height':420},
              'red_checker': {'x':60, 'y':420, 'width':30, 'height':30 },
              'red_checker_selected': {'x':90, 'y':420, 'width':30, 'height':30 },
              'red_checker_side': {'x':120, 'y':420, 'width':30, 'height':10 },
              'black_checker': {'x':60, 'y':450, 'width':30, 'height':30 },
              'black_checker_selected': {'x':90, 'y':450, 'width':30, 'height':30 },
              'black_checker_side': {'x':120, 'y':450, 'width':30, 'height':10 },
              'doubling_cube': {  2: {'x': 150, 'y':420, 'width': 30, 'height': 30},
                                  4: {'x': 180, 'y':420, 'width': 30, 'height': 30},
                                  8: {'x': 210, 'y':420, 'width': 30, 'height': 30},
                                  16: {'x': 150, 'y':450, 'width': 30, 'height': 30},
                                  32: {'x': 180, 'y':450, 'width': 30, 'height': 30},
                                  64: {'x': 210, 'y':450, 'width': 30, 'height': 30}
                                },
              'red_die': [{},
                          {'x':270, 'y':420, 'width':30, 'height':30},
                          {'x':300, 'y':420, 'width':30, 'height':30},
                          {'x':330, 'y':420, 'width':30, 'height':30},
                          {'x':360, 'y':420, 'width':30, 'height':30},
                          {'x':390, 'y':420, 'width':30, 'height':30},
                          {'x':420, 'y':420, 'width':30, 'height':30},
                         ],
             'black_die': [{},
                          {'x':270, 'y':450, 'width':30, 'height':30},
                          {'x':300, 'y':450, 'width':30, 'height':30},
                          {'x':330, 'y':450, 'width':30, 'height':30},
                          {'x':360, 'y':450, 'width':30, 'height':30},
                          {'x':390, 'y':450, 'width':30, 'height':30},
                          {'x':420, 'y':450, 'width':30, 'height':30},
                         ]
            };
  
  this.d = { 'board': {'x':0, 'y':0, 'width':510, 'height': 420},
             'points': [ [],
                         [  {'x':420, 'y':375, 'width':30, 'height':30}, 
                            {'x':420, 'y':345, 'width':30, 'height':30}, 
                            {'x':420, 'y':315, 'width':30, 'height':30}, 
                            {'x':420, 'y':285, 'width':30, 'height':30}, 
                            {'x':420, 'y':255, 'width':30, 'height':30} ], // 1
                         [  {'x':390, 'y':375, 'width':30, 'height':30}, 
                            {'x':390, 'y':345, 'width':30, 'height':30}, 
                            {'x':390, 'y':315, 'width':30, 'height':30}, 
                            {'x':390, 'y':285, 'width':30, 'height':30}, 
                            {'x':390, 'y':255, 'width':30, 'height':30} ], // 2
                         [  {'x':360, 'y':375, 'width':30, 'height':30}, 
                            {'x':360, 'y':345, 'width':30, 'height':30}, 
                            {'x':360, 'y':315, 'width':30, 'height':30}, 
                            {'x':360, 'y':285, 'width':30, 'height':30}, 
                            {'x':360, 'y':255, 'width':30, 'height':30} ], // 3
                         [  {'x':330, 'y':375, 'width':30, 'height':30}, 
                            {'x':330, 'y':345, 'width':30, 'height':30}, 
                            {'x':330, 'y':315, 'width':30, 'height':30}, 
                            {'x':330, 'y':285, 'width':30, 'height':30}, 
                            {'x':330, 'y':255, 'width':30, 'height':30} ], // 4
                         [  {'x':300, 'y':375, 'width':30, 'height':30}, 
                            {'x':300, 'y':345, 'width':30, 'height':30}, 
                            {'x':300, 'y':315, 'width':30, 'height':30}, 
                            {'x':300, 'y':285, 'width':30, 'height':30}, 
                            {'x':300, 'y':255, 'width':30, 'height':30} ], // 5
                         [  {'x':270, 'y':375, 'width':30, 'height':30}, 
                            {'x':270, 'y':345, 'width':30, 'height':30}, 
                            {'x':270, 'y':315, 'width':30, 'height':30}, 
                            {'x':270, 'y':285, 'width':30, 'height':30}, 
                            {'x':270, 'y':255, 'width':30, 'height':30} ], // 6
                            
                         [  {'x':210, 'y':375, 'width':30, 'height':30}, 
                            {'x':210, 'y':345, 'width':30, 'height':30}, 
                            {'x':210, 'y':315, 'width':30, 'height':30}, 
                            {'x':210, 'y':285, 'width':30, 'height':30}, 
                            {'x':210, 'y':255, 'width':30, 'height':30} ], // 7
                         [  {'x':180, 'y':375, 'width':30, 'height':30}, 
                            {'x':180, 'y':345, 'width':30, 'height':30}, 
                            {'x':180, 'y':315, 'width':30, 'height':30}, 
                            {'x':180, 'y':285, 'width':30, 'height':30}, 
                            {'x':180, 'y':255, 'width':30, 'height':30} ], // 8
                         [  {'x':150, 'y':375, 'width':30, 'height':30}, 
                            {'x':150, 'y':345, 'width':30, 'height':30}, 
                            {'x':150, 'y':315, 'width':30, 'height':30}, 
                            {'x':150, 'y':285, 'width':30, 'height':30}, 
                            {'x':150, 'y':255, 'width':30, 'height':30} ], // 9
                         [  {'x':120, 'y':375, 'width':30, 'height':30},
                            {'x':120, 'y':345, 'width':30, 'height':30}, 
                            {'x':120, 'y':315, 'width':30, 'height':30}, 
                            {'x':120, 'y':285, 'width':30, 'height':30}, 
                            {'x':120, 'y':255, 'width':30, 'height':30} ], // 10
                         [  {'x':90,  'y':375, 'width':30, 'height':30}, 
                            {'x':90,  'y':345, 'width':30, 'height':30}, 
                            {'x':90,  'y':315, 'width':30, 'height':30}, 
                            {'x':90,  'y':285, 'width':30, 'height':30}, 
                            {'x':90,  'y':255, 'width':30, 'height':30}], // 11
                         [  {'x':60,  'y':375, 'width':30, 'height':30}, 
                            {'x':60,  'y':345, 'width':30, 'height':30}, 
                            {'x':60,  'y':315, 'width':30, 'height':30}, 
                            {'x':60,  'y':285, 'width':30, 'height':30}, 
                            {'x':60,  'y':255, 'width':30, 'height':30}], // 12

                         [  {'x':60,  'y':15,  'width':30, 'height':30}, 
                            {'x':60,  'y':45,  'width':30, 'height':30}, 
                            {'x':60,  'y':75,  'width':30, 'height':30}, 
                            {'x':60,  'y':105, 'width':30, 'height':30}, 
                            {'x':60,  'y':135, 'width':30, 'height':30} ], // 13
                         [  {'x':90,  'y':15,  'width':30, 'height':30}, 
                            {'x':90,  'y':45,  'width':30, 'height':30}, 
                            {'x':90,  'y':75,  'width':30, 'height':30}, 
                            {'x':90,  'y':105, 'width':30, 'height':30}, 
                            {'x':90,  'y':135, 'width':30, 'height':30} ], // 14
                         [  {'x':120, 'y':15,  'width':30, 'height':30}, 
                            {'x':120, 'y':45,  'width':30, 'height':30}, 
                            {'x':120, 'y':75,  'width':30, 'height':30}, 
                            {'x':120, 'y':105, 'width':30, 'height':30}, 
                            {'x':120, 'y':135, 'width':30, 'height':30} ], // 15
                         [  {'x':150, 'y':15,  'width':30, 'height':30}, 
                            {'x':150, 'y':45,  'width':30, 'height':30}, 
                            {'x':150, 'y':75,  'width':30, 'height':30}, 
                            {'x':150, 'y':105, 'width':30, 'height':30}, 
                            {'x':150, 'y':135, 'width':30, 'height':30} ], // 16
                         [  {'x':180, 'y':15,  'width':30, 'height':30}, 
                            {'x':180, 'y':45,  'width':30, 'height':30}, 
                            {'x':180, 'y':75,  'width':30, 'height':30}, 
                            {'x':180, 'y':105, 'width':30, 'height':30}, 
                            {'x':180, 'y':135, 'width':30, 'height':30} ], // 17
                         [  {'x':210, 'y':15,  'width':30, 'height':30}, 
                            {'x':210, 'y':45,  'width':30, 'height':30}, 
                            {'x':210, 'y':75,  'width':30, 'height':30}, 
                            {'x':210, 'y':105, 'width':30, 'height':30}, 
                            {'x':210, 'y':135, 'width':30, 'height':30} ], // 18

                         [  {'x':270, 'y':15,  'width':30, 'height':30}, 
                            {'x':270, 'y':45,  'width':30, 'height':30}, 
                            {'x':270, 'y':75,  'width':30, 'height':30}, 
                            {'x':270, 'y':105, 'width':30, 'height':30}, 
                            {'x':270, 'y':135, 'width':30, 'height':30} ], // 19
                         [  {'x':300, 'y':15,  'width':30, 'height':30}, 
                            {'x':300, 'y':45,  'width':30, 'height':30}, 
                            {'x':300, 'y':75,  'width':30, 'height':30}, 
                            {'x':300, 'y':105, 'width':30, 'height':30}, 
                            {'x':300, 'y':135, 'width':30, 'height':30} ], // 20
                         [  {'x':330, 'y':15,  'width':30, 'height':30}, 
                            {'x':330, 'y':45,  'width':30, 'height':30}, 
                            {'x':330, 'y':75,  'width':30, 'height':30}, 
                            {'x':330, 'y':105, 'width':30, 'height':30}, 
                            {'x':330, 'y':135, 'width':30, 'height':30} ], // 21
                         [  {'x':360, 'y':15,  'width':30, 'height':30}, 
                            {'x':360, 'y':45,  'width':30, 'height':30}, 
                            {'x':360, 'y':75,  'width':30, 'height':30}, 
                            {'x':360, 'y':105, 'width':30, 'height':30}, 
                            {'x':360, 'y':135, 'width':30, 'height':30} ], // 22
                         [  {'x':390, 'y':15,  'width':30, 'height':30}, 
                            {'x':390, 'y':45,  'width':30, 'height':30}, 
                            {'x':390, 'y':75,  'width':30, 'height':30}, 
                            {'x':390, 'y':105, 'width':30, 'height':30}, 
                            {'x':390, 'y':135, 'width':30, 'height':30} ], // 23
                         [  {'x':420, 'y':15,  'width':30, 'height':30}, 
                            {'x':420, 'y':45,  'width':30, 'height':30}, 
                            {'x':420, 'y':75,  'width':30, 'height':30}, 
                            {'x':420, 'y':105, 'width':30, 'height':30}, 
                            {'x':420, 'y':135, 'width':30, 'height':30} ], // 24
                       ],
              'doubling_cube': {'x':15, 'y':195, 'width': 30, 'height': 30 },
              'doubling_cube_red': {'x':15, 'y':135, 'width': 30, 'height': 30 },
              'doubling_cube_black': {'x':15, 'y':255, 'width': 30, 'height': 30 },
              'red_dice_rolled': [ {'x':330, 'y':195, 'width': 30, 'height': 30 },
                                   {'x':360, 'y':195, 'width': 30, 'height': 30 },
                                   {'x':310, 'y':195, 'width': 30, 'height': 30 },
                                   {'x':390, 'y':195, 'width': 30, 'height': 30 },
                                  ],
              'black_dice_rolled': [ {'x':120, 'y':195, 'width': 30, 'height': 30 },
                                  {'x':150, 'y':195, 'width': 30, 'height': 30 },
                                  {'x':90, 'y':195, 'width': 30, 'height': 30 },
                                  {'x':180, 'y':195, 'width': 30, 'height': 30 },
                                  ],
              'red_dice_unrolled': [ {'x':15, 'y':15, 'width': 30, 'height': 30 },
                                    {'x':15, 'y':45, 'width': 30, 'height': 30 },
                                  ],
              'black_dice_unrolled': [ {'x':15, 'y':345, 'width': 30, 'height': 30 },
                                     {'x':15, 'y':375, 'width': 30, 'height': 30 },
                                   ],
              'black_bear_off': [ {'x':465, 'y':395, 'width': 30, 'height': 10 },
                                  {'x':465, 'y':385, 'width': 30, 'height': 10 },
                                  {'x':465, 'y':375, 'width': 30, 'height': 10 },
                                  {'x':465, 'y':365, 'width': 30, 'height': 10 },
                                  {'x':465, 'y':355, 'width': 30, 'height': 10 },
                                  {'x':465, 'y':345, 'width': 30, 'height': 10 },
                                  {'x':465, 'y':335, 'width': 30, 'height': 10 },
                                  {'x':465, 'y':325, 'width': 30, 'height': 10 },
                                  {'x':465, 'y':315, 'width': 30, 'height': 10 },
                                  {'x':465, 'y':305, 'width': 30, 'height': 10 },
                                  {'x':465, 'y':295, 'width': 30, 'height': 10 },
                                  {'x':465, 'y':285, 'width': 30, 'height': 10 },
                                  {'x':465, 'y':275, 'width': 30, 'height': 10 },
                                  {'x':465, 'y':265, 'width': 30, 'height': 10 },
                                  {'x':465, 'y':255, 'width': 30, 'height': 10 },
                                ],
              'red_bear_off': [ {'x':465, 'y':15, 'width': 30, 'height': 10 },
                                    {'x':465, 'y':25, 'width': 30, 'height': 10 },
                                    {'x':465, 'y':35, 'width': 30, 'height': 10 },
                                    {'x':465, 'y':45, 'width': 30, 'height': 10 },
                                    {'x':465, 'y':55, 'width': 30, 'height': 10 },
                                    {'x':465, 'y':65, 'width': 30, 'height': 10 },
                                    {'x':465, 'y':75, 'width': 30, 'height': 10 },
                                    {'x':465, 'y':85, 'width': 30, 'height': 10 },
                                    {'x':465, 'y':95, 'width': 30, 'height': 10 },
                                    {'x':465, 'y':105, 'width': 30, 'height': 10 },
                                    {'x':465, 'y':115, 'width': 30, 'height': 10 },
                                    {'x':465, 'y':125, 'width': 30, 'height': 10 },
                                    {'x':465, 'y':135, 'width': 30, 'height': 10 },
                                    {'x':465, 'y':145, 'width': 30, 'height': 10 },
                                    {'x':465, 'y':155, 'width': 30, 'height': 10 },
                                  ],
              'red_bar': [ {'x':240, 'y':165, 'width':30, 'height':30 },
                           {'x':240, 'y':135, 'width':30, 'height':30 },
                           {'x':240, 'y':105, 'width':30, 'height':30 },
                           {'x':240, 'y':75,  'width':30, 'height':30 },
                           {'x':240, 'y':45, 'width':30, 'height':30 },
                          ],
              'black_bar': [ {'x':240, 'y':225, 'width':30, 'height':30 },
                             {'x':240, 'y':255, 'width':30, 'height':30 },
                             {'x':240, 'y':285, 'width':30, 'height':30 },
                             {'x':240, 'y':315, 'width':30, 'height':30 },
                             {'x':240, 'y':345, 'width':30, 'height':30 },
                            ],
            };
  
  this.clickable_areas = {  'points':             [ {},
                                                    {'x':420, 'y':255, 'width':30, 'height':150},
                                                    {'x':390, 'y':255, 'width':30, 'height':150},
                                                    {'x':360, 'y':255, 'width':30, 'height':150},
                                                    {'x':330, 'y':255, 'width':30, 'height':150},
                                                    {'x':300, 'y':255, 'width':30, 'height':150},
                                                    {'x':270, 'y':255, 'width':30, 'height':150},

                                                    {'x':210, 'y':255, 'width':30, 'height':150},
                                                    {'x':180, 'y':255, 'width':30, 'height':150},
                                                    {'x':150, 'y':255, 'width':30, 'height':150},
                                                    {'x':120, 'y':255, 'width':30, 'height':150},
                                                    {'x':90,  'y':255, 'width':30, 'height':150},
                                                    {'x':60,  'y':255, 'width':30, 'height':150},

                                                    {'x':60,  'y':15,  'width':30, 'height':150}, 
                                                    {'x':90,  'y':15,  'width':30, 'height':150}, 
                                                    {'x':120, 'y':15,  'width':30, 'height':150}, 
                                                    {'x':150, 'y':15,  'width':30, 'height':150}, 
                                                    {'x':180, 'y':15,  'width':30, 'height':150}, 
                                                    {'x':210, 'y':15,  'width':30, 'height':150}, 

                                                    {'x':270, 'y':15,  'width':30, 'height':150}, 
                                                    {'x':300, 'y':15,  'width':30, 'height':150}, 
                                                    {'x':330, 'y':15,  'width':30, 'height':150}, 
                                                    {'x':360, 'y':15,  'width':30, 'height':150}, 
                                                    {'x':390, 'y':15,  'width':30, 'height':150}, 
                                                    {'x':420, 'y':15,  'width':30, 'height':150}, 
                                                  ],
                            'red_bar':              {'x':240, 'y':45, 'width':30, 'height':150 },
                            'black_bar':            {'x':240, 'y':225, 'width':30, 'height':150 },
                            'red_bear_off':         {'x':465, 'y':15, 'width': 30, 'height': 150 },
                            'black_bear_off':       {'x':465, 'y':255, 'width': 30, 'height': 150 },
                            'red_dice':             {'x':15, 'y':15, 'width': 30, 'height': 60 },
                            'black_dice':           {'x':15, 'y':345, 'width': 30, 'height': 60 },
                            'doubling_cube':        {'x':15, 'y':195, 'width': 30, 'height': 30 },
                            'doubling_cube_red':    {'x':15, 'y':135, 'width': 30, 'height': 30 },
                            'doubling_cube_black':  {'x':15, 'y':255, 'width': 30, 'height': 30 }
                          };
  var canvas = document.getElementById("board");
  this.ctx = canvas.getContext("2d");
                        
  this.currentPlayer = null;
  
};

BackgammonView.prototype.refreshGameState = function(gameState) {

  this.ctx.clearRect(this.d['board'].x, this.d['board'].y, this.d['board'].width, this.d['board'].height);

  this.drawSprite(this.s['board'], this.d['board']);
  
  // Points
  for (var p=0;p<gameState.points.length;p++) {
    // Checkers
    for (var c=0;c<gameState.points[p].red;c++) {
      this.drawSprite(this.s['red_checker'], this.d['points'][p][c]);
    }
    
    for (var c=0;c<gameState.points[p].black;c++) {
      this.drawSprite(this.s['black_checker'], this.d['points'][p][c]);
    }
  }
  
  // Doubling Cube  
  if (gameState.doublingCubeOwner == 'red') {
    this.drawSprite(this.s['doubling_cube'][gameState.doublingCube], this.d['doubling_cube_red']);
  } else if (gameState.doublingCubeOwner == 'black') {
    this.drawSprite(this.s['doubling_cube'][gameState.doublingCube], this.d['doubling_cube_black']);
  } else {
    this.drawSprite(this.s['doubling_cube'][gameState.doublingCube], this.d['doubling_cube']);
  }

  // Dice
  if (gameState.currentPlayer == null) {
    this.drawRedDiceUnrolled();
    this.drawBlackDiceUnrolled();    
  } else if (gameState.currentPlayer == 'red') {
    this.drawBlackDiceUnrolled();
    if (gameState.roll == null) {
      this.drawRedDiceUnrolled();
    } else {
      this.drawRedDiceRolled();
    }
  } else if (gameState.currentPlayer == 'black') {
    this.drawRedDiceUnrolled();
    if (gameState.roll == null) {
      this.drawBlackDiceUnrolled();
    } else {
      this.drawBlackDiceRolled();
    }
  }
  
  // Bear off
  for (var i=0; i<gameState.redBearOff;i++) {
    this.drawSprite(this.s['red_checker_side'], this.d['red_bear_off'][i]);
  }
  
  for (var i=0; i<gameState.blackBearOff;i++) {
    this.drawSprite(this.s['black_checker_side'], this.d['black_bear_off'][i]);
  }
  
  // Bar
  for (var i=0; i<gameState.redBar.count; i++) {
    this.drawSprite(this.s['red_checker'], this.d['red_bar'][i]);
  }
  
  for (var i=0; i<gameState.blackBar.count; i++) {
    this.drawSprite(this.s['black_checker'], this.d['black_bar'][i]);
  }

};

BackgammonView.prototype.drawSprite = function(sprite,destination) {
  this.ctx.drawImage(this.spriteSheet, sprite.x, sprite.y, sprite.width, sprite.height, destination.x, destination.y, destination.width, destination.height);
};

BackgammonView.prototype.drawRedDiceUnrolled = function() {
  var context = this;
  this.d['red_dice_unrolled'].forEach(function(destination) { 
    context.drawSprite(context.s['red_die'][Math.ceil(Math.random()*6)], destination);
  });
},

BackgammonView.prototype.drawBlackDiceUnrolled = function() {
  var context = this;
  this.d['black_dice_unrolled'].forEach(function(destination) { 
    context.drawSprite(context.s['black_die'][Math.ceil(Math.random()*6)], destination);
  });
},

BackgammonView.prototype.drawRedDiceRolled = function(rolls) {
  var context = this;
  rolls.forEach(function(r, i) {
    context.drawSprite(context.s['red_die'][r], context.d['red_dice_rolled'][i]);
  });
},

BackgammonView.prototype.drawBlackDiceRolled = function(rolls) {
  var context = this;
  rolls.forEach(function(r, i) {
    context.drawSprite(context.s['black_die'][r], context.d['black_dice_rolled'][i]);
  });
},

BackgammonView.prototype.clickArea = function(x,y) {
  // for each clickable area
    // if x,y in area
      // return area key
};

BackgammonView.prototype.handlerPerform = function(event) {
  if (event.type == 'game_state') {
    this.refreshGameState(event);
  }
};

$(document).ready(function() {
  var backgammonView = new BackgammonView();
  
  $('#game canvas').click(function(event) {
    if ( typeof event.offsetX == 'undefined' && typeof event.offsetY == 'undefined' ) {
      var offset = $(event.target).offset(false);
      event.offsetX = event.pageX - offset.left;
      event.offsetY = event.pageY - offset.top;
    }
    // var x = parseInt((event.offsetX - draughtsView.boardStartPos.x) / draughtsView.squareSize.width);
    // var y = parseInt((event.offsetY - draughtsView.boardStartPos.y) / draughtsView.squareSize.height);
    // if (((y + x) % 2 == 1) && (backGammonView.currentPlayer.id == connector.user.id)) {
    //   connector.publish({type: 'touch_square', user: connector.user, x: x, y: y});
    // }
  });
  
  var subscription = connector.subscribe(function(event) {
    backgammonView.handlerPerform(event);
  });
});

