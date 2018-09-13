using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BOL
{
    public class CarTypeModel
    {
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        public bool IsAutomatic { get; set; }
        public int CostPerDay { get; set; }
        public int FinePrice { get; set; }
    }
}
