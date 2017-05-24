#  Exercise: Organizing your JavaScript

To prepare for utilizing a new JavaScript library, we want to go though an exercise of organizing your JavaScript code into the logical components. We have implemented more functionality in this Trek app than your requirements to increase the complexity of this application. For this exercise, we are going to look at some JavaScript code and think about the pieces of it within our larger context of an MVC framework.

Note that there is not a specific right or wrong answer with this exercise. Our goal is to _think about_ how we can divide our JavaScript applications into components once our application gets large enough to no longer make sense within a single JavaScript file.

<!-- ## Learning Goals
- Identify related components of JavaScript code
- Define a structure to organize JavaScript code
- Identify when a website becomes complex enough to need more structure -->

### Step One: Data
Examine the data that the website is displaying? What pieces of data need to be tracked? Are there any collections of data?

### Step Two: HTML
Look at the different web pages that the user sees when they navigate around the site. Identify which pieces might lend themselves towards an HTML template. Do any of these HTML pieces that you've identified align with the data you identified in Step #1?

### Step Three: Actions
Next, examine the actions that the user can do on the website. What things can the user do? Are these actions related to a specific piece of data or a collection of data?

### Step Four: Putting it all together
Now based off of each of the previous steps, see if you can start to visualize how you might adjust the structure of the existing code to follow the components and pieces you've defined in the previous steps.
