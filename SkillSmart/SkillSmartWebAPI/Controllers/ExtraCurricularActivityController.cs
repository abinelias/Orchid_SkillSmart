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
    public class ExtraCurricularActivityController : ApiController
    {

        public IEnumerable<ExtraCurricularActivity> GetAllLanguagesById()
        {
            return ServiceFactory.GetJobSeekerExtraCurricularActivityService().GetAllExtraCurricularActivityById("cdc83674-95f4-460c-95e0-6ae04174f75e");
        }

        public ExtraCurricularActivity Get(string id)
        {
            return ServiceFactory.GetJobSeekerExtraCurricularActivityService().GetById(id);
        }

        public void Post(ExtraCurricularActivity jobSeekerObj)
        {
            try
            {
                ServiceFactory.GetJobSeekerExtraCurricularActivityService().Create(jobSeekerObj);
            }
            catch (Exception ex){}
        }

        public void Put(string id, ExtraCurricularActivity jobSeekerObj)
        {
            try
            {
                jobSeekerObj.Id = new Guid(id);
                ServiceFactory.GetJobSeekerExtraCurricularActivityService().Update(jobSeekerObj);
            }
            catch (Exception exp){}
        }

        public void Delete(string id)
        {
            IExtraCurricularActivityService<ExtraCurricularActivity> jobSeekerService = ServiceFactory.GetJobSeekerExtraCurricularActivityService();
            var jobSeeker = jobSeekerService.GetById(id);
            jobSeekerService.Delete(jobSeeker);  
        }
    }
}