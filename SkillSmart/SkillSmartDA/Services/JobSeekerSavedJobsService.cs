using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class JobSeekerSavedJobsService : EntityService<JobSeekerSavedJobs>, IJobSeekerSavedJobsService<SkillSmart.Dto.JobSeekerSavedJobs>
    {
        public JobSeekerSavedJobsService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }


        /// <summary>
        /// Function to get all jobseeker details
        /// </summary>
        /// <returns>List of jobseekers</returns>
        public IEnumerable<SkillSmart.Dto.JobSeekerSavedJobs> GetAllSavedJobsJobSeeker(string jobSeekerId)
        {
            var jobList = this.MongoCollection.FindAllAs<JobSeekerSavedJobs>(); //get all jobseekers

            //Creating jobseeker object jobSeekerCursor
            List<SkillSmart.Dto.JobSeekerSavedJobs> jobSeekerAppliedCursor = new List<SkillSmart.Dto.JobSeekerSavedJobs>();
            foreach (JobSeekerSavedJobs jobSeeker in jobList)
            {

                if (jobSeeker.JobSeekerId == jobSeekerId)
                {
                    SkillSmart.Dto.JobSeekerSavedJobs jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.JobSeekerSavedJobs, SkillSmart.Dto.JobSeekerSavedJobs>(jobSeeker);
                    jobSeekerAppliedCursor.Add(jobSeekerObj);
                }
            }
            return jobSeekerAppliedCursor;
        }

        
        /// <summary>
        /// Function to create a jobseeker
        /// </summary>
        /// <param name="entity">jobseeker object</param>
        public void Create(SkillSmart.Dto.JobSeekerSavedJobs entity)
        {
            SkillSmartMongoDA.Entities.JobSeekerSavedJobs seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.JobSeekerSavedJobs, SkillSmartMongoDA.Entities.JobSeekerSavedJobs>(entity);
            base.Create(seeker);
            entity.Id = seeker.Id;
        }


        public new SkillSmart.Dto.JobSeekerSavedJobs GetById(string id)
        {
            JobSeekerSavedJobs dbObj = base.GetById(id);
            SkillSmart.Dto.JobSeekerSavedJobs seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.JobSeekerSavedJobs, SkillSmart.Dto.JobSeekerSavedJobs>(dbObj);
            return seeker;
        }


        public void Update(SkillSmart.Dto.JobSeekerSavedJobs entity)
        {
                  
        }


        public void Delete(SkillSmart.Dto.JobSeekerSavedJobs entity)
        {
           
        }

    }
}
