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
    public class RentsController : ApiController
    {
        // GET: api/Rents
        [BasicAuthFilter]  //פילטר של זיהוי
        [Authorize(Roles = "Manager,Employe")]
        public HttpResponseMessage Get()
        {
            RentModel[] RentsArr = RentManager.GetAllRents();
            if (RentsArr == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<RentModel[]>(RentsArr, new JsonMediaTypeFormatter())
            };
        }
        // GET: api/Rents/5
        [AllowAnonymous]
        public HttpResponseMessage Get(int RentIdParam)
        {
            RentModel SingleRent = RentManager.GetSpesificRent(RentIdParam);
            if (SingleRent == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<RentModel>(SingleRent, new JsonMediaTypeFormatter())
            };
        }

        [BasicAuthFilter]  //פילטר של זיהוי
        [Authorize(Roles = "Client,Manager")]
        public HttpResponseMessage Get(string StringParam)
        {
            RentModel[] RentArr = RentManager.GetSpesificRent(StringParam);
            if (RentArr == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<RentModel[]>(RentArr, new JsonMediaTypeFormatter())
            };
        }


        // POST: api/Rents
        [BasicAuthFilter]  //פילטר של זיהוי
        [Authorize(Roles = "Client")]
        public HttpResponseMessage Post([FromBody]RentModel value)
        {
            bool InsertResult = false;
            if (ModelState.IsValid)
            {
                InsertResult = RentManager.AddNewRent(value);
            }
            HttpStatusCode ResponsCode = InsertResult ? HttpStatusCode.Created : HttpStatusCode.BadRequest;
            return new HttpResponseMessage(ResponsCode) { Content = new ObjectContent<bool>(InsertResult, new JsonMediaTypeFormatter()) };
        }

        // PUT: api/Rents/5
        [BasicAuthFilter]  //פילטר של זיהוי
        [Authorize(Roles = "Employe, Manager")]
        public HttpResponseMessage Put(int RentIdParam, [FromBody]RentModel rentparam)
        {
            bool updateResult = false;
            if (ModelState.IsValid)
            {
                updateResult = RentManager.EditRent(RentIdParam, rentparam);
            }
            HttpStatusCode rsponseCode = (updateResult) ? HttpStatusCode.OK : HttpStatusCode.BadRequest;
            return new HttpResponseMessage(rsponseCode) { Content = new ObjectContent<bool>(updateResult, new JsonMediaTypeFormatter()) };
        }


        // DELETE: api/Rents/5
        [BasicAuthFilter]  //פילטר של זיהוי
        [Authorize(Roles = "Manager")]
        public HttpResponseMessage Delete(int RentIdParam)
        {
            bool Result = RentManager.DeleteRent(RentIdParam);
            HttpStatusCode responsCode = Result ? HttpStatusCode.OK : HttpStatusCode.BadRequest;
            return new HttpResponseMessage(responsCode) { Content = new ObjectContent<bool>(Result, new JsonMediaTypeFormatter()) };
        }
    }
}
