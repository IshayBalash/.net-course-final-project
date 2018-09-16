
# .Net Final Project-Car rental server & client side



* The task of the project is to create a functinal car rental application that contains the server and the client side.
* The  DB used in this project is a mysql microsoft DB.
* The server is written in C# with WebAPI tecnology.
* The client side was writen in Angular 5.

***
## Data Base
**The DB contains 5 tables:**
 1. **Users:** contains all the users inforamtion.
 2. **Car Type:** contains all the car types information.
 3. **Cars**: contains all the car information and and references to each car type.
 4. **Rents table:** contains all the rents information and references to each User and car.
 5. **Branches table:** contains all the branches inforamtiom. 
 
 
 ![Screenshot](DB_diagram.png)
 
***

## Server side
* The server is divided into to 4 project according to the N-tier model.

### BOL
**The BOL Contains five classes:** 
1. User class.
2. Car Type class.
3. Car class.
4. Branch class
5. Rent class.

### BLL
* The BLL Contains all the C.R.U.D (create, read, update and delete) functions.
* For each class in the BOL there is a crud manager in the Bll.

### DAL
* The DAL contains the Entity framework to the DB.

### UIL
* The UIL is a Web API server that allows the client to communicate with the DB.
* The UIL contains 5 controllers that can be reached by a http request from the client side.
* When a client sends a http request, the relevant controller recives the request and activates the pertinent function in the BLL.
* In order to maintain security in the DB, each http respond function has it's own permission access. The permission access is determin by the BasicAuthFilter class in the filter folder. Therefore the data is available to those whom have access.
 
***
## Client side
* The clinet side is a Single-Page Application wirrten in Angular 5 using TyprScript language .
* The app allows the user to view and modify data in the DB according to his level of authorization. 
* All the http request functions are located in five services. Each component activates a relavent function.  


***
## Insatalition the app
* In order to activate the app in your own personal pc follw the next few steps:
1. Open a new Query in your mysql server and copy all the data from the sqlscript file located in the reposotory.
2. After the DB is set, take all the project in the server side folders and create your oun local server.
3. Download the projects in the server side folder and start your own local server.
4. Run the server and copy the URL in the server page thar pops up.
5. Download the angular project and click -npn-install to set your angular project.
7.After running the app(server and client), copy the server Url to the following places:
 









