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
    public class SkillMapController : ApiController
    {

        public IEnumerable<SkillMap> GetAllCategoryById()
        {
            return ServiceFactory.GetSkillMap().GetSkillsByCategoryId("cdc83674-95f4-460c-95e0-6ae04174f75e");
        }

        public SkillMap Get(string id)
        {
            return ServiceFactory.GetSkillMap().GetById(id);
        }

        public void Post(SkillMap jobSeekerObj)
        {
            try
            {
                ServiceFactory.GetSkillMap().Create(jobSeekerObj);
            }
            catch (Exception ex){}
        }

        public void Put(string id, SkillMap jobSeekerObj)
        {
            try
            {
                jobSeekerObj.Id = new Guid(id);
                ServiceFactory.GetSkillMap().Update(jobSeekerObj);
            }
            catch (Exception exp){}
        }

        public void Delete(string id)
        {
            ISkillMapService<SkillMap> jobSeekerService = ServiceFactory.GetSkillMap();
            var jobSeeker = jobSeekerService.GetById(id);
            jobSeekerService.Delete(jobSeeker);  
        }
    }
}