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
    public class ScholarshipController : ApiController
    {

        public IEnumerable<Scholarship> GetAllLanguagesById()
        {
            return ServiceFactory.GetJobSeekerScholarship().GetAllScholarshipById("cdc83674-95f4-460c-95e0-6ae04174f75e");
        }

        public Scholarship Get(string id)
        {
            return ServiceFactory.GetJobSeekerScholarship().GetById(id);
        }

        public void Post(Scholarship jobSeekerObj)
        {
            try
            {
                ServiceFactory.GetJobSeekerScholarship().Create(jobSeekerObj);
            }
            catch (Exception ex){}
        }

        public void Put(string id, Scholarship jobSeekerObj)
        {
            try
            {
                jobSeekerObj.Id = new Guid(id);
                ServiceFactory.GetJobSeekerScholarship().Update(jobSeekerObj);
            }
            catch (Exception exp){}
        }

        public void Delete(string id)
        {
            IScholarshipService<Scholarship> jobSeekerService = ServiceFactory.GetJobSeekerScholarship();
            var jobSeeker = jobSeekerService.GetById(id);
            jobSeekerService.Delete(jobSeeker);  
        }
    }
}