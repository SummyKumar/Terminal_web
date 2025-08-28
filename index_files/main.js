var before=document.getElementById("before");
var liner=document.getElementById("liner");
var command=document.getElementById("typer");
var textarea=document.getElementById("texter");
var terminal=document.getElementById("terminal");

var git=0;
var pw=false;
let pwd=false;
var commands=[];
let currentDirectory="";

setTimeout(function(){// Delay execution by 100 milliseconds to start the terminal
    loopLines(banner,"",80);// Display the banner lines one by one in the terminal (array,prefix,speed)
    textarea.focus(); // Focus the textarea so the user can start typing immediately
},100);

window.addEventListener("keyup",enterKey);

console.log("%c You hacked my password !" ,
    "color:#04ff00; font-weight:bold;font-size:24px"
);
console.log("%cPassword: '"+password+"'-I wonder what it does?", "color: grey");

textarea.value="";// Clear the textarea value initially

command.innerHTML=textarea.value;// Set the displayed command to match textarea (starts empty)
function enterKey(e){// Function to handle key releases (keyup events)

    if(e.keyCode==181){//reload the page (hard reload)
        document.location.reload(true);
    }
    if(pw){// If password mode is active
        let et="*";// Character to display instead of actual password
        let w=textarea.value.length; // Current typed length
        command.innerHTML=et.repeat(w); // Display asterisks matching typed characters
        if(textarea.value===password){
            pwd=true;//password is correct
        }
        if(pwd && e.keyCode==13){ // If password is correct AND Enter is pressed
            loopLines(secret, "color2 margin", 120); // Display secret content line by line with styles
            //clear command and reset
            command.innerHTML="";
            
            textarea.value="";
            pwd=false;
            pw=false;
            // Remove "password" styling from the terminal line
            liner.classList.remove("password");

        }
        // If Enter pressed but password is wrong
        else if(e.keyCode==13){
            addLine("Wrong password","error",0);
             // Clear command and textarea and show error
            command.innerHTML="";
            textarea.value="";
            // Disable password mode and styling
            pw=false;
            
            liner.classList.remove("password");
        }
    }
    else{  // Normal command mode (not password)
        if(e.keyCode==13){
            commands.push(command.innerHTML); // Save command to history
            git=commands.length; // Track current command index
            if(currentDirectory==="scripts"){   // Display typed command with terminal prompt
                addLine("visit@cookie.fr:~/scripts$ "+command.innerHTML,"no-animation",0);
            }
            else{
                addLine("visit@cookie.fr:~$ "+command.innerHTML,"no-animation",0);
            }
            // Process the command (function defined elsewhere)
            commander(command.innerHTML.toLowerCase());
            // Clear command display and textarea for next input
            command.innerHTML="";
            textarea.value="";

        }
        // Navigate command history with Up Arrow
        if(e.keyCode==38 && git!=0){ // Up Arrow
            git-=1;// Go to previous command
            textarea.value=commands[git]; // Set textarea to previous command
            command.innerHTML=textarea.value;// Update display
        }
        // Navigate command history with Down Arrow
        if(e.keyCode==40 && git!=commands.length){
            git+=1;
            if(commands[git]===undefined){
                textarea.value=""; // clear if no command
            }
            else{
                textarea.value=commands[git];// Set textarea to next command
            }
            command.innerHTML=textarea.value; // Update display
        }
    }
}


