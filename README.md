# COVID-19-Simulator
> Project Simulator is a web-based app that shows the spread of COVID-19 using simulations and charts and also updates the user with the latest news and answers to some
of the most common questions about this virus.

## Table of contents
* [Getting Started](#instructions)
* [General info](#general-info)
* [Technologies](#technologies)
* [Features](#features)
* [Content](#content)
* [Team](#team)
* [Inspiration](#inspiration)


## General Info

Project Simulator is a web app that shows how COVID-19 can spread  by creating different simulations which can be controlled by the user 
by setting different parameters. It also shows latest data related to the virus using charts and provides more information to the user by posting latest news 
and answering most FAQ. Its purpose is to give a better understanding of this virus to the user , so they can make better decisions to protect themselves from it.

How it works is by creating simulations based on the paramteres set by the users to see how the virus spread pattern changes as new variables are injected in a scenario. User 
can also checkout the latest news on COVID-19 and can also study charts which display the latest numbers about this virus. User can also find answers to many common questions
related to COVID-19 through this app. 


## Technologies
Technologies that were used for this project:

- Firebase Hosting
- Firebase Firestore Database
- HTML, CSS
- JavaScript
- Bootstrap
- JQuery
- 
-


## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

    - Prerequistes
	  . Windows , Mac or Linux operating system
	  . Github account
	  . Firebase account
	- Install on your local machine
	  . Install visual studio code or any other advanced editor.
	  . Install git and github
	  . Install npm and then install firebase CLI 
	  

	To begin working on the app, follow the following steps 
		
		STEP 1:> you may clone the github repository onto your local machine:
				
				 git clone https://github.com/gauravkochar87/COMP-2800-Team-BBY-21-COVID-19-Simulator.git
		
		STEP 2:> you must create a feature branch of your own from dev branch before starting to contribute:
				
	  			 git checkout -b firstname_lastname_featurename  dev
		
		STEP 3:> Begin coding 
	
	
	  . Add bootstrap CDN
	  . Add jquery CDN
	  . Any third party API
      . Any database
      . Any IDE	 
      . API keys 	
		
		
	--LINKS--
		
		Github repo: https://github.com/gauravkochar87/COMP-2800-Team-BBY-21-COVID-19-Simulator.git
	
		Test cases:  https://drive.google.com/file/d/1Lp3pm8NsAi8FCQgQT2PZ1I-7mxbiDOVP/view?usp=sharing



## Features

List of features:
- Simulation
- News
- charts
- FAQ
- Login and signup implementation
-
-


## Content
Organization and structure of files:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file
├── login.html               # login HTML file, contains logic for user authentication
├── main.html                # After logged in, play the game on this page
├── stats.html               # After logged in, see statistics here
├── leaderboard.html         # After logged in, see the leaderboard here
└── gameinfo.html            # See game rules here         
└── 404.html                 # Page to redirect to when there is an error     
└── README.md

Contains the following subfolders:
├── images                   # Folder for images
    /aboutus-banner.jpg      # Image for aboutus page background
    /background.jpg          # Image for the background of login/signup page
    /bg1.jpeg                # Image for the background of faq page
    /beeath.png              # Image of shortness of breath symptom
    /chills.jpg              # Image of chills symptom
    /cough.png               # Image of cough symptom
    /faq-banner.jpg          # Image of the FAQ page banner
    /fatigue.jpg             # Image of fatigue symptom
    /favicon.png             # Image for the favicon of the app
    /fever.jpg	             # Image of fever symptom
    /gaurav_avatar.png       # Image of Gaurav avatar for about us page
    /hamburger-icon.png      # Image for the hamburger-icon
    /infected.png            # Image for the infected people
    /isolated.png            # Image for the isolated people
	/jeff_avatar.png		 # Image of Jeff avatar for about us page
	/jonny_avatar.png        # Image of Jonny avatar for about us page
    /masked.png              # Image for the masked people
    /unprotected.png         # Image for the unprotected people
	/Winston_avatar.png		 # Image of Winston avatar for about us page
├── audio                    # containes sound effects used in the app
    /easter.mp3              # sound effect for easter egg challenge
├── css                      # Folder for css files
    /aboutus.css             # styling sheet for aboutus page
	/charts.css              # styling sheet for charts page
	/faq.css                 # styling sheet for FAQ page
	/index.css               # styling sheet for index page
	/main.css                # styling sheet for main page
	/news.css                # styling sheet for news page
	/simulation.css          # styling sheet for simulation page
├── scripts                   # Folder for scripts
    /aboutus.js              # JS Functions for aboutus page
    /auth.js                 # JS Functions related to firebase authentication
    /charts.js               # JS Functions for charts page
    /common.js               # JS functions common to all pages
	/firebaseapi.js          # Sets up firebase connection for the app
    /index.js                # JS functions for index page
    /jquery-3.5.0.js         # jquery library 
    /main.js                 # JS functions for main page
	/news.js                 # JS functions for main page
	/pandemic.js             # JS functions for pandemic page
	/simulation.js           # JS functions for simulation page
├── html                     # Folder for styles
    /aboutus.html            # Html content for aboutus page
	/faq.html                # Html content for FAQ page
	/main_page.html          # Html content for main page
	/news.html               # Html content for news page
	/simulation.html         # Html content for simulation page
    
``` 

## Team 

Created by  BCIT Burnaby TEAM 21(TECH MATES)
Members:
- Gaurav Kochar
- Winston Zhao
- Jonnathon Lu
- Jeffrey To 
 
## Inspiration

This app was influenced by the Washington Post Corona Simulator created by Harry Stevens
