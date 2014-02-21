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
    public class JobSeekerController : ApiController
    {

        public IEnumerable<JobSeeker> GetAll()
        {
            return ServiceFactory.GetJobSeeker().GetJobSeekerList(100, 0);
        }

        public JobSeeker Get(string id)
        {
            return ServiceFactory.GetJobSeeker().GetById(id);
        }

        public void Post(JobSeeker jobSeekerObj)
        {
            try
            {
                ServiceFactory.GetJobSeeker().Create(jobSeekerObj);
            }
            catch (Exception ex){}
        }

        public void Put(string id, JobSeeker jobSeekerObj)
        {
            try
            {
                jobSeekerObj.Id = new Guid(id);
                ServiceFactory.GetJobSeeker().Update(jobSeekerObj);
            }
            catch (Exception exp){}
        }

        public void Delete(string id)
        {
            IJobSeekerService<JobSeeker> jobSeekerService = ServiceFactory.GetJobSeeker();
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