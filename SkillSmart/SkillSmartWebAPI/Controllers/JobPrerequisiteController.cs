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
        public IEnumerable<JobPrerequisite> GetAllJobsPrerequisite()
        {
            return ServiceFactory.GetJobPrerequisite().GetAll();
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
        public string Post(JobPrerequisite jobSkillsyObj)
        {

            ServiceFactory.GetJobPrerequisite().Create(jobSkillsyObj);
            return jobSkillsyObj.Id.ToString();
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

        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}