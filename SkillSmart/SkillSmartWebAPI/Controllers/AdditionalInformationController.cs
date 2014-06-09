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
    public class AdditionalInformationController : ApiController
    {
        /// <summary>
        /// Get a jobseekers additional information by id
        /// </summary>
        /// <param name="id">jobseeker id</param>
        /// <returns>jobseeker additional information object</returns>
        public AdditionalInformation Get() //string id)
        {
            var additionalInfo = ServiceFactory.GetJobSeekerAdditionalInformation().GetById(SkillsmartUser.GuidStr(HttpContext.Current.User));
            return additionalInfo;
        }

        /// <summary>
        /// To insert jobseeker additional information
        /// </summary>
        /// <param name="jobSeekerObj">Additional information object</param>
        public string Post(AdditionalInformation jobSeekerObjAdditionalInfo)
        {
            jobSeekerObjAdditionalInfo.JobSeekerId = SkillsmartUser.GuidStr(HttpContext.Current.User);
            ServiceFactory.GetJobSeekerAdditionalInformation().Create(jobSeekerObjAdditionalInfo);
            return jobSeekerObjAdditionalInfo.Id.ToString();
        }

        /// <summary>
        /// To udate jobseekers additional information
        /// </summary>
        /// <param name="id">Additional Information id</param>
        /// <param name="jobSeekerObj">jobseeker object</param>
        public void Put(string id, AdditionalInformation jobSeekerObjAdditionalInfo)
        {
            try
            {
                jobSeekerObjAdditionalInfo.JobSeekerId = SkillsmartUser.GuidStr(HttpContext.Current.User);
                jobSeekerObjAdditionalInfo.Id = new Guid(id);
                ServiceFactory.GetJobSeekerAdditionalInformation().Update(jobSeekerObjAdditionalInfo);
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
