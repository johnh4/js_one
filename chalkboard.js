
var box = document.getElementById('box');
var target;
var offset_x;
var offset_y;
var a, b;

function box_down(e) {
    if(!e) e = window.event;
    target = e.target;
    offset_x = parseInt(target.style.left+0);
    offset_y = parseInt(target.style.top+0);
    a = e.clientX;
    b = e.clientY;
    //box.style.left = e.clientX - offset_x + "px";
    //box.style.top = e.clientY - offset_y + "px";
    if(target.id == 'box') document.onmousemove = box_move;
}
function box_move(e) {
    if(e==null) var e = window.event;
    box.style.left = e.clientX -a + offset_x+"px";
    box.style.top = e.clientY -b + offset_y+"px"; 
}
function box_up(e) {
    document.onmousemove = null;
}


function init_box_dragging() {
    document.onmousedown = box_down;
    document.onmouseup = box_up;
}
/************************************/
var my_div = null;
var new_div = null;

function addElement() {
    new_div = document.createElement("div");
    var new_content = document.createTextNode("Hello");
    new_div.appendChild(new_content);

    my_div = document.getElementById('box');
    document.body.insertBefore(new_div, my_div);
}


/************************************/