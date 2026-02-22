# Use an official httpd image as a parent image
FROM httpd:alpine

# Copy the current directory contents into the container
COPY . /usr/local/apache2/htdocs

# Make port 80 available to the world outside this container
EXPOSE 80