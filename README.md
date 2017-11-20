# TREK

TREK is a web application that displays deals on travel packages.

This is a [stage 2](https://github.com/Ada-Developers-Academy/pedagogy/blob/master/rule-of-three.md) individual project.

## Learning Goals

- Reading data from an API using AJAX
- Posting data to an API using AJAX
- Building dynamic elements on a page with jQuery

## Description

You will build a web app that will query data from an api, using AJAX, to display a list of trips and view more information on a specific trip. While viewing a specific trip, you can claim your spot by sending data back to the API.

All of this should be done without ever having to reload the page. In other words, TREK will be a single page application and will only need one html page (index.html).

## The API

View the [Travel API's documentation](https://github.com/AdaGold/trip_api).

## Requirements
- **Wave 1** Click button or link to show all trips
- **Wave 2** Can click on a trip, from the list of trips, to see more information about that trip
  - Should be able to see id, name, destination, continent, about, category, weeks and cost
- **Wave 3** While viewing a single trip, you can reserve a spot
  - Use a form to submit your name to reserve a spot on the trip you are viewing
- **For All Waves**
  - Any errors encountered while interacting with the API shall be politely reported to the user
  - You shall use HTML best-practices. You should organize your HTML by grouping content using semantic HTML tags.
  - Site should be attractively styled, using Foundation for a responsive grid layout


## Optional Enhancements

- **For more practice working with data**, filter trips by search queries (like by continent, budget, etc.). You'll need to explore the API to see what functionality exists.
- **To practice a more advanced POST**, allow the user to create a new trip.
- **For more jQuery practice**, use jQuery to sort list of trips by specific attributes, like budget or time remaining.
