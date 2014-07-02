using SkillSmart.Base.Services;
using SkillSmart.Dto;
using SkillSmartData.Factory;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;

namespace SkillSmartWebAPI.Controllers
{
    public class EmployerController : ApiController
    {
        /// <summary>
        /// To get all jobseekers list
        /// </summary>
        /// <returns>List of jobseekers</returns>
        public IEnumerable<Employer> GetAll(String companyId)
        {
            return ServiceFactory.GetEmployers().GetAll(companyId);
        }

        /// <summary>
        /// To get a jobseeker details using id
        /// </summary>
        /// <param name="id">JobSeekerId</param>
        /// <returns>An object of a JobSeeker</returns>
        public Employer Get(string id)
        {
            return ServiceFactory.GetEmployers().GetById(id);
        }

        /// <summary>
        /// To add a jobseeker details
        /// </summary>
        /// <param name="jobSeekerObj">JobSeeekr Object</param>
        public string Post(Employer jobSeekerObj)
        {
            try
            {
                ServiceFactory.GetEmployers().Create(jobSeekerObj);
               
            }
            catch (Exception ex) { throw ex; }
            return jobSeekerObj.Id.ToString();
        }

        /// <summary>
        /// To update the jobseeker details
        /// </summary>
        /// <param name="id">jobseekerId</param>
        /// <param name="jobSeekerObj">JobSeeekr Object</param>
        public void Put(string id, Employer jobSeekerObj)
        {
            try
            {
                jobSeekerObj.Id = new Guid(id);
                ServiceFactory.GetEmployers().Update(jobSeekerObj);
            }
            catch (Exception exp){}
        }

        /// <summary>
        /// To delete a jobseeker details
        /// </summary>
        /// <param name="id">jobseekerId</param>
        public void Delete(string id)
        {
            IEmployerService<Employer> jobSeekerService = ServiceFactory.GetEmployers();
            var jobSeeker = jobSeekerService.GetById(id);
            jobSeekerService.Delete(jobSeeker);  
        }

        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}