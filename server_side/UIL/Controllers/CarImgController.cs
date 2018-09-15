using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using UIL.Filters;

namespace UIL.Controllers
{
    public class CarImgController : ApiController
    {
        [HttpPost]
        [BasicAuthFilter]  //פילטר של זיהוי
        [Authorize(Roles = "Manager")]
        public HttpResponseMessage UploadImage(string ImgNameparam)
        {
            string imageName = null;
            var httpRequest = HttpContext.Current.Request;

            //Get Image caption
            string imageCaption = httpRequest.Form["ImageCaption"];

            //Upload Image
            var postedFile = httpRequest.Files["Image"];
            //Create custom filename
            imageName = ImgNameparam;
            var filePath = HttpContext.Current.Server.MapPath("~/CarsImges/" + imageName + ".jpg");
            postedFile.SaveAs(filePath);
            return Request.CreateResponse(HttpStatusCode.Created);
        }
    }
}
