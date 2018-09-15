using BOL;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
   public static class CarTypeManager
    {
        /// <summary>
        /// gets all car types from the DB
        /// </summary>
        /// <returns>an arry of CarType model object</returns>
        public static CarTypeModel[] GetAllCarTypes()
        {
            try
            {
                using (CarRentalDbV2Entities db = new CarRentalDbV2Entities())
                {

                    return db.CarsTypesTables.Select(dbcartype => new CarTypeModel
                    {
                        CostPerDay = dbcartype.CostPerDay,
                        FinePrice = dbcartype.FinePrice,
                        IsAutomatic = dbcartype.IsAutomatic,
                        Manufacturer = dbcartype.Manufacturer,
                        Model = dbcartype.Model,
                        Year = dbcartype.Year
                    }).ToArray();
                }
            }
            catch (Exception x)
            {
                return null;
            }
        }

        /// <summary>
        /// get a spesific car type acording to a model from the client
        /// </summary>
        /// <param name="cartypeModle"></param>
        /// <returns>a singl car type object</returns>
        public static CarTypeModel GetSpesificCartype(string cartypeModle)
        {
            try
            {
                using (CarRentalDbV2Entities db = new CarRentalDbV2Entities())
                {
                    CarsTypesTable dbcartype = db.CarsTypesTables.SingleOrDefault(a => a.Model == cartypeModle);
                    if (dbcartype == null)
                    {
                        return null;
                    }
                    return new CarTypeModel
                    {
                        CostPerDay = dbcartype.CostPerDay,
                        FinePrice = dbcartype.FinePrice,
                        Model = dbcartype.Model,
                        IsAutomatic = dbcartype.IsAutomatic,
                        Manufacturer = dbcartype.Manufacturer,
                        Year = dbcartype.Year
                    };

                }
            }
            catch
            {
                return null;
            }

        }


        /// <summary>
        /// delete a cartype from the db
        /// </summary>
        /// <param name="cartypeModle">the cartype model </param>
        /// <returns>true if the actions secseed false if it didnt</returns>
        public static bool DeleteCartype(string cartypeModle)
        {
            try
            {
                using (CarRentalDbV2Entities db = new CarRentalDbV2Entities())
                {
                    CarsTypesTable dbcartype = db.CarsTypesTables.SingleOrDefault(a => a.Model == cartypeModle);
                    if (dbcartype == null)
                    {
                        return false;
                    }
                    db.CarsTypesTables.Remove(dbcartype);
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
        /// edit a car type info 
        /// </summary>
        /// <param name="cartypeModle">the car type model from the user--string</param>
        /// <param name="cartypeparam">an car type object contain all of the car type info</param>
        /// <returns>true if the actions secseed false if it didnt</returns>
        public static bool EditCarType(string cartypeModle, CarTypeModel cartypeparam)
        {
            try
            {
                using (CarRentalDbV2Entities db = new CarRentalDbV2Entities())
                {
                    CarsTypesTable dbcartype = db.CarsTypesTables.SingleOrDefault(a => a.Model == cartypeModle);
                    if (dbcartype == null)
                    {
                        return false;
                    }
                    dbcartype.Model = cartypeparam.Model;
                    dbcartype.Year = cartypeparam.Year;
                    dbcartype.CostPerDay = cartypeparam.CostPerDay;
                    dbcartype.FinePrice = cartypeparam.FinePrice;
                    dbcartype.Manufacturer = cartypeparam.Manufacturer;
                    dbcartype.IsAutomatic = cartypeparam.IsAutomatic;
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
        /// Add a new car type to the DB
        /// </summary>
        /// <param name="NewCartype">an car type object conatains all the car type data</param>
        /// <returns>true if the actions secseed false if it didnt</returns>
        public static bool AddNewCartype(CarTypeModel NewCartype)
        {
            try
            {
                using (CarRentalDbV2Entities db = new CarRentalDbV2Entities())
                {
                    CarsTypesTable dbCarType = new CarsTypesTable
                    {
                        Model = NewCartype.Model,
                        IsAutomatic = NewCartype.IsAutomatic,
                        CostPerDay = NewCartype.CostPerDay,
                        Year = NewCartype.Year,
                        Manufacturer = NewCartype.Manufacturer,
                        FinePrice = NewCartype.FinePrice,
                    };
                    db.CarsTypesTables.Add(dbCarType);
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
