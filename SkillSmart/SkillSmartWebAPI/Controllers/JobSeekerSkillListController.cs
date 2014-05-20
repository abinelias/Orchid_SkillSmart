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
    public class JobSeekerSkillListController : ApiController
    {
        /// <summary>
        /// To get all skills of the jobseeker
        /// </summary>
        /// <returns>JobseekerSkillList Object</returns>
        public IEnumerable<JobSeekerSkillList> GetAll(string jobSeekerId)
        {
            return ServiceFactory.GetJobSeekerSkillList().GetAllJobseekerListById(jobSeekerId);
        }

        /// <summary>
        /// To get skills of the job seeker that get acquired from
        /// </summary>
        /// <returns>JobseekerSkillList Object</returns>
        public IEnumerable<JobSeekerSkillList> GetJobSeekerSkillListByAcquiredId(string jobSeekerId, string acquiredId)
        {
            return ServiceFactory.GetJobSeekerSkillList().GetJobSeekerSkillListByAcquiredId(jobSeekerId, acquiredId);
        }

        /// <summary>
        /// To get a skill details of a jobseeker
        /// </summary>
        /// <param name="id">JobSeekerSkillListId</param>
        /// <returns>JobseekerSkillList Object</returns>
        public JobSeekerSkillList Get(string id)
        {
            return ServiceFactory.GetJobSeekerSkillList().GetById(id);
        }

        /// <summary>
        /// To Create a new skill for the jobseeker
        /// </summary>
        /// <param name="jobSeekerSkillObj">JobseekerSkillList Object</param>
        public void Post(JobSeekerSkillList jobSeekerSkillObj)
        {
            try
            {
                string skillMapId = jobSeekerSkillObj.SkillMapId;
                string[] skillMapIdList = skillMapId.Split(',');

                for (int i = 0; i < skillMapIdList.Length; i++)
                {
                    jobSeekerSkillObj.SkillMapId = skillMapIdList[i];
                    ServiceFactory.GetJobSeekerSkillList().Create(jobSeekerSkillObj);
                }
                
            }
            catch (Exception ex){}
        }

        /// <summary>
        /// To update the skill details of the jobseeker
        /// </summary>
        /// <param name="id">JobSeekerSkillListId</param>
        /// <param name="jobSeekerSkillObj">JobseekerSkillList Object</param>
        public void Put(string id, JobSeekerSkillList jobSeekerSkillObj)
        {
            try
            {
                jobSeekerSkillObj.Id = new Guid(id);
                ServiceFactory.GetJobSeekerSkillList().Update(jobSeekerSkillObj);
            }
            catch (Exception exp){}
        }

        /// <summary>
        /// To delete the skill details of the jobseeker
        /// </summary>
        /// <param name="id">JobseekerSkillList Object</param>
       
        public void Delete(string id)
        {
            IJobSeekerSkillListService<JobSeekerSkillList> jobSeekerService = ServiceFactory.GetJobSeekerSkillList();
            var jobSeeker = jobSeekerService.GetById(id);
            jobSeekerService.Delete(jobSeeker);  
        }

        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}