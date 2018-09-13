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
    public class UsersController : ApiController
    {
        // GET: api/Users
        [BasicAuthFilter]  //פילטר של זיהוי
        [Authorize(Roles = "Manager,Employe")]
        public HttpResponseMessage Get()
        {
            UserModel[] UserArry = UserManager.GetAllUsers();
            if (UserArry == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<UserModel[]>(UserArry, new JsonMediaTypeFormatter())
            };
        }
        // GET: api/Users/5
        [AllowAnonymous]
        public HttpResponseMessage Get(string Username,string password)
        {
            UserModel SingleUser = UserManager.GetSpesificUser(Username,password);
            if (SingleUser == null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent<UserModel>(SingleUser, new JsonMediaTypeFormatter())
            };
        }
        // POST: api/Users
        [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]UserModel value)
        {
            bool InsertResult = false;
            if (ModelState.IsValid)
            {
                InsertResult = UserManager.AddNewUser(value);
            }
            HttpStatusCode ResponsCode = InsertResult ? HttpStatusCode.Created : HttpStatusCode.BadRequest;
            return new HttpResponseMessage(ResponsCode) { Content = new ObjectContent<bool>(InsertResult, new JsonMediaTypeFormatter()) };
        }
        // PUT: api/Users/5
        [BasicAuthFilter]  //פילטר של זיהוי
        [Authorize(Roles = "Manager")]

        public HttpResponseMessage Put(string Username, [FromBody]UserModel value)
        {
            bool updateResult = false;
            if (ModelState.IsValid)
            {
                updateResult = UserManager.EditUser(Username,value);
            }
            HttpStatusCode rsponseCode = (updateResult) ? HttpStatusCode.OK : HttpStatusCode.BadRequest;
            return new HttpResponseMessage(rsponseCode) { Content = new ObjectContent<bool>(updateResult, new JsonMediaTypeFormatter()) };
        }


        // DELETE: api/Users/5
        [BasicAuthFilter]  //פילטר של זיהוי
        [Authorize(Roles = "Manager")]

        public HttpResponseMessage Delete(string username)
        {
            bool Result = UserManager.DeleteUser(username);
            HttpStatusCode responsCode = Result ? HttpStatusCode.OK : HttpStatusCode.BadRequest;
            return new HttpResponseMessage(responsCode) { Content = new ObjectContent<bool>(Result, new JsonMediaTypeFormatter()) };
        }
    }
}
