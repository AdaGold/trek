# TREK

TREK is an application that displays information on travel packages and allows users to reserve spots on a specific trip.

This is a [stage 2](https://github.com/Ada-Developers-Academy/pedagogy/blob/master/rule-of-three.md) individual project.

The project is due **Tuesday May 29th before 9am**. 

## Learning Goals

- Reading data from an API using Axios
- Posting data to an API using Axios
- Building dynamic elements on a page with jQuery

## Description

You will build a web app that will query data from an api, using Axios, to display a list of trips and view more information on a specific trip. While viewing a specific trip, you can claim your spot by sending data back to the API.

All of this should be done without ever having to reload the page. In other words, TREK will be a single page application and will only need one html page (index.html).

## The API

View the [Travel API's documentation](https://github.com/AdaGold/trip_api).

## Requirements
- **Wave 1:** Click button or link to show all trips
- **Wave 2:** Can click on a trip, from the list of trips, to see more information about that trip
  - Should be able to see id, name, continent, about, category, weeks and cost
- **Wave 3:** While viewing a single trip, you can reserve a spot
  - Use a form to submit your name to reserve a spot on the trip you are viewing.
- **For All Waves**
  - Any errors encountered while interacting with the API shall be politely reported to the user.
  - You shall use HTML best-practices. Use semantic HTML tags to group and organize your HTML appropriately.
  - Site should be attractively styled, using Foundation for a responsive grid layout

## Optional Wireframes
You have creative control over the design and layout of this project. Below are optional wireframes you may use. It is not a requirement that you do.

**Base Page**

Given I want to look up trips, when I go to the home page, then I see the following page:

![base page](wireframes/base-page.png)

**See All Trips**

Given I want to see all trips, when I click "See all trips", then I see the trips column on the left shown.

![see all trips](wireframes/see-all-trips.png)

**Click a Trip**

Given I found a specific trip to look at, when I click on a specific trip, then on the right I see the trip details and the form to reserve the trip.

![click a trip](wireframes/click-a-trip.png)


<!-- https://www.draw.io/#G1n5hDq4YfmeGtHQ9U0Cx0aZWyeUqNxq9B -->

## Optional Enhancements

- **For more practice working with data**, filter trips by search queries (like by continent, budget, etc.). You'll need to explore the API to see what functionality exists.
- **To practice a more advanced POST**, allow the user to create a new trip.
- **For more jQuery practice**, use jQuery to sort list of trips by specific attributes, like budget or time remaining.

## What We're Looking For
You can see [here](./feedback.md) for what your instructors will look for in your submission.
