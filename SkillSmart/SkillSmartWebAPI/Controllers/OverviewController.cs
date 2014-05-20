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
    public class OverviewController : ApiController
    {
        /// <summary>
        /// To get Jobseekers overview by jobseekerid
        /// </summary>
        /// <param name="id">jobseekerId</param>
        /// <returns>jobseeker overview object</returns>
        public Overview Get(string id)
        {
            return ServiceFactory.GetJobSeekerOverview().GetById(id);
        }

        /// <summary>
        /// To create a jobseeker overview
        /// </summary>
        /// <param name="jobSeekerObj">jobseeker overview object</param>
        public string Post(Overview jobSeekerOverviewObj)
        {
             ServiceFactory.GetJobSeekerOverview().Create(jobSeekerOverviewObj);
             return jobSeekerOverviewObj.Id.ToString();
        }

        /// <summary>
        /// To update jobseeker overview
        /// </summary>
        /// <param name="id">overviewId</param>
        /// <param name="jobSeekerOverviewObj">jobseeker overview object</param>
        public void Put(string id, Overview jobSeekerOverviewObj)
        {
            try
            {
                jobSeekerOverviewObj.Id = new Guid(id);
                ServiceFactory.GetJobSeekerOverview().Update(jobSeekerOverviewObj);
            }
            catch (Exception exp){}
        }

        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}