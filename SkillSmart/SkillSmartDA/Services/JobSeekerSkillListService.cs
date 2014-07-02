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
    public class JobSeekerSkillListService : EntityService<JobSeekerSkillList>, IJobSeekerSkillListService<SkillSmart.Dto.JobSeekerSkillList>
    {
        public JobSeekerSkillListService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }

        /// <summary>
        /// Function to Get all skills of a jobseeker
        /// </summary>
        /// <param name="id">JobSeekerId</param>
        /// <returns>JobseekerSkill Object</returns>
        public IEnumerable<SkillSmart.Dto.JobSeekerSkillList> GetAllJobseekerListById(string id)
        {
            List<SkillSmart.Dto.JobSeekerSkillList> jobSeekerWorkHostory = new List<SkillSmart.Dto.JobSeekerSkillList>();

            var jobSeekerWorkSkillListList = this.MongoCollection.AsQueryable<JobSeekerSkillList>().Where(e => e.JobSeekerId == id);
            foreach (JobSeekerSkillList jobSeeker in jobSeekerWorkSkillListList)
            {
                if (jobSeeker.JobSeekerId == id)
                {
                    SkillSmart.Dto.JobSeekerSkillList jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.JobSeekerSkillList, SkillSmart.Dto.JobSeekerSkillList>(jobSeeker);
                    jobSeekerWorkHostory.Add(jobSeekerObj);
                }
            }
            
            return jobSeekerWorkHostory;
        }

        /// <summary>
        /// Function to get all skills of a jobseeker that gets acquired from
        /// </summary>
        /// <param name="jobSeekerId">jobSeekerId</param>
        /// <param name="acquiredId">acquiredId</param>
        /// <returns>obseekerSkill object</returns>
        public IEnumerable<SkillSmart.Dto.JobSeekerSkillList> GetJobSeekerSkillListByAcquiredId(string jobSeekerId, string acquiredId)
        {
            var jobSeekerWorkSkillListList = this.MongoCollection.FindAllAs<JobSeekerSkillList>();

            List<SkillSmart.Dto.JobSeekerSkillList> jobSeekerWorkHostory = new List<SkillSmart.Dto.JobSeekerSkillList>();
            foreach (JobSeekerSkillList jobSeeker in jobSeekerWorkSkillListList)
            {
                if (jobSeeker.JobSeekerId == jobSeekerId)
                {
                    if (jobSeeker.SkillAcquiredId == acquiredId)
                    {
                        SkillSmart.Dto.JobSeekerSkillList jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.JobSeekerSkillList, SkillSmart.Dto.JobSeekerSkillList>(jobSeeker);
                        jobSeekerWorkHostory.Add(jobSeekerObj);
                    }        
                }
            }
            return jobSeekerWorkHostory;
        }

        /// <summary>
        /// Function to Create a skill for the  JobSeeker 
        /// </summary>
        /// <param name="entity">JobseekerSkill Object</param>
        public void Create(SkillSmart.Dto.JobSeekerSkillList entity)
        {
            JobSeekerSkillList seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.JobSeekerSkillList, SkillSmartMongoDA.Entities.JobSeekerSkillList>(entity);
            base.Create(seeker);
        }

        /// <summary>
        /// Function to get details of a skill of the JobSeeker 
        /// </summary>
        /// <param name="id"></param>
        /// <returns>JobseekerSkill Object</returns>
        public new SkillSmart.Dto.JobSeekerSkillList GetById(string id)
        {
            JobSeekerSkillList dbObj = base.GetById(id);
            SkillSmart.Dto.JobSeekerSkillList seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.JobSeekerSkillList, SkillSmart.Dto.JobSeekerSkillList>(dbObj);
            return seeker;
        }

       /// <summary>
        /// Function to Update a JobSeeker Skill 
       /// </summary>
        /// <param name="entity">JobseekerSkill Object</param>
        public void Update(SkillSmart.Dto.JobSeekerSkillList entity)
        {
            JobSeekerSkillList seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.JobSeekerSkillList, SkillSmartMongoDA.Entities.JobSeekerSkillList>(entity);
            base.Update(seeker);         
        }

        /// <summary>
        /// Function to Delete a JobSeeker Skill 
        /// </summary>
        /// <param name="entity">JobseekerSkill Object</param>
        public void Delete(SkillSmart.Dto.JobSeekerSkillList entity)
        {
            JobSeekerSkillList seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.JobSeekerSkillList, SkillSmartMongoDA.Entities.JobSeekerSkillList>(entity);
            base.Delete(seeker);
        }
    }
}
