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
    public class LanguageController : ApiController
    {

        public IEnumerable<Language> GetAllLanguagesById()
        {
            return ServiceFactory.GetJobSeekerLanguage().GetAllLanguagesById("cdc83674-95f4-460c-95e0-6ae04174f75e");
        }

        public Language Get(string id)
        {
            return ServiceFactory.GetJobSeekerLanguage().GetById(id);
        }

        public void Post(Language jobSeekerObj)
        {
            try
            {
                ServiceFactory.GetJobSeekerLanguage().Create(jobSeekerObj);
            }
            catch (Exception ex){}
        }

        public void Put(string id, Language jobSeekerObj)
        {
            try
            {
                jobSeekerObj.Id = new Guid(id);
                ServiceFactory.GetJobSeekerLanguage().Update(jobSeekerObj);
            }
            catch (Exception exp){}
        }

        public void Delete(string id)
        {
            ILanguageService<Language> jobSeekerService = ServiceFactory.GetJobSeekerLanguage();
            var jobSeeker = jobSeekerService.GetById(id);
            jobSeekerService.Delete(jobSeeker);  
        }
    }
}