# Word Counter

Hi 👋

This is a word counter built with HTML, CSS and JavaScript. It simply counts the number of words you have in your text.


## How to use

Although this is a very simple frontend application, for practice, I created a `Dockerfile` to create an image for this application. It was also pushed to Docker hub via github Actions. 

This process makes setting this application up very simple. The following steps can be used to set up this project on your local machine.

- Clone the repository
- Build the Docker image
  ```
  Docker build -t wordcounter .
  ```
- Run the Dockerfile
  ```
  docker run -p 80:80 wordcounter:latest
  ```
 - On your browser, view `localhost`

**Note:**

You have write the text in the text area form and click on the button to count the text. This project's main feature is built using one of JavaScript's string manipulation technique, the `split()` method.

## Project view

![word counter view](/wordcount.JPG)

## Background

My IT defense required that I write an essay which would be 250 words long. As a fun idea, I decided to make a word counter which would simply help me count the length of the text. 

## Contribution

You can go through the project and it's various files and raise issues where you find bugs, or want to improve.

## Credits

The inspiration of this project is from Rivers state university, computer science dept.



