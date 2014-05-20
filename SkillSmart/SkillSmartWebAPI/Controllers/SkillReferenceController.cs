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
    public class SkillReferenceController : ApiController
    {

        /// <summary>
        /// To get all jobseeker work history
        /// </summary>
        /// <returns>List of all work history of jobseeker</returns>
        public IEnumerable<SkillReference> GetSkillReferenceById(String jobSeekerId)
        {
            return ServiceFactory.GetSkillReference().GetAllReference(jobSeekerId);
        }

        /// <summary>
        /// To get details of a particular work history of a jobseeker 
        /// </summary>
        /// <param name="id">workhistoryid</param>
        /// <returns>work history object</returns>
        public SkillReference Get(string id)
        {
            return ServiceFactory.GetSkillReference().GetById(id);
        }

        /// <summary>
        /// To create a new work history details
        /// </summary>
        /// <param name="jobSeekerWorkHistoryObj">WorkHistory object</param>
        public string Post(SkillReference jobSeekerSkillReferenceObj)
        {

            ServiceFactory.GetSkillReference().Create(jobSeekerSkillReferenceObj);
            return jobSeekerSkillReferenceObj.Id.ToString();
        }

        /// <summary>
        /// To update work history details of the jobseeker
        /// </summary>
        /// <param name="id">WorkHistoryId</param>
        /// <param name="jobSeekerWorkHistoryObj">WorkHistoryObject</param>
        public void Put(string id, SkillReference jobSeekerSkillReferenceObj)
        {
            try
            {
                jobSeekerSkillReferenceObj.Id = new Guid(id);
                ServiceFactory.GetSkillReference().Update(jobSeekerSkillReferenceObj);
            }
            catch (Exception exp){}
        }

        /// <summary>
        /// To delete a particular work history details of the jobseeker
        /// </summary>
        /// <param name="id">WorkHistoryId</param>
        public void Delete(string id)
        {
            ISkillReferenceService<SkillReference> jobSeekerSkillReferenceService = ServiceFactory.GetSkillReference();
            var jobSeekerWorkHistory = jobSeekerSkillReferenceService.GetById(id);
            jobSeekerSkillReferenceService.Delete(jobSeekerWorkHistory);  
        }

        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}