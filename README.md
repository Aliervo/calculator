From The Odin Project's [curriculum](https://www.theodinproject.com/courses/web-development-101/lessons/calculator)

This project summed up the javascript section by requiring creation of a fully functional webpage calculator.

At this stage, all project requirements (including optional parts) are included.

Layout was made simple using the CSS grid and grid-template-areas. While not compatible with some older browsers, the speed of creation and ease of future maintenance warrented the choice.

I chose to statically structure the calculator within the HTML for readability of both the HTML and javascript.

The most difficult part of this project was the parse function. I decided to deal with only one variable, display, and use the operator buttons to affect this variable before updating it to the screen. This felt to me to be the most "calculator-like" approach, although in practice it may not have been the most elegant of solutions.

I was worried about the difficulty of adding keyboard support, but it actually only took an EventListener and a few minor changes to my parse function.

While all project requirements are met, in the future I may implement some of the following:
* Parentheses and Order of operations
* Slighty more advanced operations like power and root functions
* Click and Keystroke transitions (ie. slight color change of button when it is clicked or the corresponding key is pressed)
