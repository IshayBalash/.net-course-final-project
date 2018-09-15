
# .net Final Project-Car rental server & client side



* The task of the project is to create a functinal car rental website contain both server and client side.
* The  DB used in this project is a mysql DB.client
* The server side was written in c# using an WebApi tecnology
* The client side was writen in Angular 5.

***

## UIL
* Contains the Search files functions.

## BOL
* Contains two classes. 
1. The user search class.
2. The file result class 

## BLL
* Contains the conmunication functions between the program and the DAL.
* Activates the functions in the DAL according to a logical sequence of events.

## DAL
* Contains the connections string to the local db.
* Contains all of the CRUD functions (create, read, update, delete).


## Data base
* The db contains 3 tables.
 1. Search tables (search name, search path, search date).
 2. The file results table(file name, file path).
 3. A connections table between the search table and the file table (search id, result id).



