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

        public IEnumerable<WorkHistory> GetAllLanguagesById()
        {
            return ServiceFactory.GetJobSeekerWorkHistory().GetJobSeekerWorkHistory("cdc83674-95f4-460c-95e0-6ae04174f75e");
        }

        public WorkHistory Get(string id)
        {
            return ServiceFactory.GetJobSeekerWorkHistory().GetById(id);
        }

        public void Post(WorkHistory jobSeekerObj)
        {
            try
            {
                ServiceFactory.GetJobSeekerWorkHistory().Create(jobSeekerObj);
            }
            catch (Exception ex){}
        }

        public void Put(string id, WorkHistory jobSeekerObj)
        {
            try
            {
                jobSeekerObj.Id = new Guid(id);
                ServiceFactory.GetJobSeekerWorkHistory().Update(jobSeekerObj);
            }
            catch (Exception exp){}
        }

        public void Delete(string id)
        {
            IWorkHistoryService<WorkHistory> jobSeekerService = ServiceFactory.GetJobSeekerWorkHistory();
            var jobSeeker = jobSeekerService.GetById(id);
            jobSeekerService.Delete(jobSeeker);  
        }
    }
}