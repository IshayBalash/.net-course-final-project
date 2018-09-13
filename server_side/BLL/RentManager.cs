using BOL;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
  public static  class RentManager
    {
        public static RentModel[] GetAllRents()
        {
            try
            {
                using (CarRentalDbV2Entities db = new CarRentalDbV2Entities())
                {

                    return db.RentTables.Select(dbrent => new RentModel
                    {
                        RentID = dbrent.ID,
                        ReturnDate = dbrent.ReturnDate,
                        StartDate = dbrent.StartDate,
                        EndDate = dbrent.EndDate,
                        CarInfo = new CarModel {
                            CarImg = dbrent.CarsTable.CarImg,
                            CarLocation = new BrancheModel
                            {
                                Adress = dbrent.CarsTable.BranchesTable.Adress,
                                PositionX = dbrent.CarsTable.BranchesTable.PositionX,
                                PositionY = dbrent.CarsTable.BranchesTable.PositionY,
                                BranceName = dbrent.CarsTable.BranchesTable.BranceName
                            },
                            CarKilometer = dbrent.CarsTable.CarKilometer,
                            CarlicenseNumber = dbrent.CarsTable.CarlicenseNumber,
                            CarStatus = dbrent.CarsTable.CarStatus,
                            CarType = new CarTypeModel
                            {
                                CostPerDay = dbrent.CarsTable.CarsTypesTable.CostPerDay,
                                FinePrice = dbrent.CarsTable.CarsTypesTable.FinePrice,
                                IsAutomatic = dbrent.CarsTable.CarsTypesTable.IsAutomatic,
                                Manufacturer = dbrent.CarsTable.CarsTypesTable.Manufacturer,
                                Model = dbrent.CarsTable.CarsTypesTable.Model,
                                Year = dbrent.CarsTable.CarsTypesTable.Year
                            }
                        },
                        UserInfo = new UserModel
                        {
                            UserAuthorization = dbrent.UsersTable.UserAuthorization,
                            FullName = dbrent.UsersTable.FullName,
                            UserBirthDate =dbrent.UsersTable.UserBirthDate,
                            UserEmail = dbrent.UsersTable.UserEmail,
                            UserIdNumber = dbrent.UsersTable.UserIdNumber,
                            UserName = dbrent.UsersTable.UserName,
                            UserPassword = dbrent.UsersTable.UserPassword,
                            UserSex = dbrent.UsersTable.UserSex,
                            UserImg=dbrent.UsersTable.UserImg
                        }
                    }).ToArray();


                }
            }
            catch
            {
                return null;
            }
        }


        public static RentModel GetSpesificRent(int RentId)
        {
            try
            {
                using (CarRentalDbV2Entities db = new CarRentalDbV2Entities())
                {
                    RentTable dbrent = db.RentTables.SingleOrDefault(a => a.ID==RentId);
                    if (dbrent == null)
                    {
                        return null;
                    }
                    return new RentModel
                    {
                        RentID=dbrent.ID,
                        ReturnDate = dbrent.ReturnDate,
                        StartDate = dbrent.StartDate,
                        EndDate = dbrent.EndDate,
                        CarInfo = new CarModel
                        {
                            CarImg = dbrent.CarsTable.CarImg,
                            CarLocation = new BrancheModel
                            {
                                Adress = dbrent.CarsTable.BranchesTable.Adress,
                                PositionX = dbrent.CarsTable.BranchesTable.PositionX,
                                PositionY= dbrent.CarsTable.BranchesTable.PositionY,
                                BranceName = dbrent.CarsTable.BranchesTable.BranceName
                            },
                            CarKilometer = dbrent.CarsTable.CarKilometer,
                            CarlicenseNumber = dbrent.CarsTable.CarlicenseNumber,
                            CarStatus = dbrent.CarsTable.CarStatus,
                            CarType = new CarTypeModel
                            {
                                CostPerDay = dbrent.CarsTable.CarsTypesTable.CostPerDay,
                                FinePrice = dbrent.CarsTable.CarsTypesTable.FinePrice,
                                IsAutomatic = dbrent.CarsTable.CarsTypesTable.IsAutomatic,
                                Manufacturer = dbrent.CarsTable.CarsTypesTable.Manufacturer,
                                Model = dbrent.CarsTable.CarsTypesTable.Model,
                                Year = dbrent.CarsTable.CarsTypesTable.Year
                            }
                        },
                        UserInfo = new UserModel
                        {
                            UserAuthorization = dbrent.UsersTable.UserAuthorization,
                            FullName = dbrent.UsersTable.FullName,
                            UserBirthDate = dbrent.UsersTable.UserBirthDate,
                            UserEmail = dbrent.UsersTable.UserEmail,
                            UserIdNumber = dbrent.UsersTable.UserIdNumber,
                            UserName = dbrent.UsersTable.UserName,
                            UserPassword = dbrent.UsersTable.UserPassword,
                            UserSex = dbrent.UsersTable.UserSex,
                            UserImg= dbrent.UsersTable.UserImg
                        }

                    };
                }
            }
            catch(Exception x)
            {
                return null;
            }

        }


        public static RentModel[] GetSpesificRent(string StringParam)
        {
            try
            {
                using (CarRentalDbV2Entities db = new CarRentalDbV2Entities())
                {
                    RentTable[] dbrents = null;
                    dbrents = db.RentTables.Where(a => a.CarsTable.CarlicenseNumber == StringParam).ToArray();
                    dbrents=(dbrents.Length > 0)?dbrents:db.RentTables.Where(a => a.UsersTable.UserName == StringParam).ToArray();
                    if (dbrents == null)
                    {
                        return null;
                    }
                    return dbrents.Select(dbrent => new RentModel
                    {
                        RentID = dbrent.ID,
                        ReturnDate = dbrent.ReturnDate,
                        StartDate = dbrent.StartDate,
                        EndDate = dbrent.EndDate,
                        CarInfo = new CarModel
                        {
                            CarImg = dbrent.CarsTable.CarImg,
                            CarLocation = new BrancheModel
                            {
                                Adress = dbrent.CarsTable.BranchesTable.Adress,
                                PositionX = dbrent.CarsTable.BranchesTable.PositionX,
                                PositionY = dbrent.CarsTable.BranchesTable.PositionY,
                                BranceName = dbrent.CarsTable.BranchesTable.BranceName
                            },
                            CarKilometer = dbrent.CarsTable.CarKilometer,
                            CarlicenseNumber = dbrent.CarsTable.CarlicenseNumber,
                            CarStatus = dbrent.CarsTable.CarStatus,
                            CarType = new CarTypeModel
                            {
                                CostPerDay = dbrent.CarsTable.CarsTypesTable.CostPerDay,
                                FinePrice = dbrent.CarsTable.CarsTypesTable.FinePrice,
                                IsAutomatic = dbrent.CarsTable.CarsTypesTable.IsAutomatic,
                                Manufacturer = dbrent.CarsTable.CarsTypesTable.Manufacturer,
                                Model = dbrent.CarsTable.CarsTypesTable.Model,
                                Year = dbrent.CarsTable.CarsTypesTable.Year
                            }
                        },
                        UserInfo = new UserModel
                        {
                            UserAuthorization = dbrent.UsersTable.UserAuthorization,
                            FullName = dbrent.UsersTable.FullName,
                            UserBirthDate = dbrent.UsersTable.UserBirthDate,
                            UserEmail = dbrent.UsersTable.UserEmail,
                            UserIdNumber = dbrent.UsersTable.UserIdNumber,
                            UserName = dbrent.UsersTable.UserName,
                            UserPassword = dbrent.UsersTable.UserPassword,
                            UserSex = dbrent.UsersTable.UserSex,
                            UserImg = dbrent.UsersTable.UserImg
                        }
                    }).ToArray();


                };
                
            }
            catch (Exception x)
            {
                return null;
            }

        }


        public static bool DeleteRent(int RentId)
        {
            try
            {
                using (CarRentalDbV2Entities db = new CarRentalDbV2Entities())
                {
                    RentTable dbrent = db.RentTables.SingleOrDefault(a => a.ID==RentId);
                    if (dbrent == null)
                    {
                        return false;
                    }
                    db.RentTables.Remove(dbrent);
                    db.SaveChanges();
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        public static bool EditRent(int RentId, RentModel rentparam)
        {
            try
            {
                using (CarRentalDbV2Entities db = new CarRentalDbV2Entities())
                {
                    RentTable dbrent = db.RentTables.SingleOrDefault(a=>a.ID==RentId);
                    UsersTable dbuser = db.UsersTables.SingleOrDefault(a => a.UserName == rentparam.UserInfo.UserName);
                    CarsTable dbcar = db.CarsTables.SingleOrDefault(a => a.CarlicenseNumber == rentparam.CarInfo.CarlicenseNumber);
                    if (dbrent == null || dbuser==null || dbcar==null)
                    {
                        return false;
                    }
                    dbrent.CarID = dbcar.ID;
                    dbrent.UserID = dbuser.ID;
                    dbrent.EndDate = rentparam.EndDate;
                    dbrent.ReturnDate = rentparam.ReturnDate;
                    dbrent.StartDate = rentparam.StartDate;
                    db.SaveChanges();
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        
        public static bool AddNewRent(RentModel newrentparam)
        {
            try
            {
                using (CarRentalDbV2Entities db = new CarRentalDbV2Entities())
                {
                    UsersTable dbUser = db.UsersTables.FirstOrDefault(a => a.UserName == newrentparam.UserInfo.UserName);
                    CarsTable dbCar = db.CarsTables.FirstOrDefault(a => a.CarlicenseNumber == newrentparam.CarInfo.CarlicenseNumber);
                    if (dbUser == null || dbCar == null)
                    {
                        return false;
                    }
                    RentTable NewRent = new RentTable
                    {
                        StartDate = newrentparam.StartDate,
                        EndDate = newrentparam.EndDate,
                        ReturnDate = newrentparam.ReturnDate,
                        UserID = dbUser.ID,
                        CarID=dbCar.ID
                    };

                    db.RentTables.Add(NewRent);
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
