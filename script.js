// time limit 
let TIME_LIMIT = 60; 

// typable quotes 
let quotes_array = [
    "Woven silk pyjamas exchanged for blue quartz.",
    "The vixen jumped quickly on her frozen sled.",
    "Brawny gods just flocked up to quiz and vex him.",
    "We promptly judged antique ivory buckles for the next prize.",
    "How razorback-jumping frogs can level six piqued gymnasts.",
    "Crazy Fredericka bought many very exquisite opal jewels.",
    "The quick onyx goblin jumps over the lazy dwarf.",
    "The five boxing wizards jump quickly.",
    "Quick zephyrs blow, vexing daft Jim."
]; 

// required elements
let timer_text = document.querySelector(".curr_time"); 
let accuracy_text = document.querySelector(".curr_accuracy"); 
let error_text = document.querySelector(".curr_errors"); 
let cpm_text = document.querySelector(".curr_cpm"); 
let wpm_text = document.querySelector(".curr_wpm"); 
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area"); 
let restart_btn = document.querySelector(".restart_btn"); 
let cpm_group = document.querySelector(".cpm"); 
let wpm_group = document.querySelector(".wpm"); 
let error_group = document.querySelector(".errors"); 
let accuracy_group = document.querySelector(".accuracy"); 

let timeLeft = TIME_LIMIT; 
let timeElapsed = 0; 
let total_errors = 0; 
let errors = 0; 
let accuracy = 0; 
let characterTyped = 0; 
let current_quote = ""; 
let quoteNo = 0; 
let timer = null; 

function updateQuote() {
    quote_text.textContent = null; 
    current_quote = quotes_array[quoteNo]; 
    
    // separate each character and make an element 
    // out of each of them to individually style them 
    current_quote.split('').forEach(char => { 
        const charSpan = document.createElement('span') 
        charSpan.innerText = char 
        quote_text.appendChild(charSpan) 
    }) 
    if (quoteNo < quotes_array.length - 1) // roll over to the first quote 
        quoteNo++; 
    else
        quoteNo = 0; 
} 
function processCurrentText() 
{
    curr_input = input_area.value; // get current input text and split it 
    curr_input_array = curr_input.split(''); 

    characterTyped++; // increment total typed characters
    errors = 0; 
    quoteSpanArray = quote_text.querySelectorAll('span'); 
    quoteSpanArray.forEach((char, index) => { 
        let typedChar = curr_input_array[index] 
        // character not currently typed 
        if (typedChar == null)
        { 
            char.classList.remove('correct_char'); 
            char.classList.remove('incorrect_char'); 
            // correct character 
        }
        else if (typedChar === char.innerText) { 
            char.classList.add('correct_char'); 
            char.classList.remove('incorrect_char'); 
            // incorrect character 
        }
        else { 
            char.classList.add('incorrect_char'); 
            char.classList.remove('correct_char'); 
            errors++; // increment number of errors 
        } 
    }); 
    error_text.textContent = total_errors + errors; // display number of errors 
        
    // update accuracy text 
    let correctCharacters = (characterTyped - (total_errors + errors)); 
    let accuracyVal = ((correctCharacters / characterTyped) * 100); 
    accuracy_text.textContent = Math.round(accuracyVal); 
        
    // if current text is completely typed irrespective of errors 
    if (curr_input.length == current_quote.length) { 
        updateQuote(); 
        total_errors += errors; // update total errors 
        input_area.value = ""; // clear input area 
    } 
} 
function startGame() { 
    resetValues(); 
    updateQuote(); 
            
    // clear old and start a new timer 
    clearInterval(timer); 
    timer = setInterval(updateTimer, 1000); 
} 
function resetValues() { 
    timeLeft = TIME_LIMIT; 
    timeElapsed = 0; 
    errors = 0; 
    total_errors = 0; 
    accuracy = 0; 
    characterTyped = 0; 
    quoteNo = 0; 
    input_area.disabled = false; 
            
    input_area.value = ""; 
    quote_text.textContent = 'Click on the area below to know your speed !!!'; 
    accuracy_text.textContent = 100; 
    timer_text.textContent = timeLeft + 's'; 
    error_text.textContent = 0; 
    restart_btn.style.display = "none"; 
    cpm_group.style.display = "none"; 
    wpm_group.style.display = "none"; 
} 
function updateTimer() { 
    if (timeLeft > 0)
    {
        timeLeft--;
        timeElapsed++;
        timer_text.textContent = timeLeft + "s"; // update timer
    } 
    else
    {
        finishGame(); 
    } 
} 
function finishGame() { 
    clearInterval(timer); // stop the timer 
    input_area.disabled = true; // disable the input area
    quote_text.textContent = "Click on restart to start a new game."; // show finishing text  
    restart_btn.style.display = "block"; // display restart button

    cpm = Math.round(((characterTyped / timeElapsed) * 60)); // calculate cpm
    wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60)); // calculate wpm 
 
    cpm_text.textContent = cpm; // update cpm
    wpm_text.textContent = wpm; // update wpm

    cpm_group.style.display = "block"; // display cpm
    wpm_group.style.display = "block"; // display wpm
}                                        