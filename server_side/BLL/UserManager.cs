using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BOL;
using DAL;

namespace BLL
{
    public static class UserManager
    {
        public static UserModel[] GetAllUsers()
        {
            try
            {
                using (CarRentalDbV2Entities db = new CarRentalDbV2Entities())
                {

                    return db.UsersTables.Select(dbUser => new UserModel
                    {
                        UserID=dbUser.ID,
                        FullName = dbUser.FullName,
                        UserIdNumber= dbUser.UserIdNumber,
                        UserAuthorization= dbUser.UserAuthorization,
                        UserBirthDate=dbUser.UserBirthDate,
                        UserEmail= dbUser.UserEmail,
                        UserName=dbUser.UserName,
                        UserPassword=dbUser.UserPassword,
                        UserSex=dbUser.UserSex,
                        UserImg=dbUser.UserImg
                        
                    }).ToArray();
                }
            }
            catch (Exception x)
            {
                return null;
            }
        }


        public static UserModel GetSpesificUser(string Usernameparam,string passwordparam)
        {
            try
            {
                using (CarRentalDbV2Entities db = new CarRentalDbV2Entities())
                {
                    UsersTable dbUser = db.UsersTables.SingleOrDefault(a => a.UserName == Usernameparam && a.UserPassword==passwordparam);
                    if (dbUser == null)
                    {
                        return null;
                    }
                    return new UserModel
                    {
                        UserID=dbUser.ID,
                        FullName = dbUser.FullName,
                        UserIdNumber = dbUser.UserIdNumber,
                        UserAuthorization = dbUser.UserAuthorization,
                        UserBirthDate = dbUser.UserBirthDate,
                        UserEmail = dbUser.UserEmail,
                        UserName = dbUser.UserName,
                        UserPassword = dbUser.UserPassword,
                        UserSex = dbUser.UserSex,
                        UserImg=dbUser.UserImg
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
        public static bool DeleteUser(string Usernameparam)
        {
            try
            {
                using (CarRentalDbV2Entities db = new CarRentalDbV2Entities())
                {
                    UsersTable dbUser = db.UsersTables.SingleOrDefault(a => a.UserName == Usernameparam);
                    if (dbUser == null)
                    {
                        return false;
                    }
                    db.UsersTables.Remove(dbUser);
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
        public static bool EditUser(string Usernameparam, UserModel userparam)
        {
            try
            {
                using (CarRentalDbV2Entities db = new CarRentalDbV2Entities())
                {
                    UsersTable dbUser = db.UsersTables.SingleOrDefault(a => a.UserName == Usernameparam);
                    if (dbUser == null)
                    {
                        return false;
                    }
                    dbUser.UserAuthorization=userparam.UserAuthorization;
                    dbUser.FullName = userparam.FullName;
                    dbUser.UserIdNumber = userparam.UserIdNumber;
                    dbUser.UserBirthDate = userparam.UserBirthDate;
                    dbUser.UserEmail = userparam.UserEmail;
                    dbUser.UserName = userparam.UserName;
                    dbUser.UserPassword = userparam.UserPassword;
                    dbUser.UserSex = userparam.UserSex;
                    dbUser.UserImg = userparam.UserImg;
                    db.SaveChanges();
                    return true;

                }
            }
            catch
            {
                return false;
            }
        }


         public static bool AddNewUser(UserModel NewUser)
        {
            try
            {
                using (CarRentalDbV2Entities db = new CarRentalDbV2Entities())
                {
                    UsersTable dbUser = new UsersTable
                    {
                        FullName = NewUser.FullName,
                        UserIdNumber = NewUser.UserIdNumber,
                        UserAuthorization = NewUser.UserAuthorization,
                        UserBirthDate = NewUser.UserBirthDate,
                        UserEmail = NewUser.UserEmail,
                        UserName = NewUser.UserName,
                        UserPassword = NewUser.UserPassword,
                        UserSex = NewUser.UserSex,
                        UserImg=NewUser.UserImg
                    };
                    db.UsersTables.Add(dbUser);
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
