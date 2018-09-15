
# .Net Final Project-Car rental server & client side



* The task of the project is to create a functinal car rental website contain both server and client side.
* The  DB used in this project is a mysql microsoft DB
* The server side was written in C# using an WebApi tecnology
* The client side was writen in Angular 5.

***
## Data Base
* The DB contains 5 tables.
 1. Users table-contain all the user inforamtion.
 2. Car Type table-contain all the car type information.
 3. Car table-contain all the car information and and reference to each car type.
 4. Rents table-contain all the rents information and reference to each User and car.
 5. Branches table-contain all the branch inforamtiom. 
 
 
 ![Screenshot](DB_diagram.png)
 


## Server side
* The server is dividd into to 4 project using th N-tier model.

## BOL
* Contains 5 class classes. 
1. User class.
2. Car Type class.
3. car class.
4. Branch class
5. Rent class.

## BLL
* Contains All the C.R.U.D(create, read, update and delete) function.
* for each class in the Bol there is a crud manager in the Bll


## DAL
* The Dal contains the entity framwork to the DB


## UIL
* The UIL is a Wep Api server that allow the client to communicate with the DB.
*  The UIL contains 5 controllers that can be reach by http reqwests from the client side.
* every time that a client is sending a http reqwest the UIL recive the reqwest and activate the right function in the BLL.
* In order to maintain security in the DB each http respons function in each controller has it own Autoraiton that is determin using the
 BasicAuthFilter class in the filter folder. that way only spsfific users can modify the data in the DB.
 






