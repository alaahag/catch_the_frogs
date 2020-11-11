//constants
const timeout_between_levels = 2000; //in milliseconds
const frogs_color = ['AliceBlue','AntiqueWhite','Aqua','Aquamarine','Azure','Beige','Bisque','Black','BlanchedAlmond','Blue','BlueViolet','Brown','BurlyWood','Chartreuse','Chocolate','Coral','Cornsilk','Crimson','Cyan','DarkBlue','DarkCyan','DarkGoldenRod','DarkGray','DarkGrey','DarkGreen','DarkKhaki','DarkMagenta','DarkOliveGreen','DarkOrange','DarkOrchid','DarkRed','DarkSalmon','DarkSlateBlue','DarkSlateGray','DarkTurquoise','DarkViolet','DeepPink','DeepSkyBlue','DimGray','DimGrey','DodgerBlue','FireBrick','FloralWhite','ForestGreen','Fuchsia','Gainsboro','GhostWhite','Gold','GoldenRod','Green','GreenYellow','HoneyDew','HotPink','IndianRed','Indigo','Ivory','Khaki','Lavender','LavenderBlush','LawnGreen','LemonChiffon','LightBlue','LightCoral','LightCyan','LightGoldenRodYellow','LightGray','LightGreen','LightPink','LightSalmon','LightSkyBlue','LightSteelBlue','LightYellow','Lime','LimeGreen','Linen','Magenta','Maroon','MediumAquaMarine','MediumBlue','MediumOrchid','MediumPurple','MediumSlateBlue','MediumSpringGreen','MediumTurquoise','MediumVioletRed','MidnightBlue','MintCream','MistyRose','Moccasin','NavajoWhite','Navy','OldLace','Olive','Orange','OrangeRed','Orchid','PaleGoldenRod','PaleGreen','PaleTurquoise','PaleVioletRed','PapayaWhip','PeachPuff','Peru','Pink','Plum','PowderBlue','Purple','RebeccaPurple','Red','RosyBrown','RoyalBlue','SaddleBrown','Salmon','SandyBrown','SeaShell','Sienna','Silver','SkyBlue','SlateBlue','SlateGray','Snow','SpringGreen','Tan','Teal','Thistle','Tomato','Turquoise','Violet','Wheat','White','WhiteSmoke','Yellow','YellowGreen'];
const frogs_div_text = 'Frogs : ';
const levels_div_text = 'Level : ';
const catch_the_frogs_text = 'Catch the frogs!';
const timeout_text = 'Time : ';
const star_button_text = 'Start Game';
const default_start_button_warning_color = '#f16612';
const default_start_button_danger_color = 'red';

//one time declarations
let level;
let frogs_counter;
let timeout_level;
let start_button;
let level_element;
let frogs_element;
let instructions_element;
let level_complete_element;
let game_over_element;
let game_content;
let interval_timeout_handler;
let interval_flash_colors_timeout_handler;
let default_star_button_color;

const sounds_arr =
{
    "quak": new Audio('audio/quak.mp3'),
    "click": new Audio('audio/click.mp3'),
    "level_complete": new Audio('audio/level_complete.mp3'),
    "game_over": new Audio('audio/game_over.mp3')
};


//on load
$(function()
{
    start_button = $('#start');
    start_button.text(star_button_text);
    level_element = $("#level");
    frogs_element = $("#frogs");
    instructions_element = $('#instructions');
    level_complete_element = $('#level_complete');
    game_over_element = $('#game_over');
    game_content = $("#game_content");
    level_element.text(levels_div_text + "0");
    frogs_element.text(frogs_div_text + "0");
    default_star_button_color = start_button.css('color');

    //onclick button to start game
    start_button.click(btn_start_game);
});