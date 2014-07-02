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
    public class JobViewsController : ApiController
    {

        /// <summary>
        /// To get all jobseeker work history
        /// </summary>
        /// <returns>List of all work history of jobseeker</returns>
        public IEnumerable<JobViews> GetAllJobSeekerViewJobs()
        {
            return ServiceFactory.GetJobViews().GetAllJobSeekerViewJobs(SkillsmartUser.GuidStr(HttpContext.Current.User));
        }

        /// <summary>
        /// To get details of a particular work history of a jobseeker 
        /// </summary>
        /// <param name="id">workhistoryid</param>
        /// <returns>work history object</returns>
        public JobViews Get(string id)
        {
            return ServiceFactory.GetJobViews().GetById(id);
        }

        /// <summary>
        /// To create a new work history details
        /// </summary>
        /// <param name="jobSeekerWorkHistoryObj">WorkHistory object</param>
        public string Post(JobViews jobSeekerWorkHistoryObj)
        {
            jobSeekerWorkHistoryObj.JobSeekerId = SkillsmartUser.GuidStr(HttpContext.Current.User);
            ServiceFactory.GetJobViews().Create(jobSeekerWorkHistoryObj);
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