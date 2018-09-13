using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BOL;
using DAL;

namespace BLL
{


    public static class BrancheManager
    {
        public static BrancheModel [] GetAllBranches()
        {
            try
            {
                using (CarRentalDbV2Entities db = new CarRentalDbV2Entities())
                {

                    return db.BranchesTables.Select(dbBranch => new BrancheModel
                    {
                        BranceName = dbBranch.BranceName,
                        PositionX=dbBranch.PositionX,
                        PositionY=dbBranch.PositionY,
                        Adress=dbBranch.Adress
                    }).ToArray();
                }
            }
            catch (Exception x)
            {
                return null;
            }
        }


        public static BrancheModel GetSpesificBranche(string BranchNameparam)
        {
            try
            {
                using (CarRentalDbV2Entities db = new CarRentalDbV2Entities())
                {
                    BranchesTable dbBranch = db.BranchesTables.SingleOrDefault(a => a.BranceName == BranchNameparam);
                    if (dbBranch == null)
                    {
                        return null;
                    }
                    return new BrancheModel
                    {
                        BranceName = dbBranch.BranceName,
                        PositionX = dbBranch.PositionX,
                        PositionY = dbBranch.PositionY,
                        Adress = dbBranch.Adress
                    };

                }
            }
            catch
            {
                return null;
            }

        }


    }
}
