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
        /// <summary>
        /// get all user form the Db
        /// </summary>
        /// <returns>an arry of User model objects</returns>
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


        /// <summary>
        /// get a single user from the Db acording to User name and password
        /// </summary>
        /// <param name="Usernameparam"></param>
        /// <param name="passwordparam"></param>
        /// <returns>A single User model object</returns>
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
        /// delete a user from the DB
        /// </summary>
        /// <param name="Usernameparam">A user name sent from the client</param>
        /// <returns>returns>true if the actions secseed false if it didnt</returns>
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
        /// Edit a user Info
        /// </summary>
        /// <param name="Usernameparam">the User name</param>
        /// <param name="userparam">the User model object</param>
        /// <returns>true if the actions secseed false if it didnt</returns>
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


        /// <summary>
        /// Add a new User to the DB
        /// </summary>
        /// <param name="NewUser">A User model object</param>
        /// <returns>true if the actions secseed false if it didnt</returns>
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
