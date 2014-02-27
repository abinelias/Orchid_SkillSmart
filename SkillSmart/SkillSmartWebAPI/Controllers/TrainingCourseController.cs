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
    public class TrainingCourseController : ApiController
    {

        public IEnumerable<TrainingCourse> GetAllLanguagesById()
        {
            return ServiceFactory.GetJobSeekerTrainingCourse().GetJobSeekerTrainingCourse("cdc83674-95f4-460c-95e0-6ae04174f75e");
        }

        public TrainingCourse Get(string id)
        {
            return ServiceFactory.GetJobSeekerTrainingCourse().GetById(id);
        }

        public void Post(TrainingCourse jobSeekerObj)
        {
            try
            {
                ServiceFactory.GetJobSeekerTrainingCourse().Create(jobSeekerObj);
            }
            catch (Exception ex){}
        }

        public void Put(string id, TrainingCourse jobSeekerObj)
        {
            try
            {
                jobSeekerObj.Id = new Guid(id);
                ServiceFactory.GetJobSeekerTrainingCourse().Update(jobSeekerObj);
            }
            catch (Exception exp){}
        }

        public void Delete(string id)
        {
            ITrainingCourseService<TrainingCourse> jobSeekerService = ServiceFactory.GetJobSeekerTrainingCourse();
            var jobSeeker = jobSeekerService.GetById(id);
            jobSeekerService.Delete(jobSeeker);  
        }
    }
}