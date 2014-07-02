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
    public class JobSkillsController : ApiController
    {

        /// <summary>
        /// To get all jobseeker work history
        /// </summary>
        /// <returns>List of all work history of jobseeker</returns>
        public IEnumerable<JobSkills> GetAllJobsSkills(String jobId)
        {
            return ServiceFactory.GetJobSkills().GetAll(jobId);
        }

        /// <summary>
        /// To get details of a particular work history of a jobseeker 
        /// </summary>
        /// <param name="id">workhistoryid</param>
        /// <returns>work history object</returns>
        public JobSkills Get() //string id)
        {
            return ServiceFactory.GetJobSkills().GetById(SkillsmartUser.GuidStr(HttpContext.Current.User));
        }

        /// <summary>
        /// To create a new work history details
        /// </summary>
        /// <param name="jobSeekerWorkHistoryObj">WorkHistory object</param>
        public void Post(JobSkills jobSkillObj)
        {
            try
            {
                string skillMapId = jobSkillObj.SkillMapId;
                string[] skillMapIdList = skillMapId.Split(',');

                for (int i = 0; i < skillMapIdList.Length; i++)
                {
                    jobSkillObj.JobId = jobSkillObj.JobId;
                    jobSkillObj.SkillScore = jobSkillObj.SkillScore;
                    jobSkillObj.SkillImportance = jobSkillObj.SkillImportance;
                    jobSkillObj.SkillExperience = jobSkillObj.SkillExperience;
                    jobSkillObj.SkillMapId = skillMapIdList[i];
                    ServiceFactory.GetJobSkills().Create(jobSkillObj);
                }
            }
            catch (Exception ex) { }
        }

        public void Put(string id, JobSkills jobSkillObj)
        {
            try
            {
                jobSkillObj.Id = new Guid(id);
                ServiceFactory.GetJobSkills().Update(jobSkillObj);
            }
            catch (Exception exp) { }
        }

        public void Delete(string id)
        {
            IJobSkillsService<JobSkills> JobSkillsService = ServiceFactory.GetJobSkills();
            var JobSkills = JobSkillsService.GetById(id);
            JobSkillsService.Delete(JobSkills);
        }


        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}