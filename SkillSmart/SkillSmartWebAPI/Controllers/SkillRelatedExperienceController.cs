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
    public class SkillRelatedExperienceController : ApiController
    {

        /// <summary>
        /// To get all jobseeker work history
        /// </summary>
        /// <returns>List of all work history of jobseeker</returns>
        public IEnumerable<RelatedExperience> GetSkillSupportingMaterialById()
        {
            return ServiceFactory.GetSkillRelatedExperience().GetAllRelatedExperience(SkillsmartUser.GuidStr(HttpContext.Current.User));
        }

        /// <summary>
        /// To get details of a particular work history of a jobseeker 
        /// </summary>
        /// <param name="id">workhistoryid</param>
        /// <returns>work history object</returns>
        public RelatedExperience Get(string id)
        {
            return ServiceFactory.GetSkillRelatedExperience().GetById(id);
        }

        /// <summary>
        /// To create a new work history details
        /// </summary>
        /// <param name="jobSeekerWorkHistoryObj">WorkHistory object</param>
        public string Post(RelatedExperience jobSeekerSkillSupportingMaterialObj)
        {
            jobSeekerSkillSupportingMaterialObj.JobSeekerId = SkillsmartUser.GuidStr(HttpContext.Current.User);
            ServiceFactory.GetSkillRelatedExperience().Create(jobSeekerSkillSupportingMaterialObj);
            return jobSeekerSkillSupportingMaterialObj.Id.ToString();
        }

        /// <summary>
        /// To update work history details of the jobseeker
        /// </summary>
        /// <param name="id">WorkHistoryId</param>
        /// <param name="jobSeekerWorkHistoryObj">WorkHistoryObject</param>
        public void Put(string id, RelatedExperience jobSeekerSkillSupportingMaterialObj)
        {
            try
            {

                jobSeekerSkillSupportingMaterialObj.JobSeekerId = SkillsmartUser.GuidStr(HttpContext.Current.User);
                jobSeekerSkillSupportingMaterialObj.Id = new Guid(id);
                ServiceFactory.GetSkillRelatedExperience().Update(jobSeekerSkillSupportingMaterialObj);
            }
            catch (Exception exp){}
        }

        /// <summary>
        /// To delete a particular work history details of the jobseeker
        /// </summary>
        /// <param name="id">WorkHistoryId</param>
        public void Delete(string id)
        {
            IRelatedExperienceService<RelatedExperience> jobSeekerSkillSupportingMaterialService = ServiceFactory.GetSkillRelatedExperience();
            var jobSeekerWorkHistory = jobSeekerSkillSupportingMaterialService.GetById(id);
            jobSeekerSkillSupportingMaterialService.Delete(jobSeekerWorkHistory);  
        }

        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}