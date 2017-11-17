function set_msg(box, msg) {
	remove_all_mesages();
	document.getElementById(box).style.display='block';
	document.getElementById(box).innerHTML = msg;
}



function remove_all_mesages() {
	document.getElementById("info-box").style.display='none';
	document.getElementById("success-box").style.display='none';
	document.getElementById("warning-box").style.display='none';
	document.getElementById("error-box").style.display='none';
}

function can_move_left() {
  var currentDirection = player.direction;
  var simulated_direction = sim_move_left(currentDirection);
  var x = player.x;
  var y = player.y;
  var simulated_step = sim_next_tile(x,y, simulated_direction)
  var simulated_next_x = simulated_step[0]
  var simulated_next_y = simulated_step[1]
  
  return can_move(simulated_next_x, simulated_next_y);

}

function can_move_right() {
  var currentDirection = player.direction;
  var simulated_direction = sim_move_right(currentDirection);
  var x = player.x;
  var y = player.y;
  var simulated_step = sim_next_tile(x,y, simulated_direction)
  var simulated_next_x = simulated_step[0]
  var simulated_next_y = simulated_step[1]
  return can_move(simulated_next_x, simulated_next_y);

}

/*
0 = up
1 = down
2 = left
3 = right
*/

function sim_move_left(direction) {
  //var currentDirection = player.direction;
  //var currentDirection=direction;
  var next_direction;
  switch (direction) {
    case 0:
      next_direction = 2;
      break;
    case 1:
      next_direction = 3;
      break;
    case 2:
      next_direction = 1;
      break;
    case 3:
      next_direction = 0;
      break;
  }

  return next_direction;
}


function move_left() {
  if (! is_paused) {
    var currentDirection = player.direction;
    switch (currentDirection) {
      case 0:
        player.direction = 2;
        break;
      case 1:
        player.direction = 3;
        break;
      case 2:
        player.direction = 1;
        break;
      case 3:
        player.direction = 0;
        break;
    }
    draw();
  }
}

/*
0 = up
1 = down
2 = left
3 = right
*/
function sim_move_right(direction) {
  //var currentDirection = player.direction;
  //var currentDirection=direction;
  switch (direction) {
    case 0:
      direction = 3;
      break;
    case 1:
      direction = 2;
      break;
    case 2:
      direction = 0;
      break;
    case 3:
      direction = 1;
      break;
  }
  return direction;
}

function move_right() {
  var currentDirection = player.direction;
  switch (currentDirection) {
    case 0:
      player.direction = 3;
      break;
    case 1:
      player.direction = 2;
      break;
    case 2:
      player.direction = 0;
      break;
    case 3:
      player.direction = 1;
      break;
  }
  draw();
}

var player = {
  x: 0,
  y: 0,
  direction: 0
};

function reset() {
  player = {
    x: 0,
    y: 0,
    direction: 1
  };
  set_starting_position()
  draw();
  is_paused = false;
  remove_all_mesages();
}

function set_starting_position() {
  var start_x = 10;
  var start_y = 10;
  for (var y = 0; y < board.length; y++) {
    for (var x = 0; x < board[y].length; x++) {
      //Draw a wall
      if (board[y][x] === 2) {
        start_x = x;
        start_y = y;
      }
    }
  }
  player.x = start_x;
  player.y = start_y;
  //return [start_x, start_y];
}

function get_goal_position() {
  var goal_x = 10;
  var goal_y = 10;
  for (var y = 0; y < board.length; y++) {
    for (var x = 0; x < board[y].length; x++) {
      //Draw a wall
      if (board[y][x] === -1) {
        goal_x = x;
        goal_y = y;
      }
    }
  }
  return [goal_x, goal_y];
}



