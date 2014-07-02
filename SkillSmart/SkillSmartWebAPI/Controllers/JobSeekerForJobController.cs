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
    public class JobSeekerForJobController : ApiController
    {
        public IEnumerable<JobSeekerAppliedJobs> GetAllJobSeekerForJob(String jobId)
        {
            return ServiceFactory.GetJobSeekersListForJob().GetAllJobSeekerForJob(jobId);
        }

        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}