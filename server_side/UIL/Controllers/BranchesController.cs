using BLL;
using BOL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;
using UIL.Filters;

namespace UIL.Controllers
{
    public class BranchesController : ApiController
    {
        // GET: api/BranchesController
        [BasicAuthFilter]  //פילטר של זיהוי
        [Authorize(Roles = "Manager,Employe")]
        public HttpResponseMessage Get()
        {
            BrancheModel[] BranchesArry =BrancheManager.GetAllBranches();
            if (BranchesArry == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<BrancheModel[]>(BranchesArry, new JsonMediaTypeFormatter())
            };
        }

        // GET: api/BranchesController/5
        [BasicAuthFilter]  //פילטר של זיהוי
        [Authorize(Roles = "Manager,Employe")]
        public HttpResponseMessage Get(string BranchName)
        {
            BrancheModel SingleBranch = BrancheManager.GetSpesificBranche(BranchName);
            if (SingleBranch == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<BrancheModel>(SingleBranch, new JsonMediaTypeFormatter())
            };
        }

        
    }
}
