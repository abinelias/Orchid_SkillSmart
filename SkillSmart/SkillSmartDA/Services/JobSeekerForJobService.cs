using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver.Linq;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class JobSeekerForJobService : EntityService<JobSeekerAppliedJobs>, IJobSeekerForJobService<SkillSmart.Dto.JobSeekerAppliedJobs>
    {
        public JobSeekerForJobService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }


        /// <summary>
        /// Function to get all jobseeker details
        /// </summary>
        /// <returns>List of jobseekers</returns>
        public IEnumerable<SkillSmart.Dto.JobSeekerAppliedJobs> GetAllJobSeekerForJob(string jobId)
        {
            string[] split = jobId.Split(',');
            List<string> jobIdList = new List<string>();
            foreach (string item in split)
            {
                jobIdList.Add(item);
            }
            var jobList = this.MongoCollection.AsQueryable<JobSeekerAppliedJobs>().Where(c => jobIdList.Contains(c.JobId));

            List<SkillSmart.Dto.JobSeekerAppliedJobs> jobSeekerAppliedCursor = new List<SkillSmart.Dto.JobSeekerAppliedJobs>();
            foreach (JobSeekerAppliedJobs jobSeeker in jobList)
            {
                SkillSmart.Dto.JobSeekerAppliedJobs jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.JobSeekerAppliedJobs, SkillSmart.Dto.JobSeekerAppliedJobs>(jobSeeker);
                jobSeekerAppliedCursor.Add(jobSeekerObj);
            }
            return jobSeekerAppliedCursor;
        }

        
        public void Create(SkillSmart.Dto.JobSeekerAppliedJobs entity)
        {
            
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
