# PF-Assignment

//Your Project's Name
One or two paragraphs providing an overview of your project. Tell us about your project.

Essentially, this part is your sales pitch.

//

Deep Kranji Flashcards/Quiz

Interesting Kranji as a good icebreaker or simple quote for your instagram posts/stories. I often write and try to find words to get inspiration from, so I search for words with interesting/deep meanings from time to time. But the words had never really stuck to me properly, just a vauge understanding of what the words are. 

So I've made a flash card for us to learn a few words at a time, and to include a short quiz inside as well. And also a mini-game for us to just have some fun with! 

//Provide us insights about your design process, focusing on who this website is for, what it is that they want to achieve and how your project is the best way to help them achieve these things.

In particular, as part of this section we recommend that you provide a list of User Stories, with the following general structure:

As a user type, I want to perform an action, so that I can achieve a goal.
This section is also where you would share links to any wireframes, mockups, diagrams etc. that you created as part of the design process. These files should themselves either be included as a pdf file in the project itself (in an separate directory) Include the Adobe XD wireframe as a folder. You can include the XD share url.

//

I took some inspirations from a few sites that does flashcards and tried to make it as simple and readible as possible. This is also to make sure that the flashcards are conducive enough for people to actually learn from it. The website is just for people who wishes to learn a few interesting words to throw at people and get conversations going instead of the usual, "Hello", "How have you been?", kind of talks. But instead, to spin it in a philosophical way to keep conversations different and unique. 

//Features
In this section, you should go over the different parts of your project, and describe each in a sentence or so.

Existing Features
Feature 1 - allows users X to achieve Y, by having them fill out Z
...
In addition, you may also use this section to discuss plans for additional features to be implemented in the future:

Features Left to Implement
Another feature idea

//

Feature 1 - allows user to flip the flashcards to see the meaning and to hide it with anotehr click 
Feature 2 - included a short quiz to test how much of it did you remember
Feature 3 - mini game for more interesting and different words 

Additional features that could be implemented in the future is adding a feature to introduce short sentences or how you could use these words in a short sentence, or have a matching photo beside the deep meaning kranji to make the overall more aesthetic. 

//Technologies Used
In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.

JQuery
The project uses JQuery to simplify DOM manipulation.

//

The project mainly uses 

1. HTML

To structure the flashcards application interface, including layout sections for Flashcards, Quiz, and Mini-Game modes.

2. CSS

To style the application, create card-flip animations, responsive layouts, UI buttons, hover states, and visual feedback for quiz answers. Also for the fonts and colourings of the layouts. 

3. JavaScript

Javacrip is the core logic of the application. It handles the interactivity portion with fetch, const json, func shuffle, clickable buttons with EventListeners. 

4. Fetch API 

To retrieve example words and definitions from Jisho.org.
The Fetch API enables asynchronous requests without additional libraries.

5. Jisho.org Words API

Provides example Japanese words, readings, and English definitions.
Used in the “Show Examples” feature to help learners understand how each kanji appears in real vocabulary.

6. Google Translate TTS (Text-to-Speech) & audio.  

To generate Japanese audio for kanji readings.
The app requests speech audio dynamically using the translate_tts endpoint so users can hear the words.

7. DOM API (Browser Built-In)

The DOM API is used extensively to:

Select HTML elements

Inject kanji, readings, and definitions

Update scores and progress indicators

Display quiz choices dynamically

Show/hide panels

Animate card-flipping with classes

//Testing
For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant. A particularly useful form for describing your testing process is via scenarios, such as:

Contact form:
Go to the "Contact Us" page
Try to submit the empty form and verify that an error message about the required fields appears
Try to submit the form with an invalid email address and verify that a relevant error message appears
Try to submit the form with all inputs valid and verify that a success message appears.
In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

If this section grows too long, you may want to split it off into a separate file and link to it from here.

//

Testing 
1. Manual Testing of User Stories
Flashcards Mode

Scenario: User flips through kanji cards, marks progress, and views details

Open the site and confirm the default mode is “Flashcards”.

Click Next → Ensure the next kanji appears.

Click Previous → Ensure the previous kanji appears.

Press Right Arrow → Moves to next card.

Press Left Arrow → Moves to previous card.

Press Spacebar → Card flips to reveal meaning and detail.

Click Mark Okay → Counter increases and persists when navigating.

Click Shuffle Cards → Order randomises; index resets to card 1.

Verify that deeper notes (“Deeper notes: …”) display correctly for each card.

Expected Result:
Navigation works smoothly; card-flip animation triggers correctly; “Okay” counter updates; details load without errors.

Jisho.org Example Lookup

Scenario: User requests example usage of the kanji

Click Show Examples.

Ensure “Loading examples…” appears first.

Verify that up to six example entries appear, each with:

Word

Reading

English definition

Disable your internet and retry → Ensure error message appears:
“Could not load examples (network or CORS issue).”

Expected Result:
Examples load correctly from API. Error handling behaves properly.

Quiz Mode

Scenario: User completes a multi-choice kanji meaning quiz

Select a quiz size (3-5) and click Start Quiz.

Check that kanji, reading clue, and 4 shuffled answers appear.

Click an incorrect answer →

Button turns red

Correct answer appears in feedback

Score decreases by 3 (not below 0)

Click correct answer →

Button turns green

“Correct! +10” appears

Score increases by 10

Click Next Question until quiz ends.

Confirm summary screen appears with final score.

Click Retry Quiz → New question set is generated.

Expected Result:
Scoring logic, feedback, and navigation behave correctly; no duplicate questions appear within a quiz run.

Responsive Design Testing
Screen Sizes Tested
Device	Result
iPhone 12 / iPhone SE	Flashcards resize correctly; card remains readable; buttons stack properly.
iPad vertical/horizontal	Layout stays centered; quiz selections spaced well.
1080p laptop	Full layout fits with large margins; animations remain smooth.
Ultrawide desktop	Panels scale without stretching; centered alignment remains intact.

// Credits
Content
The text for section Y was copied from the Wikipedia article Z
Media
The photos used in this site were obtained from ...
Acknowledgements
I received inspiration for this project from X

//
Content : 

Kanji meanings and deeper cultural explanations were written manually with reference to general Japanese learning resources.

Example vocabulary definitions are retrieved dynamically from Jisho.org API.

Japanese readings follow standard onyomi / kunyomi conventions.

Media : 

Japanese audio is generated via Google Translate TTS (streamed from the official translate interface).

All icons used (audio speaker, arrows) are from standard Unicode symbols or CSS shapes.

Acknowledgements : 

Inspired by common Japanese flashcard apps such as WaniKani, Anki, and traditional paper flashcards.

Thanks to Jisho.org for providing a free and open Japanese dictionary API.

UI/UX layout influenced by simple study apps that emphasise clarity and low distraction.