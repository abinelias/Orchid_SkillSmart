using SkillSmart.Base.Services;
using SkillSmart.Dto;
using SkillSmartData.Factory;
using SkillSmartWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
namespace SkillSmartWebAPI.Controllers
{
    public class JobPermissionController : ApiController
    {

        /// <summary>
        /// To get all jobseeker work history
        /// </summary>
        /// <returns>List of all work history of jobseeker</returns>
        public IEnumerable<JobPermission> GetAllJobSeekerAppledJobs()
        {
            return ServiceFactory.GetJobPermission().GetAllJobsPermission(SkillsmartUser.GuidStr(HttpContext.Current.User));
        }

        /// <summary>
        /// To get details of a particular work history of a jobseeker 
        /// </summary>
        /// <param name="id">workhistoryid</param>
        /// <returns>work history object</returns>
        public JobPermission Get(string id)
        {
            return ServiceFactory.GetJobPermission().GetById(id);
        }

        /// <summary>
        /// To create a new work history details
        /// </summary>
        /// <param name="jobSeekerWorkHistoryObj">WorkHistory object</param>
        public string Post(JobPermission jobSeekerWorkHistoryObj)
        {
            jobSeekerWorkHistoryObj.EmployerId = SkillsmartUser.GuidStr(HttpContext.Current.User);
            ServiceFactory.GetJobPermission().Create(jobSeekerWorkHistoryObj);
            return jobSeekerWorkHistoryObj.Id.ToString();
        }



        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}