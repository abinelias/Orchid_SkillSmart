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
    public class JobPrerequisiteController : ApiController
    {

        /// <summary>
        /// To get all jobseeker work history
        /// </summary>
        /// <returns>List of all work history of jobseeker</returns>
        public IEnumerable<JobPrerequisite> GetAllJobsPrerequisite(String jobId)
        {
            return ServiceFactory.GetJobPrerequisite().GetAll(jobId);
        }

        /// <summary>
        /// To get details of a particular work history of a jobseeker 
        /// </summary>
        /// <param name="id">workhistoryid</param>
        /// <returns>work history object</returns>
        public JobPrerequisite Get(string id)
        {
            return ServiceFactory.GetJobPrerequisite().GetById(id);
        }

        /// <summary>
        /// To create a new work history details
        /// </summary>
        /// <param name="jobSeekerWorkHistoryObj">WorkHistory object</param>
        public void Post(JobPrerequisite jobPrerequisiteObj)
        {
            try
            {
                string prerequisiteId = jobPrerequisiteObj.PrerequisiteTypeId;
                string[] prerequisiteList = prerequisiteId.Split(',');

                for (int i = 0; i < prerequisiteList.Length; i++)
                {
                    jobPrerequisiteObj.JobId = jobPrerequisiteObj.JobId;
                    jobPrerequisiteObj.Required = jobPrerequisiteObj.Required;
                    jobPrerequisiteObj.PrerequisiteTypeId = prerequisiteList[i];
                    ServiceFactory.GetJobPrerequisite().Create(jobPrerequisiteObj);
                }

            }
            catch (Exception ex) { }
        }

        public void Put(string id, JobPrerequisite jobSkillsyObj)
        {
            try
            {
                jobSkillsyObj.Id = new Guid(id);
                ServiceFactory.GetJobPrerequisite().Update(jobSkillsyObj);
            }
            catch (Exception exp) { }
        }

        /// <summary>
        /// To delete a particular work history details of the jobseeker
        /// </summary>
        /// <param name="id">WorkHistoryId</param>
        public void Delete(string id)
        {
            IJobPrerequisiteService<JobPrerequisite> JobPrerequisiteService = ServiceFactory.GetJobPrerequisite();
            var JobPrerequisite = JobPrerequisiteService.GetById(id);
            JobPrerequisiteService.Delete(JobPrerequisite);
        }

        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}