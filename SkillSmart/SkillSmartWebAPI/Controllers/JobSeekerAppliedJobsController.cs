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
    public class JobSeekerAppliedJobsController : ApiController
    {

        /// <summary>
        /// To get all jobseeker work history
        /// </summary>
        /// <returns>List of all work history of jobseeker</returns>
        public IEnumerable<JobSeekerAppliedJobs> GetAllJobSeekerAppledJobs(String jobSeekerId)
        {
            return ServiceFactory.GetJobSeekerAppliedJobs().GetAllJobsJobSeeker(jobSeekerId);
        }

        /// <summary>
        /// To get details of a particular work history of a jobseeker 
        /// </summary>
        /// <param name="id">workhistoryid</param>
        /// <returns>work history object</returns>
        public JobSeekerAppliedJobs Get(string id)
        {
            return ServiceFactory.GetJobSeekerAppliedJobs().GetById(id);
        }

        /// <summary>
        /// To create a new work history details
        /// </summary>
        /// <param name="jobSeekerWorkHistoryObj">WorkHistory object</param>
        public string Post(JobSeekerAppliedJobs jobSeekerWorkHistoryObj)
        {

            ServiceFactory.GetJobSeekerAppliedJobs().Create(jobSeekerWorkHistoryObj);
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