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
    public class LanguageController : ApiController
    {

        /// <summary>
        /// To get all languages of jobseeker
        /// </summary>
        /// <returns>jobseeker languages list</returns>
        public IEnumerable<Language> GetAll()
        {
            return ServiceFactory.GetJobSeekerLanguage().GetAllLanguagesById(SkillsmartUser.GuidStr(HttpContext.Current.User));
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
        public string Post(Language jobSeekerObj)
        {
            jobSeekerObj.JobSeekerId = SkillsmartUser.GuidStr(HttpContext.Current.User);
            ServiceFactory.GetJobSeekerLanguage().Create(jobSeekerObj);
            return jobSeekerObj.Id.ToString();
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
                jobSeekerObj.JobSeekerId = SkillsmartUser.GuidStr(HttpContext.Current.User);
                jobSeekerObj.Id = new Guid(id);
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

        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}