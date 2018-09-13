using System;
using System.ComponentModel.DataAnnotations;


namespace BOL
{
    public class UserModel
    {
        public int UserID { get; set; }

        [MinLength(3)]
        public string FullName { get; set; }

        [UserIDValaidationClass, MinLength(9)]
        public string UserIdNumber { get; set; }

        [MinLength(2)]
        public string UserName { get; set; }

        [MinLength(4),MaxLength(9)]
        public string UserPassword { get; set; }


        public DateTime? UserBirthDate { get; set; }

        [Required]
        public bool UserSex { get; set; }   //true for male/false for woman.

        [Required]
        public string UserEmail { get; set; }

        [Required]
        public int UserAuthorization { get; set; }

        
        public string UserImg { get; set; }

    }
}
