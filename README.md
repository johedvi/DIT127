# DIT127
Github repo for project in the course Web Applications


# How to run the project
A brief description on how to generate the necessary files and run the project

**Start by cloning the project and navigate to the root folder**

Navigate into the server folder ```cd server``` and install the required dependencies using  ```npm install```

To run the server - ```npm run dev```


***In a seperate window do the same for the client***

Navigate into the client folder ```cd client``` and install the required dependencies using ```npm install```

To run the client server - ```npm start```


# Generate the documentation for the server
**Starting from the root folder**

Navigate to the server folder ```cd server```

Make sure the required dependencies are installed by running ```npm install```

Run the *builddocs.bat* file to transpile the .ts files and build the documentation.
The documentation will be outputted under server/DOCS

The *builddocs.bat* file runs ```npx tsc``` which transpiles ***.ts*** to ***.js*** and ```jsdocs folder1 folder2...``` which builds the documentation from the ***.js*** files in the specified folders.
