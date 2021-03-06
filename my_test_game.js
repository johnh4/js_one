var my_canvas = document.getElementById('canvas');
var context = my_canvas.getContext("2d");

var WIDTH = 300;
var HEIGHT = 200;
var x = 10;
var y = 10;
var dx = 10;
var dy = 10;
var direction= "";
var r = 10;
var dr = 2;
var min_radius= 10;
var ae_dir = new Array();
var ae_x = new Array();
var ae_y = new Array();
var ae_r = new Array();
var ae_dx = new Array();
var ae_dy = new Array();
var angry = 3;
var num_enemies = 0;
var max_enemies = 5;
var index = 0;
var colors = ["blue", "red", "green", "black", "yellow","orange"];
var ae_color = new Array();
var score = 0;
var score_mult = 0;
var game_over = false;

var timer = null;
var t_value = 0;
var start = document.getElementById("start");
var count = document.getElementById("count");
var clock = document.getElementById("timer");
var multiplier = document.getElementById('multiplier');
var paused = false;
var enemy_interval;
var e_dir_interval;
var draw_interval;

function init() {
    count.value = 0;
    clock.innerHTML = 0;
    document.getElementById("canvas").width = WIDTH;
    document.getElementById("canvas").height = HEIGHT;
    document.getElementById("rules").style.width = WIDTH+"px";
    enemy_interval = setInterval(create_enemy, 5000);
    e_dir_interval = setInterval(e_direction, 400);
    start_timer();
    draw_interval = setInterval(draw,30);
    //add_carrot();    
    return draw_interval;      
}
function add_carrot() {
    /*
    var imageObj = new Image();
    imageObj.onload = function() {
        context.drawImage(imageObj, 80, 80);
    };
    imageObj.src = 'https://profile-a.xx.fbcdn.net/hprofile-ash4/373313_234468583305435_1710516074_q.jpg';
    //imageObj.src = "http://www.wpclipart.com/signs_symbol/shapes/diamond_shape.png"
    */
    /*
    var carrot = document.getElementById("carr");
    imageObj.onload = function() {
        context.drawImage(carrot, 20,20);
    };
    */
    /*
    var css_box = document.getElementById('box');
    css_box.onload = function() {
        context.drawImage(css_box,60,20);
    }
    */
}
function start_timer() {
    paused = false;
    if(game_over) {
        game_over = false;
        init();
    }
    var interval = 1000;
    var count = document.getElementById("count");
    var clock = document.getElementById("timer");

    if(timer !== null) return;
    timer = setInterval(function(){
        count.value ++;
        t_value ++;
        clock.innerHTML = t_value;
    }, interval);
}

function stop_timer() {
        clearInterval(timer);
        timer = null;
        paused = true;
}

function create_enemy() {
    //score +=  1000;
    if(!paused) {
        if(num_enemies < max_enemies) {
            num_enemies += 1;
            index = num_enemies-1;
            ae_dir[index] = ""; 
            ae_x[index] = 10; 
            ae_y[index] = 10; 
            ae_dx[index] = 1;    
            ae_dy[index] = 1;  
            ae_r[index] = 5;
            var rand = Math.floor(Math.random()*colors.length);
            ae_color[index] = colors[rand]; 
            document.getElementById("test_a").innerHTML=num_enemies;
        }
    }
}   
 
