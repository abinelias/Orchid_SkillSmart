using SkillSmart.Base.Services;
using SkillSmart.Dto;
using SkillSmartData.Factory;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SkillSmartWebAPI.Controllers
{
    public class CompanyController : ApiController
    {

        /// <summary>
        /// To get all jobseekers list
        /// </summary>
        /// <returns>List of jobseekers</returns>
        public IEnumerable<Company> GetAll()
        {
            return ServiceFactory.GetCompany().GetAll();
        }

        /// <summary>
        /// Get a company information by id
        /// </summary>
        /// <param name="id">jobseeker id</param>
        /// <returns>company object</returns>
        public Company Get(string id)
        {
            return ServiceFactory.GetCompany().GetById(id);
        }

        /// <summary>
        /// To insert company information
        /// </summary>
        /// <param name="jobSeekerObj">company object</param>
        public string Post(Company companyObject)
        {

            ServiceFactory.GetCompany().Create(companyObject);
            return companyObject.Id.ToString();
        }

        /// <summary>
        /// To udate company information
        /// </summary>
        /// <param name="id">company id</param>
        /// <param name="jobSeekerObj">company object</param>
        public void Put(string id, Company companyObject)
        {
            try
            {
                companyObject.Id = new Guid(id);
                ServiceFactory.GetCompany().Update(companyObject);
            }
            catch (Exception exp) { }
        }


        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}
