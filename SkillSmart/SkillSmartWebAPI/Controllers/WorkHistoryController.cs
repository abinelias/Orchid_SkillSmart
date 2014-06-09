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
    public class WorkHistoryController : ApiController
    {

        /// <summary>
        /// To get all jobseeker work history
        /// </summary>
        /// <returns>List of all work history of jobseeker</returns>
        public IEnumerable<WorkHistory> GetJobSeekerWorkHistoryById()
        {
            return ServiceFactory.GetJobSeekerWorkHistory().GetJobSeekerWorkHistoryById(SkillsmartUser.GuidStr(HttpContext.Current.User));
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
        public string Post(WorkHistory jobSeekerWorkHistoryObj)
        {
            jobSeekerWorkHistoryObj.JobSeekerId = SkillsmartUser.GuidStr(HttpContext.Current.User);
            ServiceFactory.GetJobSeekerWorkHistory().Create(jobSeekerWorkHistoryObj);
            return jobSeekerWorkHistoryObj.Id.ToString();
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
                jobSeekerWorkHistoryObj.JobSeekerId = SkillsmartUser.GuidStr(HttpContext.Current.User);
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

        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}