function end_game() {

}
function draw_enemies() {
    for (var i=0; i<num_enemies; i++) {
        //e_move(ae_dir[i]);
        e_move();
        context.fillStyle = ae_color[i];
        circle(ae_x[i], ae_y[i], ae_r[i]);
    }
}
function reset_game() {
    num_enemies = 0;
    score = 0;
    direction = "";
    x = 10;
    y = 10;
    r= 10;
    t_value = 0;
    score_mult = 0;
    clearInterval(draw_interval);
    clearInterval(e_dir_interval);
    clearInterval(enemy_interval);
}
function draw() {
    if(paused && !game_over) {
        context.fillStyle = "Black";
        context.font = "25px Arial";
        context.fillText("Game Paused", WIDTH*.25, HEIGHT*.8);
        return;
    }
    if(game_over) {
        context.fillStyle = "Black";
        context.font = "25px Arial";
        context.fillText("GAME OVER", WIDTH*.25, HEIGHT*.8);
        context.font = "12px Arial";
        context.fillText("Press the Space Bar to try again", WIDTH*.215, HEIGHT*.9);
        reset_game();
        stop_timer();
        return;   
    }
    score += (1 + score_mult);
    document.getElementById('score').innerHTML=score;
    clear();
    context.fillStyle = "white";
    context.strokeStyle = "black";
    rect(0,0,WIDTH,HEIGHT);
    context.fillStyle = "purple";
    move(direction);
    multiplier.innerHTML = score_mult;
    circle(x,y,r);
    //context.fillStyle = "red";
    //e_direction();
    //e_move(ae_dir);
    draw_enemies();
    //circle(e_x, e_y, e_r);
    check_collision();
    add_carrot();
}

function check_collision() {
    for(var i=0; i<num_enemies; i++) {
        var e_xr = ae_x[i] + ae_r[i]; 
        var e_xl = ae_x[i] - ae_r[i]; 
        var x_r = x + r;
        var x_l = x - r;  
        var has_x = (x_r <= e_xr && x_r >= e_xl ) || (x_l <= e_xr && x_l >= e_xl);
        var e_yr = ae_y[i] + ae_r[i];
        var e_yl = ae_y[i] - ae_r[i];
        var y_r = y + r; 
        var y_l = y - r;
        var has_y = (y_r <= e_yr && y_r >= e_yl ) || (y_l <= e_yr && y_l >= e_yl);
        var collision = has_x && has_y;
        if(collision){
            //document.write("Game Over!");
            game_over = true;
            return collision; 
        } 
        document.getElementById("test_b").innerHTML=collision;
    }
}

function clear() {
    context.clearRect(0,0,WIDTH,HEIGHT);
}

function rect(x,y,w,h) {
    context.beginPath();
    context.rect(x,y,w,h);
    context.closePath();
    context.fill();
    context.stroke();
}

function circle(x,y,r) {
    context.beginPath();
    context.arc(x,y,r,0, Math.PI*2,true);
    context.fill();
    //document.getElementById("test_a").innerHTML=num_enemies;
}

function e_direction() {
    var e_rand=0;
    for(var i=0; i<num_enemies; i++) {
        //document.getElementById("test_b").innerHTML=i; 
        e_rand = Math.floor(Math.random() * 4) + 1;
        if(e_rand == 1) {
            ae_dir[i] = "up";
        }
        else if (e_rand == 2) {
            ae_dir[i] = "down";
        }
        else if (e_rand == 3) {
            ae_dir[i] = "left";
        }
        else if (e_rand == 4) {
            ae_dir[i] = "right";
        }
        e_rand = 0;
    }
}
function e_move(){
    for(var i=0; i<num_enemies;i++) {
        if(ae_dir[i] == "up"){
            if(ae_y[i]-ae_r[i] - ae_dy[i] > 0) {            
                ae_y[i] -= ae_dy[i];            
            }
            else if( ((ae_y[i]-ae_r[i] -ae_dy[i]) <=0) && ((ae_y[i]-ae_r[i] -ae_dy[i]) >(0 - ae_y[i]-ae_r[i]-ae_dy[i]))){
                ae_y[i] = 0+ae_r[i];
            }
        }
        if(ae_dir[i] == "down"){
            if(ae_y[i]+ae_r[i] + ae_dy[i] < HEIGHT) {            
                ae_y[i] += ae_dy[i];            
            }
            else if( ((ae_y[i]+ae_r[i] +ae_dy[i]) >= HEIGHT) && ((ae_y[i]+ae_r[i] +ae_dy[i]) <(HEIGHT + ae_y[i]+ae_r[i] +ae_dy[i]))){
                //document.write("wow");
                ae_y[i] = HEIGHT-ae_r[i];
            }
        }
        if(ae_dir[i] == "left"){
            if(ae_x[i]-ae_r[i]- ae_dx[i] > 0) {            
                ae_x[i] -= ae_dx[i];            
            }
            else if( ((ae_x[i]-ae_r[i] -ae_dx[i]) <=0) && ((ae_x[i]-ae_r[i] -ae_dy[i]) >(0 - ae_x[i]-ae_r[i]-ae_dy[i]))){
                ae_x[i] = 0+ae_r[i];
            }
        }
        if(ae_dir[i] == "right"){
            if(ae_x[i]+ae_r[i] + ae_dx[i] < WIDTH) {
                ae_x[i] += ae_dx[i];            
            }
            else if( ((ae_x[i]+ae_r[i] +ae_dx[i]) >= WIDTH) && ((ae_x[i]+ae_r[i] +ae_dx[i]) <=(WIDTH + ae_x[i]+ae_r[i] +ae_dx[i]))){
                //document.write("wow");
                ae_x[i] = WIDTH-ae_r[i];
            }
        }
    }
    //document.getElementById("test_y").innerHTML=y;
    
}

