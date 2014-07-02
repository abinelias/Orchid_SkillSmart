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
    public class JobsListController : ApiController
    {

        /// <summary>
        /// To get all jobseeker work history
        /// </summary>
        /// <returns>List of all work history of jobseeker</returns>
        public IEnumerable<JobsList> GetAllJobs(String companyId)
        {
            return ServiceFactory.GetJobsList().GetAll(companyId);
        }

        /// <summary>
        /// To get details of a particular work history of a jobseeker 
        /// </summary>
        /// <param name="id">workhistoryid</param>
        /// <returns>work history object</returns>
        public JobsList Get(string id)
        {
            return ServiceFactory.GetJobsList().GetById(id);
        }

        /// <summary>
        /// To create a new work history details
        /// </summary>
        /// <param name="jobSeekerWorkHistoryObj">WorkHistory object</param>
        public string Post(JobsList jobSeekerWorkHistoryObj)
        {

            ServiceFactory.GetJobsList().Create(jobSeekerWorkHistoryObj);
            return jobSeekerWorkHistoryObj.Id.ToString();
        }

        /// <summary>
        /// To update work history details of the jobseeker
        /// </summary>
        /// <param name="id">WorkHistoryId</param>
        /// <param name="jobSeekerWorkHistoryObj">WorkHistoryObject</param>
        public void Put(string id, JobsList jobSeekerWorkHistoryObj)
        {
            try
            {
                jobSeekerWorkHistoryObj.Id = new Guid(id);
                ServiceFactory.GetJobsList().Update(jobSeekerWorkHistoryObj);
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