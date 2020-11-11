//pick random colors from the array of frog colors
const generate_random_frog_color = function()
{
    let fg = Math.floor(Math.random() * frogs_color.length);
	return frogs_color[fg];
};

//animate text
const animate_text = function(obj_text, text, increase_size)
{
    const temp_size = parseInt(obj_text.css("font-size"));
    obj_text.text(text).animate({'font-size': temp_size + increase_size + 'px'}, 500);
    obj_text.text(text).animate({'font-size': temp_size + 'px'}, 500);
};

const reset_button_font_color = function()
{
    start_button.css('color', default_star_button_color);
};

//calculate random position and make frog size depends on height
const create_random_frog = function()
{
    let x = Math.floor(Math.random() * parseInt(game_content.css('width'))) + 1;
    let y = Math.floor(Math.random() * parseInt(game_content.css('height'))) + 1;
    let frog_size = Math.round(y/8.8);
    let frog_color = generate_random_frog_color();

    //frog size should not be smaller than 15 px
    if (frog_size < 15)
        frog_size = 15;

    x = x-frog_size;
    if (x<1) x=1;
    y = y-frog_size;
    if (y<1) y=1;

    //add frog to the game
    game_content.append(`<div onclick="frog_click(this);" class="frog" style="left: ${x}px; top: ${y}px;"><i class="fas fa-frog fa-flip-horizontal" style="font-size: ${frog_size}px; color: ${frog_color};"></i></div>`);
    frogs_counter++;
    frogs_element.text(frogs_div_text + frogs_counter);
};

//display game over, reset button to default and clear screen of frogs
const display_game_over = function()
{
    sounds_arr.game_over.play();
    clearTimeout(interval_timeout_handler);
    clearTimeout(interval_flash_colors_timeout_handler);
    game_content.find(".frog").remove();
    game_content.addClass("display_center");
    start_button.prop("disabled", false);
    reset_button_font_color();
    start_button.text(star_button_text);
    game_over_element.fadeIn();
};

//display timeout for each level
const display_timeout_level = function()
{
    timeout_level--;

    if (timeout_level < 0)
        display_game_over();
    else
        start_button.text(timeout_text + timeout_level);
};

//start new level
const start_level = function()
{
    game_content.removeClass('display_center');

    //create number of frogs depends on level num
    let i;
    for (i=0; i<level; i++)
        create_random_frog();
};

const fade_out_panel = function()
{
    level_complete_element.fadeOut();
};

//display well done on level complete
const display_level_complete = function()
{
    sounds_arr.level_complete.play();
    clearTimeout(interval_timeout_handler);
    clearTimeout(interval_flash_colors_timeout_handler);
    reset_button_font_color();
    game_content.addClass('display_center');
    level_complete_element.fadeIn();
    setTimeout(fade_out_panel, 1000);
};

//function to increase difficulty for each levels
const increase_difficulty = function(timeout_num)
{
    let easy_start = level < 5;
    let difficulty = 0;
    for (let i=5; i <= 100; i +=5)
        difficulty += Math.floor(level / i);

    return timeout_num + easy_start - difficulty;
};

const display_flashing_timeout = function()
{
    //color the text of  timeout (black for normal, 2-3: warning color, 0-1: red color)
    if (timeout_level > 3)
        reset_button_font_color();
    else
    {
        let get_button_color = start_button.css('color');
        if (get_button_color !== default_star_button_color)
            reset_button_font_color();
        else if (timeout_level < 2)
            //danger color
            start_button.css('color', default_start_button_danger_color);
        else
            //warning color
            start_button.css('color', default_start_button_warning_color);
    }
};

//function to increment level
const increment_level = function()
{
    if (level !== 0)
        display_level_complete();

    level++;
    animate_text(start_button, catch_the_frogs_text, 2);
    animate_text(level_element, levels_div_text + level, 2);

    //set timeout timer for next level
    timeout_level = increase_difficulty(level + 1);
    interval_flash_colors_timeout_handler = setInterval(display_flashing_timeout, 500);
    interval_timeout_handler = setInterval(display_timeout_level, 1000);

    setTimeout(start_level, timeout_between_levels);
};

//remove frog and go to next level if all frogs are gone
const frog_click = function(elem)
{
    sounds_arr.click.play();
    elem.remove();
    frogs_counter--;
    frogs_element.text(frogs_div_text + frogs_counter);

    //if zero frogs then go to next level
    if (frogs_counter === 0)
        increment_level();
};

//function to reset the game and disable instructions and game-over texts
const reset_game = function()
{
    sounds_arr.quak.play();

    //disable the display_center class so we can add frogs to all screen
    game_content.removeClass("display_center");

    //reset levels counter
    level = 0;
    frogs_counter = 0;
    frogs_element.text(frogs_div_text + frogs_counter);
    timeout_level = 2;
    increment_level();

    animate_text(start_button, catch_the_frogs_text, 2);
};

//function to init game (on clicking 'Start Game')
const btn_start_game = function()
{
    //disable clicking on button and change text
    start_button.prop("disabled", true);
    //hide instructions and game-over texts + call function to reset the game
    instructions_element.animate({ opacity: 0, top:0 }, 500, reset_game);
    game_over_element.fadeOut();
};