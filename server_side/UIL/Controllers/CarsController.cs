using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL;
using BOL;
using System.Net.Http.Formatting;
using UIL.Filters;

namespace UIL.Controllers
{
    public class CarsController : ApiController
    {
        // GET: api/Cars
        [AllowAnonymous]
        public HttpResponseMessage Get()
        {
            CarModel[] CarsArry = CarManager.GetAllCars();
            if (CarsArry == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<CarModel[]>(CarsArry, new JsonMediaTypeFormatter())
            };
        }

        // GET: api/Cars/5
        public HttpResponseMessage Get(string carLicenceNumber)
        {
            CarModel SingleCar = CarManager.GetSpesificCar(carLicenceNumber);
            if (SingleCar == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<CarModel>(SingleCar, new JsonMediaTypeFormatter())
            };
        }

        // POST: api/Cars
        [BasicAuthFilter]  //פילטר של זיהוי
        [Authorize(Roles = "Manager")]  //פילטר של הרשאו
        public HttpResponseMessage Post([FromBody]CarModel value)
        {
            bool InsertResult = false;
            if (ModelState.IsValid)
            {
                InsertResult = CarManager.AddNewCar(value);
            }
            HttpStatusCode ResponsCode = InsertResult ? HttpStatusCode.Created : HttpStatusCode.BadRequest;
            return new HttpResponseMessage(ResponsCode) { Content = new ObjectContent<bool>(InsertResult, new JsonMediaTypeFormatter()) };
        }

        // PUT: api/Cars/5
        public HttpResponseMessage Put(string licencenumber, [FromBody]CarModel carparam)
        {
            bool updateResult = false;
            if (ModelState.IsValid)
            {
                updateResult = CarManager.EditCar(licencenumber, carparam);
            }
            HttpStatusCode rsponseCode = (updateResult) ? HttpStatusCode.OK : HttpStatusCode.BadRequest;
            return new HttpResponseMessage(rsponseCode) { Content = new ObjectContent<bool>(updateResult, new JsonMediaTypeFormatter()) };
        }

        // DELETE: api/Cars/5
        public HttpResponseMessage Delete(string licencenumber)
        {
            bool Result = CarManager.DeleteCar(licencenumber);
            HttpStatusCode responsCode = Result ? HttpStatusCode.OK : HttpStatusCode.BadRequest;
            return new HttpResponseMessage(responsCode) { Content = new ObjectContent<bool>(Result, new JsonMediaTypeFormatter()) };
        }
    }
}
