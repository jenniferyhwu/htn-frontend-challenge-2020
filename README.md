The site can be found online at [https://hackathon-global.herokuapp.com/](https://hackathon-global.herokuapp.com/)

To "log in", the username is `user` and the password is `pass`.

Also, note that once you've logged in, you have to log out then log back in to view a different profile!

## The Extra Stuff I Did
- Logout button
- Updating the profile upon performing an action (check_in and attend_workshop do stuff)
- Persisting the currently displayed profile offline/across refreshes

## The Writeup

### Question 1
> Walk us through your development process as you worked on this project. How did you plan out the structure and design of it? Did you encounter any problems? And if so, how did you solve them? Are there any areas of your code that you're particularly proud of or want to point out?

I started by reading through the challenge description and noting down what I’d need to include, what the challenging parts might be, and just generally getting a sense of the “flow” of the app. Next, since I tend to work faster when I have a visual image of what I’m making, I created some mock-ups of what different pages on the site would look like:

![mockup of pages](https://i.imgur.com/W2R8Zdn.png)

And also my diagram of the structure of the site lol:

![site structure diagram](https://i.imgur.com/jwyDH8V.png)

One of the problems that took me a while to figure out was how to display the profile picture. Since I decided to crop it to a square, getting the dimensions right was the most challenging part of this - I needed the width of the image to match its container, and its height to match its width. After trying a variety of CSS rules, I wound up finding the answer on StackOverflow, as always, and learning a bit more about how padding-bottom works.

Another bug I ran into had to do with the React hook I was using to update my profile upon the user performing an action. On my first attempt, the profile component just wouldn’t rerender when the profile state variable changed. After debugging it, I realized that this was a result of JS’s passing by reference - while the values of profile object’s attributes were changing, the hook wasn’t picking it up as a “change” of object, thus not updating state. To fix this, I wound up using another hook to create a sort of “force update” function that would update state and trigger a rerender whenever it was called. 

I’m particularly proud of how I was able to try out styled components while making this! I noticed that Hack the North’s open source repositories seemed to use it a lot, so I wanted to see what it was all about. It was really nice how it kept everything in easy-to-adapt parts, which allowed me to minimize and organize my code better. I look forward to learning it more thoroughly in the future.

### Question 2
> Given additional time, how would you extend your application to become a fully functional product that hundreds of volunteers would use at Hackathon Global Inc.™'s next event?

I would figure out what happened with my service worker! I’m still really confused about why it doesn’t work. I even started from scratch with create-react-app again and changed nothing but the one line to register the service worker that comes with the thing. I’m thinking it might have something to do with me using Heroku to host, and also maybe with not having implemented redirecting HTTP traffic to HTTPS, but I’ve run out of time to look into that so my app is currently not a Progressive Web App :(

Additionally, I would clean up my use of styled components. Because I wanted to keep things simple, I didn’t make use of things like theming or tools like Styled-System, which resulted in the styled components being a little messy. But in a fully functional product, I would definitely want to do things more thoroughly. 

I’m also a bit dissatisfied with how I’m currently resolving the situation of different attendee profiles having different actions that do different things. Currently, I have a map of action names (e.g. “check_in”) to functions that return the appropriately modified version of the profile. It does look really clumsy to me, but I couldn’t really think of a better solution while keeping things simple. In a real product, I think I’d make actual requests for when actions are performed, and in that sort of system, each type of action and the procedure for handling them would be a lot more fleshed out.