var canvas = $('#GameBoardCanvas');
var is_paused = false;
//The game board 1 = walls, 0 = free space, and -1 = the goal
var board = [

  [0, 1, 1, 0, 0, 0, 1, 0, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 0, 1, 0],
  [1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
  [1, 0, 1, 0, 1, 0, 0, 1, 1, 0],
  [-1, 0, 1, 0, 1, 1, 0, 0, 0, 0]
];

var board = [

  [2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, -1]
];

//Draw the game board
function draw() {
	var canvas = $('#GameBoardCanvas');
  var width = canvas.width();
  var blockSize = width / board.length;
  var ctx = canvas[0].getContext('2d');
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, width, width);
  ctx.fillStyle = "white";
  //Loop through the board array drawing the walls and the goal
  for (var y = 0; y < board.length; y++) {
    for (var x = 0; x < board[y].length; x++) {
      //Draw a wall
      if (board[y][x] === 1) {
        ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
      }
      //Draw the goal
      else if (board[y][x] === -1) {
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "gold";
        ctx.moveTo(x * blockSize, y * blockSize);
        ctx.lineTo((x + 1) * blockSize, (y + 1) * blockSize);
        ctx.moveTo(x * blockSize, (y + 1) * blockSize);
        ctx.lineTo((x + 1) * blockSize, y * blockSize);
        ctx.stroke();
      }
    }
  }
  //Draw the player
  ctx.beginPath();
  var half = blockSize / 2;
  ctx.fillStyle = "blue";
  ctx.arc(player.x * blockSize + half, player.y * blockSize + half, half, 0, 2 * Math.PI);
  //drawTriangle(ctx, player.x*blockSize+half, player.y*blockSize+half*1/2, player.direction, blockSize, half);
  ctx.fill();
  ctx.beginPath();
  var direction = player.direction
  var angle = -Math.PI;
  switch (direction) {
    case 0:
      angle = 0;
      break;
    case 1:
      angle = -Math.PI;
      break;
    case 2:
      angle = -Math.PI / 2;
      break;
    case 3:
      angle = +Math.PI / 2;
      break;
  }

  ctx.arc(player.x * blockSize + half, player.y * blockSize + half, half, angle, angle + Math.PI, false);
  ctx.closePath();
  ctx.lineWidth = 0.1;
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.strokeStyle = '#550000';
  ctx.stroke();
  check_victory();
}

function not_done() {
  var goal_location = get_goal_position()
  var goal_x = goal_location[0];
  var goal_y = goal_location[1];
  console.log('in not done');
  //console.log(player.x!= goal_x || player.y != goal_y)
  return (player.x!= goal_x || player.y != goal_y);
};

//Check to see if the new space is inside the board and not a wall
function can_move(x, y) {
  return (y >= 0) && (y < board.length) && (x >= 0) && (x < board[y].length) && (board[y][x] != 1);
}

function sim_next_tile(xs,ys,direction) {
  /*
  0 = up
  1 = down
  2 = left
  3 = right
  */
  var x=xs;
  var y=ys;
  switch (direction) {
    case 0:
      y = y - 1;
      break;
    case 1:
      y = y + 1;
      break;
    case 2:
      x = x - 1;
      break;
    case 3:
      x = x + 1;
      break;
  }
  return [x, y];

}


function get_next_tile(player) {
  var direction = player.direction;
  var x = player.x;
  var y = player.y;

  /*
  0 = up
  1 = down
  2 = left
  3 = right
  */

  switch (direction) {
    case 0:
      y = y - 1;
      break;
    case 1:
      y = y + 1;
      break;
    case 2:
      x = x - 1;
      break;
    case 3:
      x = x + 1;
      break;
  }
  return [x, y];

}

function check_victory() {
  var x = player.x;
  var y = player.y
  var value = board[y][x];
  if (value == -1) {
    console.log("completed!");
    set_msg('success-box', 'You have successfully completed this level!')
  } 
}

function move_forward() {
  if (! is_paused) {
  	nexts = get_next_tile(player);
      next_x = nexts[0];
      next_y = nexts[1];
      //console.log(nexts)
      if (can_move(next_x, next_y)) {
        player.x = next_x;
        player.y = next_y;
  	draw();
      }
  	else {
  		set_msg('error-box', 'You crashed into the wall! Press reset to continue...')
      is_paused = true;
  		
  	}
  }
	
}

$(window).load(function(){


reset();
/*
0 = up
1 = down
2 = left
3 = right
*/

set_msg('info-box', 'Enjoy the first level!')


$(document).keyup(function(e) {
  if (e.which == 38) {
    move_forward();
	//remove_all_mesages();
  }
  /*else if((e.which == 40) && canMove(player.x, player.y+1)) // down arrow
      player.y++;
  else if((e.which == 37) && canMove(player.x-1, player.y))
      player.x--;
  else if((e.which == 39) && canMove(player.x+1, player.y))
      player.x++;
   */
  else if (e.which == 65)
    move_left();
  else if (e.which == 90)
    move_right();
  else if (e.which == 82)
    reset();
  
	//remove_all_mesages();

  e.preventDefault();
});

draw();
});