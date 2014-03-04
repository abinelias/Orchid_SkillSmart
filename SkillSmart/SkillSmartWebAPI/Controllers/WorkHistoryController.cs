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
    public class WorkHistoryController : ApiController
    {

        /// <summary>
        /// To get all jobseeker work history
        /// </summary>
        /// <returns>List of all work history of jobseeker</returns>
        public IEnumerable<WorkHistory> GetJobSeekerWorkHistoryById()
        {
            return ServiceFactory.GetJobSeekerWorkHistory().GetJobSeekerWorkHistoryById("cdc83674-95f4-460c-95e0-6ae04174f75e");
        }

        /// <summary>
        /// To get details of a particular work history of a jobseeker 
        /// </summary>
        /// <param name="id">workhistoryid</param>
        /// <returns>work history object</returns>
        public WorkHistory Get(string id)
        {
            return ServiceFactory.GetJobSeekerWorkHistory().GetById(id);
        }

        /// <summary>
        /// To create a new work history details
        /// </summary>
        /// <param name="jobSeekerWorkHistoryObj">WorkHistory object</param>
        public void Post(WorkHistory jobSeekerWorkHistoryObj)
        {
            try
            {
                ServiceFactory.GetJobSeekerWorkHistory().Create(jobSeekerWorkHistoryObj);
            }
            catch (Exception ex){}
        }

        /// <summary>
        /// To update work history details of the jobseeker
        /// </summary>
        /// <param name="id">WorkHistoryId</param>
        /// <param name="jobSeekerWorkHistoryObj">WorkHistoryObject</param>
        public void Put(string id, WorkHistory jobSeekerWorkHistoryObj)
        {
            try
            {
                jobSeekerWorkHistoryObj.Id = new Guid(id);
                ServiceFactory.GetJobSeekerWorkHistory().Update(jobSeekerWorkHistoryObj);
            }
            catch (Exception exp){}
        }

        /// <summary>
        /// To delete a particular work history details of the jobseeker
        /// </summary>
        /// <param name="id">WorkHistoryId</param>
        public void Delete(string id)
        {
            IWorkHistoryService<WorkHistory> jobSeekerWorkHistoryService = ServiceFactory.GetJobSeekerWorkHistory();
            var jobSeekerWorkHistory = jobSeekerWorkHistoryService.GetById(id);
            jobSeekerWorkHistoryService.Delete(jobSeekerWorkHistory);  
        }
    }
}