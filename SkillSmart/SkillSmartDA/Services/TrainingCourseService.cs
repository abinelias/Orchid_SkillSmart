using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class TrainingCourseService : EntityService<TrainingCourse>, ITrainingCourseService<SkillSmart.Dto.TrainingCourse>
    {
        public TrainingCourseService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }

        /// <summary>
        /// Function to get all training course of the jobseeker
        /// </summary>
        /// <param name="id">JobSeekerId</param>
        /// <returns>TrainingCourseList</returns>
        public IEnumerable<SkillSmart.Dto.TrainingCourse> GetJobSeekerTrainingCourseById(string id)
        {
            var jobSeekerTrainingCourseList = this.MongoCollection.FindAllAs<TrainingCourse>();

            List<SkillSmart.Dto.TrainingCourse> jobSeekerTrainingCourse = new List<SkillSmart.Dto.TrainingCourse>();
            foreach (TrainingCourse jobSeeker in jobSeekerTrainingCourseList)
            {
                if (jobSeeker.JobSeekerId == id)
                {
                    SkillSmart.Dto.TrainingCourse jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.TrainingCourse, SkillSmart.Dto.TrainingCourse>(jobSeeker);
                    jobSeekerTrainingCourse.Add(jobSeekerObj);
                }
            }
            return jobSeekerTrainingCourse;
        }
        
        /// <summary>
        /// Function to create a new training course of jobseeker
        /// </summary>
        /// <param name="entity">TrainingCourseObject</param>
        public void Create(SkillSmart.Dto.TrainingCourse entity)
        {
            TrainingCourse seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.TrainingCourse, SkillSmartMongoDA.Entities.TrainingCourse>(entity);
            base.Create(seeker);
        }

        /// <summary>
        /// Function to get details of a particular jobseeker training course
        /// </summary>
        /// <param name="id">TrainingCourseId</param>
        /// <returns></returns>
        public new SkillSmart.Dto.TrainingCourse GetById(string id)
        {
            TrainingCourse dbObj = base.GetById(id);
            SkillSmart.Dto.TrainingCourse seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.TrainingCourse, SkillSmart.Dto.TrainingCourse>(dbObj);
            return seeker;
        }

        /// <summary>
        /// Function to Update training course
        /// </summary>
        /// <param name="entity">TrainingCourseObject</param>
        public void Update(SkillSmart.Dto.TrainingCourse entity)
        {
            TrainingCourse seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.TrainingCourse, SkillSmartMongoDA.Entities.TrainingCourse>(entity);
            base.Update(seeker);
        }

        /// <summary>
        /// Function to delete training course
        /// </summary>
        /// <param name="entity">TrainingCourseObject</param>
        public void Delete(SkillSmart.Dto.TrainingCourse entity)
        {
            TrainingCourse seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.TrainingCourse, SkillSmartMongoDA.Entities.TrainingCourse>(entity);
            base.Delete(seeker);
        }
    }
}