//linux commands
function commander(cmd){
    switch(cmd.toLowerCase()){
        case "help":
            // Display the help array line by line in the terminal
            // loopLines(array, cssClass, delay)
            loopLines(help,"color2 margin",80);
            break;
        
        case "whois":
            
            loopLines(whois,"color2 margin",80);
            
            break;
        
        case "whoami":
            
            loopLines(whoami,"color2 margin",80);
            
            break;
        
        case "sudo":
            addLine("Oh no, your're not admin...","color2",80);
            setTimeout(function(){
                window.open('https://www.youtube.com/watch?v=xvFZjo5PgG0&list=RDxvFZjo5PgG0&start_radio=1');
            },1000);
            break;
        
        case "social":
            
            loopLines(social,"color2 margin",80);
            break;
        
        case "secret":
            liner.classList.add("password");
            pw=true;
            break;
        
        case "projects":
            loopLines(projects,"color2 margin",80);
            break;
        
        case "history":
            // Add a blank line before showing the history for spacing
            addLine("<br>","",0);            
            loopLines(commands,"color2",80);
            // Loop through the 'commands' array and display each previous command
            // 'color2' is the CSS class applied to each line
            // 80ms * index delay makes lines appear one by one like typing
            setTimeout(()=>{
                addLine("<br>","command",0);
            },80*commands.length);
            // Add a blank line after displaying all commands
            break;
        case "email":
            addLine(
            `Opening mail to: <a href="mailto:summykumar123987@gmail.com">summykumar123987@gmail.com</a>`,
            "color2",
            80
            );
            // newTab(email);
            window.open("mailto:summykumar123987@gmail.com");
 
            break;
        case "clear":
             setTimeout(function(){
                terminal.innerHTML='<a id="before"></a>';
             before=document.getElementById("before");
             },1)
             break;

            
        case "banner":
            loopLines(banner,"",80);
            break;
        case "linkedin":
            addLine("opening Linkedin...","color2",80);
            newTab(linkedin);
            break;
        case "github":
            addLine("opening github...","color2",80);
            newTab(github);
            break;


            //// ALL LINUX COMMANDS
        case "pwd" :
            if(currentDirectory==='scripts'){
                addLine("/home/visit/scripts","color2",0);
            }
            else{
                addLine("/home/visit","color2",0);

            }
            break;
        //ls commands
        case "ls":
            if(currentDirectory==="scripts"){
                const scriptFiles=["Pagefile.sys","Win32K.sys"];
                addLine(scriptFiles.join(" "),"color2",0);
            }
            else{
                addLine("scripts","folder",0);
            }
            break;
        case "ls ..":
            if(currentDirectory==="scripts"){
                addLine("scripts","folder",0);
            }
            else{
                addLine("","",0);
            }
            break;
        case "ls ~":
            addLine("scripts","folder",0);
            break;
        case "ls ./scripts":
        case "ls /home/visit/scripts":
        case "ls ~/scripts":
        case "ls scripts":
            const scriptFiles1=["Pagefile.sys","Win32K.sys"];
            addLine(scriptFiles1.join(" "),"color2",0);
            break;
        // possible cd 
        case "cd scripts":
        case "cd ./scripts":
        case "cd ./home/visit/scripts":
        case "cd ~/scripts":
            currentDirectory="scripts";
            const sheet5=document.styleSheets[0];
            sheet5.addRule('#liner::before','content: "visit@cookie.fr:~/scripts$"')
            break;
        
        case "cd ..":
            if (currentDirectory === "") { 
                // Already at home/root, cannot go back
                addLine("Cannot go back, already at home directory", "error", 0);
            } else {
                // Go back to home directory
                currentDirectory = "";
                const sheet3 = document.styleSheets[0];
                sheet3.addRule('#liner::before', 'content: "visit@cookie.fr:~$"');
            }
            break;


        //possible cat commands under progress
        case "cat ~/scripts/Pagefile.sys":
        case "cat ./scripts/Pagefile.sys":
        case "cat Pagefile.sys":
            if(currentDirectory==="scripts"){
                setTimeout(function(){
                    window.open()
                },1000);
            }
            else{
                addLine("No such file or directory","color2",0);
            }
            break;
        case "cat ~/scripts/Win32K.sys":
        case "cat ./scripts/Win32K.sys":
        case "cat Win32K.sys":
            if(currentDirectory==="scripts"){
                setTimeout(function(){
                    window.open()
                },1000);
            }
            else{
                addLine("No such file or directory","color2",0);
            }
            break;
        default:
            // adds the text to the terminal with an error style and a 100ms delay.
            addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>"
                ,"error"
                ,100);
    }

}
///Function to open a new browser tab after a short delay
function newTab(link){
    setTimeout(function(){
        window.open(link,"_blank");
    },500);// Delay of 500 milliseconds before opening
}
// Function to add a line of text to the terminal with optional styling and delay
function addLine(text,style,time){
    var t="";// Temporary string to build HTML-safe text
    for(let i=0;i<text.length;i++){// Loop through each character in the text
 // If there are two consecutive spaces, replace with &nbsp;&nbsp; (non-breaking spaces)
        if(text.charAt(i)==" " && text.charAt(i+1)==" "){
            t+="&nbsp;&nbsp;";
            i++; // Skip the next space since we already handled it
        }
        else{
            t+=text.charAt(i);// Otherwise, keep the character as is
        }
    }
    // Add the text to the terminal after a delay
    setTimeout(function(){
        
            var next=document.createElement("p");// Create a new <p> element
        next.innerHTML=t; // Set its HTML content
        next.className=style;// Apply CSS class/style
         // Insert the new <p> before the "before" element
        before.parentNode.insertBefore(next,before);//tell parent to add next behind 'before'
        // Scroll the window to the bottom so the new line is visible
        window.scrollTo(0,document.body.offsetHeight);
        
        
    },time);
    
}


function loopLines(name,style,time){
    name.forEach(function(item,index){
        addLine(item,style,index*time);
    });
}

