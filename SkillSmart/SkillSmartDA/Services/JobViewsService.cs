using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class JobViewsService : EntityService<JobViews>, IJobViewsService<SkillSmart.Dto.JobViews>
    {
        public JobViewsService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }


        /// <summary>
        /// Function to get all jobseeker details
        /// </summary>
        /// <returns>List of jobseekers</returns>
        public IEnumerable<SkillSmart.Dto.JobViews> GetAllJobSeekerViewJobs(string jobSeekerId)
        {
            var jobList = this.MongoCollection.FindAllAs<JobViews>(); //get all jobseekers

            //Creating jobseeker object jobSeekerCursor
            List<SkillSmart.Dto.JobViews> jobSeekerAppliedCursor = new List<SkillSmart.Dto.JobViews>();
            foreach (JobViews jobSeeker in jobList)
            {

                if (jobSeeker.JobSeekerId == jobSeekerId)
                {
                    SkillSmart.Dto.JobViews jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.JobViews, SkillSmart.Dto.JobViews>(jobSeeker);
                    jobSeekerAppliedCursor.Add(jobSeekerObj);
                }
            }
            return jobSeekerAppliedCursor;
        }

        
        /// <summary>
        /// Function to create a jobseeker
        /// </summary>
        /// <param name="entity">jobseeker object</param>
        public void Create(SkillSmart.Dto.JobViews entity)
        {
            SkillSmartMongoDA.Entities.JobViews seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.JobViews, SkillSmartMongoDA.Entities.JobViews>(entity);
            base.Create(seeker);
            entity.Id = seeker.Id;
        }


        public new SkillSmart.Dto.JobViews GetById(string id)
        {
            JobViews dbObj = base.GetById(id);
            SkillSmart.Dto.JobViews seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.JobViews, SkillSmart.Dto.JobViews>(dbObj);
            return seeker;
        }


        public void Update(SkillSmart.Dto.JobViews entity)
        {
                  
        }


        public void Delete(SkillSmart.Dto.JobViews entity)
        {
           
        }

    }
}
