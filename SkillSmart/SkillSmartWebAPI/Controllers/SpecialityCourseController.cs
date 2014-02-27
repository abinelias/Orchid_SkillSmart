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
    public class SpecialityCourseController : ApiController
    {

        public IEnumerable<SpecialityCourse> GetAllEducationById()
        {
            return ServiceFactory.GetJobSeekerSpecialityCourse().GetAllSpecialityCourseById("8f500a04-22f0-40fa-b4ce-c24c3813d3d2");
        }

        public SpecialityCourse Get(string id)
        {
            return ServiceFactory.GetJobSeekerSpecialityCourse().GetById(id);
        }

        public void Post(SpecialityCourse jobSeekerObj)
        {
            try
            {
                ServiceFactory.GetJobSeekerSpecialityCourse().Create(jobSeekerObj);
            }
            catch (Exception ex){}
        }

        public void Put(string id, SpecialityCourse jobSeekerObj)
        {
            try
            {
                jobSeekerObj.Id = new Guid(id);
                ServiceFactory.GetJobSeekerSpecialityCourse().Update(jobSeekerObj);
            }
            catch (Exception exp){}
        }

        public void Delete(string id)
        {
            ISpecialityCourseService<SpecialityCourse> jobSeekerService = ServiceFactory.GetJobSeekerSpecialityCourse();
            var jobSeeker = jobSeekerService.GetById(id);
            jobSeekerService.Delete(jobSeeker);  
        }
    }
}
