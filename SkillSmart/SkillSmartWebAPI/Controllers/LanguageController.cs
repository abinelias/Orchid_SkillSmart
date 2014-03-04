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

        /// <summary>
        /// To get all languages of jobseeker
        /// </summary>
        /// <returns>jobseeker languages list</returns>
        public IEnumerable<Language> GetAllLanguagesById()
        {
            return ServiceFactory.GetJobSeekerLanguage().GetAllLanguagesById("cdc83674-95f4-460c-95e0-6ae04174f75e");
        }

        /// <summary>
        /// To get details of a particular language of jobseeker
        /// </summary>
        /// <param name="id">language id</param>
        /// <returns>language details entered by the jobseeker</returns>
        public Language Get(string id)
        {
            return ServiceFactory.GetJobSeekerLanguage().GetById(id);
        }

        /// <summary>
        /// To enter details about a language known by jobseeker
        /// </summary>
        /// <param name="jobSeekerObj"></param>
        public void Post(Language jobSeekerObj)
        {
            try
            {
                ServiceFactory.GetJobSeekerLanguage().Create(jobSeekerObj);
            }
            catch (Exception ex){}
        }

        /// <summary>
        /// To update the jobseeker details for the language
        /// </summary>
        /// <param name="id">languageId</param>
        /// <param name="jobSeekerObj">jobseeker language object</param>
        public void Put(string id, Language jobSeekerObj)
        {
            try
            {
                jobSeekerObj.Id = new Guid(id);
                ServiceFactory.GetJobSeekerLanguage().Update(jobSeekerObj);
            }
            catch (Exception exp){}
        }

        /// <summary>
        /// To detete details about the language known by jobseeker
        /// </summary>
        /// <param name="id">Language Id of jobseeker</param>
        public void Delete(string id)
        {
            ILanguageService<Language> jobSeekerService = ServiceFactory.GetJobSeekerLanguage();
            var jobSeeker = jobSeekerService.GetById(id);
            jobSeekerService.Delete(jobSeeker);  
        }
    }
}