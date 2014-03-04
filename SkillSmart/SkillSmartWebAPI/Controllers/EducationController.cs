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

        /// <summary>
        /// To get all education ddetails of the jobseeker
        /// </summary>
        /// <returns>Jobseeker education list</returns>
        public IEnumerable<Education> GetAllEducationById()
        {
            return ServiceFactory.GetJobSeekerEducation().GetAllEducationById("8f500a04-22f0-40fa-b4ce-c24c3813d3d2");
        }

        /// <summary>
        /// To get details of a particular eucation details of the jobseeker
        /// </summary>
        /// <param name="id">EducationId</param>
        /// <returns>Education Object</returns>
        public Education Get(string id)
        {
            return ServiceFactory.GetJobSeekerEducation().GetById(id);
        }

        /// <summary>
        /// To create a new education detail for the jobseeker
        /// </summary>
        /// <param name="jobSeekerEducationObj">Education details object</param>
        public void Post(Education jobSeekerEducationObj)
        {
            try
            {
                ServiceFactory.GetJobSeekerEducation().Create(jobSeekerEducationObj);
            }
            catch (Exception ex){}
        }

        /// <summary>
        /// To update jobseeker education details
        /// </summary>
        /// <param name="id">EducationId</param>
        /// <param name="jobSeekerEducationObj">EducationObject</param>
        public void Put(string id, Education jobSeekerEducationObj)
        {
            try
            {
                jobSeekerEducationObj.Id = new Guid(id);
                ServiceFactory.GetJobSeekerEducation().Update(jobSeekerEducationObj);
            }
            catch (Exception exp){}
        }

        /// <summary>
        /// To delete a particular jobseeker object
        /// </summary>
        /// <param name="id">EducationId</param>
        public void Delete(string id)
        {
            IEducationService<Education> jobSeekerEducationService = ServiceFactory.GetJobSeekerEducation();
            var jobSeekerEducationObj = jobSeekerEducationService.GetById(id);
            jobSeekerEducationService.Delete(jobSeekerEducationObj);  
        }
    }
}
