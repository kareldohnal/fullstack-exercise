# Self-assessment
I have fought with a little time on my hands. The exercise would deserve at least 10 MD equivalent, I invested around 4 MD equivalent to demonstrate basic concepts.

With today's optics I would make myself a better service if I started of with Frontend-side connected to provided backend to demonstrate proficiency in React frontend development. In attempt to prove knowledge of FE and BE, I have invested a lot of time in BE, not being able  put more in FE.

Part of the challenge here was a large number of new technologies for me. I usually develop with Go-based backend with Mongo as DB. Nest.js was completely new for me. I'm pretty happy with the speed of acquiring basics in Nest.js,

There are parts of the exercise skipped due to lack of time and also obvious flaws that would need to be fixed in production application. Some of them are commented in code and some follow here:
#### Password hash shared in queries
The password hash is shared in queries that include user/author dependency. That is obvious flaw in design. The correct way to handle it would be to forbid it's selection in entity definition `@Column({select: false})` and select it for auth purposes using `.createQueryBuilder()`. I have omitted it due to lack of time and to be able to demonstrate the login function.
#### Comment/votes API design
I didn't to a great job at designing the part of the API that handles comments voting function. I feel that that could be improved.
#### Saving images in db
I've made a choice to save thumbnail images as base64 string directly into a database due to lack of time. I would not to that in real life. For an exercise this simple I would chosen separate table and save images as byte array, in large-scale apps I would probably chosen S3 or something similar.
#### Lack of API documentation and testing
Unfortunately there was no time left to implement API documentation nor unit tests. I am able to prove some unit testing knowledge on other projects.
#### Error handling / user input handling
There is a huge amount of room for proper error handling and proper error-code design.
#### Unclear Figma design, lack of style guide
Being IRL situation I would have plenty of conversation on design with product-owner. And not only visual design, but also functional design. It is not clear if comments are only available for logged in users or to all. If to all, where is the avatar/name coming from, etc.

# Test User
- login: `karel@test.cz`
- password: `karel123`
