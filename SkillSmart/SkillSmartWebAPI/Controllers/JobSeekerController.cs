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
        /// <summary>
        /// To get all jobseekers list
        /// </summary>
        /// <returns>List of jobseekers</returns>
        public IEnumerable<JobSeeker> GetAll()
        {
            return ServiceFactory.GetJobSeeker().GetJobSeekerList(100, 0);
        }

        /// <summary>
        /// To get a jobseeker details using id
        /// </summary>
        /// <param name="id">JobSeekerId</param>
        /// <returns>An object of a JobSeeker</returns>
        public JobSeeker Get(string id)
        {
            return ServiceFactory.GetJobSeeker().GetById(id);
        }

        /// <summary>
        /// To add a jobseeker details
        /// </summary>
        /// <param name="jobSeekerObj">JobSeeekr Object</param>
        public void Post(JobSeeker jobSeekerObj)
        {
            try
            {
                ServiceFactory.GetJobSeeker().Create(jobSeekerObj);
            }
            catch (Exception ex){}
        }

        /// <summary>
        /// To update the jobseeker details
        /// </summary>
        /// <param name="id">jobseekerId</param>
        /// <param name="jobSeekerObj">JobSeeekr Object</param>
        public void Put(string id, JobSeeker jobSeekerObj)
        {
            try
            {
                jobSeekerObj.Id = new Guid(id);
                ServiceFactory.GetJobSeeker().Update(jobSeekerObj);
            }
            catch (Exception exp){}
        }

        /// <summary>
        /// To delete a jobseeker details
        /// </summary>
        /// <param name="id">jobseekerId</param>
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