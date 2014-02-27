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
        public AdditionalInformation Get(string id)
        {
            return ServiceFactory.GetJobSeekerAdditionalInformation().GetById(id);
        }

        public void Post(AdditionalInformation jobSeekerObj)
        {
            try
            {
                ServiceFactory.GetJobSeekerAdditionalInformation().Create(jobSeekerObj);
            }
            catch (Exception ex) { }
        }

        public void Put(string id, AdditionalInformation jobSeekerObj)
        {
            try
            {
                jobSeekerObj.Id = new Guid(id);
                ServiceFactory.GetJobSeekerAdditionalInformation().Update(jobSeekerObj);
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
