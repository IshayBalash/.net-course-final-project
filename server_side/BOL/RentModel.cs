using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BOL
{
   public class RentModel
    {
        public int RentID { get; set; }
        public CarModel CarInfo { get; set; }
        public UserModel UserInfo { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime ReturnDate { get; set; }
    }
}
