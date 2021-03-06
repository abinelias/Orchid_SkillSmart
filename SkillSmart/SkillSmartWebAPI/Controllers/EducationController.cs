﻿using SkillSmart.Base.Services;
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
    public class EducationController : ApiController
    {

        /// <summary>
        /// To get all education ddetails of the jobseeker
        /// </summary>
        /// <returns>Jobseeker education list</returns>
        public IEnumerable<Education> GetAll()
        {
            return ServiceFactory.GetJobSeekerEducation().GetAllEducationById(SkillsmartUser.GuidStr(HttpContext.Current.User));
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
        public string Post(Education jobSeekerEducationObj)
        {
            jobSeekerEducationObj.JobSeekerId = SkillsmartUser.GuidStr(HttpContext.Current.User);
            ServiceFactory.GetJobSeekerEducation().Create(jobSeekerEducationObj);
            return jobSeekerEducationObj.Id.ToString();
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
                jobSeekerEducationObj.JobSeekerId = SkillsmartUser.GuidStr(HttpContext.Current.User);
                jobSeekerEducationObj.Id = new Guid(id);
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

        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}