function move(direction){
    if(direction == "up"){
        if(y-r - dy > 0) {            
            y -= dy;            
        }
        else if( ((y-r -dy) <=0) && ((y-r -dy) >(0 - y-r-dy))){
            y = 0+r;
        }
    }
    if(direction == "down"){
        if(y+r + dy < HEIGHT) {            
            y += dy;            
        }
        else if( ((y+r +dy) >= HEIGHT) && ((y+r +dy) <(HEIGHT + y+r +dy))){
            //document.write("wow");
            y = HEIGHT-r;
        }
    }
    if(direction == "left"){
        if(x-r- dx > 0) {            
            x -= dx;            
        }
        else if( ((x-r -dx) <=0) && ((x-r -dy) >(0 - x-r-dy))){
            x = 0+r;
        }
    }
    if(direction == "right"){
        if(x+r + dx < WIDTH) {
            x += dx;            
        }
        else if( ((x+r +dx) >= WIDTH) && ((x+r +dx) <=(WIDTH + x+r +dx))){
            //document.write("wow");
            x = WIDTH-r;
        }
    }

    init_dragging();
    //document.getElementById("test_y").innerHTML=y;
    
}

function doKeyDown(evt) {
    switch(evt.keyCode) {
        case 38: //Up arrow was pressed
            direction = "up";
            break;
        case 40: //Down arrow was pressed
            direction = "down";
            break;
        case 37: //Left arrow was pressed
            direction = "left";
            break;
        case 39: //Right arrow was pressed
            direction = "right";
            break;
        case 83: //s was pressed
            direction = "";
            break;
        case 32: //Spacebar was pressed
            if(paused == false) {
                stop_timer();
            }
            else if(game_over) {
                game_over = false;
                init();
            }
            else {
                start_timer();
            }
            break;
        case 70: // f was pressed, grow
            if(2*r < HEIGHT && 2*r <= WIDTH) {
                r += dr;
                score_mult +=1;
            }
            break;
        case 68: // d was pressed, shrink
            if(r > min_radius){
                r -= dr;
                score_mult --;
            }
            break;
    }
}
function make_them_angry() {
    for(var i=0; i< num_enemies; i++) {
        ae_dx[i] = angry;
        ae_dy[i] = angry;
    }
}
/***** dragging functions *****************/
var drag_element;

function on_mouse_down(e) {
    var target = e.target;
    if(e.button == 0) {
        direction = "";
        x = e.clientX;
        y = e.clientY;
        max_enemies = 10;
        make_them_angry();
    }
    drag_element = target;
    my_canvas.onmousemove = on_mouse_move;
}
function on_mouse_move(e) {
    if(e == null) {
        var e = window.event;
    }
        x = e.clientX;
        y = e.clientY;
        my_canvas.style.cursor = "none";
}
function on_mouse_up(e) {
    my_canvas.onmousemove = null;
    if(drag_element != null) {
        my_canvas.onmousemove = null;
        drag_element = null;
        my_canvas.style.cursor = "auto";
    }
}
function init_dragging() {
    my_canvas.onmousedown = on_mouse_down;
    my_canvas.onmouseup = on_mouse_up;
}
/***************************************/

init();
window.addEventListener('keydown',doKeyDown,true);