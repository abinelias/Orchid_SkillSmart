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
    public class EducationController : ApiController
    {

        public IEnumerable<Education> GetAllEducationById()
        {
            return ServiceFactory.GetJobSeekerEducation().GetAllEducationById("8f500a04-22f0-40fa-b4ce-c24c3813d3d2");
        }

        public Education Get(string id)
        {
            return ServiceFactory.GetJobSeekerEducation().GetById(id);
        }

        public void Post(Education jobSeekerObj)
        {
            try
            {
                ServiceFactory.GetJobSeekerEducation().Create(jobSeekerObj);
            }
            catch (Exception ex){}
        }

        public void Put(string id, Education jobSeekerObj)
        {
            try
            {
                jobSeekerObj.Id = new Guid(id);
                ServiceFactory.GetJobSeekerEducation().Update(jobSeekerObj);
            }
            catch (Exception exp){}
        }

        public void Delete(string id)
        {
            IEducationService<Education> jobSeekerService = ServiceFactory.GetJobSeekerEducation();
            var jobSeeker = jobSeekerService.GetById(id);
            jobSeekerService.Delete(jobSeeker);  
        }
    }
}
