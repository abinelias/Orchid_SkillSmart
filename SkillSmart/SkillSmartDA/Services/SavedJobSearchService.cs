
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using SkillSmart.Base.Services;
using SkillSmart.Utilities;
using System.Collections.Generic;
using MongoDB.Driver.Linq;
namespace SkillSmartMongoDA.Services
{
    using Entities;
    public class SavedJobSearchService : EntityService<SavedJobSearch>, ISavedJobSearch<SkillSmart.Dto.SavedJobSearch>
    {
        public SavedJobSearchService(MongoDatabase mongoDatabase)
            : base(mongoDatabase)
        { }

        /// <summary>
        /// Function to Get all Work history details of the jobseeker
        /// </summary>
        /// <param name="id">JobSeekerId</param>
        /// <returns>List of work history details of the jobseeker</returns>
        public IEnumerable<SkillSmart.Dto.SavedJobSearch> GetJobSeekerSavedJobSearchById(string id)
        {
            var jobSeekerWorkHistoryList = this.MongoCollection.FindAllAs<SavedJobSearch>();

            List<SkillSmart.Dto.SavedJobSearch> jobSeekerWorkHostory = new List<SkillSmart.Dto.SavedJobSearch>();
            foreach (SavedJobSearch jobSeeker in jobSeekerWorkHistoryList)
            {
                if (jobSeeker.JobSeekerId == id)
                {
                    SkillSmart.Dto.SavedJobSearch jobSeekerObj = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.SavedJobSearch, SkillSmart.Dto.SavedJobSearch>(jobSeeker);
                    jobSeekerWorkHostory.Add(jobSeekerObj);
                }
            }
            return jobSeekerWorkHostory;
        }

        /// <summary>
        /// Function to Create new work history details for the jobseeker
        /// </summary>
        /// <param name="entity">WorkHistory Object</param>
        public void Create(SkillSmart.Dto.SavedJobSearch entity)
        {
            SavedJobSearch seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.SavedJobSearch, SkillSmartMongoDA.Entities.SavedJobSearch>(entity);
            base.Create(seeker);
            entity.Id = seeker.Id;
        }

        /// <summary>
        /// Function to get details of a particular work history of the jobseeker
        /// </summary>
        /// <param name="id">WorkHistoryId</param>
        /// <returns>WorkHistory Object</returns>
        public new SkillSmart.Dto.SavedJobSearch GetById(string id)
        {
            SavedJobSearch dbObj = base.GetById(id);
            SkillSmart.Dto.SavedJobSearch seeker = MapperUtilities.MapToViewModel<SkillSmartMongoDA.Entities.SavedJobSearch, SkillSmart.Dto.SavedJobSearch>(dbObj);
            return seeker;
        }

        /// <summary>
        /// Function to Update WorkHistory details
        /// </summary>
        /// <param name="entity">WorkHistory Object</param>
        public void Update(SkillSmart.Dto.SavedJobSearch entity)
        {
            SavedJobSearch seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.SavedJobSearch, SkillSmartMongoDA.Entities.SavedJobSearch>(entity);
            base.Update(seeker);         
        }

        /// <summary>
        /// Function to Delete WorkHistory details
        /// </summary>
        /// <param name="entity">WorkHistory Object</param>
        public void Delete(SkillSmart.Dto.SavedJobSearch entity)
        {
            SavedJobSearch seeker = MapperUtilities.MapToDomainModel<SkillSmart.Dto.SavedJobSearch, SkillSmartMongoDA.Entities.SavedJobSearch>(entity);
            base.Delete(seeker);
        }
    }
}
