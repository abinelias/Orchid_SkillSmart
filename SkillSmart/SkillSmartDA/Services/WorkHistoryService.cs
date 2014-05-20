using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
using MongoDB.Driver.Linq;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class WorkHistoryService : EntityService<WorkHistory>, IWorkHistoryService<SkillSmart.Dto.WorkHistory>
    {
        public WorkHistoryService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }

        /// <summary>
        /// Function to Get all Work history details of the jobseeker
        /// </summary>
        /// <param name="id">JobSeekerId</param>
        /// <returns>List of work history details of the jobseeker</returns>
        public IEnumerable<SkillSmart.Dto.WorkHistory> GetJobSeekerWorkHistoryById(string id)
        {
            var jobSeekerWorkHistoryList = this.MongoCollection.FindAllAs<WorkHistory>();

            List<SkillSmart.Dto.WorkHistory> jobSeekerWorkHostory = new List<SkillSmart.Dto.WorkHistory>();
            foreach (WorkHistory jobSeeker in jobSeekerWorkHistoryList)
            {
                if (jobSeeker.JobSeekerId == id)
                {
                    SkillSmart.Dto.WorkHistory jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.WorkHistory, SkillSmart.Dto.WorkHistory>(jobSeeker);
                    jobSeekerWorkHostory.Add(jobSeekerObj);
                }
            }
            return jobSeekerWorkHostory;
        }

        /// <summary>
        /// Function to Create new work history details for the jobseeker
        /// </summary>
        /// <param name="entity">WorkHistory Object</param>
        public void Create(SkillSmart.Dto.WorkHistory entity)
        {
            WorkHistory seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.WorkHistory, SkillSmartMongoDA.Entities.WorkHistory>(entity);
            base.Create(seeker);
            entity.Id = seeker.Id;
        }

        /// <summary>
        /// Function to get details of a particular work history of the jobseeker
        /// </summary>
        /// <param name="id">WorkHistoryId</param>
        /// <returns>WorkHistory Object</returns>
        public new SkillSmart.Dto.WorkHistory GetById(string id)
        {
            WorkHistory dbObj = base.GetById(id);
            SkillSmart.Dto.WorkHistory seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.WorkHistory, SkillSmart.Dto.WorkHistory>(dbObj);
            return seeker;
        }

        /// <summary>
        /// Function to Update WorkHistory details
        /// </summary>
        /// <param name="entity">WorkHistory Object</param>
        public void Update(SkillSmart.Dto.WorkHistory entity)
        {
            WorkHistory seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.WorkHistory, SkillSmartMongoDA.Entities.WorkHistory>(entity);
            base.Update(seeker);         
        }

        /// <summary>
        /// Function to Delete WorkHistory details
        /// </summary>
        /// <param name="entity">WorkHistory Object</param>
        public void Delete(SkillSmart.Dto.WorkHistory entity)
        {
            WorkHistory seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.WorkHistory, SkillSmartMongoDA.Entities.WorkHistory>(entity);
            base.Delete(seeker);
        }
    }
}
