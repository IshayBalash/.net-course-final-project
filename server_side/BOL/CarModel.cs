using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BOL
{
   public class CarModel
    {
        public CarTypeModel CarType { get; set; }
        public int CarKilometer { get; set; }
        public string CarImg { get; set; }
        public bool CarStatus { get; set; }
        public string CarlicenseNumber { get; set; }
        public BrancheModel CarLocation { get; set; }

    }
}
