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
   [Authorize]
    public class OverviewController : ApiController
    {
        /// <summary>
        /// To get Jobseekers overview by jobseekerid
        /// </summary>
        /// <param name="id">jobseekerId</param>
        /// <returns>jobseeker overview object</returns>
        public Overview Get()
        {
            var ovrvw = ServiceFactory.GetJobSeekerOverview().GetById(SkillsmartUser.GuidStr(HttpContext.Current.User));
            return ovrvw;
        }
      
        /// <summary>
        /// To create a jobseeker overview
        /// </summary>
        /// <param name="jobSeekerObj">jobseeker overview object</param>
        public string Post(Overview jobSeekerOverviewObj)
        {
             jobSeekerOverviewObj.JobSeekerId = SkillsmartUser.GuidStr(HttpContext.Current.User);
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
                jobSeekerOverviewObj.JobSeekerId = SkillsmartUser.GuidStr(HttpContext.Current.User);
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