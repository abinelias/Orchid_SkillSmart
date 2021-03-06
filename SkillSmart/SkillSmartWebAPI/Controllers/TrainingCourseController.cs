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
    public class TrainingCourseController : ApiController
    {

        /// <summary>
        /// To get all training course details of the jobseeker
        /// </summary>
        /// <returns>list of jobseeker training course</returns>
        public IEnumerable<TrainingCourse> GetJobSeekerTrainingCourseById()
        {
            return ServiceFactory.GetJobSeekerTrainingCourse().GetJobSeekerTrainingCourseById(SkillsmartUser.GuidStr(HttpContext.Current.User));
        }

        /// <summary>
        /// To get details of a particular training course of the jobseekr
        /// </summary>
        /// <param name="id">TrainingCourseId</param>
        /// <returns>details of a particular course</returns>
        public TrainingCourse Get(string id)
        {
            return ServiceFactory.GetJobSeekerTrainingCourse().GetById(id);
        }

        /// <summary>
        /// To create a new training course
        /// </summary>
        /// <param name="jobSeekerTrainingCourseObj">trainingcourseobject</param>
        public string Post(TrainingCourse jobSeekerTrainingCourseObj)
        {
            jobSeekerTrainingCourseObj.JobSeekerId = SkillsmartUser.GuidStr(HttpContext.Current.User);
            ServiceFactory.GetJobSeekerTrainingCourse().Create(jobSeekerTrainingCourseObj);
            return jobSeekerTrainingCourseObj.Id.ToString();
        }

        /// <summary>
        /// To update training course service
        /// </summary>
        /// <param name="id">training course id</param>
        /// <param name="jobSeekerTrainingCourseObj">training course object</param>
        public void Put(string id, TrainingCourse jobSeekerTrainingCourseObj)
        {
            try
            {
                jobSeekerTrainingCourseObj.JobSeekerId = SkillsmartUser.GuidStr(HttpContext.Current.User);
                jobSeekerTrainingCourseObj.Id = new Guid(id);
                jobSeekerTrainingCourseObj.Id = new Guid(id);
                ServiceFactory.GetJobSeekerTrainingCourse().Update(jobSeekerTrainingCourseObj);
            }
            catch (Exception exp){}
        }

        /// <summary>
        /// To delete a particular training course of jobseeker
        /// </summary>
        /// <param name="id">training course id</param>
        public void Delete(string id)
        {
            ITrainingCourseService<TrainingCourse> jobSeekerTrainingCourseService = ServiceFactory.GetJobSeekerTrainingCourse();
            var jobSeekerTrainingCourse = jobSeekerTrainingCourseService.GetById(id);
            jobSeekerTrainingCourseService.Delete(jobSeekerTrainingCourse);  
        }
        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}