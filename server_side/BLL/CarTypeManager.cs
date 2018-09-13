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
        /// <param name="cartypeModle">the cartype model number</param>
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
        /// edit a car info in the db
        /// </summary>
        /// <param name="Carlicenceparam">the car licence number</param>
        /// <param name="carparam">a car modle contains all the car data</param>
        /// <returns>true if the actions sucseed false if it didnt</returns>
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
        /// add a new car to the db
        /// </summary>
        /// <param name="NewCar">the car modle object</param>
        /// <returns> true if the action sucseed false if it didnt</returns>
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
