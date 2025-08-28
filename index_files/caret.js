function $(elid){// Shortcut function to get a n element by its ID
    return document.getElementById(elid);
}
var cursor;
window.onload=init(); // runs init() immediately, assigns its RETURN VALUE to onload
function init(){
    cursor=$("cursor");// Get the element with id="cursor" using our $() helper function
    cursor.style.left="-5px";// grabs id cursor at the very start
}
function n12br(txt){
    return txt.replace(/\n/g,'')// Replace all occurrences of '\n' (newline) with an empty string
}
function typeIt(from,e){
    e=e||window.event;
    var w=$('typer');/// Get the element with id 'typer' where we will show the text
    var tw=from.value;// // Get the current value of the input element 'from'
    if(!pw){
        w.innerHTML=n12br(tw); // Remove newlines from the text and put it into the 'typer' element
    }    
}
// Function to move a "cursor" element left or right based on arrow key presses
function moveIt(from,e){
    e=e||window.event;// Get the event object
    var keycode=e.keycode||e.which;// Get the key code of the pressed key
    if(keycode===37 && (parseInt(cursor.style.left)>=(0-(count-1)*10))){  // Move left if left arrow (key code 37) is pressed and not to far left
        cursor.style.left=parseInt(cursor.style.left)-10+"px";

    }
    else if(keycode==39 && (parseInt(cursor.style.left)+10)<=0){ // Move right if right arrow (key code 39) is pressed and not move past 0 ->move 10px to right
        cursor.style.left=parseInt(cursor.style.left)+10+"px";
    }

}
function alert(txt){
    console.log(txt);
}