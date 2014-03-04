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
    public class AdditionalInformationController : ApiController
    {
        /// <summary>
        /// Get a jobseekers additional information by id
        /// </summary>
        /// <param name="id">jobseeker id</param>
        /// <returns>jobseeker additional information object</returns>
        public AdditionalInformation Get(string id)
        {
            return ServiceFactory.GetJobSeekerAdditionalInformation().GetById(id);
        }

        /// <summary>
        /// To insert jobseeker additional information
        /// </summary>
        /// <param name="jobSeekerObj">Additional information object</param>
        public void Post(AdditionalInformation jobSeekerObjAdditionalInfo)
        {
            try
            {
                ServiceFactory.GetJobSeekerAdditionalInformation().Create(jobSeekerObjAdditionalInfo);
            }
            catch (Exception ex) { }
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
