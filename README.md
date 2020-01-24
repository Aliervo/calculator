From The Odin Project's [curriculum](https://www.theodinproject.com/courses/web-development-101/lessons/calculator)

This project summed up the JavaScript section by requiring creation of a fully functional calculator web page.

At this stage, all project requirements (including optional parts) are included.

Layout was made simple using the CSS grid and grid-template-areas. While not compatible with some older browsers, the speed of creation and ease of future maintenance warranted the choice.

I chose to statically structure the calculator within the HTML for readability of both the HTML and JavaScript.

The most difficult part of this project was the parse function. ~~I decided to deal with only one variable, display, and use the operator buttons to affect this variable before updating it to the screen. This felt to me to be the most "calculator-like" approach, although in practice it may not have been the most elegant of solutions.~~
The calculator now uses a [Reverse Polish Notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation)evaluator to do all calculations and a simple [Shunting Yard algorithm](https://en.wikipedia.org/wiki/Shunting-yard_algorithm) to convert from standard infix/algebraic notation to RPN.

I was worried about the difficulty of adding keyboard support, but it actually only took an EventListener and a few minor changes to my parse function.
With the RPN rework, the keyboard support turned out to be very useful when I found a way to bind the on-screen buttons to it as well, squashing a bug I had missed initially and improving code readability!

While all project requirements are met, in the future I may implement some of the following:
* Parentheses and Order of operations
* Reverse Polish Notation operating mode (especially since it now works in the background)
* Slightly more advanced operations like power and root functions
* Click and Keystroke transitions (ie. slight color change of button when it is clicked or the corresponding key is pressed)
