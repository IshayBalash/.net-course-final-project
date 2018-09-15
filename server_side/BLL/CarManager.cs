using BOL;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class CarManager
    {
        /// <summary>
        /// get all The cars in the DB
        /// </summary>
        /// <returns>an arry of car model objects </returns>
        public static CarModel[] GetAllCars()
        {
            try
            {
                using (CarRentalDbV2Entities db = new CarRentalDbV2Entities())
                {

                    return db.CarsTables.Select(dbcar => new CarModel
                    {
                        CarImg = dbcar.CarImg,
                        CarLocation = new BrancheModel
                        {
                            Adress = dbcar.BranchesTable.Adress,
                            PositionX = dbcar.BranchesTable.PositionX,
                            PositionY=dbcar.BranchesTable.PositionY,
                            BranceName = dbcar.BranchesTable.BranceName
                        },
                        CarKilometer = dbcar.CarKilometer,
                        CarlicenseNumber = dbcar.CarlicenseNumber,
                        CarStatus = dbcar.CarStatus,
                        CarType = new CarTypeModel
                        {
                            CostPerDay = dbcar.CarsTypesTable.CostPerDay,
                            FinePrice = dbcar.CarsTypesTable.FinePrice,
                            IsAutomatic = dbcar.CarsTypesTable.IsAutomatic,
                            Manufacturer = dbcar.CarsTypesTable.Manufacturer,
                            Model = dbcar.CarsTypesTable.Model,
                            Year = dbcar.CarsTypesTable.Year
                        }
                    }).ToArray();


                }
            }
            catch
            {
                return null;
            }
        }



        /// <summary>
        /// get a single car model 
        /// </summary>
        /// <param name="Carlicenceparam">the car licence number from the client</param>
        /// <returns>a car model object</returns>
        public static CarModel GetSpesificCar(string Carlicenceparam)
        {
            try
            {
                using (DAL.CarRentalDbV2Entities  db = new CarRentalDbV2Entities())
                {
                    CarsTable dbcar = db.CarsTables.SingleOrDefault(a => a.CarlicenseNumber == Carlicenceparam);
                    if (dbcar == null)
                    {
                        return null;
                    }
                    return new CarModel
                    {
                        CarImg = dbcar.CarImg,
                        CarLocation = new BrancheModel
                        {
                            Adress = dbcar.BranchesTable.Adress,
                            PositionX = dbcar.BranchesTable.PositionX,
                            PositionY=dbcar.BranchesTable.PositionY,
                            BranceName = dbcar.BranchesTable.BranceName
                        },
                        CarKilometer = dbcar.CarKilometer,
                        CarlicenseNumber = dbcar.CarlicenseNumber,
                        CarStatus = dbcar.CarStatus,
                        CarType = new CarTypeModel
                        {
                            CostPerDay = dbcar.CarsTypesTable.CostPerDay,
                            FinePrice = dbcar.CarsTypesTable.FinePrice,
                            IsAutomatic = dbcar.CarsTypesTable.IsAutomatic,
                            Manufacturer = dbcar.CarsTypesTable.Manufacturer,
                            Model = dbcar.CarsTypesTable.Model,
                            Year = dbcar.CarsTypesTable.Year
                        }
                    };

                }
            }
            catch
            {
                return null;
            }

        }



        /// <summary>
        /// delete a car from the db
        /// </summary>
        /// <param name="Carlicenceparam">the car licence number</param>
        /// <returns>true if the actions secseed false if it didnt</returns>
        public static bool DeleteCar(string Carlicenceparam)
        {
            try
            {
                using (CarRentalDbV2Entities db = new CarRentalDbV2Entities())
                {
                    CarsTable dbcar = db.CarsTables.SingleOrDefault(a => a.CarlicenseNumber == Carlicenceparam);
                    if (dbcar == null)
                    {
                        return false;
                    }
                    db.CarsTables.Remove(dbcar);
                    db.SaveChanges();
                    return true;


                }
            }
            catch
            {
                return false;
            }
        }
        
        
        
        /// <summary>
        /// edit a car info in the db
        /// </summary>
        /// <param name="Carlicenceparam">the car licence number</param>
        /// <param name="carparam">a car modle contains all the car data</param>
        /// <returns>true if the actions sucseed false if it didnt</returns>
        public static bool EditCar(string Carlicenceparam, CarModel carparam)
        {
            try
            {
                using (CarRentalDbV2Entities db = new CarRentalDbV2Entities())
                {
                    CarsTable dbcar = db.CarsTables.SingleOrDefault(a => a.CarlicenseNumber == Carlicenceparam);
                    CarsTypesTable dbcarType = db.CarsTypesTables.SingleOrDefault(a => a.Model == carparam.CarType.Model);
                    BranchesTable dbBrance = db.BranchesTables.SingleOrDefault(a => a.BranceName == carparam.CarLocation.BranceName);
                    if (dbcar == null|| dbcarType == null || dbBrance==null)
                    {
                        return false;
                    }
                    dbcar.CarImg = carparam.CarImg;
                    dbcar.CarLocation = dbBrance.ID;
                    dbcar.CarKilometer = carparam.CarKilometer;
                    dbcar.CarlicenseNumber = carparam.CarlicenseNumber;
                    dbcar.CarStatus = carparam.CarStatus;
                    dbcar.CarType = dbcarType.ID;
                    db.SaveChanges();
                    return true;

                }
            }
            catch
            {
                return false;
            }
        }


        /// <summary>
        /// add a new car to the db
        /// </summary>
        /// <param name="NewCar">the car modle object</param>
        /// <returns> true if the action sucseed false if it didnt</returns>
        public static bool AddNewCar(CarModel NewCar)
        {
            try
            {
                using (CarRentalDbV2Entities db = new CarRentalDbV2Entities())
                {
                    BranchesTable dbBrance = db.BranchesTables.FirstOrDefault(a => a.BranceName == NewCar.CarLocation.BranceName);
                    CarsTypesTable dbCarType = db.CarsTypesTables.FirstOrDefault(a => a.Model == NewCar.CarType.Model);
                    if (dbBrance == null || dbCarType == null)
                    {
                        return false;
                    }
                    CarsTable NewdbCar = new CarsTable
                    {
                        CarLocation = dbBrance.ID,
                        CarType = dbCarType.ID,
                        CarKilometer = NewCar.CarKilometer,
                        CarImg = NewCar.CarImg,
                        CarStatus = NewCar.CarStatus,
                        CarlicenseNumber = NewCar.CarlicenseNumber,
                        
                    };

                    db.CarsTables.Add(NewdbCar);
                    db.SaveChanges();
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }




    }
}
