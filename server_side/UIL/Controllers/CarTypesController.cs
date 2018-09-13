using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BOL;
using BLL;
using System.Net.Http.Formatting;
using UIL.Filters;

namespace UIL.Controllers
{
    [BasicAuthFilter]
    [Authorize(Roles = "Employe, Manager")]
    public class CarTypesController : ApiController
    {
        // GET: api/CarTypes
        public HttpResponseMessage Get()
        {
            CarTypeModel[] CarTypesArry = CarTypeManager.GetAllCarTypes();
            if (CarTypesArry == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<CarTypeModel[]>(CarTypesArry, new JsonMediaTypeFormatter())
            };
        }

        // GET: api/CarTypes/5
  
        public HttpResponseMessage Get(string cartypemodel)
        {
            CarTypeModel Singletype = CarTypeManager.GetSpesificCartype(cartypemodel);
            if (Singletype == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<CarTypeModel>(Singletype, new JsonMediaTypeFormatter())
            };
        }
        // POST: api/CarTypes

        public HttpResponseMessage Post([FromBody]CarTypeModel value)
        {
            bool InsertResult = false;
            if (ModelState.IsValid)
            {
                InsertResult =CarTypeManager.AddNewCartype(value);
            }
            HttpStatusCode ResponsCode = InsertResult ? HttpStatusCode.Created : HttpStatusCode.BadRequest;
            return new HttpResponseMessage(ResponsCode) { Content = new ObjectContent<bool>(InsertResult, new JsonMediaTypeFormatter()) };
        }
        // PUT: api/CarTypes/5
        public HttpResponseMessage Put(string cartypemodel, [FromBody]CarTypeModel value)
        {
            bool updateResult = false;
            if (ModelState.IsValid)
            {
                updateResult =CarTypeManager.EditCarType(cartypemodel, value);
            }
            HttpStatusCode rsponseCode = (updateResult) ? HttpStatusCode.OK : HttpStatusCode.BadRequest;
            return new HttpResponseMessage(rsponseCode) { Content = new ObjectContent<bool>(updateResult, new JsonMediaTypeFormatter()) };
        }


        // DELETE: api/CarTypes/5
        public HttpResponseMessage Delete(string cartypemodel)
        {
            bool Result = CarTypeManager.DeleteCartype(cartypemodel);
            HttpStatusCode responsCode = Result ? HttpStatusCode.OK : HttpStatusCode.BadRequest;
            return new HttpResponseMessage(responsCode) { Content = new ObjectContent<bool>(Result, new JsonMediaTypeFormatter()) };
        }
    }
}
