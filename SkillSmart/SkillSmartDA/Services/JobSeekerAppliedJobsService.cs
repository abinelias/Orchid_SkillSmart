using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class JobSeekerAppliedJobsService : EntityService<JobSeekerAppliedJobs>, IJobSeekerAppliedJobsService<SkillSmart.Dto.JobSeekerAppliedJobs>
    {
        public JobSeekerAppliedJobsService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }


        /// <summary>
        /// Function to get all jobseeker details
        /// </summary>
        /// <returns>List of jobseekers</returns>
        public IEnumerable<SkillSmart.Dto.JobSeekerAppliedJobs> GetAllJobsJobSeeker(string jobSeekerId)
        {
            var jobList = this.MongoCollection.FindAllAs<JobSeekerAppliedJobs>(); //get all jobseekers

            //Creating jobseeker object jobSeekerCursor
            List<SkillSmart.Dto.JobSeekerAppliedJobs> jobSeekerAppliedCursor = new List<SkillSmart.Dto.JobSeekerAppliedJobs>();
            foreach (JobSeekerAppliedJobs jobSeeker in jobList)
            {

                if (jobSeeker.JobSeekerId == jobSeekerId)
                {
                    SkillSmart.Dto.JobSeekerAppliedJobs jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.JobSeekerAppliedJobs, SkillSmart.Dto.JobSeekerAppliedJobs>(jobSeeker);
                    jobSeekerAppliedCursor.Add(jobSeekerObj);
                }
               
                /*else
                {
                    if (jobSeeker.JobId == id)
                    {
                        SkillSmart.Dto.JobSeekerAppliedJobs jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.JobSeekerAppliedJobs, SkillSmart.Dto.JobSeekerAppliedJobs>(jobSeeker);
                        jobSeekerAppliedCursor.Add(jobSeekerObj);
                    }
                }*/
            }
            return jobSeekerAppliedCursor;
        }

        
        /// <summary>
        /// Function to create a jobseeker
        /// </summary>
        /// <param name="entity">jobseeker object</param>
        public void Create(SkillSmart.Dto.JobSeekerAppliedJobs entity)
        {
            SkillSmartMongoDA.Entities.JobSeekerAppliedJobs seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.JobSeekerAppliedJobs, SkillSmartMongoDA.Entities.JobSeekerAppliedJobs>(entity);
            base.Create(seeker);
            entity.Id = seeker.Id;
        }


        public new SkillSmart.Dto.JobSeekerAppliedJobs GetById(string id)
        {
            JobSeekerAppliedJobs dbObj = base.GetById(id);
            SkillSmart.Dto.JobSeekerAppliedJobs seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.JobSeekerAppliedJobs, SkillSmart.Dto.JobSeekerAppliedJobs>(dbObj);
            return seeker;
        }


        public void Update(SkillSmart.Dto.JobSeekerAppliedJobs entity)
        {
                  
        }


        public void Delete(SkillSmart.Dto.JobSeekerAppliedJobs entity)
        {
           
        }

    }
}
