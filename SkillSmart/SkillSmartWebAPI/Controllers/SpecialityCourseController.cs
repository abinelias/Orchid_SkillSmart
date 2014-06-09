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
    public class SpecialityCourseController : ApiController
    {

        /// <summary>
        /// To get all speciality course of the jobseeker for a particular education
        /// </summary>
        /// <returns>SpecialityCourse list</returns>
        public IEnumerable<SpecialityCourse> GetAllSpecialityCourseById()
        {
            return ServiceFactory.GetJobSeekerSpecialityCourse().GetAllSpecialityCourseById(SkillsmartUser.GuidStr(HttpContext.Current.User));
        }

        /// <summary>
        /// To get a Specaility course details
        /// </summary>
        /// <param name="id">SpecialityCourseId</param>
        /// <returns>SpecialityCourse Object</returns>
        public SpecialityCourse Get(string id)
        {
            return ServiceFactory.GetJobSeekerSpecialityCourse().GetById(id);
        }

        /// <summary>
        /// To create Speciality course details
        /// </summary>
        /// <param name="specialityCourseObj">SpecialityCourse Object</param>
        public string Post(SpecialityCourse specialityCourseObj)
        {
             specialityCourseObj.JobSeekerId = SkillsmartUser.GuidStr(HttpContext.Current.User);
             ServiceFactory.GetJobSeekerSpecialityCourse().Create(specialityCourseObj);
             return specialityCourseObj.Id.ToString();
        }

        /// <summary>
        /// To update speciality course details
        /// </summary>
        /// <param name="id">SpecialityCourseId</param>
        /// <param name="specialityCourseObj">SpecialityCourse Object</param>
        public void Put(string id, SpecialityCourse specialityCourseObj)
        {
            try
            {
                specialityCourseObj.JobSeekerId = SkillsmartUser.GuidStr(HttpContext.Current.User);
                specialityCourseObj.Id = new Guid(id);
                ServiceFactory.GetJobSeekerSpecialityCourse().Update(specialityCourseObj);
            }
            catch (Exception exp){}
        }

        /// <summary>
        /// To delete Speciality course details
        /// </summary>
        /// <param name="id">SpecialityCourseId</param>
        public void Delete(string id)
        {
            ISpecialityCourseService<SpecialityCourse> jobSeekerService = ServiceFactory.GetJobSeekerSpecialityCourse();
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
