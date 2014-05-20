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
    public class SavedJobSearchController : ApiController
    {

        /// <summary>
        /// To get all jobseeker work history
        /// </summary>
        /// <returns>List of all work history of jobseeker</returns>
        public IEnumerable<SavedJobSearch> GetJobSeekerWorkHistoryById(String jobSeekerId)
        {
            return ServiceFactory.GetSavedJobSearch().GetJobSeekerSavedJobSearchById(jobSeekerId);
        }

        /// <summary>
        /// To get details of a particular work history of a jobseeker 
        /// </summary>
        /// <param name="id">workhistoryid</param>
        /// <returns>work history object</returns>
        public SavedJobSearch Get(string id)
        {
            return ServiceFactory.GetSavedJobSearch().GetById(id);
        }

        /// <summary>
        /// To create a new work history details
        /// </summary>
        /// <param name="jobSeekerWorkHistoryObj">WorkHistory object</param>
        public string Post(SavedJobSearch jobSeekerWorkHistoryObj)
        {

            ServiceFactory.GetSavedJobSearch().Create(jobSeekerWorkHistoryObj);
                return jobSeekerWorkHistoryObj.Id.ToString();
        }

        /// <summary>
        /// To update work history details of the jobseeker
        /// </summary>
        /// <param name="id">WorkHistoryId</param>
        /// <param name="jobSeekerWorkHistoryObj">WorkHistoryObject</param>
        public void Put(string id, SavedJobSearch jobSeekerWorkHistoryObj)
        {
            try
            {
                jobSeekerWorkHistoryObj.Id = new Guid(id);
                ServiceFactory.GetSavedJobSearch().Update(jobSeekerWorkHistoryObj);
            }
            catch (Exception exp){}
        }

        /// <summary>
        /// To delete a particular work history details of the jobseeker
        /// </summary>
        /// <param name="id">WorkHistoryId</param>
        public void Delete(string id)
        {
            ISavedJobSearch<SavedJobSearch> jobSeekerWorkHistoryService = ServiceFactory.GetSavedJobSearch();
            var jobSeekerWorkHistory = jobSeekerWorkHistoryService.GetById(id);
            jobSeekerWorkHistoryService.Delete(jobSeekerWorkHistory);  
        }

        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}